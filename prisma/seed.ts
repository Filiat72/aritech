import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  // Check if super admin already exists — don't duplicate
  const existing = await prisma.adminUser.findUnique({
    where: { email: 'admin@aritech.com' }
  })

  if (existing) {
    console.log('✅ Super Admin already exists — skipping seed.')
    return
  }

  const hashedPassword = await bcrypt.hash('Admin@123', 12)

  const admin = await prisma.adminUser.create({
    data: {
      email: 'admin@aritech.com',
      password: hashedPassword,
      name: 'Super Admin',
      role: 'super_admin',
      isActive: true,
    }
  })

  console.log('✅ Super Admin created:', admin.email)
  console.log('📧 Email   :', admin.email)
  console.log('🔑 Password: Admin@123  ← change this after first login!')
}

main()
  .catch((e) => {
    console.error('❌ Seed failed:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })