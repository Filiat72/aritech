import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import bcrypt from 'bcryptjs'

// PUT /api/admins/[id]/password
// - Any admin can change their OWN password (must provide currentPassword)
// - Super admin can reset ANOTHER admin's password (no currentPassword needed)
export async function PUT(
  req: Request,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getServerSession(authOptions)
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { id } = await context.params
    const body = await req.json()
    const { currentPassword, newPassword } = body

    const isSelf = session.user.id === id
    const isSuperAdmin = session.user.role === 'super_admin'

    // An editor can only change their own password
    if (!isSelf && !isSuperAdmin) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
    }

    if (!newPassword || newPassword.length < 8) {
      return NextResponse.json(
        { error: 'New password must be at least 8 characters' },
        { status: 400 }
      )
    }

    const admin = await prisma.adminUser.findUnique({ where: { id } })
    if (!admin) {
      return NextResponse.json({ error: 'Admin not found' }, { status: 404 })
    }

    // Changing own password → must verify current password
    if (isSelf) {
      if (!currentPassword) {
        return NextResponse.json(
          { error: 'Current password is required' },
          { status: 400 }
        )
      }
      const match = await bcrypt.compare(currentPassword, admin.password)
      if (!match) {
        return NextResponse.json(
          { error: 'Current password is incorrect' },
          { status: 400 }
        )
      }
    }

    const hashedPassword = await bcrypt.hash(newPassword, 12)

    await prisma.adminUser.update({
      where: { id },
      data: { password: hashedPassword }
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to update password' },
      { status: 500 }
    )
  }
}