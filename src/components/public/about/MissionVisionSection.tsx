'use client'

import {
  CheckCircle,
  Heart,
  Target,
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

const VISION_POINTS = [
  'vision1',
  'vision2',
  'vision3',
]

const MISSION_POINTS = [
  'mission1',
  'mission2',
  'mission3',
]

export default function MissionVisionSection() {
  const locale = useLocale()

  const t =
    useTranslations(
      'about.mission'
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
        background: '#F8FAFF',
      }}
    >
      {/* ====================================================
          SOFT GLOW
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
            CARDS
        ==================================================== */}

        <div
          className="
            grid
            lg:grid-cols-2
            gap-6
            xl:gap-8
          "
        >
          {/* ====================================================
              VISION CARD
          ==================================================== */}

          <div
            className={`
              ${featureCard}
              relative
              overflow-hidden
              border
              rounded-[28px]
              sm:rounded-[32px]
              p-6
              sm:p-8
              lg:p-10
            `}
            style={{
              background: '#FFFFFF',

              borderColor:
                'rgba(3,73,224,0.08)',

              boxShadow:
                '0 20px 50px rgba(15,23,42,0.06)',
            }}
          >
            {/* BG GLOW */}

            <div
              className="
                absolute
                top-[-40px]
                right-[-40px]
                w-[160px]
                h-[160px]
                rounded-full
                blur-3xl
                opacity-20
              "
              style={{
                background: '#BFDBFE',
              }}
            />

            {/* LEFT ACCENT */}

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

            <div className="relative z-10">
              {/* ICON */}

              <div
                className="
                  w-14
                  h-14
                  sm:w-16
                  sm:h-16
                  rounded-2xl
                  flex
                  items-center
                  justify-center
                "
                style={{
                  background:
                    'rgba(3,73,224,0.08)',
                }}
              >
                <Target
                  className="w-6 h-6 sm:w-7 sm:h-7"
                  style={{
                    color: '#4063a2',
                  }}
                />
              </div>

              {/* TITLE */}

              <h3
                className={`
                  mt-6
                  ${getTypography(
  cardTitle,
  locale
)}
                `}
                style={{
                  color: '#081C4B',
                }}
              >
                {t('visionTitle')}
              </h3>

              {/* POINTS */}

              <div className="mt-7 space-y-5">
                {VISION_POINTS.map(
                  (item, i) => (
                    <div
                      key={i}
                      className="
                        flex
                        gap-4
                        items-start
                      "
                    >
                      <div
                        className="
                          w-2.5
                          h-2.5
                          rounded-full
                          mt-2.5
                          flex-shrink-0
                        "
                        style={{
                          background:
                            '#4063a2',
                        }}
                      />

                      <p
                        className={`
                          ${getTypography(
  cardDescription,
  locale
)}
                        `}
                        style={{
                          color: '#64748B',
                        }}
                      >
                        {t(item)}
                      </p>
                    </div>
                  )
                )}
              </div>
            </div>
          </div>

          {/* ====================================================
              MISSION CARD
          ==================================================== */}

          <div
            className={`
              ${featureCard}
              relative
              overflow-hidden
              rounded-[28px]
              sm:rounded-[32px]
              p-6
              sm:p-8
              lg:p-10
            `}
            style={{
              background:
                'linear-gradient(135deg, #4063a2 0%, #31446b 100%)',

              boxShadow:
                '0 24px 60px rgba(3,73,224,0.22)',
            }}
          >
            {/* GLOW */}

            <div
              className="
                absolute
                top-[-50px]
                right-[-50px]
                w-[180px]
                h-[180px]
                rounded-full
                blur-3xl
                opacity-20
              "
              style={{
                background: '#FFFFFF',
              }}
            />

            {/* LEFT ACCENT */}

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
                background: '#FFFFFF',
              }}
            />

            <div className="relative z-10">
              {/* ICON */}

              <div
                className="
                  w-14
                  h-14
                  sm:w-16
                  sm:h-16
                  rounded-2xl
                  flex
                  items-center
                  justify-center
                "
                style={{
                  background:
                    'rgba(255,255,255,0.12)',

                  border:
                    '1px solid rgba(255,255,255,0.12)',
                }}
              >
                <Heart className="w-6 h-6 sm:w-7 sm:h-7 text-white" />
              </div>

              {/* TITLE */}

              <h3
                className={`
                  mt-6
                  text-white
                  ${getTypography(
  cardTitle,
  locale
)}
                `}
              >
                {t('missionTitle')}
              </h3>

              {/* POINTS */}

              <div className="mt-7 space-y-5">
                {MISSION_POINTS.map(
                  (item, i) => (
                    <div
                      key={i}
                      className="
                        flex
                        gap-4
                        items-start
                      "
                    >
                      <CheckCircle
                        className="
                          w-5
                          h-5
                          mt-1
                          flex-shrink-0
                          text-white
                        "
                      />

                      <p
                        className={`
                          ${getTypography(
  cardDescription,
  locale
)}
                        `}
                        style={{
                          color:
                            'rgba(255,255,255,0.82)',
                        }}
                      >
                        {t(item)}
                      </p>
                    </div>
                  )
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}