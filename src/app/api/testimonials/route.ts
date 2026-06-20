import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

/* ====================================================
    GET ALL TESTIMONIALS
==================================================== */

export async function GET() {
  try {
    const testimonials =
      await prisma.testimonial.findMany({
        orderBy: {
          createdAt: 'desc',
        },
      })

    return NextResponse.json(testimonials)
  } catch (error) {
    return NextResponse.json(
      {
        error: 'Failed to fetch testimonials',
      },
      {
        status: 500,
      }
    )
  }
}

/* ====================================================
    CREATE TESTIMONIAL
==================================================== */

export async function POST(req: Request) {
  try {
    const body = await req.json()

    const testimonial =
      await prisma.testimonial.create({
        data: {
          studentName: body.studentName,

          /* NEW */
          photo: body.photo,

          quote: body.quote,

          course: body.course,

          branch: body.branch,

          isActive: true,
        },
      })

    return NextResponse.json(testimonial)
  } catch (error) {
    return NextResponse.json(
      {
        error: 'Failed to create testimonial',
      },
      {
        status: 500,
      }
    )
  }
}