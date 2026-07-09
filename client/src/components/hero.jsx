import { useRef, useState, useEffect } from "react";
import { motion } from "framer-motion";
import Typewriter from "typewriter-effect";
import { meta } from "@/data/meta";

const EASE = [0.32, 0.72, 0, 1];

const blur = (delay = 0) => ({
  initial: { opacity: 0, filter: "blur(12px)" },
  animate: { opacity: 1, filter: "blur(0px)" },
  transition: { duration: 0.75, ease: EASE, delay },
});

/* ── Interactive particle canvas ── */
function ParticleCanvas() {
  const canvasRef = useRef(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let particles = [];
    let animId;
    const mouse = { x: null, y: null, radius: 160 };

    class Particle {
      constructor(x, y, dx, dy, size) {
        this.x = x;
        this.y = y;
        this.dx = dx;
        this.dy = dy;
        this.size = size;
      }
      draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(99,102,241,0.55)";
        ctx.fill();
      }
      update() {
        if (this.x > canvas.width || this.x < 0) this.dx = -this.dx;
        if (this.y > canvas.height || this.y < 0) this.dy = -this.dy;
        if (mouse.x !== null) {
          const dx = mouse.x - this.x;
          const dy = mouse.y - this.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < mouse.radius && dist > 0) {
            const force = (mouse.radius - dist) / mouse.radius;
            this.x -= (dx / dist) * force * 4;
            this.y -= (dy / dist) * force * 4;
          }
        }
        this.x += this.dx;
        this.y += this.dy;
        this.draw();
      }
    }

    function init() {
      particles = [];
      const n = Math.floor((canvas.width * canvas.height) / 10000);
      for (let i = 0; i < n; i++) {
        particles.push(
          new Particle(
            Math.random() * canvas.width,
            Math.random() * canvas.height,
            (Math.random() - 0.5) * 0.45,
            (Math.random() - 0.5) * 0.45,
            Math.random() * 1.5 + 0.4
          )
        );
      }
    }

    function connect() {
      const threshold = (canvas.width / 6) * (canvas.height / 6);
      for (let a = 0; a < particles.length; a++) {
        for (let b = a + 1; b < particles.length; b++) {
          const dx = particles[a].x - particles[b].x;
          const dy = particles[a].y - particles[b].y;
          const dist2 = dx * dx + dy * dy;
          if (dist2 < threshold) {
            const opacity = (1 - dist2 / threshold) * 0.35;
            ctx.strokeStyle = `rgba(139,92,246,${opacity})`;
            ctx.lineWidth = 0.7;
            ctx.beginPath();
            ctx.moveTo(particles[a].x, particles[a].y);
            ctx.lineTo(particles[b].x, particles[b].y);
            ctx.stroke();
          }
        }
      }
    }

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
      init();
    };

    const onMouseMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
    };
    const onMouseOut = () => {
      mouse.x = null;
      mouse.y = null;
    };

    const animate = () => {
      animId = requestAnimationFrame(animate);
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach((p) => p.update());
      connect();
    };

    window.addEventListener("resize", resize);
    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseout", onMouseOut);
    resize();
    animate();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseout", onMouseOut);
    };
  }, []);

  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />;
}

/* ── Cycling role typewriter ── */
function RoleTypewriter() {
  return (
    <motion.div
      {...blur(0.32)}
      className="mb-8 role-typewriter"
      style={{ minHeight: "calc(clamp(22px, 3.2vw, 42px) * 1.1)" }}
    >
      <span
        style={{
          fontSize: "clamp(22px, 3.2vw, 42px)",
          fontWeight: 700,
          letterSpacing: "-0.03em",
          lineHeight: 1.1,
          whiteSpace: "nowrap",
        }}
      >
        <Typewriter
          onInit={(tw) => {
            tw
              .typeString("Machine Learning Engineer.")
              .pauseFor(1400)
              .deleteAll()
              .typeString("Research Engineer.")
              .pauseFor(1400)
              .deleteAll()
              .typeString("AI Systems Builder.")
              .pauseFor(1400)
              .deleteAll()
              .typeString("Foundation Model Developer.")
              .pauseFor(1400)
              .deleteAll()
              .start();
          }}
          options={{ loop: true, delay: 55, deleteSpeed: 22, cursor: "|" }}
        />
      </span>
    </motion.div>
  );
}

/* ── Animated count-up stat ── */
function StatCounter({ end, decimals = 0, label, suffix = "" }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const startedRef = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !startedRef.current) {
          startedRef.current = true;
          const start = performance.now();
          const dur = 1400;
          const step = (now) => {
            const t = Math.min((now - start) / dur, 1);
            const eased = 1 - Math.pow(1 - t, 3);
            setCount(+(end * eased).toFixed(decimals));
            if (t < 1) requestAnimationFrame(step);
            else setCount(end);
          };
          requestAnimationFrame(step);
        }
      },
      { threshold: 0.5 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [end, decimals]);

  return (
    <div ref={ref} className="flex flex-col gap-1.5">
      <span className="text-white text-2xl font-semibold tabular-nums tracking-tight">
        {count.toFixed(decimals)}{suffix}
      </span>
      <span className="label-meta">{label}</span>
    </div>
  );
}

export default function Hero() {
  return (
    <section
      id="hero"
      className="relative min-h-dvh flex items-center overflow-hidden bg-black"
    >
      {/* Interactive particle canvas */}
      <ParticleCanvas />

      {/* Bottom gradient fade — canvas dissolves into page */}
      <div
        className="absolute inset-x-0 bottom-0 h-56 pointer-events-none"
        style={{ background: "linear-gradient(to bottom, transparent, #000)", zIndex: 1 }}
      />

      <div className="section-container relative w-full py-28 md:py-36" style={{ zIndex: 2 }}>
        <div className="flex flex-col lg:flex-row lg:items-center gap-14 lg:gap-0">

          {/* ── Left column: text ── */}
          <div className="flex-1 lg:w-[55%] lg:pr-16">

            <motion.p {...blur(0.1)} className="label-meta mb-6 tracking-widest">
              {meta.company}
            </motion.p>

            {/* Name — primary identity */}
            <motion.h1
              initial={{ opacity: 0, filter: "blur(16px)" }}
              animate={{ opacity: 1, filter: "blur(0px)" }}
              transition={{ duration: 0.85, ease: EASE, delay: 0.18 }}
              className="text-white leading-none mb-5"
              style={{
                fontSize: "clamp(52px, 7.5vw, 96px)",
                fontWeight: 800,
                letterSpacing: "-0.04em",
              }}
            >
              Justin Goh
            </motion.h1>

            {/* Cycling role typewriter */}
            <RoleTypewriter />

            <motion.p
              {...blur(0.50)}
              className="text-white/55 text-lg leading-relaxed max-w-[440px] mb-10 line-clamp-3 sm:line-clamp-none"
            >
              {meta.bio}
            </motion.p>

            <motion.div {...blur(0.64)} className="flex flex-wrap gap-4">
              <a href="#work" className="btn-primary">View Work</a>
              <a href={meta.resumeFile} download className="btn-secondary">
                Get Resume
              </a>
            </motion.div>
          </div>

          {/* ── Right column: photo ── */}
          <motion.div
            initial={{ opacity: 0, filter: "blur(12px)", x: 24 }}
            animate={{ opacity: 1, filter: "blur(0px)", x: 0 }}
            transition={{ duration: 0.9, ease: EASE, delay: 0.32 }}
            className="lg:w-[45%] flex justify-center lg:justify-end"
          >
            <div
              className="relative w-full max-w-[340px] lg:max-w-[390px] overflow-hidden rounded-2xl bg-transparent"
              style={{ aspectRatio: "3/4" }}
            >
              <img
                src="/assets/montreal_final.png"
                alt="Justin Goh"
                width={390}
                height={520}
                className="w-full h-full object-cover object-top"
                style={{
                  filter: "contrast(1.05) brightness(0.85) saturate(0.75)",
                }}
              />
              {/* Bottom fade to black */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/10 to-transparent" />
              {/* Subtle indigo colour grade */}
              <div
                className="absolute inset-0"
                style={{
                  background: "linear-gradient(135deg, rgba(99,102,241,0.07), transparent 60%)",
                  mixBlendMode: "overlay",
                }}
              />
            </div>
          </motion.div>
        </div>

        {/* ── Stats bar ── */}
        <motion.div
          initial={{ opacity: 0, filter: "blur(8px)" }}
          animate={{ opacity: 1, filter: "blur(0px)" }}
          transition={{ duration: 0.7, ease: EASE, delay: 0.92 }}
          className="mt-16 pt-8 border-t border-white/[0.06]"
        >
          <div className="grid grid-cols-2 sm:flex sm:flex-wrap gap-8 sm:gap-10 lg:gap-16">
            <StatCounter end={4.79} decimals={2} label="GPA / 5.0" />
            <StatCounter end={5}    decimals={0}  label="Companies" />
            <div className="flex flex-col gap-1.5">
              <span className="text-white text-2xl font-semibold tracking-tight">
                Jul 2026
              </span>
              <span className="label-meta">Full-Time Start</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
