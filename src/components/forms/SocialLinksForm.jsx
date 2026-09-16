import { usePortfolio } from '../../context/PortfolioContext.jsx'
import toast from 'react-hot-toast'

const FIELDS = ['github', 'linkedin', 'facebook', 'instagram', 'behance', 'dribbble']

export default function SocialLinksForm({ onNext }) {
  const { portfolio, updateSection } = usePortfolio()

  const handleChange = (e) => {
    updateSection('social', { ...portfolio.social, [e.target.name]: e.target.value })
  }

  return (
    <div className="card space-y-4">
      <h2 className="text-lg font-semibold">Social Links</h2>
      <p className="text-sm text-text-secondary">Only the links you fill in will appear on your portfolio.</p>

      {FIELDS.map((field) => (
        <input
          key={field}
          className="input-field"
          name={field}
          placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
          value={portfolio.social[field]}
          onChange={handleChange}
        />
      ))}

      <button type="button" onClick={() => { toast.success('Social links saved'); onNext?.() }} className="btn-primary">Save & Continue</button>
    </div>
  )
}
