'use client'

import Image from 'next/image'

import { ArrowRight } from 'lucide-react'

import { useTranslations } from 'next-intl'

import aboutus from '@/assets/about_us.jpg'

import { Link } from '@/i18n/navigation'
import { useLocale } from 'next-intl'

import {
  container,
  sectionSpacingCompact,
} from '@/styles/layout'

import {
  sectionHeading,
  sectionDescription,
  badgeText,
  buttonText,
  miniBadgeText,
  getTypography,
} from '@/styles/typography'

import {
  tagPill,
} from '@/styles/cards'

export default function AboutHeroSection() {
  const locale = useLocale()

  const t =
    useTranslations(
      'about.hero'
    )

  return (
    <section
      className={`
        relative
        overflow-hidden
        ${sectionSpacingCompact}
        px-4
      `}
      style={{
        background: '#FFFFFF',
      }}
    >
      {/* ====================================================
          BACKGROUND GLOW
      ==================================================== */}

      <div
        className="
          absolute
          top-[-120px]
          right-[-120px]
          w-[420px]
          h-[420px]
          rounded-full
          blur-3xl
          opacity-20
        "
        style={{
          background: '#BFDBFE',
        }}
      />

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
            gap-10
            xl:gap-14
            items-center
          "
        >
          {/* ====================================================
              LEFT CONTENT
          ==================================================== */}

          <div
            className="
              text-center
              lg:text-left
            "
          >
            {/* BADGE */}

            <div
              className={`
                ${tagPill}
                inline-flex
                items-center
                gap-2
                mb-6
              `}
              style={{
                background:
                  '#4062a2b3',

                border:
                  '1px solid #4063a2',

                color: '#FFFFFF',
              }}
            >
              <div
                className="w-2 h-2 rounded-full"
                style={{
                  background: '#FFFFFF',
                }}
              />

              <span
  className={`
    uppercase
    tracking-[0.2em]
    ${getTypography(
      badgeText,
      locale
    )}
  `}
>
                {t('label')}
              </span>
            </div>

            {/* HEADING */}

            <h1
              className={`
                leading-[1.05]
               ${getTypography(
  sectionHeading,
  locale
)}
              `}
              style={{
                color: '#081C4B',
              }}
            >
              {t('title1')}

              <span
                className="block"
                style={{
                  color: '#4063a2',
                }}
              >
                {t('highlight')}
              </span>

              {t('title2')}
            </h1>

            {/* DESCRIPTION */}

            <p
              className={`
                mt-7
                max-w-2xl
                mx-auto
                lg:mx-0
                ${getTypography(
  sectionDescription,
  locale
)}
              `}
              style={{
                color: '#64748B',
              }}
            >
              {t('description')}
            </p>

            {/* CTA */}

            <div className="mt-10">
              <Link
                href="/courses"
                className={`
                  w-full
                  sm:w-auto
                  inline-flex
                  items-center
                  justify-center
                  gap-2
                  px-7
                  py-4
                  rounded-2xl
                  text-white
                  transition-all
                  duration-300
                  hover:scale-[1.02]
                 ${getTypography(
  buttonText,
  locale
)}
                `}
                style={{
                  background:
                    '#31446b',

                  boxShadow:
                    '0 14px 30px rgba(3,73,224,0.25)',
                }}
              >
                {t('cta')}

                <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
          </div>

          {/* ====================================================
              RIGHT VISUAL
          ==================================================== */}

          <div className="relative">
            {/* IMAGE CONTAINER */}

            <div
              className="
                relative
                rounded-[28px]
                sm:rounded-[36px]
                overflow-hidden
                border
              "
              style={{
                borderColor:
                  'rgba(3,73,224,0.08)',

                boxShadow:
                  '0 30px 60px rgba(3,73,224,0.15)',
              }}
            >
              {/* IMAGE */}

              <Image
                src={aboutus}
                alt="Aritech Students"
                width={1400}
                height={900}
                className="
                  w-full
                  h-[320px]
                  sm:h-[420px]
                  lg:h-[520px]
                  object-cover
                "
              />

              {/* OVERLAY */}

              <div
                className="
                  absolute
                  inset-0
                "
                style={{
                  background:
                    'linear-gradient(to top, rgba(8,28,75,0.45), transparent 40%)',
                }}
              />

              {/* BOTTOM BADGE */}

              <div
                className="
                  absolute
                  bottom-0
                  left-0
                  right-0
                  p-5
                  sm:p-8
                "
              >
                <div
                  className="
                    inline-flex
                    items-center
                    gap-3
                    px-4
                    py-2
                    rounded-full
                    backdrop-blur-md
                    max-w-full
                  "
                  style={{
                    background:
                      'rgba(255,255,255,0.12)',

                    border:
                      '1px solid rgba(255,255,255,0.18)',
                  }}
                >
                  {/* AVATARS */}

                  <div className="flex -space-x-2 shrink-0">
                    {[1, 2, 3].map(
                      (i) => (
                        <div
                          key={i}
                          className="
                            w-8
                            h-8
                            rounded-full
                            border-2
                            border-white
                            overflow-hidden
                          "
                        >
                          <Image
                            src={`https://i.pravatar.cc/100?img=${i + 10}`}
                            alt=""
                            width={100}
                            height={100}
                            className="
                              w-full
                              h-full
                              object-cover
                            "
                          />
                        </div>
                      )
                    )}
                  </div>

                  {/* TEXT */}

                  <span
                    className={`
                      leading-snug
                      ${getTypography(
  miniBadgeText,
  locale
)}
font-medium
                    `}
                    style={{
                      color: '#FFFFFF',
                    }}
                  >
                    {t('trusted')}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}