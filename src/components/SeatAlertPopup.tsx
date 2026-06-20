'use client'

import { useEffect, useState } from 'react'
import { X } from 'lucide-react'

export default function SeatAlertPopup() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(true)
    }, 700)

    return () => clearTimeout(timer)
  }, [])

  if (!visible) return null

  return (
    <div
      className="
        hidden xl:block
        fixed
        left-6
        top-[190px]
        z-50
        animate-[seatPopup_1s_cubic-bezier(0.22,1,0.36,1)]
      "
    >
      <div
        className="
          relative
          w-[320px]
          overflow-hidden
          rounded-[28px]
          border
          border-[#DCE7FF]
          bg-white
          shadow-2xl
          animate-[floating_4s_ease-in-out_infinite]
        "
      >
        {/* LIVE DOT */}
        <div className="absolute top-5 left-5 flex items-center gap-2 z-20">
          <div className="relative">
            <div className="w-2.5 h-2.5 rounded-full bg-[#1D4ED8]" />
            <div className="absolute inset-0 rounded-full bg-[#1D4ED8] animate-ping opacity-75" />
          </div>

          <span className="text-[10px] font-bold uppercase tracking-[2px] text-[#1D4ED8]">
            Live Update
          </span>
        </div>

        {/* CLOSE */}
        <button
          onClick={() => setVisible(false)}
          className="
            absolute
            top-4
            right-4
            z-20
            w-8
            h-8
            rounded-full
            bg-[#F4F8FF]
            hover:bg-[#E9F0FF]
            transition-all
            flex
            items-center
            justify-center
          "
        >
          <X className="w-4 h-4 text-[#081C4B]" />
        </button>

        {/* GLOW */}
        <div className="absolute top-0 right-0 w-40 h-40 bg-[#1D4ED8]/10 rounded-full blur-3xl" />

        <div className="relative z-10 p-5 pt-12">
          {/* HEADER */}
          <div className="flex items-center gap-4">
            <div
              className="
                w-14
                h-14
                rounded-2xl
                bg-[#EEF4FF]
                flex
                items-center
                justify-center
                text-2xl
                animate-[pulseSoft_2s_ease-in-out_infinite]
              "
            >
              🔥
            </div>

            <div>
              <p className="text-xs font-bold uppercase tracking-[2px] text-[#1D4ED8]">
                Fast Filling
              </p>

              <h3 className="text-xl font-black text-[#081C4B] leading-tight">
                Limited Seats Left
              </h3>
            </div>
          </div>

         
        </div>
      </div>
    </div>
  )
}