import { motion } from 'framer-motion'

const STEPS = [
  { title: 'Fill in your info', desc: 'Add your projects, skills, education, and experience through simple forms.' },
  { title: 'Pick a template', desc: 'Choose from Minimal, Developer, Creative, or Professional designs.' },
  { title: 'Publish & share', desc: 'Go live at your own persona.app/username link — no hosting needed.' },
]

export default function HowItWorks() {
  return (
    <section className="mx-auto max-w-6xl px-6 py-20">
      <h2 className="text-center text-3xl font-bold">How it works</h2>
      <div className="mt-12 grid gap-6 md:grid-cols-3">
        {STEPS.map((step, i) => (
          <motion.div
            key={step.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
            className="card"
          >
            <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-full bg-primary-purple font-bold">
              {i + 1}
            </div>
            <h3 className="text-lg font-semibold">{step.title}</h3>
            <p className="mt-2 text-sm text-text-secondary">{step.desc}</p>
          </motion.div>
        ))}
      </div>
    </section>
  )
}
