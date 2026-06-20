import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import bcrypt from 'bcryptjs'

// GET all admins — super_admin only
export async function GET() {
  try {
    const session = await getServerSession(authOptions)

    if (!session || session.user.role !== 'super_admin') {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
    }

    const admins = await prisma.adminUser.findMany({
      orderBy: { createdAt: 'desc' },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        isActive: true,
        lastLoginAt: true,
        createdBy: true,
        createdAt: true,
        // never return password
      }
    })

    return NextResponse.json(admins)
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch admins' },
      { status: 500 }
    )
  }
}

// POST create new admin — super_admin only
export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions)

    if (!session || session.user.role !== 'super_admin') {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
    }

    const body = await req.json()
    const { name, email, password, role } = body

    if (!name || !email || !password) {
      return NextResponse.json(
        { error: 'Name, email and password are required' },
        { status: 400 }
      )
    }

    // Check if email already exists
    const existing = await prisma.adminUser.findUnique({ where: { email } })
    if (existing) {
      return NextResponse.json(
        { error: 'An admin with this email already exists' },
        { status: 409 }
      )
    }

    const hashedPassword = await bcrypt.hash(password, 12)

    const admin = await prisma.adminUser.create({
      data: {
        name,
        email,
        password: hashedPassword,
        role: role ?? 'editor',
        isActive: true,
        createdBy: session.user.id,
      },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        isActive: true,
        createdAt: true,
      }
    })

    return NextResponse.json(admin)
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to create admin' },
      { status: 500 }
    )
  }
}