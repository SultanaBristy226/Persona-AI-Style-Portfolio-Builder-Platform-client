import MinimalTemplate from './MinimalTemplate.jsx'

// Developer variant: monospace-leaning, terminal-ish framing.
// Swap in its own markup as the design matures.
export default function DeveloperTemplate(props) {
  return (
    <div className="font-mono">
      <MinimalTemplate {...props} />
    </div>
  )
}
