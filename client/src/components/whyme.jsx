import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, Upload, ArrowRight, Zap } from "lucide-react";
import { meta } from "@/data/meta";
import { API_BASE_URL } from "@/lib/config";

const MAX_CHARS = 2000;
const EASE = [0.32, 0.72, 0, 1];

const STATUS = {
  idle:      "idle",
  parsing:   "parsing",
  loading:   "loading",
  streaming: "streaming",
  done:      "done",
  error:     "error",
};

const blurReveal = (delay = 0) => ({
  initial: { opacity: 0, filter: "blur(12px)" },
  whileInView: { opacity: 1, filter: "blur(0px)" },
  viewport: { once: true, margin: "-60px" },
  transition: { duration: 0.7, ease: EASE, delay },
});

/* ── Animated phase icon ── */
function PhaseIcon({ state }) {
  if (state === "done") {
    return (
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", stiffness: 500, damping: 25 }}
        className="w-4 h-4 rounded-full bg-[#6366F1] flex items-center justify-center flex-shrink-0"
      >
        <Check size={9} className="text-white" strokeWidth={3} />
      </motion.div>
    );
  }
  if (state === "active") {
    return (
      <div className="w-4 h-4 rounded-full border-2 border-[#6366F1]/30 border-t-[#6366F1] animate-spin flex-shrink-0" />
    );
  }
  return <div className="w-4 h-4 rounded-full border border-white/15 flex-shrink-0" />;
}

/* ── Phase status strip ── */
function PhaseRow({ phases }) {
  const items = [
    { id: "retrieve", label: "Scanning resume" },
    { id: "generate", label: "Generating analysis" },
  ];
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: EASE }}
      className="flex items-center gap-6 mb-4"
    >
      {items.map(({ id, label }) => {
        const state = phases[id];
        return (
          <div key={id} className="flex items-center gap-2">
            <PhaseIcon state={state} />
            <span
              className={`text-xs font-medium tracking-wide transition-colors duration-300 ${
                state === "done"
                  ? "text-[#818CF8]"
                  : state === "active"
                  ? "text-white/70"
                  : "text-white/25"
              }`}
            >
              {label}
            </span>
          </div>
        );
      })}
    </motion.div>
  );
}

export default function WhyMe() {
  const [jobDesc, setJobDesc]   = useState("");
  const [status, setStatus]     = useState(STATUS.idle);
  const [response, setResponse] = useState("");
  const [fileName, setFileName] = useState("");
  const [phases, setPhases]     = useState({ retrieve: "pending", generate: "pending" });

  const API = API_BASE_URL;
  const isActive = status === STATUS.loading || status === STATUS.streaming || status === STATUS.parsing;

  /* ── PDF upload ── */
  const handleFileChange = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setFileName(file.name);
    setStatus(STATUS.parsing);
    try {
      const formData = new FormData();
      formData.append("file", file);
      const res = await fetch(`${API}/api/whyme/upload_jd`, {
        method: "POST",
        body: formData,
      });
      if (!res.ok) throw new Error(await res.text());
      const { text } = await res.json();
      setJobDesc(text.slice(0, MAX_CHARS));
      setStatus(STATUS.idle);
    } catch (err) {
      console.error("PDF parse error:", err);
      setStatus(STATUS.error);
      setResponse("Failed to parse PDF. Please paste the job description instead.");
    }
  };

  /* ── SSE streaming submit ── */
  const handleSubmit = async () => {
    if (!jobDesc.trim()) return;
    setStatus(STATUS.loading);
    setResponse("");
    setPhases({ retrieve: "active", generate: "pending" });

    try {
      const res = await fetch(`${API}/api/whyme`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ jobDescription: jobDesc }),
      });

      if (!res.ok) throw new Error(await res.text());

      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let buffer = "";

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        buffer += decoder.decode(value, { stream: true });
        const lines = buffer.split("\n");
        buffer = lines.pop() ?? "";

        for (const line of lines) {
          if (!line.startsWith("data: ")) continue;
          let evt;
          try { evt = JSON.parse(line.slice(6)); } catch { continue; }

          if (evt.type === "phase") {
            setPhases((prev) => ({ ...prev, [evt.id]: evt.state }));
            if (evt.id === "generate" && evt.state === "active") {
              setStatus(STATUS.streaming);
            }
          } else if (evt.type === "token") {
            setResponse((prev) => prev + evt.content);
          } else if (evt.type === "done") {
            setStatus(STATUS.done);
          } else if (evt.type === "error") {
            setStatus(STATUS.error);
            setResponse("Something went wrong. Please try again.");
          }
        }
      }
    } catch (err) {
      console.error("Stream error:", err);
      setStatus(STATUS.error);
      setResponse("Something went wrong. Please try again.");
    }
  };

  const showOutput = status !== STATUS.idle || response;
  const isStreaming = status === STATUS.streaming;
  const isDone = status === STATUS.done;
  const isError = status === STATUS.error;

  return (
    <section id="whyme" className="py-24 bg-black">
      <div className="section-container">

        {/* ── Header ── */}
        <motion.div {...blurReveal(0)} className="mb-14">
          <p className="label-meta mb-4">Recruiter Tool</p>
          <h2
            className="text-white mb-5"
            style={{
              fontSize: "clamp(36px, 5vw, 56px)",
              fontWeight: 700,
              letterSpacing: "-0.03em",
              lineHeight: 1.05,
            }}
          >
            Why me<span className="gradient-text">.</span>
          </h2>
          <p className="text-white/50 text-base max-w-md leading-relaxed">
            Paste a job description. My RAG pipeline scans my resume and explains the fit — in real time.
          </p>
        </motion.div>

        {/* ── Console — centered, max-w-2xl ── */}
        <motion.div {...blurReveal(0.1)} className="max-w-2xl mx-auto">

          {/* Input area */}
          <div className={`transition-opacity duration-300 ${isActive ? "opacity-50 pointer-events-none" : ""}`}>
            <textarea
              id="jd-text"
              rows={isActive ? 2 : 7}
              placeholder="Paste the job description here…"
              value={jobDesc}
              maxLength={MAX_CHARS}
              onChange={(e) => setJobDesc(e.target.value)}
              disabled={isActive}
              aria-label="Job description"
              className="w-full bg-[#0A0A0A] border border-white/[0.08] rounded-xl px-4 py-3.5 text-sm text-white placeholder-white/20 focus:outline-none focus:border-[#6366F1]/50 focus:ring-1 focus:ring-[#6366F1]/20 transition-all resize-none leading-relaxed"
              style={{ transition: "rows 0.3s ease" }}
            />

            {/* Input toolbar */}
            <div className="flex items-center justify-between gap-3 mt-3">
              <label
                htmlFor="jd-upload"
                className="flex items-center gap-2 text-xs text-white/35 hover:text-white/60 transition-colors cursor-pointer"
              >
                <Upload size={12} />
                {fileName ? (
                  <span className="text-[#818CF8]">{fileName}</span>
                ) : (
                  "Upload PDF"
                )}
                <input
                  id="jd-upload"
                  type="file"
                  accept="application/pdf"
                  onChange={handleFileChange}
                  disabled={isActive}
                  className="sr-only"
                  aria-label="Upload job description PDF"
                />
              </label>

              <div className="flex items-center gap-4">
                <span className="text-xs text-white/20 tabular-nums">
                  {`${jobDesc.length}/${MAX_CHARS}`}
                </span>
                <button
                  type="button"
                  onClick={handleSubmit}
                  disabled={!jobDesc.trim() || isActive}
                  className="btn-primary py-2.5 px-5 text-sm"
                >
                  <Zap size={13} />
                  {isActive ? "Running…" : "Analyse fit"}
                </button>
              </div>
            </div>
          </div>

          {/* Output area */}
          <AnimatePresence>
            {showOutput && (
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.45, ease: EASE }}
                className="mt-8"
              >
                {/* Phase strip */}
                {(status === STATUS.loading || status === STATUS.streaming || isDone) && (
                  <PhaseRow phases={phases} />
                )}

                {/* Response card */}
                <div
                  className={`rounded-xl p-6 min-h-[100px] transition-all duration-500 ${
                    isDone
                      ? "gradient-border-card"
                      : "bg-[#0A0A0A] border border-white/[0.07]"
                  }`}
                >
                  {/* Done badge */}
                  {isDone && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="flex items-center gap-2 mb-4"
                    >
                      <span className="w-2 h-2 rounded-full bg-[#6366F1]" />
                      <p className="label-meta text-[#818CF8]">Analysis complete</p>
                    </motion.div>
                  )}

                  {/* Skeleton while loading (before first token) */}
                  {status === STATUS.loading && !response && (
                    <div className="flex flex-col gap-2.5">
                      {[1, 0.7, 0.5].map((w, i) => (
                        <div
                          key={i}
                          className="h-3 rounded bg-white/[0.05] animate-pulse"
                          style={{ width: `${w * 100}%` }}
                        />
                      ))}
                    </div>
                  )}

                  {/* Streaming / done text */}
                  {response && !isError && (
                    <p
                      className={`text-white/65 text-sm leading-[1.9] ${isStreaming ? "streaming-cursor" : ""}`}
                    >
                      {response}
                    </p>
                  )}

                  {/* Error text */}
                  {isError && (
                    <p className="text-white/40 text-sm">
                      {response || "Something went wrong. Please try again."}
                    </p>
                  )}
                </div>

                {/* Action buttons — blur in when done */}
                <AnimatePresence>
                  {isDone && (
                    <motion.div
                      initial={{ opacity: 0, filter: "blur(8px)" }}
                      animate={{ opacity: 1, filter: "blur(0px)" }}
                      transition={{ duration: 0.5, ease: EASE, delay: 0.2 }}
                      className="flex flex-wrap gap-3 mt-5"
                    >
                      <a href="#contact" className="btn-primary text-sm py-2.5 px-5">
                        Get in touch <ArrowRight size={14} />
                      </a>
                      <a href={meta.resumeFile} download className="btn-secondary text-sm py-2.5 px-5">
                        Download resume
                      </a>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            )}
          </AnimatePresence>

        </motion.div>
      </div>
    </section>
  );
}
