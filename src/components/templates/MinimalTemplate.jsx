import SectionWrapper from './SectionWrapper.jsx'

export default function MinimalTemplate({ data, accent }) {
  const { personal, skills, projects, education, experience, certificates, social, visibleSections } = data

  return (
    <div className="mx-auto max-w-3xl px-6 py-12">
      <header className="text-center">
        {personal.photo && (
          <img src={personal.photo} alt={personal.fullName} className="mx-auto h-28 w-28 rounded-full object-cover" />
        )}
        <h1 className="mt-4 text-3xl font-bold">{personal.fullName || 'Your Name'}</h1>
        <p className="mt-1" style={{ color: accent }}>{personal.title}</p>
        <p className="mt-1 text-sm opacity-70">{personal.location}</p>
        {personal.shortBio && <p className="mt-4 opacity-80">{personal.shortBio}</p>}
      </header>

      {visibleSections.about && personal.about && (
        <SectionWrapper title="About">
          <p className="opacity-80 whitespace-pre-line">{personal.about}</p>
        </SectionWrapper>
      )}

      {visibleSections.skills && skills.length > 0 && (
        <SectionWrapper title="Skills">
          <div className="flex flex-wrap gap-2">
            {skills.map((s, i) => (
              <span key={i} className="rounded-full px-3 py-1 text-sm" style={{ border: `1px solid ${accent}` }}>
                {s.name}
              </span>
            ))}
          </div>
        </SectionWrapper>
      )}

      {visibleSections.projects && projects.length > 0 && (
        <SectionWrapper title="Projects">
          <div className="space-y-6">
            {projects.map((p, i) => (
              <div key={i}>
                <h3 className="font-semibold">{p.name}</h3>
                <p className="mt-1 text-sm opacity-80">{p.description}</p>
                {p.technologies && <p className="mt-1 text-xs opacity-60">{p.technologies}</p>}
                <div className="mt-2 flex gap-4 text-sm">
                  {p.github && <a href={p.github} style={{ color: accent }}>GitHub</a>}
                  {p.liveDemo && <a href={p.liveDemo} style={{ color: accent }}>Live Demo</a>}
                </div>
              </div>
            ))}
          </div>
        </SectionWrapper>
      )}

      {visibleSections.experience && experience.length > 0 && (
        <SectionWrapper title="Experience">
          <div className="space-y-4">
            {experience.map((ex, i) => (
              <div key={i}>
                <h3 className="font-semibold">{ex.position} — {ex.company}</h3>
                <p className="text-xs opacity-60">{ex.startDate} – {ex.endDate}</p>
                <p className="mt-1 text-sm opacity-80">{ex.description}</p>
              </div>
            ))}
          </div>
        </SectionWrapper>
      )}

      {visibleSections.education && education.length > 0 && (
        <SectionWrapper title="Education">
          <div className="space-y-4">
            {education.map((ed, i) => (
              <div key={i}>
                <h3 className="font-semibold">{ed.institution}</h3>
                <p className="text-sm opacity-80">{ed.degree} — {ed.department}</p>
                <p className="text-xs opacity-60">{ed.startYear} – {ed.endYear}</p>
              </div>
            ))}
          </div>
        </SectionWrapper>
      )}

      {visibleSections.certificates && certificates.length > 0 && (
        <SectionWrapper title="Certificates">
          <div className="space-y-3">
            {certificates.map((c, i) => (
              <div key={i}>
                <h3 className="font-semibold">{c.name}</h3>
                <p className="text-sm opacity-70">{c.issuer} · {c.date}</p>
                {c.credentialUrl && <a href={c.credentialUrl} className="text-sm" style={{ color: accent }}>View Credential</a>}
              </div>
            ))}
          </div>
        </SectionWrapper>
      )}

      {visibleSections.contact && (
        <SectionWrapper title="Contact">
          <div className="flex flex-wrap gap-4 text-sm">
            {Object.entries(social)
              .filter(([, url]) => url)
              .map(([key, url]) => (
                <a key={key} href={url} style={{ color: accent }} className="capitalize">{key}</a>
              ))}
          </div>
        </SectionWrapper>
      )}
    </div>
  )
}
