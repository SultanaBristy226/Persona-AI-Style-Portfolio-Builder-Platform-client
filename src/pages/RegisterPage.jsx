import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Eye, EyeOff, Mail, Lock, User, Sparkles, ArrowRight, Check } from "lucide-react";
import toast from "react-hot-toast";
import { useAuth } from "../context/AuthContext";
import Navbar from "../components/layout/Navbar";

const benefits = [
  "Live portfolio in minutes",
  "4 beautiful templates",
  "No coding required",
  "Free forever",
];

export default function RegisterPage() {
  const [form, setForm] = useState({ name: "", email: "", password: "", confirm: "" });
  const [showPw, setShowPw] = useState(false);
  const [loading, setLoading] = useState(false);
  const { register } = useAuth();
  const navigate = useNavigate();

  const set = (k) => (e) => setForm({ ...form, [k]: e.target.value });

  const pwStrength =
    form.password.length === 0 ? 0 :
    form.password.length < 6 ? 1 :
    /[A-Z]/.test(form.password) && /[0-9]/.test(form.password) ? 3 : 2;

  const strengthLabel = ["", "Weak", "Medium", "Strong"][pwStrength];
  const strengthColor = ["", "#ef4444", "#eab308", "#22c55e"][pwStrength];

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (form.password !== form.confirm) return toast.error("Passwords do not match");
    if (form.password.length < 6) return toast.error("Password must be 6+ characters");
    setLoading(true);
    try {
      await register(form.name, form.email, form.password);
      toast.success("Account created 🎉");
      navigate("/dashboard");
    } catch (err) {
      toast.error(err.response?.data?.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />
      <div className="relative min-h-screen pt-16 flex items-center justify-center px-4 py-8 overflow-hidden">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute inset-0 dot-pattern opacity-[0.06]" />
          <div className="absolute -top-40 -right-40 h-[30rem] w-[30rem] rounded-full bg-[var(--neon)]/20 blur-[140px]" />
          <div className="absolute -bottom-40 -left-40 h-[30rem] w-[30rem] rounded-full bg-[var(--primary)]/25 blur-[140px]" />
        </div>

        <div className="relative w-full max-w-4xl grid md:grid-cols-2 rounded-2xl overflow-hidden border shadow-2xl"
          style={{ background: "var(--bg-sec)", borderColor: "var(--border)" }}>

          {/* ── LEFT: benefits / brand ── */}
          <div className="relative hidden md:flex flex-col justify-between p-10 overflow-hidden"
            style={{ background: "linear-gradient(135deg, var(--primary), var(--neon))" }}>
            <motion.div animate={{ y: [0, -12, 0] }} transition={{ duration: 4, repeat: Infinity }}
              className="absolute top-10 right-8 w-24 h-24 rounded-full bg-white/10 backdrop-blur" />
            <motion.div animate={{ y: [0, 12, 0] }} transition={{ duration: 5, repeat: Infinity }}
              className="absolute bottom-24 left-8 w-16 h-16 rounded-2xl bg-white/10 backdrop-blur rotate-12" />

            <div className="relative z-10 text-white">
              <div className="flex items-center gap-2 font-display font-bold text-xl mb-2">
                <Sparkles className="w-5 h-5" /> Persona
              </div>
              <p className="text-white/80 text-sm">Build your portfolio without code.</p>
            </div>

            <div className="relative z-10 text-white">
              <h2 className="text-2xl font-bold mb-6 leading-snug">Everything you need to shine online.</h2>
              <ul className="space-y-3">
                {benefits.map((b) => (
                  <li key={b} className="flex items-center gap-3 text-sm">
                    <span className="w-5 h-5 rounded-full bg-white/20 flex items-center justify-center">
                      <Check className="w-3 h-3" />
                    </span>
                    {b}
                  </li>
                ))}
              </ul>
            </div>

            <p className="relative z-10 text-xs text-white/70">
              Join 1,000+ creators building their portfolios with Persona.
            </p>
          </div>

          {/* ── RIGHT: form ── */}
          <div className="p-8 md:p-10">
            <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
              <h1 className="text-2xl md:text-3xl font-bold mb-1">Create your account</h1>
              <p className="text-sm mb-6" style={{ color: "var(--text-sec)" }}>
                Start building your portfolio — free.
              </p>

              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Name */}
                <div>
                  <label className="block text-xs font-medium mb-1.5" style={{ color: "var(--text-sec)" }}>Full name</label>
                  <div className="relative">
                    <User className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2" style={{ color: "var(--text-sec)" }} />
                    <input required value={form.name} onChange={set("name")} placeholder="Bristy Sultana"
                      className="w-full pl-10 pr-3 py-3 rounded-lg border bg-transparent text-sm"
                      style={{ borderColor: "var(--border)" }} />
                  </div>
                </div>

                {/* Email */}
                <div>
                  <label className="block text-xs font-medium mb-1.5" style={{ color: "var(--text-sec)" }}>Email</label>
                  <div className="relative">
                    <Mail className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2" style={{ color: "var(--text-sec)" }} />
                    <input type="email" required value={form.email} onChange={set("email")} placeholder="you@example.com"
                      className="w-full pl-10 pr-3 py-3 rounded-lg border bg-transparent text-sm"
                      style={{ borderColor: "var(--border)" }} />
                  </div>
                </div>

                {/* Password */}
                <div>
                  <label className="block text-xs font-medium mb-1.5" style={{ color: "var(--text-sec)" }}>Password</label>
                  <div className="relative">
                    <Lock className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2" style={{ color: "var(--text-sec)" }} />
                    <input type={showPw ? "text" : "password"} required value={form.password} onChange={set("password")}
                      placeholder="At least 6 characters"
                      className="w-full pl-10 pr-10 py-3 rounded-lg border bg-transparent text-sm"
                      style={{ borderColor: "var(--border)" }} />
                    <button type="button" onClick={() => setShowPw(!showPw)}
                      className="absolute right-3 top-1/2 -translate-y-1/2" style={{ color: "var(--text-sec)" }}>
                      {showPw ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                  {/* Strength bar */}
                  {form.password && (
                    <div className="mt-2">
                      <div className="flex gap-1">
                        {[1, 2, 3].map((i) => (
                          <div key={i} className="flex-1 h-1 rounded-full transition-colors"
                            style={{ background: pwStrength >= i ? strengthColor : "var(--border)" }} />
                        ))}
                      </div>
                      <p className="text-xs mt-1" style={{ color: strengthColor }}>{strengthLabel}</p>
                    </div>
                  )}
                </div>

                {/* Confirm */}
                <div>
                  <label className="block text-xs font-medium mb-1.5" style={{ color: "var(--text-sec)" }}>Confirm password</label>
                  <div className="relative">
                    <Lock className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2" style={{ color: "var(--text-sec)" }} />
                    <input type={showPw ? "text" : "password"} required value={form.confirm} onChange={set("confirm")}
                      placeholder="Re-enter password"
                      className="w-full pl-10 pr-3 py-3 rounded-lg border bg-transparent text-sm"
                      style={{ borderColor: "var(--border)" }} />
                  </div>
                  {form.confirm && form.password !== form.confirm && (
                    <p className="text-xs mt-1 text-red-400">Passwords don't match</p>
                  )}
                </div>

                <button type="submit" disabled={loading}
                  className="group w-full py-3 rounded-lg bg-gradient-to-r from-[var(--primary)] to-[var(--neon)] text-white font-semibold text-sm flex items-center justify-center gap-2 hover:shadow-[0_0_25px_var(--glow)] transition disabled:opacity-60">
                  {loading ? "Creating..." : <>Create Account <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition" /></>}
                </button>
              </form>

              <p className="mt-6 text-xs text-center" style={{ color: "var(--text-sec)" }}>
                By continuing you agree to our Terms & Privacy.
              </p>

              <p className="mt-3 text-sm text-center" style={{ color: "var(--text-sec)" }}>
                Already have an account?{" "}
                <Link to="/login" className="text-[var(--neon)] font-medium hover:underline">Login</Link>
              </p>
            </motion.div>
          </div>
        </div>
      </div>
    </>
  );
}