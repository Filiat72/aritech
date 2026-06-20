'use client'

import { useEffect, useState, useCallback } from 'react'
import { X, Star, Send, CheckCircle2, MessageSquareHeart } from 'lucide-react'

const STORAGE_KEY = 'feedback_popup_dismissed'
const COOLDOWN_DAYS = 7

export default function FeedbackPopup() {
  const [visible, setVisible] = useState(false)
  const [rating, setRating] = useState(0)
  const [hovered, setHovered] = useState(0)
  const [message, setMessage] = useState('')
  const [name, setName] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [animateOut, setAnimateOut] = useState(false)

  const shouldShow = useCallback(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY)
      if (!raw) return true
      const { timestamp } = JSON.parse(raw)
      const daysSince = (Date.now() - timestamp) / (1000 * 60 * 60 * 24)
      return daysSince >= COOLDOWN_DAYS
    } catch {
      return true
    }
  }, [])

  const dismiss = useCallback((permanent = false) => {
    setAnimateOut(true)
    setTimeout(() => {
      setVisible(false)
      setAnimateOut(false)
    }, 400)
    if (permanent || submitted) {
      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({ timestamp: Date.now() })
      )
    }
  }, [submitted])

  useEffect(() => {
    if (!shouldShow()) return

    let triggered = false

    // Desktop: cursor leaves toward top of browser (exit intent)
    const handleMouseLeave = (e: MouseEvent) => {
      if (triggered) return
      if (e.clientY <= 10) {
        triggered = true
        setVisible(true)
      }
    }

    // Mobile / tab switch: page becomes hidden
    const handleVisibilityChange = () => {
      if (triggered) return
      if (document.visibilityState === 'hidden') {
        triggered = true
        setVisible(true)
      }
    }

    // Fallback: show after 45s of inactivity (user might leave without moving cursor to top)
    const inactivityTimer = setTimeout(() => {
      if (!triggered && shouldShow()) {
        triggered = true
        setVisible(true)
      }
    }, 45_000)

    document.addEventListener('mouseleave', handleMouseLeave)
    document.addEventListener('visibilitychange', handleVisibilityChange)

    return () => {
      document.removeEventListener('mouseleave', handleMouseLeave)
      document.removeEventListener('visibilitychange', handleVisibilityChange)
      clearTimeout(inactivityTimer)
    }
  }, [shouldShow])

  const handleSubmit = async () => {
    if (!rating) return
    setSubmitting(true)
    try {
      await fetch('/api/feedback', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ rating, message, name }),
      })
      setSubmitted(true)
      localStorage.setItem(STORAGE_KEY, JSON.stringify({ timestamp: Date.now() }))
      setTimeout(() => dismiss(true), 2800)
    } catch {
      // silent fail — don't block UX
    } finally {
      setSubmitting(false)
    }
  }

  if (!visible) return null

  return (
    <div
      className="fixed inset-0 z-[9999] flex items-end justify-center sm:items-center"
      style={{ backdropFilter: 'blur(2px)', backgroundColor: 'rgba(0,0,0,0.25)' }}
      onClick={(e) => { if (e.target === e.currentTarget) dismiss() }}
    >
      <div
        className={`
          relative w-full max-w-md mx-4 mb-4 sm:mb-0
          bg-white rounded-[28px] shadow-2xl border border-[#DCE7FF]
          overflow-hidden
          ${animateOut ? 'animate-[feedbackOut_0.4s_ease-in_forwards]' : 'animate-[feedbackIn_0.5s_cubic-bezier(0.22,1,0.36,1)]'}
        `}
      >
        {/* Glow accent */}
        <div className="absolute top-0 right-0 w-48 h-48 bg-[#1D4ED8]/8 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-32 h-32 bg-[#7C3AED]/6 rounded-full blur-2xl pointer-events-none" />

        {/* Close button */}
        <button
          onClick={() => dismiss()}
          className="absolute top-4 right-4 z-20 w-8 h-8 rounded-full bg-[#F4F8FF] hover:bg-[#E9F0FF] transition-all flex items-center justify-center"
          aria-label="Close feedback popup"
        >
          <X className="w-4 h-4 text-[#081C4B]" />
        </button>

        <div className="relative z-10 p-6">
          {submitted ? (
            /* ── Thank-you state ── */
            <div className="flex flex-col items-center py-4 gap-3 text-center">
              <div className="w-16 h-16 rounded-full bg-[#EEF4FF] flex items-center justify-center">
                <CheckCircle2 className="w-8 h-8 text-[#1D4ED8]" />
              </div>
              <h3 className="text-xl font-black text-[#081C4B]">Thank you!</h3>
              <p className="text-sm text-[#4B5EA6]">
                Your feedback means a lot to us. We'll keep improving!
              </p>
            </div>
          ) : (
            /* ── Form state ── */
            <>
              {/* Header */}
              <div className="flex items-center gap-3 mb-5">
                <div className="w-12 h-12 rounded-2xl bg-[#EEF4FF] flex items-center justify-center shrink-0">
                  <MessageSquareHeart className="w-6 h-6 text-[#31446b]" />
                </div>
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-[2px] text-[#4063a2]">
                    Before you go
                  </p>
                  <h3 className="text-lg font-black text-[#081C4B] leading-tight">
                    How was your experience?
                  </h3>
                </div>
              </div>

              {/* Star rating */}
              <div className="flex items-center justify-center gap-2 mb-5">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    onMouseEnter={() => setHovered(star)}
                    onMouseLeave={() => setHovered(0)}
                    onClick={() => setRating(star)}
                    className="transition-transform hover:scale-110 active:scale-95"
                    aria-label={`Rate ${star} star${star > 1 ? 's' : ''}`}
                  >
                    <Star
                      className={`w-8 h-8 transition-colors duration-150 ${
                        star <= (hovered || rating)
                          ? 'fill-[#F59E0B] text-[#F59E0B]'
                          : 'text-[#D1D5DB]'
                      }`}
                    />
                  </button>
                ))}
              </div>

              {/* Optional name */}
              <input
                type="text"
                placeholder="Your name (optional)"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="
                  w-full px-4 py-2.5 mb-3
                  text-sm text-[#081C4B] placeholder:text-[#9CA3AF]
                  bg-[#F8FAFF] border border-[#DCE7FF] rounded-xl
                  focus:outline-none focus:ring-2 focus:ring-[#1D4ED8]/30
                  transition
                "
              />

              {/* Message textarea */}
              <textarea
                rows={3}
                placeholder="Tell us what you liked or how we can improve…"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="
                  w-full px-4 py-2.5 mb-4
                  text-sm text-[#081C4B] placeholder:text-[#9CA3AF]
                  bg-[#F8FAFF] border border-[#DCE7FF] rounded-xl resize-none
                  focus:outline-none focus:ring-2 focus:ring-[#1D4ED8]/30
                  transition
                "
              />

              {/* Submit */}
              <button
                onClick={handleSubmit}
                disabled={!rating || submitting}
                className="
                  w-full flex items-center justify-center gap-2
                  py-3 px-6 rounded-xl font-bold text-sm
                  bg-[#31446b] text-white
                  hover:bg-[#1E40AF] active:scale-95
                  disabled:opacity-40 disabled:cursor-not-allowed
                  transition-all duration-150
                "
              >
                {submitting ? (
                  <span className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" />
                ) : (
                  <Send className="w-4 h-4" />
                )}
                {submitting ? 'Sending…' : 'Submit Feedback'}
              </button>

              <p className="text-center text-[10px] text-[#9CA3AF] mt-3">
                Your feedback is anonymous and helps us improve.
              </p>
            </>
          )}
        </div>
      </div>

      <style>{`
        @keyframes feedbackIn {
          0%   { opacity: 0; transform: translateY(40px) scale(0.95); }
          60%  { opacity: 1; transform: translateY(-6px) scale(1.01); }
          100% { opacity: 1; transform: translateY(0) scale(1); }
        }
        @keyframes feedbackOut {
          0%   { opacity: 1; transform: scale(1); }
          100% { opacity: 0; transform: scale(0.9) translateY(20px); }
        }
      `}</style>
    </div>
  )
}