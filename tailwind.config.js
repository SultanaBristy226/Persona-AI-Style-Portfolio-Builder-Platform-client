/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        'bg-main': 'var(--bg-main)',
        'bg-secondary': 'var(--bg-secondary)',
        'deep-purple': 'var(--deep-purple)',
        'primary-purple': 'var(--primary-purple)',
        'bright-violet': 'var(--bright-violet)',
        'neon-violet': 'var(--neon-violet)',
        'lavender-glow': 'var(--lavender-glow)',
        'soft-lavender': 'var(--soft-lavender)',
        'text-main': 'var(--text-main)',
        'text-secondary': 'var(--text-secondary)',
        'border-glow': 'var(--border-glow)',
      },
      fontFamily: {
        sans: ['Poppins', 'Inter', 'sans-serif'],
      },
      boxShadow: {
        glow: '0 0 40px rgba(168, 85, 247, 0.35)',
      },
    },
  },
  plugins: [],
}
