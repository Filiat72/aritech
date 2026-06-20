import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

// PUT update admin — super_admin only
// Can update: name, role, isActive
export async function PUT(
  req: Request,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getServerSession(authOptions)

    if (!session || session.user.role !== 'super_admin') {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
    }

    const { id } = await context.params
    const body = await req.json()

    // Prevent super admin from deactivating themselves
    if (id === session.user.id && body.isActive === false) {
      return NextResponse.json(
        { error: 'You cannot deactivate your own account' },
        { status: 400 }
      )
    }

    // Prevent super admin from downgrading their own role
    if (id === session.user.id && body.role !== 'super_admin') {
      return NextResponse.json(
        { error: 'You cannot change your own role' },
        { status: 400 }
      )
    }

    const admin = await prisma.adminUser.update({
      where: { id },
      data: {
        name:     body.name,
        role:     body.role,
        isActive: body.isActive,
      },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        isActive: true,
        lastLoginAt: true,
        createdAt: true,
      }
    })

    return NextResponse.json(admin)
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to update admin' },
      { status: 500 }
    )
  }
}

// DELETE admin — super_admin only
export async function DELETE(
  req: Request,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getServerSession(authOptions)

    if (!session || session.user.role !== 'super_admin') {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
    }

    const { id } = await context.params

    // Prevent super admin from deleting themselves
    if (id === session.user.id) {
      return NextResponse.json(
        { error: 'You cannot delete your own account' },
        { status: 400 }
      )
    }

    await prisma.adminUser.delete({ where: { id } })

    return NextResponse.json({ success: true })
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to delete admin' },
      { status: 500 }
    )
  }
}