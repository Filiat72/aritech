'use client'

import Image from 'next/image'

import { useTranslations } from 'next-intl'

import { usePathname } from '@/i18n/navigation'

interface FeaturedStudent {
  id: string | number
  name: string
  program: string
  year: string
  result: string
  resultLabel: string
  testimonial: string
  image: string
}

interface ImpactMetric {
  id: string | number
  value: string
  label: string
}

interface ImpactSectionProps {
  featuredStudent: FeaturedStudent | null

  metrics: ImpactMetric[]
}

export default function ImpactSection({
  featuredStudent,
  metrics,
}: ImpactSectionProps) {
  const pathname = usePathname()

  const isTamil =
    pathname.startsWith('/ta')

  const t =
    useTranslations(
      'about.impact'
    )

  /* ====================================================
      EMPTY STATE
  ==================================================== */

  if (
    !featuredStudent &&
    !metrics?.length
  ) {
    return null
  }

  return (
    <section
      className="
        relative
        overflow-hidden
        py-20
        px-4
      "
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
          bottom-[-120px]
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

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* ====================================================
            GRID
        ==================================================== */}

        <div
          className="
            grid
            lg:grid-cols-2
            gap-10
            items-center
          "
        >
          {/* ====================================================
              FEATURED STUDENT
          ==================================================== */}

          {featuredStudent && (
            <div
              className="
                relative
                rounded-[34px]
                overflow-hidden
                border
              "
              style={{
                background: '#FFFFFF',

                borderColor:
                  'rgba(3,73,224,0.08)',

                boxShadow:
                  '0 24px 60px rgba(15,23,42,0.06)',
              }}
            >
              {/* top accent */}

              <div
                className="
                  h-1.5
                  w-full
                "
                style={{
                  background:
                    'linear-gradient(90deg, #0349E0, #4F7BFF)',
                }}
              />

              <div className="p-8">
                {/* student info */}

                <div className="flex items-center gap-5">
                  <Image
                    src={
                      featuredStudent.image
                    }
                    alt={
                      featuredStudent.name
                    }
                    width={200}
                    height={200}
                    className="
                      w-24
                      h-24
                      rounded-3xl
                      object-cover
                    "
                  />

                  <div>
                    {/* badge */}

                    <div
                      className="
                        inline-flex
                        px-3
                        py-1.5
                        rounded-full
                        text-xs
                        font-semibold
                        mb-3
                      "
                      style={{
                        background:
                          'rgba(3,73,224,0.08)',

                        color:
                          '#0349E0',
                      }}
                    >
                      {t(
                        'featuredBadge'
                      )}
                    </div>

                    {/* name */}

                    <h3
                      className={`
                        leading-tight
                        ${
                          isTamil
                            ? 'text-[24px] font-semibold'
                            : 'text-2xl font-black'
                        }
                      `}
                      style={{
                        color: '#081C4B',
                      }}
                    >
                      {
                        featuredStudent.name
                      }
                    </h3>

                    {/* program */}

                    <p
                      className="
                        mt-1
                        text-sm
                      "
                      style={{
                        color: '#64748B',
                      }}
                    >
                      {
                        featuredStudent.program
                      }{' '}
                      •{' '}
                      {
                        featuredStudent.year
                      }
                    </p>
                  </div>
                </div>

                {/* achievement */}

                <div className="mt-8">
                  <div
                    className={`
                      leading-none
                      ${
                        isTamil
                          ? 'text-[42px] font-bold'
                          : 'text-5xl font-black'
                      }
                    `}
                    style={{
                      color: '#0349E0',
                    }}
                  >
                    {
                      featuredStudent.result
                    }
                  </div>

                  <p
                    className="
                      mt-3
                      text-sm
                      font-medium
                    "
                    style={{
                      color: '#64748B',
                    }}
                  >
                    {
                      featuredStudent.resultLabel
                    }
                  </p>
                </div>

                {/* testimonial */}

                <div
                  className="
                    mt-8
                    rounded-2xl
                    p-5
                  "
                  style={{
                    background:
                      '#F8FAFF',

                    border:
                      '1px solid rgba(3,73,224,0.06)',
                  }}
                >
                  <p
                    className={`
                      italic
                      ${
                        isTamil
                          ? 'text-[14px] leading-8'
                          : 'leading-relaxed'
                      }
                    `}
                    style={{
                      color: '#64748B',
                    }}
                  >
                    “
                    {
                      featuredStudent.testimonial
                    }
                    ”
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* ====================================================
              IMPACT CONTENT
          ==================================================== */}

          <div>
            {/* intro */}

            <div>
              <h3
                className={`
                  leading-tight
                  ${
                    isTamil
                      ? 'text-[34px] font-semibold'
                      : 'text-4xl font-black'
                  }
                `}
                style={{
                  color: '#081C4B',
                }}
              >
                {t('title1')}

                <span
                  className="block"
                  style={{
                    color: '#0349E0',
                  }}
                >
                  {t('highlight')}
                </span>
              </h3>

              <p
                className={`
                  mt-5
                  ${
                    isTamil
                      ? 'text-[15px] leading-8'
                      : 'text-[17px] leading-relaxed'
                  }
                `}
                style={{
                  color: '#64748B',
                }}
              >
                {t('description')}
              </p>
            </div>

            {/* metrics */}

            <div
              className="
                grid
                sm:grid-cols-2
                gap-5
                mt-10
              "
            >
              {metrics.map(
                (item, index) => (
                  <div
                    key={
                      item.id || index
                    }
                    className="
                      rounded-[26px]
                      p-6
                      border
                    "
                    style={{
                      background:
                        '#F8FAFF',

                      borderColor:
                        'rgba(3,73,224,0.08)',
                    }}
                  >
                    <div
                      className={`
                        ${
                          isTamil
                            ? 'text-[30px] font-bold'
                            : 'text-3xl font-black'
                        }
                      `}
                      style={{
                        color: '#0349E0',
                      }}
                    >
                      {item.value}
                    </div>

                    <p
                      className={`
                        mt-2
                        ${
                          isTamil
                            ? 'text-[14px] leading-7'
                            : 'leading-relaxed'
                        }
                      `}
                      style={{
                        color: '#64748B',
                      }}
                    >
                      {item.label}
                    </p>
                  </div>
                )
              )}
            </div>

            {/* disclaimer */}

            <p
              className={`
                mt-6
                ${
                  isTamil
                    ? 'text-[12px] leading-7'
                    : 'text-sm leading-relaxed'
                }
              `}
              style={{
                color: '#94A3B8',
              }}
            >
              {t('disclaimer')}
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}