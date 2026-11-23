import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { useTheme } from "../../context/ThemeContext";
import { Sparkles, Sun, Moon } from "lucide-react";

const Navbar = () => {
  const { user, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();

  return (
    <nav className="fixed top-0 inset-x-0 z-50 backdrop-blur-xl bg-[var(--bg)]/70 border-b border-[var(--border)]">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 font-display font-bold text-xl">
          <Sparkles className="w-5 h-5 text-[var(--neon)]" />
          <span className="gradient-text">Persona</span>
        </Link>
        <div className="flex items-center gap-3">
          {/* Theme toggle */}
          <button
            onClick={toggleTheme}
            aria-label="Toggle theme"
            className="w-9 h-9 rounded-lg border border-[var(--border)] hover:bg-[var(--bg-sec)] transition flex items-center justify-center"
          >
            {theme === "dark" ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </button>

          {user ? (
            <>
              <Link to="/dashboard" className="text-sm text-[var(--text-sec)] hover:text-[var(--text)] transition hidden sm:block">
                Dashboard
              </Link>
              <button onClick={logout} className="text-sm px-4 py-2 rounded-lg border border-[var(--border)] hover:bg-[var(--bg-sec)] transition">
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="text-sm text-[var(--text-sec)] hover:text-[var(--text)] transition hidden sm:block">
                Login
              </Link>
              <Link to="/register" className="text-sm px-4 py-2 rounded-lg bg-gradient-to-r from-[var(--primary)] to-[var(--neon)] text-white font-medium hover:shadow-[0_0_20px_rgba(168,85,247,0.35)] transition">
                Get Started
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;