import { motion } from "framer-motion";
import { skillGroups } from "@/data/skills";

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

export default function Skills() {
  const [featured, ...rest] = skillGroups;

  return (
    <section id="skills" className="py-24 bg-black">
      <div className="section-container">

        <motion.div {...blurReveal(0)} className="mb-14">
          <p className="label-meta mb-4">Skills</p>
          <h2
            className="text-white"
            style={{
              fontSize: "clamp(36px, 5vw, 56px)",
              fontWeight: 700,
              letterSpacing: "-0.03em",
              lineHeight: 1.05,
            }}
          >
            Technical stack<span className="gradient-text">.</span>
          </h2>
        </motion.div>

        {/* Featured: ML & Research — full width */}
        <motion.div {...blurReveal(0.08)} className="mb-4">
          <div
            className="shimmer-card p-6 lg:p-8 cursor-default"
            onMouseMove={onMouseMove}
          >
            <div className="relative z-10">
              <p className="label-meta gradient-text mb-3">{featured.category}</p>
              <div className="divider mb-5" />
              <div className="flex flex-wrap gap-2">
                {featured.skills.map((s) => (
                  <span key={s} className="badge-tech">{s}</span>
                ))}
              </div>
            </div>
          </div>
        </motion.div>

        {/* Remaining 4 groups — responsive grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {rest.map((group, i) => (
            <motion.div
              key={group.category}
              {...blurReveal(0.1 + i * 0.07)}
              className="h-full"
            >
              <div
                className="shimmer-card p-6 cursor-default h-full"
                onMouseMove={onMouseMove}
              >
                <div className="relative z-10 h-full flex flex-col">
                  <p className="label-meta gradient-text mb-3">{group.category}</p>
                  <div className="divider mb-4" />
                  <div className="flex flex-wrap gap-2 flex-1 content-start">
                    {group.skills.map((s) => (
                      <span key={s} className="badge-tech">{s}</span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
