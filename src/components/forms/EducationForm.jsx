import { useState } from 'react'
import { usePortfolio } from '../../context/PortfolioContext.jsx'
import toast from 'react-hot-toast'

const EMPTY = { institution: '', degree: '', department: '', startYear: '', endYear: '', description: '' }

export default function EducationForm({ onNext }) {
  const { portfolio, updateSection } = usePortfolio()
  const [draft, setDraft] = useState(EMPTY)

  const handleChange = (e) => setDraft({ ...draft, [e.target.name]: e.target.value })

  const addItem = () => {
    if (!draft.institution.trim()) return toast.error('Institution is required')
    updateSection('education', [...portfolio.education, draft])
    setDraft(EMPTY)
    toast.success('Education added')
  }

  const removeItem = (i) =>
    updateSection('education', portfolio.education.filter((_, idx) => idx !== i))

  return (
    <div className="card space-y-4">
      <h2 className="text-lg font-semibold">Education</h2>

      <div className="space-y-3 rounded-lg border border-border-glow p-4">
        <input className="input-field" name="institution" placeholder="Institution" value={draft.institution} onChange={handleChange} />
        <input className="input-field" name="degree" placeholder="Degree" value={draft.degree} onChange={handleChange} />
        <input className="input-field" name="department" placeholder="Department" value={draft.department} onChange={handleChange} />
        <div className="flex gap-3">
          <input className="input-field" name="startYear" placeholder="Start Year" value={draft.startYear} onChange={handleChange} />
          <input className="input-field" name="endYear" placeholder="End Year" value={draft.endYear} onChange={handleChange} />
        </div>
        <textarea className="input-field" name="description" rows={2} placeholder="Description" value={draft.description} onChange={handleChange} />
        <button type="button" onClick={addItem} className="btn-secondary">Add Education</button>
      </div>

      <ul className="space-y-2">
        {portfolio.education.map((ed, i) => (
          <li key={i} className="flex items-center justify-between rounded-lg border border-border-glow px-4 py-2">
            <span>{ed.institution} — {ed.degree}</span>
            <button type="button" onClick={() => removeItem(i)} className="text-sm text-text-secondary hover:text-red-400">Remove</button>
          </li>
        ))}
      </ul>

      <button type="button" onClick={() => { toast.success('Education saved'); onNext?.() }} className="btn-primary">Save & Continue</button>
    </div>
  )
}
