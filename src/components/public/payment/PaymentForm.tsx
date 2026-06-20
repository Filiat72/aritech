'use client'

import { useState } from 'react'
import Script from 'next/script'
type Props = {
  courseId: string
  modeId: string
  packageId: string
  amount: number
}

export default function PaymentForm({
  courseId,
  modeId,
  packageId,
  amount,
}: Props) {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [loading, setLoading] = useState(false)

  async function handlePayment() {
    try {
      if (!name || !email || !phone) {
        alert('Please fill all fields')
        return
      }

      setLoading(true)

      const response = await fetch(
        '/api/payment/create-order',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            courseId,
            modeId,
            packageId,
            name,
            email,
            phone,
          }),
        }
      )

      const data = await response.json()

      console.log(data)

const options = {
  key: data.key,
  amount: data.amount,
  currency: data.currency,
  order_id: data.orderId,

  name: 'Aritech Academy',

  description: 'Course Enrollment',

  prefill: {
    name,
    email,
    contact: phone,
  },

  theme: {
    color: '#31446b',
  },

  handler: async function (
  response: any
) {
  console.log(
    'PAYMENT SUCCESS',
    response
  )

  const verifyResponse =
    await fetch(
      '/api/payment/verify-payment',
      {
        method: 'POST',
        headers: {
          'Content-Type':
            'application/json',
        },
        body: JSON.stringify(
          response
        ),
      }
    )

  const verifyData =
    await verifyResponse.json()

  if (verifyData.success) {
    alert(
      'Payment Verified Successfully'
    )
  } else {
    alert(
      'Payment Verification Failed'
    )
  }
},
}


const razorpay = new (window as any).Razorpay(
  options
)

razorpay.open()
    } catch (error) {
      console.error(error)

      alert(
        'Failed to create order'
      )
    } finally {
      setLoading(false)
    }
  }

  return (
  <>
    <Script src="https://checkout.razorpay.com/v1/checkout.js" />

    <div className="lg:col-span-3 rounded-3xl bg-white shadow-lg p-8">
      <h2 className="text-xl font-bold text-[#081C4B]">
        Student Details
      </h2>

      <div className="mt-6 grid gap-4">
        <input
          value={name}
          onChange={(e) =>
            setName(e.target.value)
          }
          placeholder="Full Name *"
          className="
            w-full
            bg-gray-50
            border
            border-gray-200
            rounded-2xl
            px-4
            py-4
            outline-none
          "
        />

        <input
          type="email"
          value={email}
          onChange={(e) =>
            setEmail(e.target.value)
          }
          placeholder="Email *"
          className="
            w-full
            bg-gray-50
            border
            border-gray-200
            rounded-2xl
            px-4
            py-4
            outline-none
          "
        />

        <input
          type="tel"
          value={phone}
          onChange={(e) =>
            setPhone(e.target.value)
          }
          placeholder="Phone Number *"
          className="
            w-full
            bg-gray-50
            border
            border-gray-200
            rounded-2xl
            px-4
            py-4
            outline-none
          "
        />
      </div>

      <button
        onClick={handlePayment}
        disabled={loading}
        className="
          mt-6
          w-full
          py-4
          rounded-2xl
          bg-[#31446b]
          text-white
          font-bold
          text-lg
          shadow-xl
          hover:bg-[#243554]
          transition-all
          disabled:opacity-50
        "
      >
        {loading
          ? 'Creating Order...'
          : `Pay ₹${amount.toLocaleString()} →`}
      </button>
    </div>
  </>
)
}