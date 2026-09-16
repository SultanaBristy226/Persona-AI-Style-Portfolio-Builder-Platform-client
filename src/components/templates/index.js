import MinimalTemplate from './MinimalTemplate.jsx'
import DeveloperTemplate from './DeveloperTemplate.jsx'
import CreativeTemplate from './CreativeTemplate.jsx'
import ProfessionalTemplate from './ProfessionalTemplate.jsx'

// Template registry — the core of the "data and template are decoupled"
// architecture. Any portfolio data object can be rendered by any of these.
export const TEMPLATES = {
  minimal: { name: 'Minimal', component: MinimalTemplate },
  developer: { name: 'Developer', component: DeveloperTemplate },
  creative: { name: 'Creative', component: CreativeTemplate },
  professional: { name: 'Professional', component: ProfessionalTemplate },
}

export const ACCENT_COLORS = {
  purple: '#A855F7',
  blue: '#3B82F6',
  green: '#22C55E',
  orange: '#F97316',
  rose: '#F43F5E',
}
