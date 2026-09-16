import { useState } from 'react'
import { usePortfolio } from '../../context/PortfolioContext.jsx'
import toast from 'react-hot-toast'

const EMPTY = { name: '', issuer: '', date: '', credentialUrl: '', image: '' }

export default function CertificatesForm({ onNext }) {
  const { portfolio, updateSection } = usePortfolio()
  const [draft, setDraft] = useState(EMPTY)

  const handleChange = (e) => setDraft({ ...draft, [e.target.name]: e.target.value })

  const handleImage = (e) => {
    const file = e.target.files?.[0]
    if (!file) return
    // TODO: upload to /api/upload -> Cloudinary, store returned URL
    setDraft({ ...draft, image: URL.createObjectURL(file) })
  }

  const addItem = () => {
    if (!draft.name.trim()) return toast.error('Certificate name is required')
    updateSection('certificates', [...portfolio.certificates, draft])
    setDraft(EMPTY)
    toast.success('Certificate added')
  }

  const removeItem = (i) =>
    updateSection('certificates', portfolio.certificates.filter((_, idx) => idx !== i))

  return (
    <div className="card space-y-4">
      <h2 className="text-lg font-semibold">Certificates</h2>

      <div className="space-y-3 rounded-lg border border-border-glow p-4">
        <input className="input-field" name="name" placeholder="Certificate Name" value={draft.name} onChange={handleChange} />
        <input className="input-field" name="issuer" placeholder="Issuer" value={draft.issuer} onChange={handleChange} />
        <input className="input-field" name="date" placeholder="Date" value={draft.date} onChange={handleChange} />
        <input className="input-field" name="credentialUrl" placeholder="Credential URL" value={draft.credentialUrl} onChange={handleChange} />
        <input type="file" accept="image/*" onChange={handleImage} className="text-sm" />
        <button type="button" onClick={addItem} className="btn-secondary">Add Certificate</button>
      </div>

      <ul className="space-y-2">
        {portfolio.certificates.map((c, i) => (
          <li key={i} className="flex items-center justify-between rounded-lg border border-border-glow px-4 py-2">
            <span>{c.name}</span>
            <button type="button" onClick={() => removeItem(i)} className="text-sm text-text-secondary hover:text-red-400">Remove</button>
          </li>
        ))}
      </ul>

      <button type="button" onClick={() => { toast.success('Certificates saved'); onNext?.() }} className="btn-primary">Save & Continue</button>
    </div>
  )
}
