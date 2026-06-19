import { useState } from "react";
import { motion } from "framer-motion";
import { MapPin, Calendar } from "lucide-react";
import { education } from "@/data/education";

const EASE = [0.32, 0.72, 0, 1];

const blurReveal = (delay = 0) => ({
  initial: { opacity: 0, filter: "blur(12px)" },
  whileInView: { opacity: 1, filter: "blur(0px)" },
  viewport: { once: true, margin: "-60px" },
  transition: { duration: 0.7, ease: EASE, delay },
});

function SchoolLogo({ src, alt, initials, size = "md" }) {
  const [errored, setErrored] = useState(false);
  const sizeClass = size === "lg" ? "w-14 h-14 rounded-xl text-sm" : "w-10 h-10 rounded-lg text-xs";

  return (
    <div
      className={`flex-shrink-0 ${sizeClass} overflow-hidden bg-white/[0.06] border border-white/[0.08] flex items-center justify-center`}
    >
      {src && !errored ? (
        <img
          src={src}
          alt={alt}
          className="w-full h-full object-contain p-1.5"
          onError={() => setErrored(true)}
        />
      ) : (
        <span className="text-white/50 font-bold tracking-tight">{initials}</span>
      )}
    </div>
  );
}

export default function Education() {
  const nus     = education.find((e) => e.id === "nus");
  const compact = education.filter((e) => e.id !== "nus");

  return (
    <section id="education" className="py-24 bg-[#050505]">
      <div className="section-container">

        <motion.div {...blurReveal(0)} className="mb-14">
          <p className="label-meta mb-4">Education</p>
          <h2
            className="text-white"
            style={{
              fontSize: "clamp(36px, 5vw, 56px)",
              fontWeight: 700,
              letterSpacing: "-0.03em",
              lineHeight: 1.05,
            }}
          >
            Academic background<span className="gradient-text">.</span>
          </h2>
        </motion.div>

        {/* ── NUS — featured card ── */}
        <motion.div {...blurReveal(0.1)} className="mb-6">
          <div className="gradient-border-card p-8 lg:p-10">
            <div className="flex flex-col lg:flex-row lg:items-start gap-8">
              <div className="flex-1">

                {/* Logo + name row */}
                <div className="flex flex-wrap items-center gap-3 mb-5">
                  <SchoolLogo src={nus.logo} alt={nus.institution} initials={nus.shortName} size="lg" />
                  <div className="flex flex-col gap-2">
                    {/* Mobile: abbreviated */}
                    <span
                      className="text-white font-bold md:hidden"
                      style={{ fontSize: "clamp(28px, 4vw, 42px)", letterSpacing: "-0.03em", lineHeight: 1 }}
                    >
                      {nus.shortName}
                    </span>
                    {/* Desktop: full name */}
                    <span
                      className="text-white font-bold hidden md:block"
                      style={{ fontSize: "clamp(20px, 2.4vw, 30px)", letterSpacing: "-0.03em", lineHeight: 1.1 }}
                    >
                      {nus.institution}
                    </span>
                    <span className="text-xs font-semibold self-start px-3 py-1.5 rounded-full border border-[#6366F1]/40 text-[#818CF8]">
                      GPA {nus.gpa}
                    </span>
                  </div>
                </div>

                <p
                  className="text-white font-semibold mb-1"
                  style={{ fontSize: "clamp(15px, 1.8vw, 20px)", letterSpacing: "-0.01em" }}
                >
                  {nus.degree}
                </p>
                <p className="text-white/50 text-sm mb-1">{nus.specialisation}</p>
                {nus.minor && (
                  <p className="text-white/35 text-sm mb-6">Minor in {nus.minor}</p>
                )}

                <div className="flex flex-wrap gap-5 mb-7">
                  <span className="flex items-center gap-1.5 text-xs text-white/35">
                    <Calendar size={11} />{nus.period}
                  </span>
                  <span className="flex items-center gap-1.5 text-xs text-white/35">
                    <MapPin size={11} />{nus.location}
                  </span>
                </div>

                <div className="flex flex-col gap-3">
                  {nus.highlights.map((h, i) => (
                    <div key={i} className="flex gap-3 text-sm text-white/45 leading-relaxed">
                      <span className="flex-shrink-0 w-1 h-1 rounded-full bg-[#6366F1] mt-[0.55em]" />
                      {h}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* ── Compact cards: UBC, RJC, RI ── */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {compact.map((edu, i) => (
            <motion.div
              key={edu.id}
              {...blurReveal(0.15 + i * 0.08)}
              className="h-full"
            >
              <div className="card-base p-6 h-full flex flex-col">

                <div className="flex items-start justify-between gap-2 mb-4">
                  <div className="flex items-center gap-3 min-w-0">
                    <SchoolLogo src={edu.logo} alt={edu.institution} initials={edu.shortName} size="md" />
                    <div className="min-w-0">
                      {/* Mobile: big short name */}
                      <span
                        className="text-white font-bold block md:hidden"
                        style={{ fontSize: "clamp(22px, 3vw, 28px)", letterSpacing: "-0.03em", lineHeight: 1 }}
                      >
                        {edu.shortName}
                      </span>
                      {/* Desktop: full institution name */}
                      <span
                        className="text-white font-bold hidden md:block text-sm leading-snug"
                        style={{ letterSpacing: "-0.01em" }}
                      >
                        {edu.institution}
                      </span>
                    </div>
                  </div>
                  <span className="text-white/25 text-xs font-medium flex-shrink-0 pt-1">
                    {edu.period.split("–")[0].trim()}
                  </span>
                </div>

                <p className="text-white/75 text-sm font-semibold mb-1 tracking-tight">
                  {edu.degree}
                </p>

                {edu.specialisation && (
                  <p className="text-white/40 text-xs mb-4 leading-relaxed">{edu.specialisation}</p>
                )}

                <div className="flex items-center gap-1.5 text-xs text-white/30 mb-4">
                  <MapPin size={10} />
                  {edu.location}
                </div>

                {edu.highlights[0] && (
                  <div className="flex gap-2 text-xs text-white/40 leading-relaxed mt-auto pt-4 border-t border-white/[0.05]">
                    <span className="flex-shrink-0 w-1 h-1 rounded-full bg-[#6366F1]/60 mt-[0.45em]" />
                    {edu.highlights[0]}
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
