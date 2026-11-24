import { motion } from "framer-motion";
import { UserPlus, LayoutTemplate, Rocket, ArrowRight } from "lucide-react";

const steps = [
  {
    num: "01",
    icon: UserPlus,
    title: "Fill In Your Info",
    desc: "Add your personal details, skills, projects, and experience through simple, guided forms.",
    gradient: "from-[#6d28d9] to-[#8b5cf6]",
    glow: "rgba(109, 40, 217, 0.4)",
  },
  {
    num: "02",
    icon: LayoutTemplate,
    title: "Pick a Template",
    desc: "Choose from Minimal, Developer, Creative, or Professional. Preview live as you customize.",
    gradient: "from-[#8b5cf6] to-[#a855f7]",
    glow: "rgba(139, 92, 246, 0.4)",
  },
  {
    num: "03",
    icon: Rocket,
    title: "Publish & Share",
    desc: "Get your unique link instantly. Share it anywhere — no coding, no hosting setup.",
    gradient: "from-[#a855f7] to-[#c084fc]",
    glow: "rgba(168, 85, 247, 0.4)",
  },
];

export default function HowItWorks() {
  return (
    <section className="relative py-24 md:py-32 overflow-hidden">
      {/* Background */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 dot-pattern opacity-[0.05]" />
        <div className="absolute top-0 left-1/4 w-[28rem] h-[28rem] rounded-full bg-[var(--neon)]/10 blur-[140px]" />
        <div className="absolute bottom-0 right-1/4 w-[28rem] h-[28rem] rounded-full bg-[var(--primary)]/15 blur-[140px]" />
      </div>

      <div className="relative max-w-7xl mx-auto px-6">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16 md:mb-20"
        >
          <span className="inline-block text-xs font-medium px-3 py-1.5 rounded-full border border-[var(--border)] mb-4"
            style={{ color: "var(--text-sec)" }}>
            ✦ Simple Process
          </span>
          <h2 className="text-3xl md:text-5xl font-display font-extrabold leading-tight mb-4">
            How It{" "}
            <span className="bg-gradient-to-r from-[var(--neon)] via-[var(--lavender)] to-[var(--soft-lav)] bg-clip-text text-transparent">
              Works
            </span>
          </h2>
          <p className="max-w-xl mx-auto text-[var(--text-sec)]">
            Three simple steps from idea to a live, shareable portfolio.
          </p>
        </motion.div>

        {/* Steps grid */}
        <div className="relative grid md:grid-cols-3 gap-8 md:gap-6">
          {/* Connecting line (desktop only) */}
          <div className="hidden md:block absolute top-24 left-[16%] right-[16%] h-px bg-gradient-to-r from-transparent via-[var(--neon)]/40 to-transparent" />

          {steps.map((step, i) => {
            const Icon = step.icon;
            return (
              <motion.div
                key={step.num}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.15 }}
                className="relative group"
              >
                <div
                  className="relative rounded-2xl p-6 md:p-7 h-full border transition-all duration-300 hover:-translate-y-2"
                  style={{
                    background: "var(--bg-sec)",
                    borderColor: "var(--border)",
                  }}
                >
                  {/* Hover glow */}
                  <div
                    className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                    style={{ boxShadow: `0 0 40px ${step.glow}`, border: `1px solid ${step.glow}` }}
                  />

                  {/* Big step number (top-right watermark) */}
                  <span className="absolute top-3 right-5 text-5xl md:text-6xl font-display font-extrabold opacity-[0.06] select-none"
                    style={{ color: "var(--neon)" }}>
                    {step.num}
                  </span>

                  {/* Icon orb */}
                  <div className="relative mb-5">
                    <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${step.gradient} flex items-center justify-center shadow-lg relative z-10`}>
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    {/* pulsing ring */}
                    <span
                      className={`absolute inset-0 w-14 h-14 rounded-2xl bg-gradient-to-br ${step.gradient} opacity-40 blur-lg animate-pulse`}
                    />
                  </div>

                  {/* Step label */}
                  <p className="text-xs font-semibold uppercase tracking-wider mb-1.5"
                    style={{ color: "var(--neon)" }}>
                    Step {step.num}
                  </p>

                  <h3 className="font-display font-bold text-lg md:text-xl mb-2">
                    {step.title}
                  </h3>
                  <p className="text-sm leading-relaxed" style={{ color: "var(--text-sec)" }}>
                    {step.desc}
                  </p>

                  {/* mini visual at bottom */}
                  <div className="mt-5 space-y-1.5">
                    {[100, 70, 45].map((w, k) => (
                      <div
                        key={k}
                        className="h-1.5 rounded-full"
                        style={{
                          width: `${w}%`,
                          background: k === 0
                            ? `linear-gradient(90deg, var(--primary), var(--neon))`
                            : "var(--border)",
                        }}
                      />
                    ))}
                  </div>
                </div>

                {/* Arrow between steps (desktop) */}
                {i < steps.length - 1 && (
                  <div className="hidden md:flex absolute top-20 -right-4 z-10 w-8 h-8 rounded-full bg-[var(--bg-sec)] border border-[var(--border)] items-center justify-center">
                    <ArrowRight className="w-4 h-4" style={{ color: "var(--neon)" }} />
                  </div>
                )}
              </motion.div>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-14 text-center"
        >
          <p className="text-sm mb-4" style={{ color: "var(--text-sec)" }}>
            Ready to build yours in under 10 minutes?
          </p>
          <a
            href="/register"
            className="group inline-flex items-center gap-2 px-7 py-3.5 rounded-xl bg-gradient-to-r from-[var(--primary)] to-[var(--neon)] text-white font-semibold text-sm hover:shadow-[0_0_30px_var(--glow)] transition"
          >
            Get Started Free
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition" />
          </a>
        </motion.div>
      </div>
    </section>
  );
}