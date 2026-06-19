import { motion } from "framer-motion";
import { projects } from "@/data/projects";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { ArrowUpRight } from "lucide-react";

const EASE = [0.32, 0.72, 0, 1];

const blurReveal = (delay = 0) => ({
  initial: { opacity: 0, filter: "blur(12px)" },
  whileInView: { opacity: 1, filter: "blur(0px)" },
  viewport: { once: true, margin: "-60px" },
  transition: { duration: 0.7, ease: EASE, delay },
});

const onMouseMove = (e) => {
  const rect = e.currentTarget.getBoundingClientRect();
  e.currentTarget.style.setProperty("--mx", `${e.clientX - rect.left}px`);
  e.currentTarget.style.setProperty("--my", `${e.clientY - rect.top}px`);
};

/* ── Dark modal ── */
function ProjectModal({ project: p }) {
  return (
    <DialogContent className="bg-[#0F0F0F] border border-white/[0.08] max-w-2xl max-h-[85vh] overflow-y-auto">
      <DialogHeader>
        <DialogTitle className="text-xl text-white font-semibold tracking-tight">
          {p.title}
        </DialogTitle>
        <DialogDescription asChild>
          <div className="space-y-5 mt-3">
            {p.context && (
              <div className="flex items-center gap-2">
                <span className="badge-tech">{p.context}</span>
                <span className="label-meta">{p.year}</span>
              </div>
            )}

            <div>
              <p className="label-meta mb-2">Problem</p>
              <p className="text-sm text-white/55 leading-relaxed">{p.problem}</p>
            </div>

            {p.contribution && (
              <div>
                <p className="label-meta mb-2">My contribution</p>
                <p className="text-sm text-white/55 leading-relaxed">{p.contribution}</p>
              </div>
            )}

            <div>
              <p className="label-meta mb-2">Approach</p>
              <p className="text-sm text-white/55 leading-relaxed">{p.approach}</p>
            </div>

            {p.highlights?.length > 0 && (
              <div>
                <p className="label-meta mb-2">Highlights</p>
                <ul className="flex flex-col gap-2">
                  {p.highlights.map((h, i) => (
                    <li key={i} className="flex gap-3 text-sm text-white/50 leading-relaxed">
                      <span className="flex-shrink-0 w-1 h-1 rounded-full bg-[#6366F1] mt-[0.55em]" />
                      {h}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <div>
              <p className="label-meta mb-2">Stack</p>
              <div className="flex flex-wrap gap-1.5">
                {p.stack.map((t) => (
                  <span key={t} className="badge-tech">{t}</span>
                ))}
              </div>
            </div>

            {(p.github || p.demo) && (
              <div className="flex gap-4 pt-1">
                {p.demo && (
                  <a href={p.demo} target="_blank" rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-sm text-[#818CF8] font-medium hover:text-[#A78BFA] transition-colors">
                    Watch demo <ArrowUpRight size={14} />
                  </a>
                )}
                {p.github && (
                  <a href={p.github} target="_blank" rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-sm text-[#818CF8] font-medium hover:text-[#A78BFA] transition-colors">
                    GitHub <ArrowUpRight size={14} />
                  </a>
                )}
              </div>
            )}
          </div>
        </DialogDescription>
      </DialogHeader>
    </DialogContent>
  );
}

/* ── Tier 1: Case study rows ── */
function CaseStudy({ project: p, index }) {
  return (
    <motion.div {...blurReveal(index * 0.08)}>
      <Dialog>
        <DialogTrigger asChild>
          <div
            className="group border-t border-white/[0.06] py-10 cursor-pointer hover:bg-white/[0.02] transition-colors duration-300 rounded-xl -mx-4 px-4"
            role="button"
            tabIndex={0}
            onKeyDown={(e) => e.key === "Enter" && e.currentTarget.click()}
            aria-label={`View ${p.title} case study`}
          >
            <div className="flex flex-col lg:flex-row gap-10">
              <div className="flex-shrink-0 lg:w-72">
                <div className="flex flex-wrap gap-1.5 mb-4">
                  {p.stack.slice(0, 4).map((s) => (
                    <span key={s} className="badge-tech">{s}</span>
                  ))}
                </div>
                <h3
                  className="text-white text-2xl font-bold mb-1"
                  style={{ letterSpacing: "-0.02em" }}
                >
                  {p.title}
                </h3>
                <p className="label-meta mb-5">{p.context} · {p.year}</p>
                {p.demo && (
                  <a href={p.demo} target="_blank" rel="noopener noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    className="inline-flex items-center gap-1.5 text-sm text-[#818CF8] font-medium hover:text-[#A78BFA] transition-colors">
                    Demo <ArrowUpRight size={14} />
                  </a>
                )}
              </div>

              <div className="flex-1">
                <p className="text-white/55 text-lg leading-relaxed mb-5">{p.tagline}</p>
                <div className="flex flex-col gap-2 mb-4">
                  {p.highlights?.slice(0, 3).map((h, i) => (
                    <div key={i} className="flex gap-3 text-sm text-white/40 leading-relaxed">
                      <span className="flex-shrink-0 w-1 h-1 rounded-full bg-[#6366F1] mt-[0.55em]" />
                      {h}
                    </div>
                  ))}
                </div>
                <p className="text-xs text-white/25 group-hover:text-[#818CF8] transition-colors font-medium tracking-wide">
                  Read case study →
                </p>
              </div>
            </div>
          </div>
        </DialogTrigger>
        <ProjectModal project={p} />
      </Dialog>
    </motion.div>
  );
}

/* ── Tier 2: Full cards with shimmer ── */
function ProjectCard({ project: p, index }) {
  return (
    <motion.div {...blurReveal(index * 0.08)} className="h-full">
      <Dialog>
        <DialogTrigger asChild>
          <div
            className="shimmer-card p-6 cursor-pointer group h-full flex flex-col"
            role="button"
            tabIndex={0}
            onKeyDown={(e) => e.key === "Enter" && e.currentTarget.click()}
            onMouseMove={onMouseMove}
            aria-label={`View ${p.title} project details`}
          >
            <div className="relative z-10 flex flex-col h-full">
              {p.image && (
                <div className="mb-4 rounded-xl overflow-hidden aspect-[16/7] bg-white/[0.04]">
                  <img
                    src={p.image}
                    alt={p.title}
                    className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-500"
                    style={{ filter: "brightness(0.9) saturate(0.85)" }}
                  />
                </div>
              )}
              <div className="flex items-start justify-between gap-3 mb-3">
                <h3 className="text-white text-lg font-bold tracking-tight">{p.title}</h3>
                <span className="label-meta pt-0.5 flex-shrink-0">{p.year}</span>
              </div>
              <p className="text-white/50 text-sm leading-relaxed mb-4 flex-1">{p.tagline}</p>
              <div className="flex flex-wrap gap-1.5">
                {p.stack.slice(0, 5).map((t) => (
                  <span key={t} className="badge-tech">{t}</span>
                ))}
              </div>
            </div>
          </div>
        </DialogTrigger>
        <ProjectModal project={p} />
      </Dialog>
    </motion.div>
  );
}

/* ── Tier 3: Compact shimmer cards ── */
function CompactCard({ project: p, index }) {
  return (
    <motion.div {...blurReveal(index * 0.05)}>
      <Dialog>
        <DialogTrigger asChild>
          <div
            className="shimmer-card p-5 cursor-pointer group"
            role="button"
            tabIndex={0}
            onKeyDown={(e) => e.key === "Enter" && e.currentTarget.click()}
            onMouseMove={onMouseMove}
            aria-label={`View ${p.title} project details`}
          >
            <div className="relative z-10">
              <div className="flex items-start justify-between gap-2 mb-2">
                <p className="text-white text-sm font-semibold tracking-tight group-hover:text-[#A78BFA] transition-colors">
                  {p.title}
                </p>
                <span className="label-meta flex-shrink-0">{p.year}</span>
              </div>
              <p className="text-white/40 text-xs leading-relaxed mb-3">{p.tagline}</p>
              <div className="flex flex-wrap gap-1">
                {p.stack.slice(0, 3).map((t) => (
                  <span key={t} className="badge-tech">{t}</span>
                ))}
              </div>
            </div>
          </div>
        </DialogTrigger>
        <ProjectModal project={p} />
      </Dialog>
    </motion.div>
  );
}

export default function Projects() {
  const tier1 = projects.filter((p) => p.tier === 1);
  const tier2 = projects.filter((p) => p.tier === 2);
  const tier3 = projects.filter((p) => p.tier === 3);

  return (
    <section id="projects" className="py-24 bg-[#0A0A0A]">
      <div className="section-container">

        <motion.div {...blurReveal(0)} className="mb-16">
          <p className="label-meta mb-4">Projects</p>
          <h2
            className="text-white"
            style={{
              fontSize: "clamp(36px, 5vw, 56px)",
              fontWeight: 700,
              letterSpacing: "-0.03em",
              lineHeight: 1.05,
            }}
          >
            Selected work
          </h2>
        </motion.div>

        {/* Case studies */}
        <div className="flex flex-col mb-10">
          {tier1.map((p, i) => (
            <CaseStudy key={p.id} project={p} index={i} />
          ))}
        </div>

        <div className="divider mb-10" />

        {/* Full project cards */}
        <motion.p
          {...blurReveal(0.05)}
          className="text-white/60 text-sm font-medium uppercase tracking-widest mb-6"
        >
          More projects
        </motion.p>
        <div className="grid sm:grid-cols-2 gap-4 mb-4">
          {tier2.map((p, i) => (
            <ProjectCard key={p.id} project={p} index={i} />
          ))}
        </div>

        {/* Compact grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {tier3.map((p, i) => (
            <CompactCard key={p.id} project={p} index={i} />
          ))}
        </div>

      </div>
    </section>
  );
}
