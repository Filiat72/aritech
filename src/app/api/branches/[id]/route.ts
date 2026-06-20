import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function PUT(
  req: Request,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params
    const body = await req.json()
    const branch = await prisma.branch.update({
      where: { id },
      data: {
        name: body.name,
        slug: body.name.toLowerCase().replace(/\s+/g, '-'),
        address: body.address,
        city: body.city,
        phone: body.phone,
        mapUrl: body.mapUrl,
        isActive: body.isActive
      }
    })
    return NextResponse.json(branch)
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to update branch' },
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
    await prisma.branch.delete({
      where: { id }
    })
    return NextResponse.json({ success: true })
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to delete branch' },
      { status: 500 }
    )
  }
}