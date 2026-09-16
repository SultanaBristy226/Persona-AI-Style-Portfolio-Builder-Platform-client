export default function Footer() {
  return (
    <footer className="border-t border-border-glow px-6 py-8 text-center text-sm text-text-secondary">
      © {new Date().getFullYear()} Persona. Built with React, Node.js & MongoDB.
    </footer>
  )
}
