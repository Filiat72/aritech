'use client'

import Image from 'next/image'

import {
  ArrowRight,
  Briefcase,
  Users,
  GraduationCap,
  MonitorSmartphone,
} from 'lucide-react'

import { useTranslations } from 'next-intl'
import { useLocale } from 'next-intl'
import {
  Link,
  usePathname,
} from '@/i18n/navigation'


import whychoose from '@/assets/why_choose.jpg'
import {
  container,
  sectionSpacing,
  twoColGrid,
} from '@/styles/layout'

import {
  sectionHeading,
  sectionDescription,
  cardTitle,
  cardDescription,
  badgeText,
  buttonText,
  getTypography,
} from '@/styles/typography'

import {
  iconContainer,
} from '@/styles/cards'

const FEATURES = [
  {
    key: 'mentorship',
    icon: Users,
  },

  {
    key: 'practical',
    icon: MonitorSmartphone,
  },

  {
    key: 'career',
    icon: Briefcase,
  },

  {
    key: 'learning',
    icon: GraduationCap,
  },
]

export default function WhyChooseUsSection() {
  const pathname = usePathname()

const locale = useLocale()

  const t =
    useTranslations(
      'home.whyChooseUs'
    )

  return (
    <section
      style={{
        background: '#F8FAFF',
        position: 'relative',
        overflow: 'hidden',
      }}
      className={sectionSpacing}
    >
      {/* Soft Background Glow */}

      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          top: '-20%',
          left: '-10%',
          width: '500px',
          height: '500px',
          borderRadius: '50%',
          background:
            'radial-gradient(circle, rgba(3,73,224,0.06) 0%, transparent 70%)',
          filter: 'blur(80px)',
          pointerEvents: 'none',
        }}
      />

      <div
  className={`
    relative
    z-10
    ${container}
  `}
>
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* ====================================================
              LEFT IMAGE SIDE
          ==================================================== */}

          <div className="relative flex justify-center">
            {/* Main Image Container */}

            <div
              className="relative overflow-hidden"
              style={{
                borderRadius: '42px',

                background:
                  'linear-gradient(135deg, #D3E2F6 0%, #b9d2f5 100%)',

                width: '100%',
                maxWidth: '520px',
                minHeight: '320px',
                aspectRatio: '4 / 5',
              }}
            >
              {/* Decorative Circle */}

              <div
                aria-hidden="true"
                style={{
                  position: 'absolute',
                  top: '-80px',
                  right: '-80px',
                  width: '260px',
                  height: '260px',
                  borderRadius: '50%',
                  background:
                    'rgba(255,255,255,0.18)',
                }}
              />

              {/* Hero Image */}

              <div className="absolute inset-0">
              <Image
  src={whychoose}
  alt="Aritech Student"
  fill
  className="object-cover"
  priority
/>
              </div>
            </div>

            {/* Floating Experience Card */}

            {/* <div
              className="
                absolute
                -bottom-6
                left-0
                rounded-3xl
                px-6
                py-5
                hidden
                md:block
              "
              style={{
                background: '#FFFFFF',

                border:
                  '1px solid rgba(3,73,224,0.10)',

                boxShadow:
                  '0 15px 40px rgba(38,44,58,0.08)',
              }}
            >
              <h3
                style={{
                  color: '#0349E0',

                  fontSize: isTamil
                    ? '1.7rem'
                    : '2rem',

                  fontWeight: 900,

                  lineHeight: 1,
                }}
              >
                50K+
              </h3>

              <p
                className={`
                  mt-2
                  ${
                    isTamil
                      ? 'leading-7'
                      : 'leading-relaxed'
                  }
                `}
                style={{
                  color: '#7788B6',

                  fontSize: isTamil
                    ? '13px'
                    : '14px',
                }}
              >
                {t('studentsTrained')}
              </p>
            </div> */}
          </div>

          {/* ====================================================
              RIGHT CONTENT SIDE
          ==================================================== */}

          <div>
            {/* Small Label */}

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
                  '#4062a2b3',

                border:
                  '1px solid #4063a2',
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
    ${getTypography(
      badgeText,
      locale
    )}
    tracking-wide
  `}

                style={{
                  color: '#FFFFFF',
                }}
              >
                {t('label')}
              </span>
            </div>

            {/* Heading */}

    <h2
  className={`
    leading-tight
    ${getTypography(
      sectionHeading,
      locale
    )}
  `}
         style={{
                color: '#262C3A',

               
              }}
            >
              {t('title1')}

              <span
                style={{
                  display: 'inline-block',
                  color: '#4063a2',
                  padding: '0 12px',
                }}
              >
                {t('highlight')}
              </span>

              <br />

              {t('title2')}
            </h2>

            {/* Description */}

    <p
  className={`
    mt-6
    max-w-xl
    ${getTypography(
      sectionDescription,
      locale
    )}
  `}

              style={{
                color: '#7788B6',

                
              }}
            >
              {t('description')}
            </p>

            {/* ====================================================
                FEATURE GRID
            ==================================================== */}

            <div className={`
  ${twoColGrid}
  mt-9
`}>
{FEATURES.map((item, index) => {
  const Icon = item.icon

  return (
    <div
      key={index}
      className="
        flex
        flex-col
        items-center
        text-center
        sm:items-start
        sm:text-left
      "
    >
      {/* Icon */}

      <div
        className={`
          ${iconContainer}
          w-12
          h-12
          mb-5
        `}
        style={{
          background: '#D3E2F6',
        }}
      >
        <Icon
          className="w-5 h-5"
          style={{
            color: '#4063a2',
          }}
        />
      </div>

      <div className="max-w-sm">
        {/* Title */}

       <h3
  className={getTypography(
    cardTitle,
    locale
  )}

          style={{
            color: '#262C3A',
          }}
        >
          {t(`${item.key}Title`)}
        </h3>

        {/* Description */}

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
          {t(`${item.key}Description`)}
        </p>
      </div>
    </div>
  )
})}
            </div>

            {/* ====================================================
                CTA BUTTON
            ==================================================== */}

            <div className="mt-12">
              <Link
                href="/about"
                className={`
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
                  bg-[#31446b]
                  hover:bg-[#31446b]
                  ${getTypography(
  buttonText,
  locale
)}
`}
                style={{
                  boxShadow:
                    '0 10px 25px rgba(3,73,224,0.30)',
                }}
              >
                <ArrowRight className="w-5 h-5" />

                {t('cta')}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}