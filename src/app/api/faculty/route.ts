import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET() {
  try {
    const faculty = await prisma.faculty.findMany({
      orderBy: { createdAt: 'desc' }
    })
    return NextResponse.json(faculty)
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch faculty' },
      { status: 500 }
    )
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const faculty = await prisma.faculty.create({
      data: {
        name: body.name,
        bio: body.bio,
        experience: body.experience,
        subjects: body.subjects,
        isActive: true
      }
    })
    return NextResponse.json(faculty)
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to create faculty' },
      { status: 500 }
    )
  }
}