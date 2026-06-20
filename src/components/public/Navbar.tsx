'use client'

import {
  useState,
  useEffect,
  useRef,
} from 'react'
import {
  Link,
  usePathname,
  useRouter,
} from '@/i18n/navigation'

import {
  Menu,
  X,
  Phone,
  Globe,
  ChevronDown,
} from 'lucide-react'

import {
  useTranslations,
} from 'next-intl'

import logo from '@/assets/logo.jpg'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [languageOpen, setLanguageOpen] =
  useState(false)
const languageRef =
  useRef<HTMLDivElement>(null)
  const pathname = usePathname()
  const router = useRouter()

  const languages = [
  {
    code: 'en',
    label: 'English',
  },
  {
    code: 'ta',
    label: 'தமிழ்',
  },
  {
    code: 'hi',
    label: 'हिन्दी',
  },
  {
    code: 'ml',
    label: 'മലയാളം',
  },
  {
    code: 'kn',
    label: 'ಕನ್ನಡ',
  },
]

  // CURRENT LOCALE
  const localeMatch = pathname.match(
  /^\/(en|ta|hi|ml|kn)/
)

const currentLocale =
  localeMatch?.[1] || 'en'

  const t = useTranslations('navbar')

  // HOMEPAGE CHECK
 const isHomePage =
  pathname === '/' ||
  pathname === '/en' ||
  pathname === '/ta' ||
  pathname === '/hi' ||
  pathname === '/ml' ||
  pathname === '/kn'

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 20)
    }

    window.addEventListener('scroll', onScroll)

    return () =>
      window.removeEventListener('scroll', onScroll)
  }, [])

 
  useEffect(() => {
  function handleClickOutside(
    event: MouseEvent
  ) {
    if (
      languageRef.current &&
      !languageRef.current.contains(
        event.target as Node
      )
    ) {
      setLanguageOpen(false)
    }
  }

  document.addEventListener(
    'mousedown',
    handleClickOutside
  )

  return () => {
    document.removeEventListener(
      'mousedown',
      handleClickOutside
    )
  }
}, [])

  // NAV LINKS
  const navLinks = [
    {
      href: '/',
      label: t('home'),
    },

    {
      href: '/about',
      label: t('about'),
    },

    {
      href: '/courses',
      label: t('courses'),
    },

    {
      href: '/faculty',
      label: t('faculty'),
    },

    {
      href: '/results',
      label: t('results'),
    },

    {
      href: '/blog',
      label: t('blog'),
    },

    {
      href: '/contact',
      label: t('contact'),
    },
  ]

  return (
    <header
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
      style={{
        background: scrolled
          ? '#4063a2'
          : '#4063a2',

        backdropFilter: 'blur(10px)',

        boxShadow: scrolled
          ? '0 2px 20px rgba(0,0,0,0.08)'
          : 'none',

        borderBottom: 'none',
      }}
    >
      {/* NAVBAR */}

      <div className="max-w-7xl mx-auto px-4 h-[70px] flex items-center justify-between">

        {/* LOGO */}

        <Link
          href="/"
          className="flex items-center gap-2"
        >
          <div
            className="
              w-12
              h-12
              rounded-full
              bg-white
              flex
              items-center
              justify-center
              overflow-hidden
              flex-shrink-0
            "
          >
            <img
              src={logo.src}
              alt="Aritech Logo"
              className="
                w-10
                h-10
                object-contain
              "
            />
          </div>

          {/* TEXT */}

          <div className="leading-none">
            <p className="text-white font-black text-[15px] tracking-tight">
              ARITECH
            </p>

            <p
              className="text-[10px] mt-1 font-medium"
              style={{
                color: 'rgba(255,255,255,0.68)',
              }}
            >
              Digital Academy
            </p>
          </div>
        </Link>

        {/* DESKTOP NAV */}

        <nav className="hidden lg:flex items-center gap-1">

          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="
                px-3
                py-1.5
                rounded-lg
                text-[14px]
                font-medium
                transition-all
                duration-300
                hover:bg-white/5
              "
              style={{
                color:
                  pathname === link.href
                    ? '#ffffff'
                    : 'rgba(255,255,255,0.74)',

                background:
                  pathname === link.href
                    ? 'rgba(255,255,255,0.05)'
                    : 'transparent',
              }}
            >
              {link.label}
            </Link>
          ))}

         

          {/* LANGUAGE */}

<div
  ref={languageRef}
  className="relative"
>


  <button
    onClick={() =>
      setLanguageOpen(!languageOpen)
    }
    className="
      flex
      items-center
      gap-2
      px-3
      py-1.5
      rounded-lg
      text-[14px]
      hover:bg-white/5
      transition-all
      duration-300
    "
    style={{
      color: 'rgba(255,255,255,0.74)',
    }}
  >
    <Globe className="w-4 h-4" />

    <span>
      {
        languages.find(
          (l) =>
            l.code === currentLocale
        )?.label
      }
    </span>

    <ChevronDown className="w-4 h-4" />
  </button>

  {languageOpen && (
    <div
      className="
        absolute
        top-full
        right-0
        mt-2
        min-w-[160px]
        rounded-xl
        overflow-hidden
        bg-white
        shadow-xl
        z-50
      "
    >
      {languages.map((lang) => (
        <button
          key={lang.code}
          onClick={() => {
            const cleanPath =
              pathname.replace(
                /^\/(en|ta|hi|ml|kn)/,
                ''
              ) || '/'

            router.replace(
              cleanPath,
              {
                locale:
                  lang.code,
              }
            )

            setLanguageOpen(
              false
            )
          }}
          className="
            block
            w-full
            px-4
            py-3
            text-left
            text-sm
            hover:bg-gray-100
          "
        >
          {lang.label}
        </button>
      ))}
    </div>
  )}
</div>
        </nav>

        {/* RIGHT */}

        <div className="hidden lg:flex items-center gap-4">

          {/* PHONE */}

          <a
            href="tel:+919566656633"
            className="
              flex
              items-center
              gap-2
              text-[14px]
              transition-all
              duration-300
              hover:text-white
            "
            style={{
              color: 'rgba(255,255,255,0.74)',
            }}
          >
            <Phone className="w-4 h-4" />

            <span>
              +91 95666 56633
            </span>
          </a>

          {/* CTA */}

          <Link
            href="/book-demo"
            className="
              px-4
              h-9
              rounded-lg
              text-[14px]
              font-semibold
              transition-all
              duration-300
              flex
              items-center
              justify-center
              bg-white
              text-[#032EA8]
              hover:bg-[#F3F7FF]
            "
          >
            {t('demo')}
          </Link>
        </div>

        {/* MOBILE BUTTON */}

        <button
          suppressHydrationWarning
          className="
            lg:hidden
            text-white
            w-10
            h-10
            rounded-lg
            flex
            items-center
            justify-center
            bg-white/10
          "
          onClick={() =>
            setMobileOpen(!mobileOpen)
          }
        >
          {mobileOpen ? (
            <X className="w-5 h-5" />
          ) : (
            <Menu className="w-5 h-5" />
          )}
        </button>
      </div>

      {/* MOBILE MENU */}

      {mobileOpen && (
        <div
          className="
            lg:hidden
            px-4
            py-4
            space-y-1
          "
          style={{
            background:
              '#4063a2',
          }}
        >
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() =>
                setMobileOpen(false)
              }
              className="
                block
                px-4
                py-3
                rounded-lg
                text-sm
                font-medium
                transition-all
                duration-300
              "
              style={{
                color:
                  pathname === link.href
                    ? '#ffffff'
                    : 'rgba(255,255,255,0.74)',

                background:
                  pathname === link.href
                    ? 'rgba(255,255,255,0.05)'
                    : 'transparent',
              }}
            >
              {link.label}
            </Link>
          ))}

         

          {/* MOBILE LANGUAGE */}

<div className="px-4 py-3">
  <div
    className="
      text-xs
      uppercase
      text-white/50
      mb-2
    "
  >
    Language
  </div>

  <div className="space-y-1">
    {languages.map((lang) => (
      <button
        key={lang.code}
        onClick={() => {
          const cleanPath =
            pathname.replace(
              /^\/(en|ta|hi|ml|kn)/,
              ''
            ) || '/'

          router.replace(
            cleanPath,
            {
              locale:
                lang.code,
            }
          )

          setMobileOpen(false)
        }}
        className={`
          w-full
          text-left
          px-4
          py-3
          rounded-lg
          text-sm
          ${
            currentLocale ===
            lang.code
              ? 'bg-white text-[#032EA8]'
              : 'text-white/80 hover:bg-white/5'
          }
        `}
      >
        {lang.label}
      </button>
    ))}
  </div>
</div>

          {/* MOBILE CTA */}

          <Link
            href="/book-demo"
            onClick={() =>
              setMobileOpen(false)
            }
            className="
              block
              px-4
              py-3
              rounded-lg
              text-sm
              font-semibold
              text-center
              mt-3
              bg-white
              text-[#032EA8]
            "
          >
            {t('demo')}
          </Link>
        </div>
      )}

      {/* ANNOUNCEMENT */}

      {isHomePage && (
        <div
          className="
            h-10
            flex
            items-center
            justify-center
            px-4
            text-sm
            font-medium
            tracking-tight
          "
          style={{
            background: '#31446b',
            color: 'rgba(255,255,255,0.92)',
          }}
        >
          <div
            className="
              whitespace-nowrap
              overflow-hidden
              text-ellipsis
            "
          >
            Admissions Open for 2026 Batch —{' '}
            <span className="text-white/75">
              Book your free demo session today
            </span>
          </div>
        </div>
      )}
    </header>
  )
}