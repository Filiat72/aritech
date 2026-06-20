'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useSession } from 'next-auth/react'

import {
  LayoutDashboard,
  BookOpen,
  MapPin,
  Users,
  FileText,
  Trophy,
  MessageSquare,
  Megaphone,
  LogOut,
  ChevronRight,
  GraduationCap,
  Shield,
  Menu,
  X,
} from 'lucide-react'

const navItems = [
  {
    href: '/admin/dashboard',
    label: 'Dashboard',
    icon: LayoutDashboard,
  },

  {
    href: '/admin/courses',
    label: 'Courses',
    icon: BookOpen,
  },

  {
    href: '/admin/branches',
    label: 'Branches',
    icon: MapPin,
  },

  {
    href: '/admin/faculty',
    label: 'Faculty',
    icon: Users,
  },

  {
    href: '/admin/blog',
    label: 'Blog',
    icon: FileText,
  },

  {
    href: '/admin/results',
    label: 'Results',
    icon: Trophy,
  },

  {
    href: '/admin/testimonials',
    label: 'Testimonials',
    icon: MessageSquare,
  },

  {
    href: '/admin/announcements',
    label: 'Announcements',
    icon: Megaphone,
  },
]

const allNavItems = [
  ...navItems,

  {
    href: '/admin/admins',
    label: 'Admins',
    icon: Shield,
  },
]

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  /* ======================================================
      STATES
  ====================================================== */

  const [expanded, setExpanded] =
    useState(false)

  const [drawerOpen, setDrawerOpen] =
    useState(false)

  const [
    showLogoutConfirm,
    setShowLogoutConfirm,
  ] = useState(false)

  const [isMobile, setIsMobile] =
    useState(false)

  /* ======================================================
      HOOKS
  ====================================================== */

  const pathname = usePathname()

  const { data: session } =
    useSession()

  const isSuperAdmin =
    session?.user.role ===
    'super_admin'

  const visibleNavItems =
    isSuperAdmin
      ? allNavItems
      : navItems

  /* ======================================================
      MOBILE DETECTION
  ====================================================== */

  useEffect(() => {
    const check = () =>
      setIsMobile(
        window.innerWidth < 1024
      )

    check()

    window.addEventListener(
      'resize',
      check
    )

    return () =>
      window.removeEventListener(
        'resize',
        check
      )
  }, [])

  /* ======================================================
      CLOSE DRAWER ON ROUTE CHANGE
  ====================================================== */

  useEffect(() => {
    setDrawerOpen(false)
  }, [pathname])

  /* ======================================================
      LOGOUT
  ====================================================== */

  const confirmLogout = () => {
    setShowLogoutConfirm(false)

    window.location.assign(
      '/admin/login'
    )
  }

  /* ======================================================
      SKIP LOGIN LAYOUT
  ====================================================== */

  if (
    pathname === '/admin/login'
  ) {
    return <>{children}</>
  }

  /* ======================================================
      NAV CONTENT
  ====================================================== */

  const NavContent = ({
    showLabels,
  }: {
    showLabels: boolean
  }) => (
    <>

      {/* LOGO */}

      <div
        className="
          flex
          items-center
          gap-3
          overflow-hidden
          h-[72px]
          px-4
          flex-shrink-0
        "
        style={{
          borderBottom:
            '1px solid rgba(255,255,255,0.10)',
        }}
      >

        <div
          className="
            flex-shrink-0
            w-9
            h-9
            rounded-xl
            flex
            items-center
            justify-center
            font-black
            text-sm
          "
          style={{
            background: '#2563eb',

            color: '#ffffff',

            boxShadow:
              '0 2px 8px rgba(37,99,235,0.5)',
          }}
        >
          A
        </div>

        {showLabels && (

          <div className="overflow-hidden whitespace-nowrap">

            <p
              className="
                font-black
                text-sm
                tracking-widest
                text-white
              "
            >
              ARITECH
            </p>

            <p
              className="text-xs"
              style={{
                color: '#93c5fd',
              }}
            >
              Admin Panel
            </p>

          </div>
        )}

        {/* MOBILE CLOSE */}

        {showLabels &&
          isMobile && (

            <button
              onClick={() =>
                setDrawerOpen(false)
              }
              className="
                ml-auto
                p-1
                rounded-lg
                transition-colors
              "
              style={{
                color:
                  'rgba(255,255,255,0.6)',
              }}
            >
              <X className="w-5 h-5" />
            </button>
          )}

      </div>

      {/* NAVIGATION */}

      <nav
        className="
          flex-1
          py-4
          space-y-1
          px-2
          overflow-y-auto
        "
      >

        {visibleNavItems.map(
          item => {
            const Icon =
              item.icon

            const isActive =
              pathname ===
              item.href

            const isAdminsItem =
              item.href ===
              '/admin/admins'

            return (

              <div
                key={item.href}
              >

                {isAdminsItem && (

                  <div
                    className="
                      mx-2
                      my-2
                    "
                    style={{
                      borderTop:
                        '1px solid rgba(255,255,255,0.10)',
                    }}
                  />
                )}

                <Link
                  href={item.href}
                  className="
                    flex
                    items-center
                    gap-3
                    px-2.5
                    py-2.5
                    rounded-xl
                    transition-all
                    duration-200
                    group
                    overflow-hidden
                  "
                  style={{
                    background:
                      isActive
                        ? '#31446b'
                        : 'transparent',

                    border:
                      isActive
                        ? '1px solid rgba(96,165,250,0.40)'
                        : '1px solid transparent',
                  }}
                  onMouseEnter={e => {
                    if (
                      !isActive
                    ) {
                      e.currentTarget.style.background =
                        'rgba(255,255,255,0.08)'
                    }
                  }}
                  onMouseLeave={e => {
                    if (
                      !isActive
                    ) {
                      e.currentTarget.style.background =
                        'transparent'
                    }
                  }}
                >

                  <Icon
                    className="
                      flex-shrink-0
                      w-5
                      h-5
                      transition-colors
                    "
                    style={{
                      color:
                        isActive
                          ? '#FFFFFF'
                          : isAdminsItem
                          ? '#c4b5fd'
                          : 'rgba(255,255,255,0.55)',
                    }}
                  />

                  {showLabels && (

                    <span
                      className="
                        text-sm
                        font-medium
                        whitespace-nowrap
                        transition-colors
                      "
                      style={{
                        color:
                          isActive
                            ? '#ffffff'
                            : isAdminsItem
                            ? '#c4b5fd'
                            : 'rgba(255,255,255,0.65)',
                      }}
                    >
                      {item.label}
                    </span>
                  )}

                  {showLabels &&
                    isActive && (

                      <ChevronRight
                        className="
                          ml-auto
                          w-4
                          h-4
                          flex-shrink-0
                        "
                        style={{
                          color:
                            '#31446b',
                        }}
                      />
                    )}

                </Link>

              </div>
            )
          }
        )}

      </nav>

    </>
  )

  return (
    <div
      className="flex min-h-screen"
      style={{
        background: '#eff6ff',
      }}
    >

   {/* DESKTOP SIDEBAR */}

<aside
  className="
    hidden
    lg:flex
    flex-col
    transition-all
    duration-300
    ease-in-out
    fixed
    top-0
    left-0
    z-40
  "
  style={{
    width: expanded
      ? '240px'
      : '68px',

    height: '100vh',

    background:
      '#4063a2',

    boxShadow:
      '4px 0 24px rgba(13,37,128,0.18)',
  }}
  onMouseEnter={() =>
    setExpanded(true)
  }
  onMouseLeave={() =>
    setExpanded(false)
  }
>
  <NavContent
    showLabels={expanded}
  />
</aside>

      {/* MOBILE OVERLAY */}

      {isMobile &&
        drawerOpen && (

          <div
            className="
              fixed
              inset-0
              z-40
            "
            style={{
              background:
                'rgba(13,37,128,0.45)',
            }}
            onClick={() =>
              setDrawerOpen(false)
            }
          />
        )}

      {/* MOBILE DRAWER */}

      <aside
        className="
          lg:hidden
          fixed
          top-0
          left-0
          h-full
          z-50
          flex
          flex-col
          transition-transform
          duration-300
          ease-in-out
        "
        style={{
          width: '260px',

          background:
            '#4063a2',

          boxShadow:
            '4px 0 24px rgba(13,37,128,0.25)',

          transform:
            drawerOpen
              ? 'translateX(0)'
              : 'translateX(-100%)',
        }}
      >
        <NavContent showLabels />
      </aside>

      {/* MAIN */}

      <main
  className="
    flex-1
    overflow-auto
    min-w-0
  "
  style={{
    marginLeft:
      !isMobile
        ? expanded
          ? '240px'
          : '68px'
        : '0px',

    transition:
      'margin-left 0.3s ease-in-out',
  }}
>

        {/* TOPBAR */}

        <div
          className="
            h-[64px]
            lg:h-[72px]
            flex
            items-center
            justify-between
            px-4
            lg:px-8
            sticky
            top-0
            z-30
          "
          style={{
            background:
              '#ffffff',

            borderBottom:
              '1px solid #bfdbfe',

            boxShadow:
              '0 1px 0 #dbeafe',
          }}
        >

          {/* LEFT */}

          <div className="flex items-center gap-3">

            <button
              className="
                lg:hidden
                p-2
                rounded-xl
                transition-colors
              "
              style={{
                color:
                  '#0d2580',
              }}
              onClick={() =>
                setDrawerOpen(true)
              }
            >
              <Menu className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-2">

              <GraduationCap
                className="
                  hidden
                  sm:block
                  w-5
                  h-5
                "
                style={{
                  color:
                    '#2563eb',
                }}
              />

              <span
                className="
                  font-semibold
                  text-sm
                "
                style={{
                  color:
                    '#0d2580',
                }}
              >
                {allNavItems.find(
                  n =>
                    n.href ===
                    pathname
                )?.label ||
                  'Admin'}
              </span>

            </div>

          </div>

          {/* RIGHT */}

          <div className="flex items-center gap-3">

            {/* USER */}

            <div className="text-right hidden sm:block">

              <p
                className="
                  text-sm
                  font-semibold
                "
                style={{
                  color:
                    '#0d2580',
                }}
              >
                {session?.user
                  .name ??
                  'Admin'}
              </p>

              <p
                className="
                  text-xs
                "
                style={{
                  color:
                    '#4a6090',
                }}
              >
                {session?.user
                  .email ??
                  ''}
              </p>

            </div>

            {/* AVATAR */}

            <div
              className="
                w-9
                h-9
                rounded-xl
                flex
                items-center
                justify-center
                font-bold
                text-sm
                text-white
                flex-shrink-0
              "
              style={{
                background:
                  isSuperAdmin
                    ? 'linear-gradient(135deg, #7c3aed 0%, #6d28d9 100%)'
                    : 'linear-gradient(135deg, #1a3fca 0%, #2563eb 100%)',

                boxShadow:
                  '0 2px 8px rgba(37,99,235,0.35)',
              }}
            >
              {session?.user.name
                ?.charAt(0)
                .toUpperCase() ??
                'A'}
            </div>

            {/* LOGOUT */}

            <button
              onClick={() =>
                setShowLogoutConfirm(
                  true
                )
              }
              className="
                flex
                items-center
                gap-2
                px-3
                py-2
                rounded-xl
                transition-all
                text-sm
                font-medium
              "
              style={{
                color:
                  '#dc2626',

                background:
                  '#fef2f2',

                border:
                  '1px solid #fecaca',
              }}
            >

              <LogOut className="w-4 h-4" />

              <span className="hidden sm:inline">
                Logout
              </span>

            </button>

          </div>

        </div>

        {/* PAGE */}

        <div className="p-4 lg:p-8">

          <div
            className="
              rounded-2xl
              p-4
              lg:p-6
              border
              min-h-[calc(100vh-112px)]
              lg:min-h-[calc(100vh-140px)]
            "
            style={{
              background:
                '#ffffff',

              borderColor:
                '#bfdbfe',

              boxShadow:
                '0 2px 16px rgba(37,99,235,0.06)',
            }}
          >
            {children}
          </div>

        </div>

      </main>

      {/* LOGOUT MODAL */}

      {showLogoutConfirm && (

        <div
          className="
            fixed
            inset-0
            z-50
            flex
            items-center
            justify-center
            px-4
          "
          style={{
            background:
              'rgba(13, 37, 128, 0.42)',
          }}
        >

          <div
            className="
              w-full
              max-w-md
              rounded-2xl
              border
              p-6
            "
            style={{
              background:
                '#ffffff',

              borderColor:
                '#bfdbfe',

              boxShadow:
                '0 16px 48px rgba(13, 37, 128, 0.22)',
            }}
          >

            <div className="mb-5">

              <h2
                className="
                  text-lg
                  font-bold
                "
                style={{
                  color:
                    '#0d2580',
                }}
              >
                Confirm logout
              </h2>

              <p
                className="mt-1 text-sm"
                style={{
                  color:
                    '#4a6090',
                }}
              >
                Are you sure you want to logout from the admin panel?
              </p>

            </div>

            <div
              className="
                flex
                items-center
                justify-end
                gap-3
              "
            >

              <button
                type="button"
                onClick={() =>
                  setShowLogoutConfirm(
                    false
                  )
                }
                className="
                  rounded-xl
                  px-4
                  py-2
                  text-sm
                  font-semibold
                  transition-colors
                "
                style={{
                  color:
                    '#4063a2',

                  background:
                    '#eff6ff',

                  border:
                    '1px solid #4062a2b3',
                }}
              >
                Cancel
              </button>

              <button
                type="button"
                onClick={
                  confirmLogout
                }
                className="
                  rounded-xl
                  px-4
                  py-2
                  text-sm
                  font-semibold
                  text-white
                  transition-opacity
                "
                style={{
                  background:
                    '#31446b',
                }}
              >
                Logout
              </button>

            </div>

          </div>

        </div>
      )}

    </div>
  )
}