import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET() {
  try {
    const results = await prisma.result.findMany({
      where: {
        isActive: true,
      },

      orderBy: [
        {
          isFeatured: 'desc',
        },
        {
          createdAt: 'desc',
        },
      ],
    })

    return NextResponse.json(results)
  } catch (error) {
    console.error('GET RESULTS ERROR:', error)

    return NextResponse.json(
      { error: 'Failed to fetch results' },
      { status: 500 }
    )
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json()

    /* basic validation */
    if (
      !body.studentName?.trim() ||
      !body.result?.trim() ||
      !body.examType?.trim() ||
      !body.year?.trim()
    ) {
      return NextResponse.json(
        { error: 'Required fields are missing' },
        { status: 400 }
      )
    }

    const result = await prisma.result.create({
      data: {
        studentName: body.studentName.trim(),

        photo: body.photo || null,

        result: body.result.trim(),

        examType: body.examType.trim(),

        year: body.year.trim(),

        achievement: body.achievement?.trim() || null,

        isFeatured: body.isFeatured ?? false,

        isActive: body.isActive ?? true,
      },
    })

    return NextResponse.json(result)
  } catch (error) {
    console.error('CREATE RESULT ERROR:', error)

    return NextResponse.json(
      { error: 'Failed to create result' },
      { status: 500 }
    )
  }
}