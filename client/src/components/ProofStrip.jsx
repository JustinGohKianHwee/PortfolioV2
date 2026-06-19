import { motion } from "framer-motion";
import { meta } from "@/data/meta";

const SPRING = [0.22, 1, 0.36, 1];

const credentials = [
  { label: "Current Role",         value: "ML Engineer · TikTok" },
  { label: "GPA",                  value: meta.gpa               },
  { label: "Industry Experience",  value: "3+ Years"             },
  { label: "Companies",            value: "5 Organisations"      },
];

export default function ProofStrip() {
  return (
    <section className="border-y border-[#111110]/[0.08] bg-[#F1EFE9] py-6">
      <div className="section-container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6, ease: SPRING }}
          className="flex flex-wrap justify-between items-center gap-y-5 gap-x-6"
        >
          {credentials.map((c, i) => (
            <div key={i} className="flex items-baseline gap-2.5">
              <span className="label-meta">{c.label}</span>
              <span
                className="text-[#111110]"
                style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: "1rem" }}
              >
                {c.value}
              </span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
