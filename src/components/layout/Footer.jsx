import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Sparkles,
  Github,
  Linkedin,
  Twitter,
  Instagram,
  ArrowRight,
  ArrowUp,
  Heart,
  Mail,
} from "lucide-react";
import { useState } from "react";

const footerLinks = {
  Product: [
    { label: "Templates", href: "#templates" },
    { label: "Features", href: "#features" },
    { label: "Pricing", href: "#pricing" },
    { label: "Examples", href: "#examples" },
  ],
  Resources: [
    { label: "How It Works", href: "#how-it-works" },
    { label: "Blog", href: "#blog" },
    { label: "Help Center", href: "#help" },
    { label: "Changelog", href: "#changelog" },
  ],
  Company: [
    { label: "About", href: "#about" },
    { label: "Careers", href: "#careers" },
    { label: "Contact", href: "#contact" },
    { label: "Partners", href: "#partners" },
  ],
  Legal: [
    { label: "Privacy", href: "#privacy" },
    { label: "Terms", href: "#terms" },
    { label: "Cookies", href: "#cookies" },
    { label: "License", href: "#license" },
  ],
};

const socials = [
  { icon: Github, href: "https://github.com", label: "GitHub" },
  { icon: Linkedin, href: "https://linkedin.com", label: "LinkedIn" },
  { icon: Twitter, href: "https://twitter.com", label: "Twitter" },
  { icon: Instagram, href: "https://instagram.com", label: "Instagram" },
];

export default function Footer() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (!email) return;
    setSubscribed(true);
    setEmail("");
    setTimeout(() => setSubscribed(false), 3000);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="relative overflow-hidden mt-12">
      {/* Gradient top border */}
      <div className="h-px w-full bg-gradient-to-r from-transparent via-[var(--neon)] to-transparent opacity-60" />

      {/* Background */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 dot-pattern opacity-[0.04]" />
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[40rem] h-[20rem] rounded-full bg-[var(--neon)]/10 blur-[140px]" />
      </div>

      <div className="relative max-w-7xl mx-auto px-6 pt-16 pb-8">
        {/* Top row: brand + newsletter */}
        <div className="grid md:grid-cols-2 gap-10 pb-12 border-b border-[var(--border)]">
          {/* Brand column */}
          <div>
            <Link to="/" className="inline-flex items-center gap-2 font-display font-bold text-2xl mb-3">
              <Sparkles className="w-6 h-6 text-[var(--neon)]" />
              <span className="gradient-text">Persona</span>
            </Link>
            <p className="text-sm max-w-sm mb-6" style={{ color: "var(--text-sec)" }}>
              Build your professional portfolio without coding. Fill in your info,
              pick a template, share your story with the world.
            </p>

            {/* Social icons */}
            <div className="flex items-center gap-2">
              {socials.map((s) => {
                const Icon = s.icon;
                return (
                  <a
                    key={s.label}
                    href={s.href}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={s.label}
                    className="w-9 h-9 rounded-lg border flex items-center justify-center transition-all hover:-translate-y-1 hover:border-[var(--neon)] hover:text-[var(--neon)]"
                    style={{
                      borderColor: "var(--border)",
                      color: "var(--text-sec)",
                    }}
                  >
                    <Icon className="w-4 h-4" />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Newsletter */}
          <div className="md:pl-8 md:border-l md:border-[var(--border)]">
            <h4 className="font-display font-bold text-lg mb-2">
              Stay in the loop
            </h4>
            <p className="text-sm mb-4" style={{ color: "var(--text-sec)" }}>
              Get product updates, template drops, and portfolio tips.
            </p>

            <form onSubmit={handleSubscribe} className="relative">
              <div className="relative flex items-center">
                <Mail
                  className="w-4 h-4 absolute left-3 pointer-events-none"
                  style={{ color: "var(--text-sec)" }}
                />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  className="w-full pl-10 pr-32 py-3 rounded-lg border bg-transparent text-sm"
                  style={{ borderColor: "var(--border)" }}
                />
                <button
                  type="submit"
                  className="absolute right-1 top-1 bottom-1 px-4 rounded-md bg-gradient-to-r from-[var(--primary)] to-[var(--neon)] text-white text-xs font-semibold flex items-center gap-1 hover:shadow-[0_0_20px_var(--glow)] transition"
                >
                  Subscribe <ArrowRight className="w-3 h-3" />
                </button>
              </div>
              {subscribed && (
                <motion.p
                  initial={{ opacity: 0, y: -5 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-xs mt-2 text-green-400"
                >
                  ✓ Subscribed! Check your inbox.
                </motion.p>
              )}
            </form>
          </div>
        </div>

        {/* Link columns */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 py-12">
          {Object.entries(footerLinks).map(([section, links]) => (
            <div key={section}>
              <h5
                className="text-xs font-bold uppercase tracking-wider mb-4"
                style={{ color: "var(--text)" }}
              >
                {section}
              </h5>
              <ul className="space-y-2.5">
                {links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="group inline-flex items-center gap-1 text-sm transition-colors hover:text-[var(--neon)]"
                      style={{ color: "var(--text-sec)" }}
                    >
                      <span>{link.label}</span>
                      <ArrowRight className="w-3 h-3 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="pt-8 border-t border-[var(--border)] flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs" style={{ color: "var(--text-sec)" }}>
            © {new Date().getFullYear()} Persona. All rights reserved.
          </p>

          <p className="text-xs flex items-center gap-1.5" style={{ color: "var(--text-sec)" }}>
            Made with{" "}
            <Heart className="w-3 h-3 text-red-400 fill-red-400 animate-pulse" />{" "}
            {" "}
          </p>

          <button
            onClick={scrollToTop}
            className="group flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded-lg border transition hover:border-[var(--neon)] hover:text-[var(--neon)]"
            style={{ borderColor: "var(--border)", color: "var(--text-sec)" }}
          >
            Back to top
            <ArrowUp className="w-3 h-3 group-hover:-translate-y-1 transition" />
          </button>
        </div>
      </div>
    </footer>
  );
}