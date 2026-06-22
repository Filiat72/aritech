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
  const [coursesOpen, setCoursesOpen] = useState(false)
const [mobileCoursesOpen, setMobileCoursesOpen] =
  useState(false)
const [courseCategories, setCourseCategories] = useState<any[]>([])
  const [languageOpen, setLanguageOpen] =
  useState(false)

  const [announcement, setAnnouncement] =
  useState<any>(null)
const languageRef =
  useRef<HTMLDivElement>(null)
  const coursesRef =
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

  if (
    coursesRef.current &&
    !coursesRef.current.contains(
      event.target as Node
    )
  ) {
    setCoursesOpen(false)
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

useEffect(() => {
  fetchCourseCategories()
}, [])

async function fetchCourseCategories() {
  try {
   const res = await fetch(
  '/api/course-categories?withCoursesOnly=true'
)

    const data = await res.json()

    setCourseCategories(data || [])
  } catch (error) {
    console.error(error)
  }
}

useEffect(() => {
  fetchAnnouncement()
}, [])

async function fetchAnnouncement() {
  try {
    const res = await fetch(
      '/api/announcements'
    )

    const data = await res.json()

    const activeAnnouncement =
      data.find(
        (item: any) =>
          item.isActive
      )

    setAnnouncement(
      activeAnnouncement || null
    )
  } catch (error) {
    console.error(error)
  }
}

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

    // {
    //   href: '/courses',
    //   label: t('courses'),
    // },

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

      <div className="max-w-7xl mx-auto px-4 h-[80px] flex items-center justify-between">

        {/* LOGO */}

        <Link
          href="/"
          className="flex items-center gap-2"
        >
       <div
  className="
    w-[70px]
    h-[70px]
    rounded-2xl
    bg-white
    flex
    items-center
    justify-center
    overflow-hidden
    flex-shrink-0
    shadow-sm
  "
>
            <img
              src={logo.src}
              alt="Aritech Logo"
              className="
                w-[72px]
                h-[72px]
                object-contain
              "
            />
          </div>

          {/* TEXT */}

          <div className="leading-none">
            <p className="text-white font-semibold text-[20px] leading-none">
              ARITECH
            </p>

            <p
              className="text-[12px] mt-1 font-medium tracking-wide"
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

{/* COURSES DROPDOWN */}

<div
  ref={coursesRef}
  className="relative"
  onMouseEnter={() =>
    setCoursesOpen(true)
  }
>
  <button
    
    className="
      flex
      items-center
      gap-1
      px-3
      py-1.5
      rounded-lg
      text-[14px]
      font-medium
      hover:bg-white/5
    "
    style={{
      color:
        'rgba(255,255,255,0.74)',
    }}
  >
    Courses

    <ChevronDown
  className={`w-4 h-4 transition-transform duration-200 ${
    coursesOpen
      ? 'rotate-180'
      : 'rotate-0'
  }`}
/>
  </button>

  <div
  onMouseLeave={() =>
    setCoursesOpen(false)
  }
  className={`
    absolute
    top-full
    right-0
    mt-2
    w-[320px]
    bg-white
    rounded-xl
    shadow-[0_20px_60px_rgba(0,0,0,0.15)]
    p-3
    z-50
    max-h-[500px]
    overflow-y-auto

    transition-all
    duration-300
    ease-out

    ${
      coursesOpen
        ? `
          opacity-100
          translate-y-0
          scale-100
          visible
        `
        : `
          opacity-0
          -translate-y-2
          scale-95
          invisible
          pointer-events-none
        `
    }
  `}
>
      {courseCategories.map(
        (category) => (
          <div
  key={category.id}
  className="
    relative
    p-4
    rounded-xl
    border
    border-slate-100
    hover:border-blue-100
    hover:bg-slate-50
    transition-all
    duration-200
  "
>
          <div
                  className="
                    absolute
                    left-0
                    top-6
                    w-[4px]
                    h-12
                    rounded-r-full
                  "
                  style={{
                    background: '#4063a2',
                  }}
                />
           <Link
  href={`/courses?category=${category.slug}`}
  onClick={() =>
    setCoursesOpen(false)
  }
  className="
    block
    font-semibold
    text-slate-900
    text-[15px]
  "
>
  {category.name}
</Link>

{/* <p className="text-xs text-slate-500 mt-1 mb-3">
  {category.courses?.length || 0} Programs
</p> */}

            {category.courses?.map(
              (course: any) => (
              <Link
  key={course.id}
  href={`/courses/${course.slug}`}
  onClick={() =>
    setCoursesOpen(false)
  }
                  className="
  block
  py-2
  px-3
  rounded-lg
  text-sm
  text-slate-600
  hover:bg-blue-50
  hover:text-blue-600
  transition-all
"
                >
                  {course.title}
                </Link>
              )
            )}
          </div>
        )
      )}
    </div>
  
</div>

         

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

       <ChevronDown
  className={`w-4 h-4 transition-transform duration-200 ${
    languageOpen
      ? 'rotate-180'
      : 'rotate-0'
  }`}
/>
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
              +91 9500020181
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

<div
  className={`
    fixed
    inset-0
    bg-black/40
    z-30
    transition-opacity
    duration-300
    ${
      mobileOpen
        ? 'opacity-100'
        : 'opacity-0 pointer-events-none'
    }
  `}
  onClick={() => {
    setMobileOpen(false)
    setMobileCoursesOpen(false)
  }}
/>

      {/* MOBILE MENU */}

      
        <div
  className={`
    lg:hidden
    fixed
    top-[70px]
    left-0
    h-[calc(100vh-70px)]
    w-[90vw]
    max-w-[380px]
    overflow-y-auto
    bg-[#4063a2]
    z-40

    transform
    transition-transform
    duration-300
    ease-in-out

    ${
      mobileOpen
        ? 'translate-x-0'
        : '-translate-x-full'
    }
  `}
>
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
             onClick={() => {
  setMobileOpen(false)
  setMobileCoursesOpen(false)
}}
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

         
{/* MOBILE COURSES */}

<div className="px-4 pt-2 pb-0">

  <button
    onClick={() =>
      setMobileCoursesOpen(
        !mobileCoursesOpen
      )
    }
    className="
      w-full
      flex
      items-center
      justify-between
      px-4
      py-3
      rounded-lg
      text-white
      hover:bg-white/5
    "
  >
    <span className="font-medium">
  Courses
</span>

    <ChevronDown
      className={`w-4 h-4 transition-transform duration-300 ${
        mobileCoursesOpen
          ? 'rotate-180'
          : ''
      }`}
    />
  </button>

  {mobileCoursesOpen && (
  <div className="mt-1 ml-3 space-y-1">

      {courseCategories.map(
        (category) => (
          <Link
            key={category.id}
            href={`/courses?category=${category.slug}`}
            onClick={() => {
              setMobileOpen(false)
              setMobileCoursesOpen(false)
            }}
            className="
              block
              px-4
              py-2
              rounded-lg
              text-sm
              text-white/80
              hover:bg-white/5
            "
          >
            {category.name}
          </Link>
        )
      )}

    </div>
  )}
</div>


          {/* MOBILE LANGUAGE */}
<div className="px-4 pt-2 pb-3">
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
      

      {/* ANNOUNCEMENT */}

     {isHomePage &&
  announcement?.title &&
  announcement?.message && (
  <div
    className="
      h-10
      overflow-hidden
      flex
      items-center
    "
    style={{
      background: '#31446b',
      color: 'rgba(255,255,255,0.92)',
    }}
  >

    <div
  className="
    flex-shrink-0
    px-4
    h-full
    flex
    items-center
    font-semibold
    text-xs
    uppercase
  "
  style={{
    background: '#24385d'
  }}
>
  📢 Announcement
</div>
    <div
  className="
    flex-1
    overflow-hidden
  "
>
  <div className="announcement-track">
    {[1, 2, 3, 4].map((item) => (
      <span
        key={item}
        className="mx-12 text-sm font-medium"
      >
        {announcement.title}
        {' — '}
        {announcement.message}
      </span>
    ))}
  </div>
</div>
  </div>
)}
    </header>
  )
}