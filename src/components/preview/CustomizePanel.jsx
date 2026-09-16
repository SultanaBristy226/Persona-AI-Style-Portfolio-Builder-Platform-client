import { usePortfolio } from '../../context/PortfolioContext.jsx'
import { TEMPLATES, ACCENT_COLORS } from '../templates/index.js'

const SECTIONS = ['about', 'skills', 'projects', 'experience', 'education', 'certificates', 'contact']

export default function CustomizePanel() {
  const { portfolio, updateSection } = usePortfolio()

  const toggleSection = (key) => {
    updateSection('visibleSections', {
      ...portfolio.visibleSections,
      [key]: !portfolio.visibleSections[key],
    })
  }

  return (
    <div className="card space-y-6">
      <div>
        <h3 className="mb-3 font-semibold">Template</h3>
        <div className="grid grid-cols-2 gap-2">
          {Object.entries(TEMPLATES).map(([key, t]) => (
            <button
              key={key}
              onClick={() => updateSection('template', key)}
              className="rounded-lg px-3 py-2 text-sm transition-colors"
              style={{
                border: '1px solid var(--border-glow)',
                backgroundColor: portfolio.template === key ? 'var(--primary-purple)' : 'transparent',
              }}
            >
              {t.name}
            </button>
          ))}
        </div>
      </div>

      <div>
        <h3 className="mb-3 font-semibold">Accent Color</h3>
        <div className="flex gap-3">
          {Object.entries(ACCENT_COLORS).map(([key, color]) => (
            <button
              key={key}
              onClick={() => updateSection('accentColor', key)}
              aria-label={key}
              className="h-8 w-8 rounded-full transition-transform hover:scale-110"
              style={{
                backgroundColor: color,
                outline: portfolio.accentColor === key ? '2px solid var(--text-main)' : 'none',
                outlineOffset: '2px',
              }}
            />
          ))}
        </div>
      </div>

      <div>
        <h3 className="mb-3 font-semibold">Theme</h3>
        <div className="flex gap-2">
          {['light', 'dark'].map((t) => (
            <button
              key={t}
              onClick={() => updateSection('theme', t)}
              className="rounded-lg px-4 py-2 text-sm capitalize"
              style={{
                border: '1px solid var(--border-glow)',
                backgroundColor: portfolio.theme === t ? 'var(--primary-purple)' : 'transparent',
              }}
            >
              {t === 'light' ? '☀ Light' : '🌙 Dark'}
            </button>
          ))}
        </div>
      </div>

      <div>
        <h3 className="mb-3 font-semibold">Sections</h3>
        <div className="space-y-2">
          {SECTIONS.map((key) => (
            <label key={key} className="flex items-center gap-2 text-sm capitalize">
              <input
                type="checkbox"
                checked={portfolio.visibleSections[key]}
                onChange={() => toggleSection(key)}
              />
              {key}
            </label>
          ))}
        </div>
      </div>
    </div>
  )
}
