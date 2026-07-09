import { motion } from "framer-motion";
import { experiences } from "@/data/experiences";

const EASE = [0.32, 0.72, 0, 1];

const blurReveal = (delay = 0) => ({
  initial: { opacity: 0, filter: "blur(12px)" },
  whileInView: { opacity: 1, filter: "blur(0px)" },
  viewport: { once: true, margin: "-60px" },
  transition: { duration: 0.7, ease: EASE, delay },
});

const tiktok      = experiences.find((e) => e.id === "tiktok");
const tiktokIntern = experiences.find((e) => e.id === "tiktok-intern");
const visenze     = experiences.find((e) => e.id === "visenze");
const compact     = experiences.filter(
  (e) => e.id !== "tiktok" && e.id !== "tiktok-intern" && e.id !== "visenze"
);

export default function Work() {
  return (
    <section id="work" className="py-24 bg-black">
      <div className="section-container">

        {/* Header */}
        <motion.div {...blurReveal(0)} className="mb-16">
          <p className="label-meta mb-4">Experience</p>
          <h2
            className="text-white"
            style={{
              fontSize: "clamp(36px, 5vw, 56px)",
              fontWeight: 700,
              letterSpacing: "-0.03em",
              lineHeight: 1.05,
            }}
          >
            Where I've worked
          </h2>
        </motion.div>

        {/* TikTok FT — rotating glow border */}
        {tiktok && (
          <motion.div {...blurReveal(0.08)} className="mb-5">
            <div className="glow-card p-8 lg:p-10">
              <FeaturedEntry exp={tiktok} featured />
            </div>
          </motion.div>
        )}

        {/* TikTok Intern — plain dark card */}
        {tiktokIntern && (
          <motion.div {...blurReveal(0.14)} className="mb-5">
            <div className="card-base p-8 lg:p-10">
              <FeaturedEntry exp={tiktokIntern} />
            </div>
          </motion.div>
        )}

        {/* ViSenze — plain dark card */}
        {visenze && (
          <motion.div {...blurReveal(0.20)} className="mb-10">
            <div className="card-base p-8 lg:p-10">
              <FeaturedEntry exp={visenze} />
            </div>
          </motion.div>
        )}

        <div className="divider mb-10" />

        {/* Compact grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {compact.map((exp, i) => (
            <motion.div key={exp.id} {...blurReveal(0.06 + i * 0.05)}>
              <CompactEntry exp={exp} />
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}

function FeaturedEntry({ exp, featured = false }) {
  return (
    <div className="flex flex-col lg:flex-row lg:items-start gap-8">

      {/* Left: company meta */}
      <div className="flex-shrink-0 lg:w-56">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-lg overflow-hidden bg-white/[0.06] border border-white/[0.08] flex items-center justify-center flex-shrink-0">
            <img
              src={exp.logo}
              alt={exp.company}
              className="w-full h-full object-contain p-1.5"
              onError={(e) => { e.target.style.display = "none"; }}
            />
          </div>
          <div>
            <p className="text-white font-semibold text-base leading-tight">{exp.company}</p>
            {exp.current && (
              <span
                className="inline-flex items-center gap-1.5 text-xs font-medium mt-0.5"
                style={{ color: "#818CF8" }}
              >
                <span className="w-1.5 h-1.5 rounded-full bg-[#818CF8] animate-pulse inline-block" />
                Current
              </span>
            )}
          </div>
        </div>
        <p className="text-white/80 text-sm font-medium mb-1">{exp.role}</p>
        <p className="label-meta mb-0.5">{exp.period}</p>
        <p className="label-meta">{exp.location}</p>
      </div>

      {/* Right: content */}
      <div className="flex-1 min-w-0">
        <p className="text-white/55 text-base leading-relaxed mb-5">{exp.summary}</p>

        <ul className="flex flex-col gap-2.5 mb-6">
          {exp.bullets.map((b, i) => (
            <li key={i} className={`${i >= 2 ? "hidden sm:flex" : "flex"} gap-3 text-sm text-white/45 leading-relaxed`}>
              <span
                className="flex-shrink-0 w-1 h-1 rounded-full mt-[0.55em]"
                style={{ background: featured ? "#6366F1" : "rgba(255,255,255,0.22)" }}
              />
              {b}
            </li>
          ))}
        </ul>

        <div className="flex flex-wrap gap-2">
          {exp.stack.map((s) => (
            <span key={s} className="badge-tech">{s}</span>
          ))}
        </div>
      </div>
    </div>
  );
}

function CompactEntry({ exp }) {
  return (
    <div className="card-base p-6 h-full flex flex-col">
      <div className="flex items-center gap-3 mb-4">
        <div className="w-8 h-8 rounded-md overflow-hidden bg-white/[0.06] border border-white/[0.08] flex items-center justify-center flex-shrink-0">
          <img
            src={exp.logo}
            alt={exp.company}
            className="w-full h-full object-contain p-0.5"
            onError={(e) => { e.target.style.display = "none"; }}
          />
        </div>
        <div>
          <p className="text-white text-sm font-semibold leading-tight">{exp.company}</p>
          <p className="label-meta mt-0.5">{exp.period}</p>
        </div>
      </div>

      <p className="text-white/70 text-sm font-medium mb-2">{exp.role}</p>
      <p className="text-white/45 text-sm leading-relaxed mb-4 flex-1">{exp.summary}</p>

      <div className="flex flex-wrap gap-1.5">
        {exp.stack.slice(0, 4).map((s) => (
          <span key={s} className="badge-tech">{s}</span>
        ))}
      </div>
    </div>
  );
}
