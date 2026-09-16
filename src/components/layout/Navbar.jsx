import { Link } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext.jsx'

export default function Navbar() {
  const { user, logout } = useAuth()

  return (
    <header className="sticky top-0 z-50 border-b border-border-glow bg-bg-main/80 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <Link to="/" className="text-xl font-bold">
          Persona
        </Link>
        <nav className="flex items-center gap-4">
          {user ? (
            <>
              <Link to="/dashboard" className="text-sm text-text-secondary hover:text-text-main">
                Dashboard
              </Link>
              <button onClick={logout} className="btn-secondary text-sm">
                Log Out
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="text-sm text-text-secondary hover:text-text-main">
                Log In
              </Link>
              <Link to="/register" className="btn-primary text-sm">
                Create Your Portfolio
              </Link>
            </>
          )}
        </nav>
      </div>
    </header>
  )
}
