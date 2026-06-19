import { motion } from "framer-motion";

const companies = [
  { name: "TikTok · ByteDance", role: "ML Engineer", logo: "/assets/tiktok.svg", current: true },
  { name: "ViSenze",            role: "ML Research Engineer", logo: "/assets/visenze.png" },
  { name: "Deloitte",           role: "Data Analyst", logo: "/assets/deloitte.jpg" },
  { name: "LTA",                role: "Software Engineer", logo: "/assets/lta.jpeg" },
  { name: "NUS",                role: "B.Sc. Business Analytics", logo: null },
];

export default function CredibilityBar() {
  return (
    <section className="py-8 border-y border-white/[0.06]">
      <div className="section-container">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="flex flex-col items-center gap-5"
        >
          <p
            className="label-mono text-center"
            style={{ color: "#6B6B6B" }}
          >
            Experience at
          </p>

          <div className="flex flex-wrap items-center justify-center gap-x-10 gap-y-4">
            {companies.map((c, i) => (
              <motion.div
                key={c.name}
                initial={{ opacity: 0, y: 8 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.07, duration: 0.4 }}
                className="flex items-center gap-2"
              >
                {c.logo ? (
                  <img
                    src={c.logo}
                    alt={c.name}
                    className="h-5 w-auto object-contain"
                    style={{
                      filter: "grayscale(1) brightness(0.7)",
                      maxWidth: "80px",
                    }}
                    onError={(e) => { e.target.style.display = "none"; }}
                  />
                ) : null}
                <span
                  className="text-sm"
                  style={{
                    fontFamily: "'Plus Jakarta Sans', sans-serif",
                    fontWeight: c.current ? 600 : 500,
                    color: c.current ? "#FAFAF9" : "#6B6B6B",
                  }}
                >
                  {c.name}
                </span>
                {c.current && (
                  <span className="badge-accent text-[10px] px-1.5 py-0.5">Current</span>
                )}
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
