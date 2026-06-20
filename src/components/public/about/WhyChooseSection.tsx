'use client'

import {
  BriefcaseBusiness,
  GraduationCap,
  HeartHandshake,
  LaptopMinimal,
} from 'lucide-react'

import { useTranslations } from 'next-intl'

import { useLocale } from 'next-intl'


import {
  container,
  sectionSpacingCompact,
} from '@/styles/layout'

import {
  sectionHeading,
  sectionDescription,
  cardTitle,
  cardDescription,
  badgeText,
  getTypography,
} from '@/styles/typography'

import {
  featureCard,
  tagPill,
} from '@/styles/cards'

const FEATURES = [
  {
    key: 'practical',
    icon: GraduationCap,
  },

  {
    key: 'mentorship',
    icon: HeartHandshake,
  },

  {
    key: 'industry',
    icon: BriefcaseBusiness,
  },

  {
    key: 'flexible',
    icon: LaptopMinimal,
  },
]

export default function WhyChooseSection() {
  
const locale = useLocale()

  const t =
    useTranslations(
      'about.whyChoose'
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
          SOFT GLOW
      ==================================================== */}

      <div
        className="
          absolute
          top-[-120px]
          left-[-120px]
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

      <div
        className={`
          relative
          z-10
          ${container}
        `}
      >
        {/* ====================================================
            HEADER
        ==================================================== */}

        <div
          className="
            text-center
            max-w-3xl
            mx-auto
            mb-12
            lg:mb-16
          "
        >
          {/* LABEL */}

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

          <h2
            className={`
              leading-[1.08]
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
          </h2>

          {/* DESCRIPTION */}

          <p
            className={`
              mt-6
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
        </div>

        {/* ====================================================
            FEATURE CARDS
        ==================================================== */}

        <div
          className="
            grid
            grid-cols-1
            sm:grid-cols-2
            xl:grid-cols-4
            gap-5
            lg:gap-6
          "
        >
          {FEATURES.map(
            (item, index) => {
              const Icon =
                item.icon

              return (
                <div
                  key={index}
                  className={`
                    ${featureCard}
                    group
                    relative
                    overflow-hidden
                    border
                    rounded-[24px]
                    p-5
                    sm:p-6
                    transition-all
                    duration-300
                    hover:-translate-y-1
                  `}
                  style={{
                    background:
                      '#FFFFFF',

                    border:
                      '1px solid rgba(3,73,224,0.08)',

                    boxShadow:
                      '0 8px 24px rgba(15,23,42,0.05)',
                  }}
                >
                  {/* ACCENT LINE */}

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
                      background:
                        '#4063a2',
                    }}
                  />

                  {/* ICON */}

                  <div
                    className="
                      relative
                      w-14
                      h-14
                      rounded-[18px]
                      flex
                      items-center
                      justify-center
                      mb-5
                      transition-all
                      duration-300
                    "
                    style={{
                      background:
                        '#FFFFFF',

                      border:
                        '1px solid rgba(3,73,224,0.10)',

                      boxShadow:
                        '0 10px 24px rgba(15,23,42,0.06)',
                    }}
                  >
                    {/* ICON GLOW */}

                    <div
                      className="
                        absolute
                        inset-0
                        rounded-[18px]
                      "
                      style={{
                        background:
                          'radial-gradient(circle at top left, rgba(3,73,224,0.06), transparent 70%)',
                      }}
                    />

                    <Icon
                      className="
                        w-[22px]
                        h-[22px]
                        relative
                        z-10
                      "
                      style={{
                        color:
                          '#4063a2',

                        strokeWidth: 2.2,
                      }}
                    />
                  </div>

                  {/* TITLE */}

                  <h3
                    className={`
                      leading-snug
                      ${getTypography(
  cardTitle,
  locale
)}
                    `}
                    style={{
                      color: '#262C3A',
                    }}
                  >
                    {t(
                      `${item.key}Title`
                    )}
                  </h3>

                  {/* DESCRIPTION */}

                  <p
                    className={`
                      mt-3
                     ${getTypography(
  cardDescription,
  locale
)}
                    `}
                    style={{
                      color: '#7788B6',
                    }}
                  >
                    {t(
                      `${item.key}Description`
                    )}
                  </p>

                  {/* HOVER GLOW */}

                  <div
                    aria-hidden="true"
                    className="
                      absolute
                      inset-0
                      rounded-[24px]
                      opacity-0
                      group-hover:opacity-100
                      transition-opacity
                      duration-300
                    "
                    style={{
                      background:
                        'linear-gradient(135deg, rgba(3,73,224,0.03), transparent)',

                      pointerEvents:
                        'none',
                    }}
                  />
                </div>
              )
            }
          )}
        </div>
      </div>
    </section>
  )
}