import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function PUT(
  req: Request,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params

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

    const updatedResult = await prisma.result.update({
      where: {
        id,
      },

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

    return NextResponse.json(updatedResult)
  } catch (error) {
    console.error('UPDATE RESULT ERROR:', error)

    return NextResponse.json(
      { error: 'Failed to update result' },
      { status: 500 }
    )
  }
}

export async function DELETE(
  req: Request,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params

    await prisma.result.delete({
      where: {
        id,
      },
    })

    return NextResponse.json({
      success: true,
    })
  } catch (error) {
    console.error('DELETE RESULT ERROR:', error)

    return NextResponse.json(
      { error: 'Failed to delete result' },
      { status: 500 }
    )
  }
}