import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Eye, EyeOff, Mail, Lock, Sparkles, ArrowRight, Quote } from "lucide-react";
import toast from "react-hot-toast";
import { useAuth } from "../context/AuthContext";
import Navbar from "../components/layout/Navbar";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPw, setShowPw] = useState(false);
  const [remember, setRemember] = useState(true);
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await login(email, password);
      toast.success("Welcome back 👋");
      navigate("/dashboard");
    } catch (err) {
      toast.error(err.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />
      <div className="relative min-h-screen pt-16 flex items-center justify-center px-4 overflow-hidden">
        {/* background */}
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute inset-0 dot-pattern opacity-[0.06]" />
          <div className="absolute -top-40 -left-40 h-[30rem] w-[30rem] rounded-full bg-[var(--neon)]/20 blur-[140px]" />
          <div className="absolute -bottom-40 -right-40 h-[30rem] w-[30rem] rounded-full bg-[var(--primary)]/25 blur-[140px]" />
        </div>

        <div className="relative w-full max-w-4xl grid md:grid-cols-2 rounded-2xl overflow-hidden border shadow-2xl"
          style={{ background: "var(--bg-sec)", borderColor: "var(--border)" }}>

          {/* ── LEFT: illustration / brand ── */}
          <div className="relative hidden md:flex flex-col justify-between p-10 overflow-hidden"
            style={{ background: "linear-gradient(135deg, var(--primary), var(--neon))" }}>
            {/* floating shapes */}
            <motion.div animate={{ y: [0, -12, 0] }} transition={{ duration: 4, repeat: Infinity }}
              className="absolute top-10 right-8 w-20 h-20 rounded-full bg-white/10 backdrop-blur" />
            <motion.div animate={{ y: [0, 12, 0] }} transition={{ duration: 5, repeat: Infinity }}
              className="absolute bottom-20 left-10 w-16 h-16 rounded-2xl bg-white/10 backdrop-blur rotate-12" />

            <div className="relative z-10 text-white">
              <div className="flex items-center gap-2 font-display font-bold text-xl mb-2">
                <Sparkles className="w-5 h-5" /> Persona
              </div>
              <p className="text-white/80 text-sm">Build your portfolio without code.</p>
            </div>

            <div className="relative z-10 text-white">
              <Quote className="w-8 h-8 mb-3 opacity-60" />
              <p className="text-lg font-medium leading-snug mb-4">
                "Persona made my portfolio look professional in 10 minutes — no design skills needed."
              </p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center font-bold">B</div>
                <div>
                  <p className="text-sm font-semibold">Bristy S.</p>
                  <p className="text-xs text-white/70">Frontend Developer</p>
                </div>
              </div>
            </div>
          </div>

          {/* ── RIGHT: form ── */}
          <div className="p-8 md:p-10">
            <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
              <h1 className="text-2xl md:text-3xl font-bold mb-1">Welcome back</h1>
              <p className="text-sm mb-6" style={{ color: "var(--text-sec)" }}>
                Log in to continue building your portfolio.
              </p>

              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Email */}
                <div>
                  <label className="block text-xs font-medium mb-1.5" style={{ color: "var(--text-sec)" }}>Email</label>
                  <div className="relative">
                    <Mail className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2" style={{ color: "var(--text-sec)" }} />
                    <input
                      type="email" required value={email} onChange={(e) => setEmail(e.target.value)}
                      placeholder="you@example.com"
                      className="w-full pl-10 pr-3 py-3 rounded-lg border bg-transparent text-sm"
                      style={{ borderColor: "var(--border)" }}
                    />
                  </div>
                </div>

                {/* Password */}
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <label className="text-xs font-medium" style={{ color: "var(--text-sec)" }}>Password</label>
                    <Link to="#" className="text-xs text-[var(--neon)] hover:underline">Forgot?</Link>
                  </div>
                  <div className="relative">
                    <Lock className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2" style={{ color: "var(--text-sec)" }} />
                    <input
                      type={showPw ? "text" : "password"} required value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="••••••••"
                      className="w-full pl-10 pr-10 py-3 rounded-lg border bg-transparent text-sm"
                      style={{ borderColor: "var(--border)" }}
                    />
                    <button type="button" onClick={() => setShowPw(!showPw)}
                      className="absolute right-3 top-1/2 -translate-y-1/2"
                      style={{ color: "var(--text-sec)" }}>
                      {showPw ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                {/* Remember */}
                <label className="flex items-center gap-2 text-sm cursor-pointer select-none" style={{ color: "var(--text-sec)" }}>
                  <input type="checkbox" checked={remember} onChange={(e) => setRemember(e.target.checked)}
                    className="w-4 h-4 accent-[var(--neon)]" />
                  Remember me
                </label>

                {/* Submit */}
                <button type="submit" disabled={loading}
                  className="group w-full py-3 rounded-lg bg-gradient-to-r from-[var(--primary)] to-[var(--neon)] text-white font-semibold text-sm flex items-center justify-center gap-2 hover:shadow-[0_0_25px_var(--glow)] transition disabled:opacity-60">
                  {loading ? "Logging in..." : <>Login <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition" /></>}
                </button>
              </form>

              {/* Divider */}
              <div className="my-6 flex items-center gap-3 text-xs" style={{ color: "var(--text-sec)" }}>
                <span className="flex-1 h-px" style={{ background: "var(--border)" }} />
                or continue with
                <span className="flex-1 h-px" style={{ background: "var(--border)" }} />
              </div>

              {/* Google placeholder */}
              <button disabled className="w-full py-2.5 rounded-lg border text-sm flex items-center justify-center gap-2 opacity-50 cursor-not-allowed"
                style={{ borderColor: "var(--border)" }}>
                <svg className="w-4 h-4" viewBox="0 0 48 48"><path fill="#FFC107" d="M43.6 20.5H42V20H24v8h11.3C33.7 32.9 29.3 36 24 36c-6.6 0-12-5.4-12-12s5.4-12 12-12c3 0 5.8 1.1 7.9 3l5.7-5.7C34 6.1 29.3 4 24 4 12.9 4 4 12.9 4 24s8.9 20 20 20 20-8.9 20-20c0-1.3-.1-2.4-.4-3.5z"/><path fill="#FF3D00" d="M6.3 14.7l6.6 4.8C14.7 15.1 19 12 24 12c3 0 5.8 1.1 7.9 3l5.7-5.7C34 6.1 29.3 4 24 4 16.3 4 9.7 8.3 6.3 14.7z"/><path fill="#4CAF50" d="M24 44c5.2 0 9.9-2 13.4-5.2l-6.2-5.2C29.2 35.1 26.7 36 24 36c-5.3 0-9.7-3.1-11.3-8L6.1 33C9.5 39.6 16.2 44 24 44z"/><path fill="#1976D2" d="M43.6 20.5H42V20H24v8h11.3c-.8 2.3-2.3 4.3-4.2 5.6l6.2 5.2C40.9 35.2 44 30 44 24c0-1.3-.1-2.4-.4-3.5z"/></svg>
                Google (coming soon)
              </button>

              <p className="mt-6 text-sm text-center" style={{ color: "var(--text-sec)" }}>
                No account?{" "}
                <Link to="/register" className="text-[var(--neon)] font-medium hover:underline">Create one</Link>
              </p>
            </motion.div>
          </div>
        </div>
      </div>
    </>
  );
}