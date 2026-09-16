import { Link } from 'react-router-dom'
import { usePortfolio } from '../../context/PortfolioContext.jsx'

// Simple completion estimate based on which sections have content.
function calcCompletion(portfolio) {
  const checks = [
    !!portfolio.personal.fullName,
    !!portfolio.personal.about,
    portfolio.skills.length > 0,
    portfolio.projects.length > 0,
    portfolio.education.length > 0,
    Object.values(portfolio.social).some(Boolean),
  ]
  const done = checks.filter(Boolean).length
  return Math.round((done / checks.length) * 100)
}

export default function PortfolioStatusCard() {
  const { portfolio } = usePortfolio()
  const completion = calcCompletion(portfolio)

  const copyLink = () => {
    const link = `${window.location.origin}/${portfolio.username || 'your-username'}`
    navigator.clipboard.writeText(link)
  }

  return (
    <div className="card">
      <h2 className="text-lg font-semibold">My Portfolio</h2>

      <p className="mt-3 text-sm">
        Status:{' '}
        <span className={portfolio.published ? 'text-green-400' : 'text-text-secondary'}>
          ● {portfolio.published ? 'Published' : 'Draft'}
        </span>
      </p>

      <div className="mt-3">
        <p className="mb-1 text-sm text-text-secondary">Profile Completion: {completion}%</p>
        <div className="h-2 w-full rounded-full bg-deep-purple">
          <div
            className="h-2 rounded-full bg-gradient-to-r from-primary-purple to-neon-violet transition-all"
            style={{ width: `${completion}%` }}
          />
        </div>
      </div>

      {/* Views count wired up once analytics (Phase 2) is built */}
      <p className="mt-3 text-sm text-text-secondary">Views: —</p>

      <div className="mt-6 flex flex-wrap gap-3">
        <Link to="/editor" className="btn-primary text-sm">Edit Portfolio</Link>
        {portfolio.username && (
          <Link to={`/${portfolio.username}`} target="_blank" className="btn-secondary text-sm">Preview</Link>
        )}
        <button onClick={copyLink} className="btn-secondary text-sm">Copy Link</button>
      </div>
    </div>
  )
}
