import { useEffect, useState, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useTheme } from "../../context/ThemeContext";

const SLIDES = [
  {
    id: 1,
    image: "https://images.unsplash.com/photo-1504812445817-cb3d4f235a14?w=1200&auto=format&fit=crop&q=80",
    label: "Developer Template",
    color: "#a855f7",
    slug: "bristy",
  },
  {
    id: 2,
    image: "https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?w=1200&auto=format&fit=crop&q=80",
    label: "Minimal Template",
    color: "#8b5cf6",
    slug: "rahul",
  },
  {
    id: 3,
    image: "https://images.unsplash.com/photo-1675317120753-ce28b951e9e8?w=1200&auto=format&fit=crop&q=80",
    label: "Creative Template",
    color: "#c084fc",
    slug: "nadia",
  },
  {
    id: 4,
    image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=1200&auto=format&fit=crop&q=80",
    label: "Professional Template",
    color: "#6d28d9",
    slug: "arif",
  },
];

const AUTOPLAY_MS = 4000;

function Particles() {
  const dots = Array.from({ length: 22 });
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {dots.map((_, i) => {
        const size = Math.random() * 3 + 1;
        const left = Math.random() * 100;
        const top = Math.random() * 100;
        const delay = Math.random() * 5;
        const duration = 6 + Math.random() * 6;
        return (
          <motion.span
            key={i}
            className="absolute rounded-full"
            style={{
              width: size,
              height: size,
              left: `${left}%`,
              top: `${top}%`,
              background: "var(--lavender)",
              opacity: 0.35,
            }}
            animate={{ y: [0, -25, 0], opacity: [0.15, 0.45, 0.15] }}
            transition={{ duration, repeat: Infinity, delay, ease: "easeInOut" }}
          />
        );
      })}
    </div>
  );
}

export default function Hero() {
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const [progress, setProgress] = useState(0);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const frameRef = useRef(null);

  useEffect(() => {
    if (paused) return;
    setProgress(0);
    const start = Date.now();
    const tick = setInterval(() => {
      const elapsed = Date.now() - start;
      setProgress(Math.min((elapsed / AUTOPLAY_MS) * 100, 100));
    }, 30);
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % SLIDES.length);
      setProgress(0);
    }, AUTOPLAY_MS);
    return () => {
      clearInterval(timer);
      clearInterval(tick);
    };
  }, [paused, index]);

  const goTo = (i) => { setIndex(i); setProgress(0); };
  const prev = () => goTo((index - 1 + SLIDES.length) % SLIDES.length);
  const next = () => goTo((index + 1) % SLIDES.length);

  const handleMouseMove = (e) => {
    if (!frameRef.current) return;
    const rect = frameRef.current.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const dx = (e.clientX - cx) / rect.width;
    const dy = (e.clientY - cy) / rect.height;
    setTilt({ x: dy * -7, y: dx * 7 });
  };
  const handleMouseLeave = () => { setTilt({ x: 0, y: 0 }); setPaused(false); };

  return (
    <section className="relative min-h-[calc(100vh-4rem)] flex items-center overflow-hidden px-6 py-14 md:py-16">
      {/* ── Background ── */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 dot-pattern opacity-[0.08]" />
        <div className="absolute -top-40 -left-40 h-[34rem] w-[34rem] rounded-full bg-[var(--neon)]/25 blur-[140px]" />
        <div className="absolute top-20 -right-40 h-[34rem] w-[34rem] rounded-full bg-[var(--primary)]/35 blur-[140px]" />
        <div className="absolute bottom-0 left-1/3 h-[24rem] w-[24rem] rounded-full bg-[var(--violet)]/15 blur-[120px]" />
      </div>
      <Particles />

      <div className="relative mx-auto grid max-w-7xl items-center gap-14 md:grid-cols-2 w-full">
        {/* ══ LEFT ══ */}
        <div>
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 mb-6 text-sm font-medium px-4 py-2 rounded-full border border-[var(--border)] bg-[var(--bg-sec)]/60 backdrop-blur"
          >
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full rounded-full bg-[var(--neon)] opacity-75 animate-ping" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[var(--neon)]" />
            </span>
            <span className="text-[var(--text-sec)]">AI-Style Portfolio Builder</span>
          </motion.div>

          {/* Headline — balanced size */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl md:text-6xl font-display font-extrabold leading-[1.1] tracking-tight"
          >
            Build Your{" "}
            <span className="relative inline-block">
              <span className="bg-gradient-to-r from-[var(--neon)] via-[var(--lavender)] to-[var(--soft-lav)] bg-clip-text text-transparent">
                Portfolio
              </span>
              <span className="absolute -bottom-1 left-0 right-0 h-0.5 bg-gradient-to-r from-[var(--neon)] to-transparent rounded-full blur-[2px] opacity-70" />
            </span>
            <br />
            Without{" "}
            <span className="bg-gradient-to-r from-[var(--lavender)] to-[var(--neon)] bg-clip-text text-transparent">
              Coding
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="mt-5 max-w-md text-[var(--text-sec)] text-base md:text-lg leading-relaxed"
          >
            Fill in your info, pick a template, and get a live portfolio in
            minutes — <span className="text-[var(--soft-lav)] font-medium">no code needed.</span>
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-8 flex flex-wrap gap-3"
          >
            <Link
              to="/register"
              className="group relative inline-flex items-center gap-2 px-7 py-3.5 rounded-xl bg-gradient-to-r from-[var(--primary)] to-[var(--neon)] text-white font-semibold overflow-hidden transition shadow-[0_0_30px_var(--glow)]"
            >
              <span className="absolute inset-0 bg-gradient-to-r from-[var(--neon)] to-[var(--lavender)] opacity-0 group-hover:opacity-100 transition duration-500" />
              <span className="relative z-10">Create Portfolio</span>
              <span className="relative z-10 group-hover:translate-x-1 transition">→</span>
            </Link>
            <a
              href="#templates"
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl border border-[var(--border)] hover:bg-[var(--bg-sec)] hover:border-[var(--neon)]/40 transition"
            >
              Templates
            </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="mt-8 flex items-center gap-3"
          >
            <div className="flex -space-x-2">
              {["#a855f7", "#8b5cf6", "#c084fc", "#6d28d9"].map((c, i) => (
                <div
                  key={i}
                  className="w-8 h-8 rounded-full border-2"
                  style={{
                    background: `linear-gradient(135deg, ${c}, ${c}88)`,
                    borderColor: "var(--bg)",
                  }}
                />
              ))}
            </div>
            <p className="text-sm text-[var(--text-sec)]">
              <span className="text-[var(--soft-lav)] font-semibold">1,000+</span> portfolios created
            </p>
          </motion.div>
        </div>

        {/* ══ RIGHT ══ */}
        <motion.div
          ref={frameRef}
          initial={{ opacity: 0, rotateY: -12, scale: 0.9 }}
          animate={{ opacity: 1, rotateY: 0, scale: 1 }}
          transition={{ duration: 0.9, delay: 0.2 }}
          className="relative"
          onMouseEnter={() => setPaused(true)}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          style={{ perspective: 1200 }}
        >
          <div
            className="absolute -inset-8 rounded-[2.5rem] blur-3xl opacity-50 transition-colors duration-700"
            style={{ background: `radial-gradient(circle, ${SLIDES[index].color}66, transparent 70%)` }}
          />

          <motion.div
            animate={{ rotateX: tilt.x, rotateY: tilt.y }}
            transition={{ type: "spring", stiffness: 150, damping: 20 }}
            style={{ transformStyle: "preserve-3d" }}
          >
            <div
              className="relative rounded-2xl p-[1.5px] transition-colors duration-700"
              style={{
                background: `linear-gradient(135deg, ${SLIDES[index].color}88, transparent, ${SLIDES[index].color}44)`,
              }}
            >
              <div className="rounded-2xl overflow-hidden" style={{ background: "var(--bg-sec)" }}>
                {/* Browser chrome */}
                <div
                  className="flex items-center gap-2 px-4 py-3 border-b"
                  style={{ background: "var(--bg-deep)", borderColor: "var(--border)" }}
                >
                  <span className="w-3 h-3 rounded-full bg-[#ef4444]" />
                  <span className="w-3 h-3 rounded-full bg-[#eab308]" />
                  <span className="w-3 h-3 rounded-full bg-[#22c55e]" />
                  <div
                    className="ml-4 flex-1 text-xs px-3 py-1.5 rounded-md text-center font-mono"
                    style={{ background: isDark ? "rgba(11,2,24,0.7)" : "rgba(255,255,255,0.6)", color: "var(--text-sec)" }}
                  >
                    <span style={{ color: "var(--neon)" }}>persona.app</span>/
                    <span style={{ color: "var(--soft-lav)" }}>{SLIDES[index].slug}</span>
                  </div>
                  <span className="text-xs" style={{ color: "var(--text-sec)" }}>⋯</span>
                </div>

                {/* Image */}
                <div className="relative aspect-[16/11] overflow-hidden" style={{ background: "var(--bg-deep)" }}>
                  <AnimatePresence mode="wait">
                    <motion.img
                      key={SLIDES[index].id}
                      src={SLIDES[index].image}
                      alt={SLIDES[index].label}
                      initial={{ opacity: 0, scale: 1.06 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 1.02 }}
                      transition={{ duration: 0.7, ease: "easeInOut" }}
                      className="absolute inset-0 h-full w-full object-cover"
                    />
                  </AnimatePresence>
                  <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black/70 to-transparent" />
                  <div className="absolute bottom-3 left-3 text-xs px-3 py-1.5 rounded-full bg-black/60 backdrop-blur text-white border border-white/10">
                    ✨ {SLIDES[index].label}
                  </div>
                  <div className="absolute top-3 right-3 flex items-center gap-1.5 text-xs px-2.5 py-1 rounded-full bg-black/60 backdrop-blur text-white">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#22c55e] animate-pulse" />
                    live
                  </div>
                </div>

                {/* Progress bar */}
                <div className="h-0.5 relative overflow-hidden" style={{ background: "var(--bg-deep)" }}>
                  <motion.div
                    className="h-full bg-gradient-to-r from-[var(--primary)] to-[var(--neon)]"
                    animate={{ width: `${progress}%` }}
                    transition={{ ease: "linear", duration: 0.05 }}
                  />
                </div>
              </div>
            </div>
          </motion.div>

          {/* Arrows */}
          <button
            onClick={prev}
            aria-label="Previous slide"
            className="absolute top-1/2 -left-5 -translate-y-1/2 z-10 w-11 h-11 rounded-full border backdrop-blur hover:scale-110 transition-all flex items-center justify-center text-xl"
            style={{
              background: "var(--bg-sec)",
              borderColor: "var(--border)",
              color: "var(--text)",
              boxShadow: "0 0 25px var(--glow)",
            }}
          >
            ‹
          </button>
          <button
            onClick={next}
            aria-label="Next slide"
            className="absolute top-1/2 -right-5 -translate-y-1/2 z-10 w-11 h-11 rounded-full border backdrop-blur hover:scale-110 transition-all flex items-center justify-center text-xl"
            style={{
              background: "var(--bg-sec)",
              borderColor: "var(--border)",
              color: "var(--text)",
              boxShadow: "0 0 25px var(--glow)",
            }}
          >
            ›
          </button>

          {/* Dots */}
          <div className="mt-5 flex justify-center items-center gap-2">
            {SLIDES.map((slide, i) => (
              <button
                key={slide.id}
                onClick={() => goTo(i)}
                aria-label={`Go to slide ${i + 1}`}
                className="rounded-full transition-all duration-300"
                style={{
                  width: i === index ? "2.25rem" : "0.55rem",
                  height: "0.55rem",
                  background: i === index
                    ? "linear-gradient(90deg, var(--primary), var(--neon))"
                    : "var(--border)",
                  boxShadow: i === index ? "0 0 15px var(--glow)" : "none",
                }}
              />
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}