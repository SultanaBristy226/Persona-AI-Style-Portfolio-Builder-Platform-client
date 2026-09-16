import { useState } from 'react'
import { usePortfolio } from '../../context/PortfolioContext.jsx'
import toast from 'react-hot-toast'

const EMPTY = { company: '', position: '', startDate: '', endDate: '', description: '' }

export default function ExperienceForm({ onNext }) {
  const { portfolio, updateSection } = usePortfolio()
  const [draft, setDraft] = useState(EMPTY)

  const handleChange = (e) => setDraft({ ...draft, [e.target.name]: e.target.value })

  const addItem = () => {
    if (!draft.company.trim()) return toast.error('Company is required')
    updateSection('experience', [...portfolio.experience, draft])
    setDraft(EMPTY)
    toast.success('Experience added')
  }

  const removeItem = (i) =>
    updateSection('experience', portfolio.experience.filter((_, idx) => idx !== i))

  const hideSection = () => {
    updateSection('visibleSections', { ...portfolio.visibleSections, experience: false })
    toast('Experience section hidden')
    onNext?.()
  }

  return (
    <div className="card space-y-4">
      <h2 className="text-lg font-semibold">Experience</h2>
      <p className="text-sm text-text-secondary">
        No experience yet? You can hide this section entirely.
      </p>

      <div className="space-y-3 rounded-lg border border-border-glow p-4">
        <input className="input-field" name="company" placeholder="Company" value={draft.company} onChange={handleChange} />
        <input className="input-field" name="position" placeholder="Position" value={draft.position} onChange={handleChange} />
        <div className="flex gap-3">
          <input className="input-field" name="startDate" placeholder="Start Date" value={draft.startDate} onChange={handleChange} />
          <input className="input-field" name="endDate" placeholder="End Date" value={draft.endDate} onChange={handleChange} />
        </div>
        <textarea className="input-field" name="description" rows={2} placeholder="Description" value={draft.description} onChange={handleChange} />
        <button type="button" onClick={addItem} className="btn-secondary">Add Experience</button>
      </div>

      <ul className="space-y-2">
        {portfolio.experience.map((ex, i) => (
          <li key={i} className="flex items-center justify-between rounded-lg border border-border-glow px-4 py-2">
            <span>{ex.position} @ {ex.company}</span>
            <button type="button" onClick={() => removeItem(i)} className="text-sm text-text-secondary hover:text-red-400">Remove</button>
          </li>
        ))}
      </ul>

      <div className="flex gap-3">
        <button type="button" onClick={() => { toast.success('Experience saved'); onNext?.() }} className="btn-primary">Save & Continue</button>
        <button type="button" onClick={hideSection} className="btn-secondary">Skip / Hide Section</button>
      </div>
    </div>
  )
}
