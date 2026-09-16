import { useState } from 'react'
import { usePortfolio } from '../../context/PortfolioContext.jsx'
import toast from 'react-hot-toast'

const EMPTY = { name: '', description: '', technologies: '', github: '', liveDemo: '', image: '' }

export default function ProjectsForm({ onNext }) {
  const { portfolio, updateSection } = usePortfolio()
  const [draft, setDraft] = useState(EMPTY)

  const handleChange = (e) => setDraft({ ...draft, [e.target.name]: e.target.value })

  const handleImage = (e) => {
    const file = e.target.files?.[0]
    if (!file) return
    // TODO: upload to /api/upload -> Cloudinary, store returned URL
    setDraft({ ...draft, image: URL.createObjectURL(file) })
  }

  const addProject = () => {
    if (!draft.name.trim()) return toast.error('Project name is required')
    updateSection('projects', [...portfolio.projects, draft])
    setDraft(EMPTY)
    toast.success('Project added')
  }

  const removeProject = (i) =>
    updateSection('projects', portfolio.projects.filter((_, idx) => idx !== i))

  return (
    <div className="card space-y-4">
      <h2 className="text-lg font-semibold">Projects</h2>

      <div className="space-y-3 rounded-lg border border-border-glow p-4">
        <input className="input-field" name="name" placeholder="Project Name" value={draft.name} onChange={handleChange} />
        <textarea className="input-field" name="description" rows={3} placeholder="Description" value={draft.description} onChange={handleChange} />
        <input className="input-field" name="technologies" placeholder="Technologies (comma separated)" value={draft.technologies} onChange={handleChange} />
        <input className="input-field" name="github" placeholder="GitHub Link" value={draft.github} onChange={handleChange} />
        <input className="input-field" name="liveDemo" placeholder="Live Demo Link" value={draft.liveDemo} onChange={handleChange} />
        <input type="file" accept="image/*" onChange={handleImage} className="text-sm" />
        <button type="button" onClick={addProject} className="btn-secondary">Add Project</button>
      </div>

      <ul className="space-y-2">
        {portfolio.projects.map((p, i) => (
          <li key={i} className="flex items-center justify-between rounded-lg border border-border-glow px-4 py-2">
            <span>{p.name}</span>
            <button type="button" onClick={() => removeProject(i)} className="text-sm text-text-secondary hover:text-red-400">Remove</button>
          </li>
        ))}
      </ul>

      <button type="button" onClick={() => { toast.success('Projects saved'); onNext?.() }} className="btn-primary">Save & Continue</button>
    </div>
  )
}
