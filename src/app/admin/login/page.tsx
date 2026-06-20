'use client'
 
import { useState } from 'react'
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { Mail, Lock, LogIn, Eye, EyeOff } from 'lucide-react'
 
export default function AdminLoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
 
  async function handleLogin(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError('')
    const result = await signIn('credentials', {
      email,
      password,
      redirect: false
    })
    if (result?.error) {
      setError('Invalid email or password')
      setLoading(false)
    } else {
      router.push('/admin/dashboard')
    }
  }
 
  return (
    <div
      className="min-h-screen flex items-center justify-center relative overflow-hidden"
      style={{
        background: '#4063a2'
      }}
    >
      {/* Background orbs — blue palette only */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div
          className="absolute w-96 h-96 rounded-full opacity-20 blur-3xl"
          style={{ background: '#2563eb', top: '-10%', left: '-10%' }}
        />
        <div
          className="absolute w-80 h-80 rounded-full opacity-15 blur-3xl"
          style={{ background: '#1a3fca', bottom: '-10%', right: '-10%' }}
        />
        <div
          className="absolute w-64 h-64 rounded-full opacity-10 blur-3xl"
          style={{ background: '#3b82f6', top: '50%', right: '20%' }}
        />
        {/* Grid pattern */}
        <div
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage:
              'linear-gradient(#ffffff 1px, transparent 1px), linear-gradient(90deg, #ffffff 1px, transparent 1px)',
            backgroundSize: '60px 60px'
          }}
        />
      </div>
 
      <div className="relative w-full max-w-md mx-4">
        {/* Glass card */}
        <div
          className="rounded-3xl p-8 border border-white/20 shadow-2xl"
          style={{
            background: 'rgba(255,255,255,0.07)',
            backdropFilter: 'blur(24px)',
            WebkitBackdropFilter: 'blur(24px)'
          }}
        >
          {/* Logo */}
          <div className="text-center mb-8">
            <div className="relative inline-block mb-4">
              <div
                className="w-20 h-20 rounded-2xl flex items-center justify-center text-3xl font-black mx-auto shadow-lg"
                style={{
                  background: 'linear-gradient(135deg, #2563eb, #1a3fca)',
                  color: '#ffffff'
                }}
              >
                A
              </div>
              {/* Online dot */}
              <div
                className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full border-2 border-white/30"
                style={{ background: '#22c55e' }}
              />
            </div>
 
            <h1 className="text-3xl font-black text-white tracking-tight">
              ARITECH
            </h1>
            <p className="text-blue-200 text-sm mt-1">
              Services & Solutions Pvt. Ltd.
            </p>
            <div
              className="mt-3 inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium border border-white/20"
              style={{ background: 'rgba(255,255,255,0.10)', color: '#93c5fd' }}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-green-400 inline-block" />
              Admin Portal
            </div>
          </div>
 
          {/* Form */}
          <form onSubmit={handleLogin} className="space-y-4">
            {/* Email */}
            <div className="space-y-1.5">
              <label className="text-sm font-medium text-white">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-blue-300" />
                <input
                  type="email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  placeholder="admin@aritech.com"
                  required
                  className="w-full pl-10 pr-4 py-3 rounded-xl text-sm text-white placeholder-blue-300/50 border border-white/20 outline-none transition-all focus:border-blue-400/60 focus:ring-2 focus:ring-blue-400/20"
                  style={{ background: 'rgba(255,255,255,0.08)' }}
                />
              </div>
            </div>
 
            {/* Password */}
            <div className="space-y-1.5">
              <label className="text-sm font-medium text-white">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-blue-300" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                  className="w-full pl-10 pr-12 py-3 rounded-xl text-sm text-white placeholder-blue-300/50 border border-white/20 outline-none transition-all focus:border-blue-400/60 focus:ring-2 focus:ring-blue-400/20"
                  style={{ background: 'rgba(255,255,255,0.08)' }}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-blue-300 hover:text-white transition-colors"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>
 
            {/* Error */}
            {error && (
              <div
                className="flex items-center gap-2 px-4 py-3 rounded-xl text-sm border border-red-500/30"
                style={{ background: 'rgba(239,68,68,0.1)', color: '#fca5a5' }}
              >
                <span>⚠️</span> {error}
              </div>
            )}
 
            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 rounded-xl font-bold text-sm flex items-center justify-center gap-2 transition-all mt-2 shadow-lg"
              style={{
                background: loading
                  ? '#31446b'
                  : '#31446b',
                color: '#ffffff',
                cursor: loading ? 'not-allowed' : 'pointer',
                boxShadow: loading ? 'none' : '0 4px 20px #4063a2'
              }}
            >
              {loading ? (
                <>
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Signing in...
                </>
              ) : (
                <>
                  <LogIn className="w-4 h-4" />
                  Login to Admin Panel
                </>
              )}
            </button>
          </form>
 
          <p className="text-center text-xs mt-6 text-white">
            Secure Admin Access · Aritech CMS
          </p>
        </div>
      </div>
    </div>
  )
}