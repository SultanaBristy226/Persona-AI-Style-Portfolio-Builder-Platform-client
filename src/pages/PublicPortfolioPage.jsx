import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import api from '../api/axios.js'
import LivePreview from '../components/preview/LivePreview.jsx'

export default function PublicPortfolioPage() {
  const { username } = useParams()
  const [portfolio, setPortfolio] = useState(null)
  const [status, setStatus] = useState('loading')

  useEffect(() => {
    const load = async () => {
      try {
        const { data } = await api.get(`/portfolio/public/${username}`)
        setPortfolio(data)
        setStatus('ready')
      } catch {
        setStatus('notfound')
      }
    }
    load()
  }, [username])

  if (status === 'loading') {
    return <div className="flex min-h-screen items-center justify-center text-text-secondary">Loading...</div>
  }

  if (status === 'notfound') {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center gap-2">
        <h1 className="text-2xl font-bold">Portfolio not found</h1>
        <p className="text-text-secondary">No published portfolio at /{username}</p>
      </div>
    )
  }

  return <LivePreview portfolio={portfolio} device="desktop" />
}
