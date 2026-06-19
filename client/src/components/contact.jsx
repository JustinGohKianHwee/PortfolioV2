import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowUpRight, Send } from "lucide-react";
import { meta } from "@/data/meta";

const EASE = [0.32, 0.72, 0, 1];
const STATUS = { idle: "idle", sending: "sending", ok: "ok", error: "error" };

const blurReveal = (delay = 0) => ({
  initial: { opacity: 0, filter: "blur(12px)" },
  whileInView: { opacity: 1, filter: "blur(0px)" },
  viewport: { once: true, margin: "-60px" },
  transition: { duration: 0.7, ease: EASE, delay },
});

const inputCls =
  "w-full bg-[#0F0F0F] border border-white/[0.08] rounded-lg px-4 py-3 text-sm text-white placeholder-white/25 focus:outline-none focus:border-[#6366F1]/50 focus:ring-1 focus:ring-[#6366F1]/20 transition-all min-h-[44px]";

export default function Contact() {
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState(STATUS.idle);

  const handleChange = (e) =>
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus(STATUS.sending);
    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          access_key: import.meta.env.VITE_WEB3FORMS_KEY,
          name: form.name,
          email: form.email,
          message: form.message,
          subject: `Portfolio contact from ${form.name}`,
        }),
      });
      if (res.ok) {
        setStatus(STATUS.ok);
        setForm({ name: "", email: "", message: "" });
      } else {
        setStatus(STATUS.error);
      }
    } catch {
      setStatus(STATUS.error);
    }
  };

  return (
    <section id="contact" className="py-24 bg-[#050505]">
      <div className="section-container">

        {/* ── Headline ── */}
        <motion.div {...blurReveal(0)} className="mb-14">
          <h2
            className="text-white leading-none mb-10"
            style={{
              fontSize: "clamp(56px, 9vw, 100px)",
              fontWeight: 800,
              letterSpacing: "-0.04em",
            }}
          >
            Let's{" "}
            <br className="sm:hidden" />
            talk<span className="gradient-text">.</span>
          </h2>

          <div className="flex flex-wrap gap-5 items-center">
            <a
              href={`mailto:${meta.email}`}
              className="inline-flex items-center gap-2 text-white text-base font-medium hover:text-white/70 transition-colors"
            >
              {meta.email} <ArrowUpRight size={16} />
            </a>
            <span className="text-white/15">·</span>
            <a
              href={meta.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-white/40 hover:text-white transition-colors text-sm font-medium"
            >
              LinkedIn <ArrowUpRight size={14} />
            </a>
            <a
              href={meta.github}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-white/40 hover:text-white transition-colors text-sm font-medium"
            >
              GitHub <ArrowUpRight size={14} />
            </a>
          </div>
        </motion.div>

        {/* ── Inline contact form ── */}
        <motion.div {...blurReveal(0.15)}>
          {!open ? (
            <button
              onClick={() => setOpen(true)}
              className="inline-flex items-center gap-2 text-white/40 text-sm hover:text-white transition-colors border border-white/[0.08] rounded-lg px-5 py-3 hover:border-white/[0.18] min-h-[44px]"
            >
              <Send size={14} />
              Send a message
            </button>
          ) : (
            <motion.form
              initial={{ opacity: 0, filter: "blur(8px)" }}
              animate={{ opacity: 1, filter: "blur(0px)" }}
              transition={{ duration: 0.4, ease: EASE }}
              onSubmit={handleSubmit}
              className="max-w-lg flex flex-col gap-4"
            >
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="c-name" className="label-meta mb-2 block">Name *</label>
                  <input
                    id="c-name"
                    name="name"
                    type="text"
                    required
                    autoComplete="name"
                    value={form.name}
                    onChange={handleChange}
                    placeholder="Your name"
                    className={inputCls}
                  />
                </div>
                <div>
                  <label htmlFor="c-email" className="label-meta mb-2 block">Email *</label>
                  <input
                    id="c-email"
                    name="email"
                    type="email"
                    required
                    autoComplete="email"
                    value={form.email}
                    onChange={handleChange}
                    placeholder="you@email.com"
                    className={inputCls}
                  />
                </div>
              </div>
              <div>
                <label htmlFor="c-message" className="label-meta mb-2 block">Message *</label>
                <textarea
                  id="c-message"
                  name="message"
                  rows={5}
                  required
                  value={form.message}
                  onChange={handleChange}
                  placeholder="Tell me about the role or opportunity…"
                  className={`${inputCls} resize-none leading-relaxed min-h-0`}
                />
              </div>

              <div className="flex gap-3 items-center">
                <button
                  type="submit"
                  disabled={status === STATUS.sending || status === STATUS.ok}
                  className="btn-primary disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  {status === STATUS.sending
                    ? "Sending…"
                    : status === STATUS.ok
                    ? "Sent!"
                    : "Send message"}
                </button>
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  className="btn-ghost"
                >
                  Cancel
                </button>
              </div>

              {status === STATUS.error && (
                <p className="text-red-400 text-sm">
                  Something went wrong — try emailing me directly.
                </p>
              )}
            </motion.form>
          )}
        </motion.div>

        {/* ── Footer ── */}
        <motion.div
          {...blurReveal(0.2)}
          className="mt-20 pt-8 border-t border-white/[0.06] flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3"
        >
          <p className="text-white/25 text-xs">
            NUS B.Sc. Business Analytics (Hons) · GPA {meta.gpa} · Singapore
          </p>
          <p className="text-white/25 text-xs">© 2026 Justin Goh</p>
        </motion.div>
      </div>
    </section>
  );
}
