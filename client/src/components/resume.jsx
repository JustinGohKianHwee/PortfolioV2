import { motion } from "framer-motion";
import { skillGroups } from "@/data/skills";
import { meta } from "@/data/meta";

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-60px" },
  transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1], delay },
});

const stats = [
  { value: "4.81", label: "GPA (NUS)" },
  { value: "3+", label: "Years industry experience" },
  { value: "5", label: "Companies" },
  { value: "2", label: "ML specialisations" },
];

export default function Skills() {
  return (
    <section id="skills" className="py-24">
      <div className="section-container">

        {/* Section header */}
        <motion.div {...fadeUp(0)} className="mb-12">
          <p className="label-mono mb-3">About</p>
          <h2
            className="text-3xl xl:text-4xl text-[#FAFAF9] mb-4"
            style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 700 }}
          >
            ML Engineer. Builder. Researcher.
          </h2>
          <p className="text-[#A1A1A1] max-w-2xl text-base leading-relaxed">
            {meta.bio} Studying {meta.degree} at {meta.university} with a double
            specialisation in {meta.specialisation}, and a Minor in Quantitative Finance.
          </p>
        </motion.div>

        {/* Stats row */}
        <motion.div
          {...fadeUp(0.1)}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-14"
        >
          {stats.map((s) => (
            <div key={s.label} className="card-base p-5">
              <div
                className="text-3xl text-[#E8A04D] mb-1"
                style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 800 }}
              >
                {s.value}
              </div>
              <div className="text-sm text-[#6B6B6B]">{s.label}</div>
            </div>
          ))}
        </motion.div>

        {/* Skill groups */}
        <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
          {skillGroups.map((group, gi) => (
            <motion.div
              key={group.category}
              {...fadeUp(0.05 * gi)}
              className="card-base p-6"
            >
              <h3
                className="text-sm text-[#FAFAF9] mb-4"
                style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 600 }}
              >
                {group.category}
              </h3>
              <div className="flex flex-wrap gap-2">
                {group.skills.map((skill) => (
                  <span key={skill} className="badge-tech">
                    {skill}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
