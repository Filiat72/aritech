import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function PUT(
  req: Request,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params
    const body = await req.json()
    const announcement = await prisma.announcement.update({
      where: { id },
      data: {
        title: body.title,
        message: body.message,
        isActive: body.isActive,
        expiresAt: body.expiresAt ? new Date(body.expiresAt) : null
      }
    })
    return NextResponse.json(announcement)
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to update announcement' },
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
    await prisma.announcement.delete({ where: { id } })
    return NextResponse.json({ success: true })
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to delete announcement' },
      { status: 500 }
    )
  }
}