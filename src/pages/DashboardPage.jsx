import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  LayoutDashboard, Pencil, LayoutTemplate, BarChart3,
  Settings, LogOut, Eye, CheckCircle2, Circle, Copy, ExternalLink
} from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { usePortfolio } from "../context/PortfolioContext";
import toast from "react-hot-toast";

/* ── Slim sidebar ─────────────────────────────── */
const navItems = [
  { id: "overview", label: "Overview", icon: LayoutDashboard },
  { id: "edit", label: "Edit", icon: Pencil },
  { id: "templates", label: "Templates", icon: LayoutTemplate },
  { id: "analytics", label: "Analytics", icon: BarChart3 },
  { id: "settings", label: "Settings", icon: Settings },
];

function Sidebar({ active, setActive }) {
  const { logout } = useAuth();
  return (
    <aside
      className="hidden md:flex flex-col w-56 shrink-0 border-r h-[calc(100vh-4rem)] fixed top-16 left-0"
      style={{ background: "var(--bg-sec)", borderColor: "var(--border)" }}
    >
      <nav className="flex-1 p-3 space-y-1">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = active === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setActive(item.id)}
              className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition"
              style={{
                background: isActive ? "var(--bg-deep)" : "transparent",
                color: isActive ? "var(--text)" : "var(--text-sec)",
              }}
            >
              <Icon className="w-4 h-4" />
              {item.label}
            </button>
          );
        })}
      </nav>
      <button
        onClick={logout}
        className="m-3 flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm hover:bg-red-500/10 text-red-400 transition"
      >
        <LogOut className="w-4 h-4" /> Logout
      </button>
    </aside>
  );
}

/* ── Completion calculation ───────────────────── */
function calcCompletion(p) {
  if (!p) return 0;
  const checks = [
    !!p.personalInfo?.fullName,
    !!p.personalInfo?.professionalTitle,
    !!p.personalInfo?.shortBio,
    p.skills?.length > 0,
    p.projects?.length > 0,
    p.education?.length > 0,
    p.experience?.length > 0,
    p.certificates?.length > 0,
    Object.values(p.socialLinks || {}).some(Boolean),
  ];
  const done = checks.filter(Boolean).length;
  return Math.round((done / checks.length) * 100);
}

/* ── Circular progress ────────────────────────── */
function CircularProgress({ value }) {
  const size = 80;
  const stroke = 8;
  const radius = (size - stroke) / 2;
  const circ = 2 * Math.PI * radius;
  const offset = circ - (value / 100) * circ;
  return (
    <svg width={size} height={size} className="rotate-[-90deg]">
      <circle cx={size / 2} cy={size / 2} r={radius} stroke="var(--border)" strokeWidth={stroke} fill="none" />
      <circle
        cx={size / 2} cy={size / 2} r={radius}
        stroke="url(#grad)" strokeWidth={stroke} fill="none"
        strokeDasharray={circ} strokeDashoffset={offset}
        strokeLinecap="round"
        style={{ transition: "stroke-dashoffset 0.8s ease" }}
      />
      <defs>
        <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="var(--primary)" />
          <stop offset="100%" stopColor="var(--neon)" />
        </linearGradient>
      </defs>
    </svg>
  );
}

/* ── Overview tab ─────────────────────────────── */
function Overview({ portfolio, onEdit }) {
  const navigate = useNavigate();
  const completion = calcCompletion(portfolio);
  const published = portfolio?.published;

  const copyLink = () => {
    const url = `${window.location.origin}/u/${portfolio?.slug}`;
    navigator.clipboard.writeText(url);
    toast.success("Link copied!");
  };

  const checklist = [
    { label: "Personal Info", done: !!portfolio?.personalInfo?.fullName, key: "personal" },
    { label: "Skills", done: portfolio?.skills?.length > 0, key: "skills" },
    { label: "Projects", done: portfolio?.projects?.length > 0, key: "projects" },
    { label: "Education", done: portfolio?.education?.length > 0, key: "education" },
    { label: "Experience", done: portfolio?.experience?.length > 0, key: "experience" },
    { label: "Certificates", done: portfolio?.certificates?.length > 0, key: "certificates" },
    { label: "Social Links", done: Object.values(portfolio?.socialLinks || {}).some(Boolean), key: "social" },
  ];

  return (
    <div className="space-y-6">
      {/* Welcome / empty state */}
      {!portfolio?.personalInfo?.fullName && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="card p-6 border-dashed"
        >
          <h2 className="text-xl font-semibold mb-2">👋 Welcome! Let's build your portfolio</h2>
          <p className="text-sm mb-4" style={{ color: "var(--text-sec)" }}>
            Fill in your details and get a live portfolio in minutes.
          </p>
          <button
            onClick={() => onEdit("personal")}
            className="px-5 py-2.5 rounded-lg bg-gradient-to-r from-[var(--primary)] to-[var(--neon)] text-white font-medium text-sm"
          >
            + Create My Portfolio
          </button>
        </motion.div>
      )}

      {/* Stats row */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {/* Status */}
        <div className="card p-5">
          <p className="text-xs uppercase tracking-wider mb-2" style={{ color: "var(--text-sec)" }}>
            Status
          </p>
          <p className="text-lg font-semibold flex items-center gap-2">
            <span
              className="w-2.5 h-2.5 rounded-full"
              style={{ background: published ? "#22c55e" : "#eab308" }}
            />
            {published ? "Published" : "Draft"}
          </p>
        </div>

        {/* Completion */}
        <div className="card p-5 flex items-center gap-4">
          <div className="relative">
            <CircularProgress value={completion} />
            <span className="absolute inset-0 flex items-center justify-center text-sm font-bold">
              {completion}%
            </span>
          </div>
          <div>
            <p className="text-xs uppercase tracking-wider mb-1" style={{ color: "var(--text-sec)" }}>
              Profile
            </p>
            <p className="font-semibold">Completion</p>
          </div>
        </div>

        {/* Views */}
        <div className="card p-5">
          <p className="text-xs uppercase tracking-wider mb-2" style={{ color: "var(--text-sec)" }}>
            Views
          </p>
          <p className="text-lg font-semibold flex items-center gap-2">
            <Eye className="w-4 h-4 text-[var(--neon)]" />
            {portfolio?.views || 0}
          </p>
        </div>
      </div>

      {/* Checklist */}
      <div className="card p-5">
        <h3 className="font-semibold mb-3">Complete your profile</h3>
        <ul className="space-y-2">
          {checklist.map((c) => (
            <li key={c.key}>
              <button
                onClick={() => !c.done && onEdit(c.key)}
                className="w-full flex items-center gap-3 px-2 py-2 rounded-lg hover:bg-[var(--bg-deep)] transition text-left"
              >
                {c.done ? (
                  <CheckCircle2 className="w-4 h-4 text-green-400" />
                ) : (
                  <Circle className="w-4 h-4" style={{ color: "var(--text-sec)" }} />
                )}
                <span className="text-sm" style={{ color: c.done ? "var(--text)" : "var(--text-sec)" }}>
                  {c.label}
                </span>
                {!c.done && (
                  <span className="ml-auto text-xs text-[var(--neon)]">Add →</span>
                )}
              </button>
            </li>
          ))}
        </ul>
      </div>

      {/* Actions */}
      <div className="flex flex-wrap gap-3">
        <button
          onClick={() => navigate("/editor")}
          className="px-5 py-2.5 rounded-lg bg-gradient-to-r from-[var(--primary)] to-[var(--neon)] text-white font-medium text-sm"
        >
          Edit Portfolio
        </button>
        <button
          onClick={() => navigate("/editor")}
          className="px-5 py-2.5 rounded-lg border text-sm"
          style={{ borderColor: "var(--border)" }}
        >
          Preview
        </button>
        {published && (
          <>
            <button
              onClick={copyLink}
              className="px-5 py-2.5 rounded-lg border text-sm flex items-center gap-2"
              style={{ borderColor: "var(--border)" }}
            >
              <Copy className="w-4 h-4" /> Copy Link
            </button>
            <a
              href={`/u/${portfolio.slug}`}
              target="_blank"
              rel="noreferrer"
              className="px-5 py-2.5 rounded-lg border text-sm flex items-center gap-2"
              style={{ borderColor: "var(--border)" }}
            >
              <ExternalLink className="w-4 h-4" /> Visit
            </a>
          </>
        )}
      </div>
    </div>
  );
}

/* ── Main page ────────────────────────────────── */
export default function DashboardPage() {
  const { portfolio } = usePortfolio();
  const [active, setActive] = useState("overview");
  const navigate = useNavigate();

  const handleEdit = (section) => {
    navigate(`/editor?section=${section}`);
  };

  return (
    <div className="min-h-screen pt-16">
      <Sidebar active={active} setActive={setActive} />
      <main className="md:ml-56 px-4 md:px-8 py-8 max-w-5xl">
        <motion.h1
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-2xl md:text-3xl font-bold mb-6"
        >
          Dashboard
        </motion.h1>

        {active === "overview" && <Overview portfolio={portfolio} onEdit={handleEdit} />}
        {active !== "overview" && (
          <div className="card p-8 text-center" style={{ color: "var(--text-sec)" }}>
            "{active}" section coming soon ✨
          </div>
        )}
      </main>
    </div>
  );
}