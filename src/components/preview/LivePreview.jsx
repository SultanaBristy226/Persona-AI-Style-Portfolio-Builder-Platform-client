import { motion } from 'framer-motion'
import { TEMPLATES, ACCENT_COLORS } from '../templates/index.js'

const DEVICE_WIDTHS = {
  mobile: '375px',
  tablet: '768px',
  desktop: '100%',
}

export default function LivePreview({ portfolio, device = 'desktop' }) {
  const template = TEMPLATES[portfolio.template] || TEMPLATES.minimal
  const TemplateComponent = template.component
  const accent = ACCENT_COLORS[portfolio.accentColor] || ACCENT_COLORS.purple
  const isDark = portfolio.theme === 'dark'

  return (
    <div className="flex justify-center overflow-auto">
      <motion.div
        layout
        transition={{ duration: 0.3 }}
        style={{
          width: DEVICE_WIDTHS[device],
          maxWidth: '100%',
          backgroundColor: isDark ? '#0B0218' : '#FFFFFF',
          color: isDark ? '#FAF7FF' : '#1A1A1A',
        }}
        className="min-h-[600px] rounded-xl border border-border-glow"
      >
        <TemplateComponent data={portfolio} accent={accent} />
      </motion.div>
    </div>
  )
}
