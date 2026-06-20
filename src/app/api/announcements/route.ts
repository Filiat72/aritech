import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET() {
  try {
    const announcements = await prisma.announcement.findMany({
      orderBy: { createdAt: 'desc' }
    })
    return NextResponse.json(announcements)
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch announcements' },
      { status: 500 }
    )
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const announcement = await prisma.announcement.create({
      data: {
        title: body.title,
        message: body.message,
        isActive: true,
        expiresAt: body.expiresAt ? new Date(body.expiresAt) : null
      }
    })
    return NextResponse.json(announcement)
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to create announcement' },
      { status: 500 }
    )
  }
}