import { Monitor, Tablet, Smartphone } from "lucide-react";

const options = [
  { id: "desktop", icon: Monitor },
  { id: "tablet", icon: Tablet },
  { id: "mobile", icon: Smartphone },
];

export default function DeviceToggle({ device, setDevice }) {
  return (
    <div
      className="inline-flex items-center gap-1 p-1 rounded-lg border"
      style={{ background: "var(--bg-sec)", borderColor: "var(--border)" }}
    >
      {options.map((opt) => {
        const Icon = opt.icon;
        const active = device === opt.id;
        return (
          <button
            key={opt.id}
            onClick={() => setDevice(opt.id)}
            className="px-3 py-1.5 rounded-md transition"
            style={{
              background: active ? "var(--bg-deep)" : "transparent",
              color: active ? "var(--neon)" : "var(--text-sec)",
            }}
            aria-label={opt.id}
          >
            <Icon className="w-4 h-4" />
          </button>
        );
      })}
    </div>
  );
}