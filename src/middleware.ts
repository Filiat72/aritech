import { withAuth, NextRequestWithAuth } from 'next-auth/middleware'
import { NextResponse } from 'next/server'

const locales = ['en', 'ta', 'hi', 'ml', 'kn']
const defaultLocale = 'en'

export default withAuth(
  function middleware(req: NextRequestWithAuth) {
    const { pathname } = req.nextUrl
    const role = req.nextauth.token?.role as string | undefined

    // =========================
    // ADMIN AUTH PROTECTION
    // =========================

    if (
      pathname.startsWith('/admin/admins') &&
      role !== 'super_admin'
    ) {
      return NextResponse.redirect(
        new URL('/admin/dashboard', req.url)
      )
    }

    // =========================
    // SKIP LOCALE FOR:
    // - admin
    // - api
    // - next internals
    // =========================

    if (
      pathname.startsWith('/admin') ||
      pathname.startsWith('/api') ||
      pathname.startsWith('/_next') ||
      pathname.includes('.')
    ) {
      return NextResponse.next()
    }

    // =========================
    // LOCALE HANDLING
    // =========================

    const pathnameHasLocale = locales.some(
      (locale) =>
        pathname.startsWith(`/${locale}/`) ||
        pathname === `/${locale}`
    )

    if (!pathnameHasLocale) {
      const locale = defaultLocale

      return NextResponse.redirect(
        new URL(`/${locale}${pathname}`, req.url)
      )
    }

    return NextResponse.next()
  },
  {
    callbacks: {
      authorized: ({ token, req }) => {
        const pathname = req.nextUrl.pathname

        // Public routes should bypass auth
        if (
          !pathname.startsWith('/admin')
        ) {
          return true
        }

        return !!token
      },
    },

    pages: {
      signIn: '/admin/login',
    },
  }
)

export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - static files
     * - images
     * - favicon
     */
    '/((?!_next/static|_next/image|favicon.ico).*)',
  ],
}