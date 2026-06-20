import { NextRequest, NextResponse } from 'next/server'
import crypto from 'crypto'
import { prisma } from '@/lib/prisma'

export async function POST(req: NextRequest) {
  try {
    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
    } = await req.json()

    const body =
      razorpay_order_id +
      '|' +
      razorpay_payment_id

    const expectedSignature =
      crypto
        .createHmac(
          'sha256',
          process.env.RAZORPAY_KEY_SECRET!
        )
        .update(body.toString())
        .digest('hex')

    const isValid =
      expectedSignature ===
      razorpay_signature

    if (!isValid) {
      return NextResponse.json(
        {
          success: false,
          message: 'Invalid signature',
        },
        {
          status: 400,
        }
      )
    }

    await prisma.order.updateMany({
      where: {
        razorpayOrderId:
          razorpay_order_id,
      },
      data: {
        status: 'paid',
        razorpayPaymentId:
          razorpay_payment_id,
      },
    })

    return NextResponse.json({
      success: true,
    })
  } catch (error) {
    console.error(error)

    return NextResponse.json(
      {
        success: false,
      },
      {
        status: 500,
      }
    )
  }
}