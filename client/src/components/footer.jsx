import { meta } from "@/data/meta";

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="border-t border-white/[0.06] py-8">
      <div className="section-container flex flex-col sm:flex-row items-center justify-between gap-4">
        <span
          className="text-lg text-[#FAFAF9]"
          style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 800 }}
        >
          Justin<span className="text-[#E8A04D]">.</span>
        </span>
        <p className="text-sm text-[#6B6B6B]">
          © {year} Justin Goh. All rights reserved.
        </p>
        <div className="flex gap-4">
          <a
            href={meta.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs text-[#6B6B6B] hover:text-[#FAFAF9] transition-colors"
            style={{ fontFamily: "'DM Mono', monospace" }}
          >
            LinkedIn
          </a>
          <a
            href={meta.github}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs text-[#6B6B6B] hover:text-[#FAFAF9] transition-colors"
            style={{ fontFamily: "'DM Mono', monospace" }}
          >
            GitHub
          </a>
        </div>
      </div>
    </footer>
  );
}
