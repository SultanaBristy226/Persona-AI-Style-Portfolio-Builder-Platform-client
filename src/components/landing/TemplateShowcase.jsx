const TEMPLATES = ['Minimal', 'Developer', 'Creative', 'Professional']

export default function TemplateShowcase() {
  return (
    <section id="templates" className="mx-auto max-w-6xl px-6 py-20">
      <h2 className="text-center text-3xl font-bold">Choose a template that fits you</h2>
      <div className="mt-12 grid gap-6 sm:grid-cols-2 md:grid-cols-4">
        {TEMPLATES.map((name) => (
          <div key={name} className="card aspect-[3/4] flex items-end p-4 hover:shadow-glow transition-shadow">
            <span className="font-medium">{name}</span>
          </div>
        ))}
      </div>
    </section>
  )
}
