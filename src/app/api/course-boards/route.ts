import { NextResponse } from 'next/server'

import { prisma } from '@/lib/prisma'

/* ======================================================
   ADD COURSE BOARD
====================================================== */

export async function POST(req: Request) {
  try {
    const body = await req.json()

    const {
      board,
      courseId,
    } = body

    /* ======================================================
       VALIDATION
    ====================================================== */

    if (!board || !courseId) {
      return NextResponse.json(
        {
          error:
            'Board and courseId are required',
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
      await prisma.courseBoard.findFirst({
        where: {
          board,
          courseId,
        },
      })

    if (existing) {
      return NextResponse.json(
        {
          error:
            'Board already exists for this course',
        },
        {
          status: 400,
        }
      )
    }

    /* ======================================================
       CREATE BOARD
    ====================================================== */

    const courseBoard =
      await prisma.courseBoard.create({
        data: {
          board,
          courseId,
        },
      })

    return NextResponse.json(
      courseBoard
    )
  } catch (error) {
    console.error(error)

    return NextResponse.json(
      {
        error:
          'Failed to create board',
      },
      {
        status: 500,
      }
    )
  }
}

/* ======================================================
   DELETE BOARD
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
            'Board id is required',
        },
        {
          status: 400,
        }
      )
    }

    await prisma.courseBoard.delete({
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
          'Failed to delete board',
      },
      {
        status: 500,
      }
    )
  }
}