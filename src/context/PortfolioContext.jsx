import { createContext, useContext, useState } from 'react'

const defaultPortfolio = {
  personal: { photo: '', fullName: '', title: '', location: '', shortBio: '', about: '' },
  skills: [],
  projects: [],
  education: [],
  experience: [],
  certificates: [],
  social: { github: '', linkedin: '', facebook: '', instagram: '', behance: '', dribbble: '' },
  template: 'minimal',
  accentColor: 'purple',
  theme: 'dark',
  visibleSections: {
    about: true,
    skills: true,
    projects: true,
    experience: true,
    education: true,
    certificates: true,
    contact: true,
  },
  published: false,
  username: '',
}

const PortfolioContext = createContext(null)

// Local editor state for the portfolio being built. Persisted to the
// backend via the portfolio API (see controllers/portfolioController.js)
// on Save & Continue / Publish actions.
export function PortfolioProvider({ children }) {
  const [portfolio, setPortfolio] = useState(defaultPortfolio)

  const updateSection = (section, value) => {
    setPortfolio((prev) => ({ ...prev, [section]: value }))
  }

  return (
    <PortfolioContext.Provider value={{ portfolio, setPortfolio, updateSection }}>
      {children}
    </PortfolioContext.Provider>
  )
}

export const usePortfolio = () => useContext(PortfolioContext)
