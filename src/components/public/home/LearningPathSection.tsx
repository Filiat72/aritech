'use client'

import {
  GraduationCap,
  Trophy,
  Briefcase,
  RefreshCcw,
  ArrowRight,
} from 'lucide-react'

import { useLocale } from 'next-intl'
import { useTranslations } from 'next-intl'
import {
  container,
  sectionSpacingCompact,
  sectionHeader,
  fourColGrid,
} from '@/styles/layout'
import { 
  featureCard, 
  tagPill,
  iconContainer,
  elevatedSurface, 
} from '@/styles/cards'
import { Link } from '@/i18n/navigation'
import {
  sectionHeading,
  sectionDescription,
  cardTitle,
  cardDescription,
  tagText,
  getTypography,
} from '@/styles/typography'

const LEARNING_PATHS = [
  {
    key: 'school',
    icon: GraduationCap,
    tags: ['School', 'College', 'Foundation'],
  },

  {
    key: 'competitive',
    icon: Trophy,
    tags: ['NEET', 'JEE', 'TNPSC'],
  },

  {
    key: 'career',
    icon: Briefcase,
    tags: ['Skills', 'Career', 'Placement'],
  },

  {
    key: 'restart',
    icon: RefreshCcw,
    tags: ['NIOS', 'IGNOU', 'Flexible'],
  },
]

export default function LearningPathSection() {
  const locale = useLocale()



  const t =
    useTranslations(
      'home.learningPaths'
    )

  return (
    <section
      style={{
        position: 'relative',
        overflow: 'hidden',
        background: '#F8FAFF',
      }}
      className={sectionSpacingCompact}
    >
      {/* ====================================================
          SOFT BACKGROUND GLOW
      ==================================================== */}

      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          top: '-20%',
          right: '-10%',
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
        {/* ====================================================
            SECTION HEADER
        ==================================================== */}

        <div className={sectionHeader}>
          

          {/* Heading */}

  <h2
  className={`
    text-[#262C3A]
    ${getTypography(
      sectionHeading,
      locale
    )}
  `}
>
          
            {t('title1')}

            <span
              style={{
                display: 'block',
                color: '#262C3A',
              }}
            >
          
            </span>
          </h2>

          {/* Description */}

   <p
  className={`
    mt-5
    text-[#7788B6]
    ${getTypography(
      sectionDescription,
      locale
    )}
  `}
>
            {t('description')}
          </p>
        </div>

        {/* ====================================================
            PERSONA CARDS GRID
        ==================================================== */}

        <div
         className={fourColGrid}
        >
          {LEARNING_PATHS.map((item, index) => {
            const Icon = item.icon

            return (
              <div
                key={index}
              className={`
  ${featureCard}
  p-5
  sm:p-6
  flex
  flex-col
  h-full
`}
               style={elevatedSurface}
              >
                {/* left accent line */}

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

                {/* icon */}

                <div
                  className={`
  ${iconContainer}
  w-12
  h-12
  sm:w-14
  sm:h-14
  mb-5
`}
                  style={{
                    background: '#FFFFFF',

                    border:
                      '1px solid rgba(3,73,224,0.10)',

                    boxShadow:
                      '0 10px 24px rgba(15,23,42,0.06)',
                  }}
                >
                  {/* subtle blue glow */}

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
                    className="w-[22px] h-[22px] relative z-10"
                    style={{
                      color: '#4063a2',
                      strokeWidth: 2.2,
                    }}
                  />
                </div>

                {/* title */}

 <h3
  className={`
    text-[#262C3A]
    ${getTypography(
      cardTitle,
      locale
    )}
  `}
>
                  {t(`${item.key}Title`)}
                </h3>

                {/* description */}
<p
  className={`
    mt-3
    text-[#7788B6]
    flex-grow
    ${getTypography(
      cardDescription,
      locale
    )}
  `}
>
                  {t(`${item.key}Description`)}
                </p>

                {/* tags */}

                <div className="flex flex-wrap gap-2 mt-auto pt-5">
                  {item.tags.map(
                    (tag, tagIndex) => (
                      <span
                        key={tagIndex}
                   className={`
  ${tagPill}
  ${getTypography(
    tagText,
    locale
  )}
                        `}
                        style={{
                          background:
                            '#4062a2b3',

                          color: '#FFFFFF',

                          border:
                            '1px solid #4062a2',
                        }}
                      >
                        {tag}
                      </span>
                    )
                  )}
                </div>

                {/* hover glow */}

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

                    pointerEvents: 'none',
                  }}
                />
              </div>
            )
          })}
        </div>

      
      </div>
    </section>
  )
}