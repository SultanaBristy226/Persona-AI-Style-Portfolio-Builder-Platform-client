import { usePortfolio } from '../../context/PortfolioContext.jsx'
import toast from 'react-hot-toast'

export default function PersonalInfoForm({ onNext }) {
  const { portfolio, updateSection } = usePortfolio()
  const personal = portfolio.personal

  const handleChange = (e) => {
    updateSection('personal', { ...personal, [e.target.name]: e.target.value })
  }

  const handlePhoto = (e) => {
    const file = e.target.files?.[0]
    if (!file) return
    // TODO: upload to backend /api/upload -> Cloudinary, then store returned URL
    const localUrl = URL.createObjectURL(file)
    updateSection('personal', { ...personal, photo: localUrl })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    toast.success('Personal info saved')
    onNext?.()
  }

  return (
    <form onSubmit={handleSubmit} className="card space-y-4">
      <h2 className="text-lg font-semibold">Personal Information</h2>

      <div>
        <label className="mb-1 block text-sm text-text-secondary">Profile Photo</label>
        <input type="file" accept="image/*" onChange={handlePhoto} className="text-sm" />
      </div>

      <input className="input-field" name="fullName" placeholder="Full Name" value={personal.fullName} onChange={handleChange} required />
      <input className="input-field" name="title" placeholder="Professional Title" value={personal.title} onChange={handleChange} required />
      <input className="input-field" name="location" placeholder="Location" value={personal.location} onChange={handleChange} />
      <input className="input-field" name="shortBio" placeholder="Short Bio" value={personal.shortBio} onChange={handleChange} />
      <textarea className="input-field" name="about" placeholder="About Me" rows={4} value={personal.about} onChange={handleChange} />

      <button type="submit" className="btn-primary">Save & Continue</button>
    </form>
  )
}
