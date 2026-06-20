import { PrismaClient } from '../generated/prisma'

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined
}

function effectiveDatabaseUrl(): string | undefined {
  const url = process.env.DATABASE_URL

  if (!url) return undefined

  const isPooler =
    url.includes('pooler.supabase.com') ||
    url.includes(':6543') ||
    process.env.PRISMA_USE_SINGLE_CONNECTION === 'true'

  if (!isPooler) return url

  try {
    const parsed = new URL(url)

    if (!parsed.searchParams.has('pgbouncer')) {
      parsed.searchParams.set('pgbouncer', 'true')
    }

    if (!parsed.searchParams.has('connection_limit')) {
      parsed.searchParams.set('connection_limit', '5')
    }

    if (!parsed.searchParams.has('pool_timeout')) {
      parsed.searchParams.set('pool_timeout', '20')
    }

    return parsed.toString()
  } catch {
    return url
  }
}

const effectiveUrl = effectiveDatabaseUrl()

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    datasources: {
      db: {
        url: effectiveUrl ?? process.env.DATABASE_URL,
      },
    },
    log: ['error', 'warn'],
  })

if (process.env.NODE_ENV !== 'production') {
  globalForPrisma.prisma = prisma
}