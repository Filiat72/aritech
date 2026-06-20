import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function PUT(
  req: Request,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params
    const body = await req.json()
    const faculty = await prisma.faculty.update({
      where: { id },
      data: {
        name: body.name,
        bio: body.bio,
        experience: body.experience,
        subjects: body.subjects,
        isActive: body.isActive
      }
    })
    return NextResponse.json(faculty)
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to update faculty' },
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
    await prisma.faculty.delete({ where: { id } })
    return NextResponse.json({ success: true })
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to delete faculty' },
      { status: 500 }
    )
  }
}