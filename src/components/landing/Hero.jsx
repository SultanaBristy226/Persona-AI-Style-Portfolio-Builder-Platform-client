import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Link } from 'react-router-dom'

// Replace these with real portfolio screenshot URLs / imported assets.
const SLIDES = [
  { id: 1, image: '/hero-slides/slide-1.jpg', label: 'Developer Template' },
  { id: 2, image: '/hero-slides/slide-2.jpg', label: 'Minimal Template' },
  { id: 3, image: '/hero-slides/slide-3.jpg', label: 'Creative Template' },
  { id: 4, image: '/hero-slides/slide-4.jpg', label: 'Professional Template' },
]

const AUTOPLAY_MS = 4000

export default function Hero() {
  const [index, setIndex] = useState(0)
  const [paused, setPaused] = useState(false)

  useEffect(() => {
    if (paused) return
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % SLIDES.length)
    }, AUTOPLAY_MS)
    return () => clearInterval(timer)
  }, [paused])

  const goTo = (i) => setIndex(i)
  const prev = () => setIndex((i) => (i - 1 + SLIDES.length) % SLIDES.length)
  const next = () => setIndex((i) => (i + 1) % SLIDES.length)

  return (
    <section className="relative overflow-hidden px-6 py-24 md:py-32">
      {/* floating gradient blobs */}
      <div className="pointer-events-none absolute -top-32 -left-32 h-96 w-96 rounded-full bg-primary-purple/30 blur-3xl" />
      <div className="pointer-events-none absolute top-40 right-0 h-96 w-96 rounded-full bg-neon-violet/20 blur-3xl" />

      <div className="relative mx-auto grid max-w-6xl items-center gap-12 md:grid-cols-2">
        <div>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl font-bold leading-tight md:text-5xl"
          >
            Build Your Professional Portfolio{' '}
            <span className="bg-gradient-to-r from-bright-violet to-neon-violet bg-clip-text text-transparent">
              Without Coding
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="mt-6 max-w-md text-text-secondary"
          >
            Fill in your info, pick a template, and Persona turns it into a
            live, shareable portfolio site — no code required.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-8 flex flex-wrap gap-4"
          >
            <Link to="/register" className="btn-primary">
              Create Your Portfolio
            </Link>
            <a href="#templates" className="btn-secondary">
              Explore Templates
            </a>
          </motion.div>
        </div>

        {/* Auto-sliding hero carousel */}
        <div
          className="relative"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          <div className="card relative aspect-[4/3] overflow-hidden shadow-glow">
            <AnimatePresence mode="wait">
              <motion.img
                key={SLIDES[index].id}
                src={SLIDES[index].image}
                alt={SLIDES[index].label}
                initial={{ opacity: 0, scale: 1.03 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{ duration: 0.6, ease: 'easeInOut' }}
                className="h-full w-full object-cover"
              />
            </AnimatePresence>

            {/* prev / next controls */}
            <button
              onClick={prev}
              aria-label="Previous slide"
              className="absolute left-3 top-1/2 -translate-y-1/2 rounded-full bg-black/40 p-2 text-white backdrop-blur transition hover:bg-black/60"
            >
              ‹
            </button>
            <button
              onClick={next}
              aria-label="Next slide"
              className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full bg-black/40 p-2 text-white backdrop-blur transition hover:bg-black/60"
            >
              ›
            </button>
          </div>

          {/* dot indicators */}
          <div className="mt-4 flex justify-center gap-2">
            {SLIDES.map((slide, i) => (
              <button
                key={slide.id}
                onClick={() => goTo(i)}
                aria-label={`Go to slide ${i + 1}`}
                className="h-2.5 rounded-full transition-all"
                style={{
                  width: i === index ? '1.5rem' : '0.625rem',
                  backgroundColor: i === index ? 'var(--neon-violet)' : 'var(--border-glow)',
                }}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
