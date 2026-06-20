import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET() {
  try {
    const feedbacks = await prisma.feedback.findMany({
      orderBy: { createdAt: 'desc' },
    })
    return NextResponse.json(feedbacks)
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch feedback' },
      { status: 500 }
    )
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json()

    if (!body.rating || body.rating < 1 || body.rating > 5) {
      return NextResponse.json(
        { error: 'Rating must be between 1 and 5' },
        { status: 400 }
      )
    }

    const feedback = await prisma.feedback.create({
      data: {
        rating: Number(body.rating),
        message: body.message?.trim() || null,
        name: body.name?.trim() || null,
      },
    })

    return NextResponse.json(feedback, { status: 201 })
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to save feedback' },
      { status: 500 }
    )
  }
}