'use client'

import {
  useState,
  useEffect,
} from 'react'

import Image from 'next/image'

import { useLocale } from 'next-intl'
import { useTranslations } from 'next-intl'

import { Link } from '@/i18n/navigation'

import { container } from '@/styles/layout'

import {
  heroHeading,
  heroDescription,
  badgeText,
  buttonText,
  getTypography,
} from '@/styles/typography'

import {
  ArrowRight,
  Play,
} from 'lucide-react'

// ─────────────────────────────────────────────────────────────
// TYPEWRITER WORDS
// ─────────────────────────────────────────────────────────────

const WORDS = [
  'Future',
  'Career',
  'Skills',
  'Success',
]

// ─────────────────────────────────────────────────────────────
// TYPEWRITER HOOK
// ─────────────────────────────────────────────────────────────

function useTypewriter(words: string[]) {
  const [index, setIndex] = useState(0)

  const [subIndex, setSubIndex] =
    useState(0)

  const [deleting, setDeleting] =
    useState(false)

  useEffect(() => {
    if (
      !deleting &&
      subIndex === words[index].length
    ) {
      const timeout = setTimeout(
        () => setDeleting(true),
        1200
      )

      return () => clearTimeout(timeout)
    }

    if (deleting && subIndex === 0) {
      setDeleting(false)

      setIndex(
        (prev) => (prev + 1) % words.length
      )
    }

    const timeout = setTimeout(
      () => {
        setSubIndex(
          (prev) =>
            prev + (deleting ? -1 : 1)
        )
      },
      deleting ? 45 : 85
    )

    return () => clearTimeout(timeout)
  }, [
    subIndex,
    index,
    deleting,
    words,
  ])

  return words[index].substring(
    0,
    subIndex
  )
}

// ─────────────────────────────────────────────────────────────
// HERO SECTION
// ─────────────────────────────────────────────────────────────

export default function HeroSection() {
  const typed = useTypewriter(WORDS)

  const locale = useLocale()






  const t = useTranslations('home')

  // ───────────────────────────────────────────────────────────
  // MOUSE PARALLAX
  // ───────────────────────────────────────────────────────────

  const [mousePosition, setMousePosition] =
    useState({
      x: 0,
      y: 0,
    })

  useEffect(() => {
    const handleMouseMove = (
      e: MouseEvent
    ) => {
      const x =
        (e.clientX /
          window.innerWidth -
          0.5) *
        2

      const y =
        (e.clientY /
          window.innerHeight -
          0.5) *
        2

      setMousePosition({ x, y })
    }

    window.addEventListener(
      'mousemove',
      handleMouseMove
    )

    return () => {
      window.removeEventListener(
        'mousemove',
        handleMouseMove
      )
    }
  }, [])

  return (
    <section
      className="
        relative
        overflow-hidden
        pt-14
        pb-10
        sm:pt-16
        sm:pb-14
        lg:pt-16
        lg:pb-24
        flex
        items-center
      "
      style={{
        background: '#4063a2',
      }}
    >
      {/* MAIN GLOW */}

      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          top: '-20%',
          left: '-10%',
          width: '520px',
          height: '520px',
          borderRadius: '50%',
          background:
            'radial-gradient(circle, rgba(3,73,224,0.22) 0%, transparent 70%)',
          filter: 'blur(90px)',
          pointerEvents: 'none',

          transform: `translate(${
            mousePosition.x * 6
          }px, ${
            mousePosition.y * 6
          }px)`,

          transition:
            'transform 0.18s ease-out',

          willChange: 'transform',
        }}
      />

      {/* SECONDARY GLOW */}

      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          bottom: '-25%',
          right: '-10%',
          width: '340px',
          height: '340px',
          borderRadius: '50%',
          background:
            'radial-gradient(circle, rgba(3,48,170,0.20) 0%, transparent 70%)',
          filter: 'blur(90px)',
          pointerEvents: 'none',

          transform: `translate(${
            mousePosition.x * -5
          }px, ${
            mousePosition.y * -5
          }px)`,

          transition:
            'transform 0.18s ease-out',

          willChange: 'transform',
        }}
      />

      {/* MAIN CONTAINER */}

      <div
        className={`
          relative
          z-10
          ${container}
        `}
      >
        <div
          className="
            grid
            lg:grid-cols-2
            gap-8
            lg:gap-6
            items-center
          "
        >
          {/* ====================================================
              LEFT CONTENT
          ==================================================== */}

          <div
            className="
              relative
              z-20
              text-center
              lg:text-left
              order-2
              lg:order-1
            "
          >
            {/* TOP BADGE */}

            <div
              className="
                inline-flex
                items-center
                gap-2
                px-3
                py-1.5
                sm:px-4
                sm:py-2
                rounded-full
                mb-5
              "
              style={{
                background:
                  'rgba(211,226,246,0.08)',

                border:
                  '1px solid rgba(211,226,246,0.14)',
              }}
            >
              <div
                className="
                  w-2
                  h-2
                  rounded-full
                  animate-pulse
                "
                style={{
                  background: '#D3E2F6',
                }}
              />

 <span
  className={`
    ${getTypography(
      badgeText,
      locale
    )}
    text-[#D3E2F6]
  `}
>
                {t('badge')}
              </span>
            </div>

            {/* MAIN HEADING */}

            <h1
            className={`
  text-white
  ${getTypography(heroHeading, locale)}
`}
            >
              {t('titleStart')}

              <span className="block sm:inline">
                {' '}
                {t('titleEnd')}
              </span>
            </h1>

            {/* DESCRIPTION */}

            <p
              className={`
  mt-5
  max-w-xl
  mx-auto
  lg:mx-0
  text-[#D3E2F6]
  opacity-80
  ${getTypography(heroDescription, locale)}
`}
            >
              {t('description')}
            </p>

            {/* CTA BUTTONS */}

            <div
              className="
                flex
                flex-col
                sm:flex-row
                items-center
                lg:items-start
                justify-center
                lg:justify-start
                gap-3
                sm:gap-4
                mt-7
              "
            >
              {/* PRIMARY CTA */}

              <Link
                href="/book-demo"
                className={`
                  
                  sm:w-auto
                  inline-flex
                  items-center
                  justify-center
                  gap-2
                  px-5
                  py-3
                  sm:px-6
                  sm:py-4
                  rounded-xl
                  text-white
                  transition-all
                  duration-300
                  hover:scale-[1.02]
                  ${getTypography(buttonText, locale)}
                `}
                style={{
                  background: '#31446b',

                  boxShadow:
                    '0 10px 25px rgba(3,73,224,0.30)',
                }}
              >
                <Play className="w-5 h-5" />

                {t('primaryButton')}
              </Link>

              {/* SECONDARY CTA */}

              <Link
                href="/courses"
                className={`
                  w-fit
                  inline-flex
                  items-center
                  justify-center
                  gap-2
                  px-5
                  py-3
                  sm:px-6
                  sm:py-4
                  rounded-xl
                  transition-all
                  duration-300
                  hover:scale-[1.02]
                  ${getTypography(buttonText, locale)}
                `}
                style={{
                  border:
                    '1.5px solid rgba(211,226,246,0.22)',

                  background: 'transparent',

                  color: '#D3E2F6',

                  backdropFilter:
                    'blur(10px)',
                }}
              >
                {t('secondaryButton')}

                <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
          </div>

          {/* ====================================================
              RIGHT IMAGE SECTION
          ==================================================== */}

          <div
            className="
              hidden
              sm:flex
              relative
              justify-center
              lg:justify-end
              items-center
              h-full
              order-1
              lg:order-2
            "
          >
            {/* MAIN VISUAL WRAPPER */}

            <div
              className="
                relative
                flex
                items-center
                justify-center
                w-[320px]
                h-[320px]
                sm:w-[400px]
                sm:h-[400px]
                lg:w-[520px]
                lg:h-[520px]
              "
            >
              {/* SINGLE OUTER RING */}

              <div
                className="
                  absolute
                  inset-0
                  rounded-full
                "
                style={{
                  border:
                    '4px solid rgba(124,184,255,0.55)',

                  opacity: 0.9,

                  transform: `translate(${
                    mousePosition.x * 8
                  }px, ${
                    mousePosition.y * 8
                  }px)`,

                  transition:
                    'transform 0.18s ease-out',

                  willChange: 'transform',
                }}
              />

              {/* HERO IMAGE */}

              <div
                className="
                  relative
                  z-10
                  w-[220px]
                  h-[220px]
                  sm:w-[300px]
                  sm:h-[300px]
                  lg:w-[400px]
                  lg:h-[400px]
                  rounded-full
                  overflow-hidden
                  flex
                  items-center
                  justify-center
                "
                style={{
                  background:
                    'radial-gradient(circle, rgba(255,255,255,0.06) 0%, rgba(255,255,255,0.02) 100%)',

                  boxShadow:
                    '0 30px 60px rgba(0,0,0,0.22)',

                  transform: `translate(${
                    mousePosition.x * 14
                  }px, ${
                    mousePosition.y * 14
                  }px)`,

                  transition:
                    'transform 0.18s ease-out',

                  willChange: 'transform',
                }}
              >
                <Image
                  src={require('@/assets/aritech_hero.png')}
                  alt="Aritech student"
                  priority
                  className="
                    w-[120%]
                    h-auto
                    object-cover
                    object-top
                    translate-y-8
                    sm:translate-y-10
                  "
                />
              </div>

              {/* FLOATING CARD - MOCK TEST */}

              <div
                className="
                  absolute
                  top-[10%]
                  right-[-2%]
                  z-20
                  px-4
                  py-3
                  rounded-2xl
                  hidden
                  lg:flex
                  items-center
                  gap-3
                "
                style={{
                  background:
                    'rgba(255,255,255,0.10)',

                  backdropFilter:
                    'blur(18px)',

                  border:
                    '1px solid rgba(255,255,255,0.10)',

                  boxShadow:
                    '0 10px 30px rgba(0,0,0,0.12)',

                  transform: `translate(${
                    mousePosition.x * 22
                  }px, ${
                    mousePosition.y * 22
                  }px)`,

                  transition:
                    'transform 0.18s ease-out',

                  willChange: 'transform',
                }}
              >
                <div
                  className="
                    w-10
                    h-10
                    rounded-xl
                    flex
                    items-center
                    justify-center
                  "
                  style={{
                    background:
                      'rgba(124,184,255,0.16)',
                  }}
                >
                  📘
                </div>

                <div>
                  <p
                    className="
                      text-xs
                      font-medium
                    "
                    style={{
                      color:
                        'rgba(255,255,255,0.72)',
                    }}
                  >
                    Weekly Mock Test
                  </p>

                  <p
                    className="
                      text-sm
                      font-bold
                    "
                    style={{
                      color: '#FFFFFF',
                    }}
                  >
                    92% Accuracy
                  </p>
                </div>
              </div>

              {/* FLOATING CARD - LIVE CLASSES */}

              <div
                className="
                  absolute
                  bottom-[12%]
                  left-[-4%]
                  z-20
                  px-4
                  py-3
                  rounded-2xl
                  hidden
                  lg:flex
                  items-center
                  gap-3
                "
                style={{
                  background:
                    'rgba(255,255,255,0.10)',

                  backdropFilter:
                    'blur(18px)',

                  border:
                    '1px solid rgba(255,255,255,0.10)',

                  boxShadow:
                    '0 10px 30px rgba(0,0,0,0.12)',

                  transform: `translate(${
                    mousePosition.x * -20
                  }px, ${
                    mousePosition.y * -20
                  }px)`,

                  transition:
                    'transform 0.18s ease-out',

                  willChange: 'transform',
                }}
              >
                <div
                  className="
                    w-10
                    h-10
                    rounded-xl
                    flex
                    items-center
                    justify-center
                  "
                  style={{
                    background:
                      'rgba(139,92,246,0.18)',
                  }}
                >
                  🎥
                </div>

                <div>
                  <p
                    className="
                      text-xs
                      font-medium
                    "
                    style={{
                      color:
                        'rgba(255,255,255,0.72)',
                    }}
                  >
                    Live Interactive
                  </p>

                  <p
                    className="
                      text-sm
                      font-bold
                    "
                    style={{
                      color: '#FFFFFF',
                    }}
                  >
                    Classes Daily
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}