import Navbar from '../components/layout/Navbar.jsx'
import PortfolioStatusCard from '../components/dashboard/PortfolioStatusCard.jsx'
import { useAuth } from '../context/AuthContext.jsx'
import { usePortfolio } from '../context/PortfolioContext.jsx'
import { Link } from 'react-router-dom'

export default function DashboardPage() {
  const { user } = useAuth()
  const { portfolio } = usePortfolio()
  const hasStarted = !!portfolio.personal.fullName

  return (
    <div>
      <Navbar />
      <div className="mx-auto max-w-4xl px-6 py-16">
        {!hasStarted ? (
          <div className="card text-center">
            <p className="text-lg">👋 Welcome, {user?.name}! Let's build your portfolio.</p>
            <Link to="/editor" className="btn-primary mt-6 inline-block">
              + Create My Portfolio
            </Link>
          </div>
        ) : (
          <PortfolioStatusCard />
        )}
      </div>
    </div>
  )
}
