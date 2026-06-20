'use client'

import Image from 'next/image'

import {
  ArrowRight,
  Play,
  CheckCircle,
  GraduationCap,
} from 'lucide-react'

import { useTranslations } from 'next-intl'
import { Link } from '@/i18n/navigation'
import { useLocale } from 'next-intl'

import lmsplatform from '@/assets/lms_platform.jpg'
import {
  container,
  sectionSpacing,
} from '@/styles/layout'

import { iconContainer } from '@/styles/cards'

import {
  sectionHeading,
  sectionDescription,
  cardTitle,
  cardDescription,
  badgeText,
  buttonText,
   miniBadgeText,
  getTypography,
} from '@/styles/typography'

const FEATURES = [
  {
    key: 'video',
    icon: Play,
  },

  {
    key: 'mock',
    icon: CheckCircle,
  },

  {
    key: 'tracking',
    icon: GraduationCap,
  },
]

export default function LMSSection() {
  const locale = useLocale()

  

  const t =
    useTranslations(
      'home.lms'
    )

  return (
    <section
     className={`
  ${sectionSpacing}
  px-4
  relative
  overflow-hidden
`}
      style={{
        background:
          '#4063a2',
      }}
    >
      {/* ====================================================
          SOFT BACKGROUND GLOW
      ==================================================== */}

      <div
        aria-hidden="true"
        className="
          absolute
          top-[-120px]
          right-[-120px]
          w-[420px]
          h-[420px]
          rounded-full
          blur-3xl
          opacity-30
        "
        style={{
          background:
            'rgba(255,255,255,0.12)',
        }}
      />

      <div
  className={`
    ${container}
    relative
    z-10
  `}
>
        {/* ====================================================
            MAIN GRID
        ==================================================== */}

        <div
  className="
    grid
    lg:grid-cols-2
    gap-8 lg:gap-10
    items-center
  "
>
          {/* ====================================================
              LEFT CONTENT SIDE
          ==================================================== */}

          <div className="text-center lg:text-left order-2 lg:order-1">
            {/* Top Badge */}

            <div
              className="
                inline-flex
                items-center
                gap-2
                px-4
                py-2
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
    tracking-wide
  `}
  style={{
    color: '#D3E2F6',
  }}
>
                {t('label')}
              </span>
            </div>

            {/* Heading */}

   <h2
  className={`
    mb-5
    leading-tight
    ${getTypography(
      sectionHeading,
      locale
    )}
  `}

              style={{
                color: '#FFFFFF',

                
              }}
            >
              {t('title1')}

              <br />

              {t('title2')}

              <span
                style={{
                  color: '#D3E2F6',
                }}
              >
                {' '}
                {t('highlight')}
              </span>
            </h2>

            {/* Description */}

    <p
  className={`
    mb-8
    max-w-xl
    ${getTypography(
      sectionDescription,
      locale
    )}
  `}
           style={{
                color:
                  'rgba(255,255,255,0.78)',

                
              }}
            >
              {t('description')}
            </p>

            {/* ====================================================
                FEATURES
            ==================================================== */}

            <div className="space-y-5 mb-10">
              {FEATURES.map((item, index) => {
                const Icon = item.icon

                return (
                  <div
                    key={index}
                    className="
  flex
  flex-col
  sm:flex-row
  items-center
  sm:items-start
  text-center
  sm:text-left
  gap-4
"
                  >
                    {/* Icon */}

                    <div
                      className={`
  ${iconContainer}
  w-11
  h-11
  flex-shrink-0
`}
                      style={{
                        background:
                          'rgba(255,255,255,0.12)',
                      }}
                    >
                      <Icon
                        className="w-5 h-5"
                        style={{
                          color: '#FFFFFF',
                        }}
                      />
                    </div>

                    <div>
                      {/* Title */}

                <h3
  className={`
    mb-1
    ${getTypography(
      cardTitle,
      locale
    )}
  `}

                        style={{
                          color: '#FFFFFF',

                         
                        }}
                      >
                        {t(
                          `${item.key}Title`
                        )}
                      </h3>

                      {/* Description */}

    <p
  className={`
    max-w-md
    ${getTypography(
      cardDescription,
      locale
    )}
  `}

                        style={{
                          color:
                            'rgba(255,255,255,0.72)',

                          
                        }}
                      >
                        {t(
                          `${item.key}Description`
                        )}
                      </p>
                    </div>
                  </div>
                )
              })}
            </div>

            {/* ====================================================
                BUTTONS
            ==================================================== */}

            <div
              className="
                flex
                flex-col
                sm:flex-row
                gap-4
                justify-center
                lg:justify-start
              "
            >
              {/* Primary CTA */}

            <Link
  href="/book-demo"
  className={`
    inline-flex
    items-center
    justify-center
    gap-2
    px-8
    py-4
    rounded-2xl
    text-white
    transition-all
    duration-300
    hover:-translate-y-1
    bg-[#31446b]
    ${getTypography(
      buttonText,
      locale
    )}
  `}
  style={{
    color: '#FFFFFF',
    boxShadow:
      '0 10px 25px rgba(0,0,0,0.12)',
  }}
>
                <ArrowRight className="w-4 h-4" />

                {t('cta')}
              </Link>
            </div>
          </div>

          {/* ====================================================
              RIGHT IMAGE SIDE
          ==================================================== */}


<div
  className="
    order-1
    lg:order-2
    relative
    flex
    justify-center
    lg:justify-end
    mb-10
    lg:mb-0
  "
>
  {/* Floating Badge */}

  <div
    className="
      absolute
      top-2
      left-4
      sm:left-10
      md:left-20
      z-10
      w-24
      h-24
      sm:w-28
      sm:h-28
      rounded-full
      flex
      flex-col
      items-center
      justify-center
      text-center
    "
    style={{
      background:
        'rgba(255,255,255,0.14)',

      backdropFilter: 'blur(12px)',

      border:
        '1px solid rgba(255,255,255,0.14)',

      boxShadow:
        '0 15px 40px rgba(0,0,0,0.10)',
    }}
  >
    <p
      className="
        text-xl
        sm:text-2xl
        font-extrabold
        leading-none
      "
      style={{
        color: '#FFFFFF',
      }}
    >
      24/7
    </p>

  <p
  className={`
    mt-1
    leading-tight
    ${getTypography(
      miniBadgeText,
      locale
    )}
  `}
  style={{
    color:
      'rgba(255,255,255,0.72)',
  }}
>
  {t('access')}
</p>
  </div>

  {/* Smooth Abstract Shape */}

  <div className="relative w-full max-w-[430px]">
    {/* Background Blob */}

    <div
      className="
        absolute
        -top-5
        -right-4
        w-[280px]
        h-[220px]
        sm:w-[360px]
        sm:h-[280px]
        lg:w-[430px]
        lg:h-[330px]
      "
      style={{
        background:
          'linear-gradient(135deg, rgba(255,255,255,0.18), rgba(255,255,255,0.05))',

        borderRadius:
          '30% 70% 65% 35% / 35% 45% 55% 65%',
      }}
    />

    {/* Main Image Wrapper */}

    <div
      className="
        relative
        overflow-hidden
        border-[10px]
        w-full
      "
      style={{
        aspectRatio: '4 / 3',

        background: '#FFFFFF',

        borderColor:
          'rgba(255,255,255,0.18)',

        boxShadow:
          '0 20px 60px rgba(0,0,0,0.16)',

        borderRadius:
          '38% 62% 58% 42% / 42% 38% 62% 58%',
      }}
    >
      <Image
        src={lmsplatform}
        alt="Smart LMS Learning"
        className="
          w-full
          h-full
          object-cover
        "
      />
    </div>
  </div>
</div>
        </div>
      </div>
    </section>
  )
}