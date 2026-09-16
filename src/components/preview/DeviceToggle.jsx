const DEVICES = ['mobile', 'tablet', 'desktop']

export default function DeviceToggle({ device, setDevice }) {
  return (
    <div className="flex gap-2">
      {DEVICES.map((d) => (
        <button
          key={d}
          onClick={() => setDevice(d)}
          className="rounded-lg px-3 py-1 text-sm capitalize transition-colors"
          style={{
            border: '1px solid var(--border-glow)',
            backgroundColor: device === d ? 'var(--primary-purple)' : 'transparent',
          }}
        >
          {d}
        </button>
      ))}
    </div>
  )
}
