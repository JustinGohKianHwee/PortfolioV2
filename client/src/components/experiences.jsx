import { motion } from "framer-motion";
import { experiences } from "@/data/experiences";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-60px" },
  transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1], delay },
});

function ExperienceCard({ exp, index }) {
  const isFeatured = exp.current;

  return (
    <motion.div {...fadeUp(index * 0.07)}>
      <Dialog>
        <DialogTrigger asChild>
          <div
            className={`card-base p-6 cursor-pointer group ${
              isFeatured
                ? "border-[#E8A04D]/30 bg-[rgba(232,160,77,0.04)]"
                : ""
            }`}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => e.key === "Enter" && e.currentTarget.click()}
            aria-label={`View details for ${exp.role} at ${exp.company}`}
          >
            <div className="flex items-start gap-4">
              {/* Company logo */}
              <div className="flex-shrink-0 w-10 h-10 rounded-lg overflow-hidden bg-white/5 border border-white/10 flex items-center justify-center">
                {exp.logo && !exp.logo.includes("tiktok") ? (
                  <img
                    src={exp.logo}
                    alt={exp.company}
                    className="w-full h-full object-contain p-1"
                    onError={(e) => {
                      e.target.style.display = "none";
                    }}
                  />
                ) : (
                  <span
                    className="text-xs text-[#6B6B6B]"
                    style={{ fontFamily: "'DM Mono', monospace" }}
                  >
                    {exp.company.slice(0, 2).toUpperCase()}
                  </span>
                )}
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-2 flex-wrap">
                  <div>
                    <div className="flex items-center gap-2 mb-0.5 flex-wrap">
                      <h3
                        className="text-base text-[#FAFAF9]"
                        style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 600 }}
                      >
                        {exp.role}
                      </h3>
                      {isFeatured && (
                        <span className="badge-accent text-[10px]">Current</span>
                      )}
                    </div>
                    <p
                      className="text-sm text-[#E8A04D]"
                      style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 500 }}
                    >
                      {exp.company}
                    </p>
                  </div>
                  <span
                    className="text-xs text-[#6B6B6B] flex-shrink-0"
                    style={{ fontFamily: "'DM Mono', monospace" }}
                  >
                    {exp.period}
                  </span>
                </div>

                <p className="text-sm text-[#A1A1A1] mt-2 leading-relaxed line-clamp-2">
                  {exp.summary}
                </p>

                <div className="flex flex-wrap gap-1.5 mt-3">
                  {exp.stack.slice(0, 4).map((t) => (
                    <span key={t} className="badge-tech">
                      {t}
                    </span>
                  ))}
                  {exp.stack.length > 4 && (
                    <span className="badge-tech text-[#6B6B6B]">
                      +{exp.stack.length - 4}
                    </span>
                  )}
                </div>
              </div>
            </div>

            <p className="text-xs text-[#6B6B6B] mt-4 group-hover:text-[#E8A04D] transition-colors"
               style={{ fontFamily: "'DM Mono', monospace" }}>
              Click to view details →
            </p>
          </div>
        </DialogTrigger>

        {/* Detail modal */}
        <DialogContent className="bg-[#141416] border border-white/10 max-w-2xl max-h-[85vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle
              className="text-xl text-[#FAFAF9]"
              style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 700 }}
            >
              {exp.role}
            </DialogTitle>
            <DialogDescription asChild>
              <div>
                <div className="flex items-center gap-3 mt-1 flex-wrap">
                  <span
                    className="text-[#E8A04D] text-sm"
                    style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 500 }}
                  >
                    {exp.company}
                  </span>
                  <span className="text-[#6B6B6B] text-xs" style={{ fontFamily: "'DM Mono', monospace" }}>
                    {exp.period} · {exp.location}
                  </span>
                </div>

                <p className="text-[#A1A1A1] text-sm mt-4 mb-5 leading-relaxed">
                  {exp.summary}
                </p>

                <ul className="space-y-2 mb-6">
                  {exp.bullets.map((b, i) => (
                    <li key={i} className="flex gap-3 text-sm text-[#A1A1A1]">
                      <span className="text-[#E8A04D] mt-0.5 flex-shrink-0">·</span>
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>

                <div>
                  <p className="label-mono mb-2" style={{ color: "#6B6B6B" }}>Stack</p>
                  <div className="flex flex-wrap gap-2">
                    {exp.stack.map((t) => (
                      <span key={t} className="badge-tech">{t}</span>
                    ))}
                  </div>
                </div>
              </div>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </motion.div>
  );
}

export default function Experiences() {
  return (
    <section id="experiences" className="py-24">
      <div className="section-container">

        <motion.div {...fadeUp(0)} className="mb-12">
          <p className="label-mono mb-3">Experience</p>
          <h2
            className="text-3xl xl:text-4xl text-[#FAFAF9]"
            style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 700 }}
          >
            Where I've worked
          </h2>
        </motion.div>

        <div className="flex flex-col gap-4">
          {experiences.map((exp, i) => (
            <ExperienceCard key={exp.id} exp={exp} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
