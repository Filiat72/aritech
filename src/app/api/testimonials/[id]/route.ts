import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

/* ====================================================
    UPDATE TESTIMONIAL
==================================================== */

export async function PUT(
  req: Request,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params

    const body = await req.json()

    const testimonial =
      await prisma.testimonial.update({
        where: {
          id,
        },

        data: {
          studentName: body.studentName,

          /* NEW */
          photo: body.photo,

          quote: body.quote,

          course: body.course,

          branch: body.branch,

          isActive: body.isActive,
        },
      })

    return NextResponse.json(testimonial)
  } catch (error) {
    return NextResponse.json(
      {
        error: 'Failed to update testimonial',
      },
      {
        status: 500,
      }
    )
  }
}

/* ====================================================
    DELETE TESTIMONIAL
==================================================== */

export async function DELETE(
  req: Request,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params

    await prisma.testimonial.delete({
      where: {
        id,
      },
    })

    return NextResponse.json({
      success: true,
    })
  } catch (error) {
    return NextResponse.json(
      {
        error: 'Failed to delete testimonial',
      },
      {
        status: 500,
      }
    )
  }
}