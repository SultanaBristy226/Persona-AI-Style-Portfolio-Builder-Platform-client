import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import toast from 'react-hot-toast'
import { useAuth } from '../context/AuthContext.jsx'

export default function RegisterPage() {
  const { register } = useAuth()
  const navigate = useNavigate()
  const [form, setForm] = useState({ name: '', email: '', password: '', confirmPassword: '' })
  const [loading, setLoading] = useState(false)

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value })

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (form.password !== form.confirmPassword) {
      toast.error('Passwords do not match')
      return
    }
    setLoading(true)
    try {
      await register(form.name, form.email, form.password)
      toast.success('Account created!')
      navigate('/dashboard')
    } catch (err) {
      toast.error(err.response?.data?.message || 'Registration failed')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center px-6">
      <form onSubmit={handleSubmit} className="card w-full max-w-sm">
        <h1 className="mb-6 text-2xl font-bold">Create Your Account</h1>
        <div className="space-y-4">
          <input className="input-field" name="name" placeholder="Full Name" value={form.name} onChange={handleChange} required />
          <input className="input-field" type="email" name="email" placeholder="Email" value={form.email} onChange={handleChange} required />
          <input className="input-field" type="password" name="password" placeholder="Password" value={form.password} onChange={handleChange} required />
          <input className="input-field" type="password" name="confirmPassword" placeholder="Confirm Password" value={form.confirmPassword} onChange={handleChange} required />
        </div>
        <button type="submit" disabled={loading} className="btn-primary mt-6 w-full">
          {loading ? 'Creating account...' : 'Sign Up'}
        </button>
        <p className="mt-4 text-center text-sm text-text-secondary">
          Already have an account? <Link to="/login" className="text-neon-violet">Log in</Link>
        </p>
      </form>
    </div>
  )
}
