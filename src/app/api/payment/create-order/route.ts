import { NextRequest, NextResponse } from 'next/server'
import Razorpay from 'razorpay'
import { prisma } from '@/lib/prisma'

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID!,
  key_secret: process.env.RAZORPAY_KEY_SECRET!,
})

export async function POST(req: NextRequest) {
  try {
    const {
      courseId,
      modeId,
      packageId,
      name,
      email,
      phone,
    } = await req.json()

    if (
      !courseId ||
      !modeId ||
      !packageId ||
      !name ||
      !email ||
      !phone
    ) {
      return NextResponse.json(
        {
          success: false,
          message: 'Missing required fields',
        },
        { status: 400 }
      )
    }

    const selectedPackage =
      await prisma.coursePackage.findUnique({
        where: {
          id: packageId,
        },
      })

    if (!selectedPackage) {
      return NextResponse.json(
        {
          success: false,
          message: 'Package not found',
        },
        { status: 404 }
      )
    }

    const amount =
      Math.round(
        selectedPackage.monthlyPrice * 100
      )
let user = await prisma.user.findUnique({
  where: {
    email,
  },
})

if (!user) {
  user = await prisma.user.create({
    data: {
      name,
      email,
      phone,
      password: 'temp-password',
    },
  })
}


console.log('USER:', user.id)
    const order =
      await razorpay.orders.create({
        amount,
        currency: 'INR',
        receipt: `receipt_${Date.now()}`,
      })

const dbOrder = await prisma.order.create({
  data: {
    userId: user.id,
    courseId,
    courseModeId: modeId,
    packageId,
    amount: selectedPackage.monthlyPrice,
    status: 'pending',
    razorpayOrderId: order.id,
  },
})
console.log('ORDER CREATED:', dbOrder.id)
console.log('RAZORPAY ORDER:', order.id)

    return NextResponse.json({
      success: true,
      orderId: order.id,
      amount: order.amount,
      currency: order.currency,
      key: process.env.RAZORPAY_KEY_ID,
    })
  } catch (error) {
    console.error(
      'Create Order Error:',
      error
    )

    return NextResponse.json(
      {
        success: false,
        message:
          'Failed to create payment order',
      },
      {
        status: 500,
      }
    )
  }
}