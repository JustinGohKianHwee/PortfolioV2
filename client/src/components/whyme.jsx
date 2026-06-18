"use client";

import { useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

const MAX_CHARS = 2000;

export default function WhyMe() {
  const [jobDesc, setJobDesc] = useState("");
  const [loading, setLoading] = useState(false);
  const [parsing, setParsing] = useState(false);
  const [response, setResponse] = useState("");

  const API = import.meta.env.VITE_API_BASE_URL; ;

  const handleFileChange = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setParsing(true);
    try {
      const formData = new FormData();
      formData.append("file", file);

      const res = await fetch(`${API}/api/whyme/upload_jd`, {
        method: "POST",
        body: formData,
      });
      if (!res.ok) {
        throw new Error(await res.text());
      }
      const { text } = await res.json();
      const truncated = text.length > MAX_CHARS
        ? text.slice(0, MAX_CHARS)
        : text;

    setJobDesc(truncated);
    } catch (err) {
      console.error("PDF parse error:", err);
      alert("Failed to parse PDF. Check console for details.");
    } finally {
      setParsing(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch(`${API}/api/whyme`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ jobDescription: jobDesc }),
      });
      if (!res.ok) throw new Error(await res.text());
      const data = await res.json();
      setResponse(data.result);
    } catch (err) {
      console.error("Error:", err);
      setResponse("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 1.5, ease: "easeOut" }}
        className="min-h-screen max-w-6xl mx-auto px-4 sm:px-6">
      <motion.div
        initial={{ y: 0 }}
        animate={{ y: [0, -10, 0]}}           // move up 10px then back
        transition={{
            duration: 3,                         // total time for one up-and-down
            repeat: Infinity,                    // loop forever
            ease: "easeInOut"
        }} 
        className="text-center mb-12">
        <h2 className="inline-block text-6xl lg:text-7xl font-poppins-bold text-gradient leading-snug">
          Why me?
        </h2>
        <p className="mt-2 text-lg text-white/50 font-poppins-regular">
          Telling you why I'm the right choice for your role.
        </p>
      </motion.div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-10">
      <div className="flex flex-col space-y-6">
        <div>
          <label className="font-poppins-semibold text-accent block mb-2">
            1&#41; Upload a Job Description (PDF)
          </label>
          <input
            type="file"
            accept="application/pdf"
            onChange={handleFileChange}
            disabled={parsing}
            className={cn(
                "text-white font-poppins-regular",
                "file:cursor-pointer file:rounded-md",
                "file:border-0 file:px-4 file:py-2",
                "file:bg-accent file:text-white file:font-medium file:font-poppins-semibold",
                "hover:file:bg-accent/90 file:mr-4",
                parsing && "opacity-50 cursor-not-allowed"
            )}
            />
          {parsing && (
            <p className="mt-2 text-sm text-white">Parsing PDF…</p>
          )}
        </div>

        <div>
          <label className="font-poppins-semibold block mb-2 text-accent">
            2&#41; Or Paste in Job Description Text
          </label>
          <Textarea
          rows={10}
          placeholder="Paste job description here…"
          value={jobDesc}
          maxLength={MAX_CHARS}
          onChange={(e) => setJobDesc(e.target.value)}
          disabled={parsing}
          className="bg-[#1f1f1f] text-white text-md p-4 font-poppins-regular"
        />
        </div>

        <button
          type="button"
          onClick={handleSubmit}
          className={`font-semibold px-6 py-3 rounded-md transition
            ${(!jobDesc.trim() || loading)
              ? "bg-gray-500 cursor-not-allowed"
              : "bg-accent hover:bg-accent/90 text-white"}`
          }
          disabled={!jobDesc.trim() || loading}
        >
          {loading ? "Generating…" : "See why I’m the perfect fit."}
        </button>
      </div>

      <div className="flex flex-col space-y-4">
        {!response && !parsing && (
          <div className="flex-1 bg-[#1f1f1f] border border-accent text-gray-500 p-6 rounded-lg font-poppins-regular">
            Your tailored pitch will appear here.
          </div>
        )}

        {response && (
          <div className="flex-1 bg-[#1f1f1f] text-white p-6 rounded-lg border border-accent flex-1 overflow-auto">
            <h2 className="text-3xl font-poppins-semibold mb-4 text-gradient">Your Tailored Pitch:</h2>
            <p className="font-poppins-regular">{response}</p>
          </div>
        )}
      </div>
      </div>
    </motion.div>
  );
}
