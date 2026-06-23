'use client'

import { useEffect, useState } from 'react'

export default function DemoPopup() {
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => {
      setOpen(true)
    }, 2000)

    return () => clearTimeout(timer)
  }, [])

  if (!open) return null

  return (
    <div
      className="
        fixed
        inset-0
        z-[9999]
        flex
        items-center
        justify-center
        bg-black/60
        p-4
      "
    >
      <div
  className="
    relative
    w-full
    max-w-2xl
    bg-white
    rounded-[30px]
    overflow-hidden
    shadow-2xl
  "
>
        <button
          onClick={() => setOpen(false)}
          className="
            absolute
            top-4
            right-4
            z-10
            w-10
            h-10
            rounded-full
            bg-white
            shadow
            text-xl
            font-bold
          "
        >
          ×
        </button>

        <iframe
          src="https://forms.zohopublic.in/aritechacademy1/form/AritechEnquiryForm/formperma/55Hm7Ol5iFKVmC9PnPt_kLAcMXJ0waufaLAUJlHx4gY"
          width="100%"
          height="550"
          frameBorder="0"
        />
      </div>
    </div>
  )
}