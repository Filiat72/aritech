import { NextResponse } from 'next/server'

import { prisma } from '@/lib/prisma'

/* ======================================================
   ADD COURSE MODE
====================================================== */

export async function POST(req: Request) {
  try {
    const body = await req.json()

    const {
      modeName,
      courseId,
    } = body

    /* ======================================================
       VALIDATION
    ====================================================== */

    if (!modeName || !courseId) {
      return NextResponse.json(
        {
          error:
            'Mode name and courseId are required',
        },
        {
          status: 400,
        }
      )
    }

    /* ======================================================
       CHECK DUPLICATE
    ====================================================== */

    const existing =
      await prisma.courseMode.findFirst({
        where: {
          modeName,
          courseId,
        },
      })

    if (existing) {
      return NextResponse.json(
        {
          error:
            'Mode already exists for this course',
        },
        {
          status: 400,
        }
      )
    }

    /* ======================================================
       CREATE MODE
    ====================================================== */

    const courseMode =
      await prisma.courseMode.create({
        data: {
          modeName,

          courseId,

          isActive: true,
        },
      })

    return NextResponse.json(
      courseMode
    )
  } catch (error) {
    console.error(error)

    return NextResponse.json(
      {
        error:
          'Failed to create mode',
      },
      {
        status: 500,
      }
    )
  }
}

/* ======================================================
   DELETE MODE
====================================================== */

export async function DELETE(
  req: Request
) {
  try {
    const { searchParams } =
      new URL(req.url)

    const id =
      searchParams.get('id')

    if (!id) {
      return NextResponse.json(
        {
          error:
            'Mode id is required',
        },
        {
          status: 400,
        }
      )
    }

    await prisma.courseMode.delete({
      where: { id },
    })

    return NextResponse.json({
      success: true,
    })
  } catch (error) {
    console.error(error)

    return NextResponse.json(
      {
        error:
          'Failed to delete mode',
      },
      {
        status: 500,
      }
    )
  }
}