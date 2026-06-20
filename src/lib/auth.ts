import type { NextAuthOptions } from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import bcrypt from 'bcryptjs'
import { prisma } from '@/lib/prisma'

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null

        try {
          const admin = await prisma.adminUser.findUnique({
            where: { email: credentials.email },
          })

          if (!admin) return null

          if (!admin.isActive) return null

          const passwordMatch = await bcrypt.compare(
            credentials.password,
            admin.password,
          )

          if (!passwordMatch) return null

          // Record last login time (non-blocking)
          prisma.adminUser.update({
            where: { id: admin.id },
            data: { lastLoginAt: new Date() },
          }).catch(() => {})

          return {
            id: admin.id,
            email: admin.email,
            name: admin.name,
            role: admin.role,
          }
        } catch (err) {
          console.error('Auth error:', err)
          return null
        }
      },
    }),
  ],

  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id   = user.id
        token.role = (user as { role?: string }).role ?? ''
      }
      return token
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id   = token.id   as string
        session.user.role = token.role as string
      }
      return session
    },
  },

  pages: {
    signIn: '/admin/login',
  },
  session: {
    strategy: 'jwt',
    maxAge: 8 * 60 * 60, 
  },
  secret: process.env.NEXTAUTH_SECRET,
}