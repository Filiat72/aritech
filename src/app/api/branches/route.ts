import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET() {
  try {
    const branches = await prisma.branch.findMany({
      orderBy: { createdAt: 'desc' }
    })
    return NextResponse.json(branches)
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch branches' },
      { status: 500 }
    )
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const branch = await prisma.branch.create({
      data: {
        name: body.name,
        slug: body.name.toLowerCase().replace(/\s+/g, '-'),
        address: body.address,
        city: body.city,
        phone: body.phone,
        mapUrl: body.mapUrl,
        isActive: true
      }
    })
    return NextResponse.json(branch)
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to create branch' },
      { status: 500 }
    )
  }
}