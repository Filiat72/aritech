'use client'

import Image from 'next/image'

import type { SVGProps } from 'react'

import {
  useTranslations,
  useLocale,
} from 'next-intl'

import { Link } from '@/i18n/navigation'

import logo from '@/assets/logo.jpg'

function FacebookIcon(
  props: SVGProps<SVGSVGElement>
) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
      {...props}
    >
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
    </svg>
  )
}

function InstagramIcon(
  props: SVGProps<SVGSVGElement>
) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
      {...props}
    >
      <rect
        width="20"
        height="20"
        x="2"
        y="2"
        rx="5"
        ry="5"
      />

      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />

      <line
        x1="17.5"
        x2="17.51"
        y1="6.5"
        y2="6.5"
      />
    </svg>
  )
}

function YoutubeIcon(
  props: SVGProps<SVGSVGElement>
) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
      {...props}
    >
      <path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17" />

      <path d="m10 15 5-3-5-3z" />
    </svg>
  )
}

function LinkedinIcon(
  props: SVGProps<SVGSVGElement>
) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
      {...props}
    >
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />

      <rect
        width="4"
        height="12"
        x="2"
        y="9"
      />

      <circle
        cx="4"
        cy="4"
        r="2"
      />
    </svg>
  )
}

const courseKeys = [
  'neet',
  'jee',
  'tnpsc',
  'spoken',
  'software',
  'medical',
  'mis',
  'distance',
]

const quickLinks = [
  {
    href: '/',
    key: 'home',
  },

  {
    href: '/about',
    key: 'about',
  },

  {
    href: '/courses',
    key: 'courses',
  },

  {
    href: '/faculty',
    key: 'faculty',
  },

  {
    href: '/results',
    key: 'results',
  },

  {
    href: '/blog',
    key: 'blog',
  },

  {
    href: '/contact',
    key: 'contact',
  },

  {
    href: '/book-demo',
    key: 'demo',
  },
]

const socialLinks = [
  {
    icon: FacebookIcon,
    href: '#',
  },

  {
    icon: InstagramIcon,
    href: '#',
  },

  {
    icon: YoutubeIcon,
    href: '#',
  },

  {
    icon: LinkedinIcon,
    href: '#',
  },
]

export default function Footer() {
  const locale = useLocale()

  const isTamil =
    locale === 'ta'

  const t =
    useTranslations('footer')

  return (
    <footer
      className="
        relative
        overflow-hidden
        pt-20
      "
      style={{
        background:
          '#4063a2',
      }}
    >
      {/* ====================================================
          GLOW
      ==================================================== */}

      <div
        className="
          absolute
          top-[-120px]
          right-[-120px]
          w-[320px]
          h-[320px]
          rounded-full
          blur-3xl
          opacity-10
        "
        style={{
          background: '#93C5FD',
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-4">
        {/* ====================================================
            TOP GRID
        ==================================================== */}

        <div
          className="
            grid
            lg:grid-cols-[1.3fr_1fr_1fr]
            gap-14
            pb-14
            border-b
          "
          style={{
            borderColor:
              'rgba(255,255,255,0.10)',
          }}
        >
          {/* ====================================================
              BRAND
          ==================================================== */}

          <div>
            <Link
              href="/"
              className="
                inline-flex
                items-center
                gap-4
              "
            >
              <Image
                src={logo}
                alt="Aritech"
                width={56}
                height={56}
                className="
                  rounded-2xl
                  object-cover
                "
              />

              <div>
                <h2
                  className="
                    text-white
                    font-black
                    text-2xl
                    tracking-[-0.04em]
                  "
                >
                  Aritech
                </h2>

                <p
                  className="
                    text-sm
                    text-white/70
                  "
                >
                  Digital Academy
                </p>
              </div>
            </Link>

            {/* description */}

            <p
              className={`
                mt-6
                max-w-md
                text-white/72
                ${
                  isTamil
                    ? 'text-[14px] leading-8'
                    : 'text-[15px] leading-relaxed'
                }
              `}
            >
              {t('description')}
            </p>

            <p
              className={`
                mt-6
                max-w-md
                text-white/72
                ${
                  isTamil
                    ? 'text-[14px] leading-8'
                    : 'text-[15px] leading-relaxed'
                }
              `}
            >
              {t('address')}
            </p>

            {/* socials */}

            <div
              className="
                flex
                items-center
                gap-4
                mt-8
              "
            >
              {socialLinks.map(
                (
                  social,
                  index
                ) => {
                  const Icon =
                    social.icon

                  return (
                    <a
                      key={index}
                      href={
                        social.href
                      }
                      className="
                        w-11
                        h-11
                        rounded-2xl
                        flex
                        items-center
                        justify-center
                        transition-all
                        duration-300
                        hover:-translate-y-1
                      "
                      style={{
                        background:
                          'rgba(255,255,255,0.08)',

                        border:
                          '1px solid rgba(255,255,255,0.08)',
                      }}
                    >
                      <Icon
                        className="
                          w-5
                          h-5
                          text-white
                        "
                      />
                    </a>
                  )
                }
              )}
            </div>
          </div>

          {/* ====================================================
              QUICK LINKS
          ==================================================== */}

          <div>
            <h3
              className={`
                text-white
                mb-6
                ${
                  isTamil
                    ? 'text-[18px] font-semibold'
                    : 'text-xl font-bold'
                }
              `}
            >
              {t(
                'quickLinksTitle'
              )}
            </h3>

            <div className="space-y-4">
              {quickLinks.map(
                (link) => (
                  <Link
                    key={link.key}
                    href={link.href}
                    className={`
                      block
                      transition-colors
                      duration-300
                      hover:text-white
                      ${
                        isTamil
                          ? 'text-[14px]'
                          : 'text-[15px]'
                      }
                    `}
                    style={{
                      color:
                        'rgba(255,255,255,0.70)',
                    }}
                  >
                    {t(
                      `quickLinks.${link.key}`
                    )}
                  </Link>
                )
              )}
            </div>
          </div>

          {/* ====================================================
              COURSES
          ==================================================== */}

          <div>
            <h3
              className={`
                text-white
                mb-6
                ${
                  isTamil
                    ? 'text-[18px] font-semibold'
                    : 'text-xl font-bold'
                }
              `}
            >
              {t(
                'coursesTitle'
              )}
            </h3>

            <div className="space-y-4">
              {courseKeys.map(
                (course) => (
                  <Link
                    key={course}
                    href="/courses"
                    className={`
                      block
                      transition-colors
                      duration-300
                      hover:text-white
                      ${
                        isTamil
                          ? 'text-[14px]'
                          : 'text-[15px]'
                      }
                    `}
                    style={{
                      color:
                        'rgba(255,255,255,0.70)',
                    }}
                  >
                    {t(
                      `courses.${course}`
                    )}
                  </Link>
                )
              )}
            </div>
          </div>
        </div>

        {/* ====================================================
            BOTTOM
        ==================================================== */}

        <div
          className="
            flex
            flex-col
            md:flex-row
            items-center
            justify-between
            gap-5
            py-7
          "
        >
          <p
            className={`
              text-white/60
              ${
                isTamil
                  ? 'text-[12px]'
                  : 'text-sm'
              }
            `}
          >
            {t('copyright')}
          </p>

          <div
            className="
              flex
              items-center
              gap-6
            "
          >
            <Link
              href="/privacy-policy"
              className="
                text-white/60
                hover:text-white
                transition-colors
                duration-300
                text-sm
              "
            >
              {t('privacy')}
            </Link>

            <Link
              href="/terms-and-conditions"
              className="
                text-white/60
                hover:text-white
                transition-colors
                duration-300
                text-sm
              "
            >
              {t('terms')}
            </Link>

            <Link
              href="/refund-policy"
              className="
                text-white/60
                hover:text-white
                transition-colors
                duration-300
                text-sm
              "
            >
              {t('refund')}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}