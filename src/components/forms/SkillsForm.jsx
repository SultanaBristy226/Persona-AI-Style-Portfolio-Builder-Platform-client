import { useState } from 'react'
import { usePortfolio } from '../../context/PortfolioContext.jsx'
import toast from 'react-hot-toast'

export default function SkillsForm({ onNext }) {
  const { portfolio, updateSection } = usePortfolio()
  const [input, setInput] = useState('')

  const addSkill = () => {
    if (!input.trim()) return
    updateSection('skills', [...portfolio.skills, { name: input.trim(), level: 3 }])
    setInput('')
  }

  const removeSkill = (index) => {
    updateSection('skills', portfolio.skills.filter((_, i) => i !== index))
  }

  const setLevel = (index, level) => {
    const updated = portfolio.skills.map((s, i) => (i === index ? { ...s, level } : s))
    updateSection('skills', updated)
  }

  return (
    <div className="card space-y-4">
      <h2 className="text-lg font-semibold">Skills</h2>

      <div className="flex gap-2">
        <input
          className="input-field"
          placeholder="e.g. React"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), addSkill())}
        />
        <button type="button" onClick={addSkill} className="btn-secondary">Add</button>
      </div>

      <ul className="space-y-2">
        {portfolio.skills.map((skill, i) => (
          <li key={i} className="flex items-center justify-between rounded-lg border border-border-glow px-4 py-2">
            <span>{skill.name}</span>
            <div className="flex items-center gap-3">
              <div className="flex gap-1">
                {[1, 2, 3, 4, 5].map((lvl) => (
                  <button
                    key={lvl}
                    type="button"
                    onClick={() => setLevel(i, lvl)}
                    className={lvl <= skill.level ? 'text-neon-violet' : 'text-border-glow'}
                  >
                    ●
                  </button>
                ))}
              </div>
              <button type="button" onClick={() => removeSkill(i)} className="text-sm text-text-secondary hover:text-red-400">
                Remove
              </button>
            </div>
          </li>
        ))}
      </ul>

      <button type="button" onClick={() => { toast.success('Skills saved'); onNext?.() }} className="btn-primary">
        Save & Continue
      </button>
    </div>
  )
}
