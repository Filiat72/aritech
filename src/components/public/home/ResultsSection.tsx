'use client'

import { ArrowRight } from 'lucide-react'

import { useTranslations } from 'next-intl'

import { Link } from '@/i18n/navigation'
import { useLocale } from 'next-intl'

import {
  container,
  sectionSpacingCompact,
  sectionHeader,
} from '@/styles/layout'

import {
  sectionHeading,
  sectionDescription,
  cardTitle,
  cardDescription,
  badgeText,
  tagText,
  buttonText,
  disclaimerText,
  getTypography,
} from '@/styles/typography'

import {
  featureCard,
  tagPill,
} from '@/styles/cards'

interface ResultItem {
  id: string
  examType: string
  year?: string
  photo?: string | null
  result: string
  studentName: string
  achievement?: string | null
  isFeatured?: boolean
}

interface ResultsSectionProps {
  results: ResultItem[]
}

export default function ResultsSection({
  results,
}: ResultsSectionProps) {
const locale = useLocale()

  const t =
    useTranslations(
      'home.results'
    )

  /* ====================================================
      EMPTY STATE
  ==================================================== */

  if (!results?.length) {
    return null
  }

  return (
    <section
      className={`
        ${sectionSpacingCompact}
        px-4
        relative
        overflow-hidden
      `}
      style={{
        background: '#F8FAFF',
      }}
    >
      {/* AMBIENT GLOW */}

      <div
        className="
          absolute
          top-[-120px]
          right-[-80px]
          w-[320px]
          h-[320px]
          rounded-full
          blur-3xl
          opacity-10
        "
        style={{
          background: '#93c5fd',
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
            HEADING
        ==================================================== */}

        <div
          className={`${sectionHeader} mb-12`}
        >
          {/* LABEL */}

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

          {/* TITLE */}

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
              color: '#262C3A',
            }}
          >
            {t('title')}
          </h2>

          {/* DESCRIPTION */}

          <p
            className={`
              max-w-2xl
              mx-auto
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
        </div>

        {/* ====================================================
            RESULT CARDS
        ==================================================== */}

        <div
          className="
            grid
            md:grid-cols-2
            xl:grid-cols-4
            gap-5
          "
        >
          {results
            .slice(0, 4)
            .map((item) => {
              const featured =
                item.isFeatured

              return (
                <div
                  key={item.id}
                  className={`
                    ${featureCard}
                    flex
                    flex-col
                    ${
                      featured
                        ? 'md:-mt-3'
                        : ''
                    }
                  `}
                  style={{
                    background: featured
                      ? 'linear-gradient(135deg, #0330AA 0%, #0349E0 100%)'
                      : '#FFFFFF',

                    border: featured
                      ? '1px solid rgba(255,255,255,0.08)'
                      : '1px solid rgba(3,73,224,0.08)',

                    boxShadow: featured
                      ? '0 20px 40px rgba(3,73,224,0.20)'
                      : '0 10px 30px rgba(15,23,42,0.05)',
                  }}
                >
                  {/* LEFT ACCENT LINE */}

                  <div
                    className="
                      absolute
                      left-0
                      top-6
                      w-[4px]
                      h-14
                      rounded-r-full
                    "
                    style={{
                      background: featured
                        ? '#FFFFFF'
                        : '#4063a2',
                    }}
                  />

                  {/* HOVER GLOW */}

                  <div
                    aria-hidden="true"
                    className="
                      absolute
                      inset-0
                      opacity-0
                      group-hover:opacity-100
                      transition-opacity
                      duration-300
                    "
                    style={{
                      background: featured
                        ? 'linear-gradient(135deg, rgba(255,255,255,0.05), transparent)'
                        : 'linear-gradient(135deg, rgba(3,73,224,0.03), transparent)',

                      pointerEvents: 'none',
                    }}
                  />

                  {/* CONTENT */}

                  <div
                    className="
                      relative
                      z-10
                      p-6
                      flex
                      flex-col
                      h-full
                    "
                  >
                    {/* TOP ROW */}

                    <div className="flex items-start justify-between gap-3 mb-6">
                      {/* EXAM BADGE */}

                      <span
                        className={`
                          ${tagPill}
                          text-[10px]
                          tracking-[0.12em]
                          uppercase
                        `}
                        style={{
                          background: featured
                            ? 'rgba(255,255,255,0.10)'
                            : '#4062a2b3',

                          color: featured
                            ? '#FFFFFF'
                            : '#FFFFFF',

                          border: featured
                            ? '1px solid rgba(255,255,255,0.08)'
                            : '1px solid rgba(3,73,224,0.08)',
                        }}
                      >
                        {item.examType}
                      </span>

                      {/* YEAR */}

                      {item.year && (
                        <span
                          className="
                            text-[12px]
                            font-medium
                          "
                          style={{
                            color: featured
                              ? 'rgba(255,255,255,0.70)'
                              : '#94A3B8',
                          }}
                        >
                          {item.year}
                        </span>
                      )}
                    </div>

                    {/* PROFILE */}

                    <div
                      className="
                        flex
                        flex-col
                        sm:flex-row
                        items-center
                        text-center
                        sm:text-left
                        gap-4
                        mb-5
                      "
                    >
                      {/* PHOTO */}

                      <div
                        className="
                          relative
                          w-[68px]
                          h-[68px]
                          rounded-[20px]
                          overflow-hidden
                          shrink-0
                        "
                        style={{
                          border: featured
                            ? '2px solid rgba(255,255,255,0.16)'
                            : '2px solid rgba(3,73,224,0.08)',

                          boxShadow: featured
                            ? '0 8px 20px rgba(0,0,0,0.12)'
                            : '0 8px 20px rgba(15,23,42,0.05)',
                        }}
                      >
                        {item.photo ? (
                          <img
                            src={item.photo}
                            alt={item.studentName}
                            className="
                              w-full
                              h-full
                              object-cover
                            "
                          />
                        ) : (
                          <div
                            className="
                              w-full
                              h-full
                              flex
                              items-center
                              justify-center
                              text-xl
                              font-semibold
                            "
                            style={{
                              background: featured
                                ? 'rgba(255,255,255,0.10)'
                                : 'rgba(3,73,224,0.08)',

                              color: featured
                                ? '#FFFFFF'
                                : '#4063a2',
                            }}
                          >
                            {item.studentName?.charAt(
                              0
                            )}
                          </div>
                        )}
                      </div>

                      {/* STUDENT INFO */}

                      <div className="min-w-0">
                        <p
                          className={getTypography(
  cardTitle,
  locale
)}
                          style={{
                            color: featured
                              ? '#FFFFFF'
                              : '#262C3A',
                          }}
                        >
                          {item.studentName}
                        </p>

                        {item.achievement && (
                          <p
                            className={`
                              mt-1
                             ${getTypography(
  cardDescription,
  locale
)}
                            `}
                            style={{
                              color: featured
                                ? 'rgba(255,255,255,0.72)'
                                : '#7788B6',
                            }}
                          >
                            {item.achievement}
                          </p>
                        )}
                      </div>
                    </div>

                    {/* RESULT */}

                    <div className="mt-auto">
                      <h3
                        className="
                          text-[1.7rem]
                          sm:text-[2rem]
                          font-bold
                          leading-none
                          tracking-[-0.04em]
                        "
                        style={{
                          color: featured
                            ? '#FFFFFF'
                            : '#4063a2',
                        }}
                      >
                        {item.result}
                      </h3>
                    </div>
                  </div>
                </div>
              )
            })}
        </div>

        {/* DISCLAIMER */}

       <p
  className={`
    text-center
    mt-8
    ${getTypography(
      disclaimerText,
      locale
    )}
  `}
  style={{
    color: '#94A3B8',
  }}
>
          {t('disclaimer')}
        </p>

        {/* BUTTON */}

        <div className="text-center mt-8">
          <Link
            href="/results"
            className={`
              inline-flex
              items-center
              gap-2
              px-6
              py-3
              rounded-2xl
              transition-all
              duration-300
              hover:-translate-y-0.5
              ${getTypography(
  buttonText,
  locale
)}
            `}
            style={{
              background: '#FFFFFF',

              color: '#31446b',

              border:
                '1px solid rgba(3,73,224,0.10)',

              boxShadow:
                '0 8px 24px rgba(15,23,42,0.04)',
            }}
          >
            {t('cta')}

            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  )
}