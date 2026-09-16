import Navbar from '../components/layout/Navbar.jsx'
import Footer from '../components/layout/Footer.jsx'
import Hero from '../components/landing/Hero.jsx'
import HowItWorks from '../components/landing/HowItWorks.jsx'
import TemplateShowcase from '../components/landing/TemplateShowcase.jsx'

export default function LandingPage() {
  return (
    <div>
      <Navbar />
      <Hero />
      <HowItWorks />
      <TemplateShowcase />
      <Footer />
    </div>
  )
}
