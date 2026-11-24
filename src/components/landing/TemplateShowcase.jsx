import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, Sparkles } from "lucide-react";

const templates = [
  {
    id: "minimal",
    name: "Minimal",
    desc: "Clean & simple — lets your work speak",
    badge: null,
    preview: {
      bg: "#faf7ff",
      text: "#1a0b2e",
      accent: "#6d28d9",
      style: "light",
    },
  },
  {
    id: "developer",
    name: "Developer",
    desc: "Code-focused dark layout for builders",
    badge: "Popular",
    preview: {
      bg: "#0b0218",
      text: "#faf7ff",
      accent: "#a855f7",
      style: "dark",
    },
  },
  {
    id: "creative",
    name: "Creative",
    desc: "Bold colors & expressive for designers",
    badge: "New",
    preview: {
      bg: "linear-gradient(135deg, #7c3aed, #ec4899)",
      text: "#ffffff",
      accent: "#ffffff",
      style: "gradient",
    },
  },
  {
    id: "professional",
    name: "Professional",
    desc: "Corporate & polished for the workplace",
    badge: null,
    preview: {
      bg: "#f3ecff",
      text: "#1a0b2e",
      accent: "#4f46e5",
      style: "light",
    },
  },
];

/* Mini preview mockup inside browser frame */
function TemplatePreview({ template }) {
  const { preview } = template;
  const isLight = preview.style === "light";

  return (
    <div className="relative w-full h-full overflow-hidden" style={{ background: preview.bg }}>
      {/* Browser chrome (top bar) */}
      <div
        className="flex items-center gap-1.5 px-2.5 py-1.5 border-b"
        style={{
          background: isLight ? "rgba(0,0,0,0.04)" : "rgba(255,255,255,0.06)",
          borderColor: isLight ? "rgba(0,0,0,0.08)" : "rgba(255,255,255,0.1)",
        }}
      >
        <span className="w-1.5 h-1.5 rounded-full bg-red-400" />
        <span className="w-1.5 h-1.5 rounded-full bg-yellow-400" />
        <span className="w-1.5 h-1.5 rounded-full bg-green-400" />
        <div
          className="ml-2 flex-1 h-3 rounded-sm text-[6px] flex items-center px-1.5"
          style={{
            background: isLight ? "rgba(0,0,0,0.06)" : "rgba(255,255,255,0.08)",
            color: preview.text,
            opacity: 0.6,
          }}
        >
          persona.app/you
        </div>
      </div>

      {/* Portfolio content mockup */}
      <div className="p-3 space-y-2.5">
        {/* Avatar + name */}
        <div className="flex items-center gap-2">
          <div
            className="w-5 h-5 rounded-full flex items-center justify-center text-[7px] font-bold"
            style={{ background: preview.accent, color: isLight ? "#fff" : preview.bg }}
          />
          <div className="flex-1 space-y-1">
            <div
              className="h-1.5 rounded-sm w-3/4"
              style={{ background: preview.text, opacity: 0.85 }}
            />
            <div
              className="h-1 rounded-sm w-1/2"
              style={{ background: preview.text, opacity: 0.4 }}
            />
          </div>
        </div>

        {/* Bio lines */}
        <div className="space-y-1 pt-1">
          <div className="h-1 rounded-sm w-full" style={{ background: preview.text, opacity: 0.25 }} />
          <div className="h-1 rounded-sm w-5/6" style={{ background: preview.text, opacity: 0.25 }} />
        </div>

        {/* Skills chips */}
        <div className="flex gap-1 pt-1">
          {[0, 1, 2, 3].map((i) => (
            <div
              key={i}
              className="h-2.5 rounded-full flex-1"
              style={{
                background: preview.accent,
                opacity: 0.3 + i * 0.15,
              }}
            />
          ))}
        </div>

        {/* Project cards */}
        <div className="grid grid-cols-2 gap-1.5 pt-1">
          {[0, 1].map((i) => (
            <div
              key={i}
              className="rounded-md p-1.5 space-y-1"
              style={{
                background: isLight ? "rgba(0,0,0,0.05)" : "rgba(255,255,255,0.06)",
                border: `1px solid ${isLight ? "rgba(0,0,0,0.08)" : "rgba(255,255,255,0.1)"}`,
              }}
            >
              <div
                className="w-full h-4 rounded-sm"
                style={{ background: preview.accent, opacity: 0.35 }}
              />
              <div
                className="h-1 rounded-sm w-3/4"
                style={{ background: preview.text, opacity: 0.6 }}
              />
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div
          className="h-1 rounded-sm w-1/3 mx-auto mt-1"
          style={{ background: preview.accent, opacity: 0.6 }}
        />
      </div>
    </div>
  );
}

export default function TemplateShowcase() {
  return (
    <section id="templates" className="relative py-24 md:py-32 overflow-hidden">
      {/* Background */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 dot-pattern opacity-[0.05]" />
        <div className="absolute top-1/3 -left-40 w-[30rem] h-[30rem] rounded-full bg-[var(--primary)]/15 blur-[140px]" />
        <div className="absolute bottom-0 -right-40 w-[30rem] h-[30rem] rounded-full bg-[var(--neon)]/10 blur-[140px]" />
      </div>

      <div className="relative max-w-7xl mx-auto px-6">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span
            className="inline-flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded-full border border-[var(--border)] mb-4"
            style={{ color: "var(--text-sec)" }}
          >
            <Sparkles className="w-3 h-3" /> 4 Curated Designs
          </span>
          <h2 className="text-3xl md:text-5xl font-display font-extrabold leading-tight mb-4">
            Pick Your{" "}
            <span className="bg-gradient-to-r from-[var(--neon)] via-[var(--lavender)] to-[var(--soft-lav)] bg-clip-text text-transparent">
              Template
            </span>
          </h2>
          <p className="max-w-xl mx-auto text-[var(--text-sec)]">
            Switch anytime — your data stays intact. Each template highlights
            your work in a unique way.
          </p>
        </motion.div>

        {/* Templates grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {templates.map((t, i) => (
            <motion.div
              key={t.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              whileHover={{ y: -8 }}
              className="group relative"
            >
              {/* Neon glow on hover */}
              <div
                className="absolute -inset-0.5 rounded-2xl opacity-0 group-hover:opacity-100 blur-lg transition duration-300 pointer-events-none"
                style={{
                  background: "linear-gradient(135deg, var(--primary), var(--neon))",
                }}
              />

              <div
                className="relative rounded-2xl overflow-hidden border transition-colors duration-300 flex flex-col"
                style={{
                  background: "var(--bg-sec)",
                  borderColor: "var(--border)",
                }}
              >
                {/* Badge */}
                {t.badge && (
                  <span
                    className="absolute top-3 right-3 z-20 text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded-full"
                    style={{
                      background: t.badge === "Popular"
                        ? "linear-gradient(90deg, #a855f7, #c084fc)"
                        : "linear-gradient(90deg, #ec4899, #f43f5e)",
                      color: "#fff",
                      boxShadow: "0 0 15px rgba(168,85,247,0.5)",
                    }}
                  >
                    {t.badge}
                  </span>
                )}

                {/* Preview area */}
                <div className="relative aspect-[4/5] overflow-hidden">
                  <TemplatePreview template={t} />

                  {/* Hover overlay + button */}
                  <div className="absolute inset-0 flex items-end justify-center p-4 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <Link
                      to="/register"
                      className="w-full text-center py-2.5 rounded-lg bg-white text-slate-900 font-semibold text-sm flex items-center justify-center gap-1.5 hover:bg-[var(--soft-lav)] transition"
                    >
                      Use this template
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>

                {/* Info */}
                <div className="p-4">
                  <div className="flex items-center justify-between mb-1">
                    <h3 className="font-display font-bold text-base">{t.name}</h3>
                    <span className="text-[10px] uppercase tracking-wider" style={{ color: "var(--text-sec)" }}>
                      Free
                    </span>
                  </div>
                  <p className="text-xs leading-relaxed" style={{ color: "var(--text-sec)" }}>
                    {t.desc}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="text-center mt-14"
        >
          <p className="text-sm mb-3" style={{ color: "var(--text-sec)" }}>
            Want more layouts? More templates coming soon.
          </p>
          <Link
            to="/register"
            className="inline-flex items-center gap-2 text-sm font-medium text-[var(--neon)] hover:underline"
          >
            Start with any template
            <ArrowRight className="w-4 h-4" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}