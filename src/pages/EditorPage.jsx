import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'
import Navbar from '../components/layout/Navbar.jsx'
import PersonalInfoForm from '../components/forms/PersonalInfoForm.jsx'
import SkillsForm from '../components/forms/SkillsForm.jsx'
import ProjectsForm from '../components/forms/ProjectsForm.jsx'
import EducationForm from '../components/forms/EducationForm.jsx'
import ExperienceForm from '../components/forms/ExperienceForm.jsx'
import CertificatesForm from '../components/forms/CertificatesForm.jsx'
import SocialLinksForm from '../components/forms/SocialLinksForm.jsx'
import CustomizePanel from '../components/preview/CustomizePanel.jsx'
import LivePreview from '../components/preview/LivePreview.jsx'
import DeviceToggle from '../components/preview/DeviceToggle.jsx'
import { usePortfolio } from '../context/PortfolioContext.jsx'
import api from '../api/axios.js'

const STEPS = [
  { key: 'personal', label: 'Personal', Component: PersonalInfoForm },
  { key: 'skills', label: 'Skills', Component: SkillsForm },
  { key: 'projects', label: 'Projects', Component: ProjectsForm },
  { key: 'education', label: 'Education', Component: EducationForm },
  { key: 'experience', label: 'Experience', Component: ExperienceForm },
  { key: 'certificates', label: 'Certificates', Component: CertificatesForm },
  { key: 'social', label: 'Social', Component: SocialLinksForm },
  { key: 'design', label: 'Design', Component: CustomizePanel },
]

export default function EditorPage() {
  const { portfolio, setPortfolio } = usePortfolio()
  const navigate = useNavigate()
  const [stepIndex, setStepIndex] = useState(0)
  const [device, setDevice] = useState('desktop')
  const [mobileTab, setMobileTab] = useState('edit')
  const [publishing, setPublishing] = useState(false)

  const { Component } = STEPS[stepIndex]
  const goNext = () => setStepIndex((i) => Math.min(i + 1, STEPS.length - 1))

  const savePortfolio = async () => {
    try {
      await api.put('/portfolio', portfolio)
      toast.success('Portfolio saved')
    } catch (err) {
      toast.error(err.response?.data?.message || 'Save failed')
    }
  }

  const publish = async () => {
    if (!portfolio.personal.fullName || !portfolio.personal.title) {
      return toast.error('Name and professional title are required to publish')
    }
    setPublishing(true)
    try {
      const { data } = await api.post('/portfolio/publish', portfolio)
      setPortfolio((prev) => ({ ...prev, published: true, username: data.username }))
      toast.success('Portfolio published!')
      navigate('/dashboard')
    } catch (err) {
      toast.error(err.response?.data?.message || 'Publish failed')
    } finally {
      setPublishing(false)
    }
  }

  return (
    <div>
      <Navbar />

      {/* Mobile tab switcher */}
      <div className="flex gap-2 px-6 pt-4 md:hidden">
        {['edit', 'preview'].map((tab) => (
          <button
            key={tab}
            onClick={() => setMobileTab(tab)}
            className="flex-1 rounded-lg px-4 py-2 text-sm capitalize"
            style={{
              border: '1px solid var(--border-glow)',
              backgroundColor: mobileTab === tab ? 'var(--primary-purple)' : 'transparent',
            }}
          >
            {tab}
          </button>
        ))}
      </div>

      <div className="grid gap-6 p-6 md:grid-cols-2">
        {/* Editor side */}
        <div className={mobileTab === 'edit' ? 'block' : 'hidden md:block'}>
          <div className="mb-4 flex flex-wrap gap-2">
            {STEPS.map((s, i) => (
              <button
                key={s.key}
                onClick={() => setStepIndex(i)}
                className="rounded-lg px-3 py-1 text-xs"
                style={{
                  border: '1px solid var(--border-glow)',
                  backgroundColor: stepIndex === i ? 'var(--primary-purple)' : 'transparent',
                }}
              >
                {s.label}
              </button>
            ))}
          </div>

          <Component onNext={goNext} />

          <div className="mt-6 flex gap-3">
            <button onClick={savePortfolio} className="btn-secondary">Save Draft</button>
            <button onClick={publish} disabled={publishing} className="btn-primary">
              {publishing ? 'Publishing...' : 'Publish Portfolio'}
            </button>
          </div>
        </div>

        {/* Preview side */}
        <div className={mobileTab === 'preview' ? 'block' : 'hidden md:block'}>
          <div className="mb-4 flex justify-end">
            <DeviceToggle device={device} setDevice={setDevice} />
          </div>
          <LivePreview portfolio={portfolio} device={device} />
        </div>
      </div>
    </div>
  )
}
