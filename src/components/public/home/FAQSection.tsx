'use client'

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
} from '@/styles/cards'

const FAQS = [
  {
    key: 'institution',
  },

  {
    key: 'transition',
  },

  {
    key: 'workflow',
  },

  {
    key: 'classes',
  },
]

export default function FAQSection() {
const locale = useLocale()

  const t =
    useTranslations(
      'home.faq'
    )

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
      {/* SOFT AMBIENT GLOW */}

      <div
        aria-hidden="true"
        className="
          absolute
          top-[-120px]
          left-[-80px]
          w-[300px]
          h-[300px]
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
        <div
          className="
            grid
            lg:grid-cols-[0.85fr_1.15fr]
            gap-10
            lg:gap-14
            items-start
          "
        >
          {/* ====================================================
              LEFT CONTENT
          ==================================================== */}

          <div
            className="
              max-w-xl
              text-center
              lg:text-left
              mx-auto
              lg:mx-0
            "
          >
            {/* SMALL LABEL */}

            <div
  className={`
    inline-flex
    items-center
    rounded-full
    px-3.5
    py-1.5
    mb-5
    uppercase
    tracking-[0.18em]
    ${getTypography(
      badgeText,
      locale
    )}
  `}

              style={{
                background:
                  '#4062a2b3',

                color: '#FFFFFF',
              }}
            >
              {t('label')}
            </div>

            {/* HEADING */}

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

              <br />

              {t('title2')}

              <br />

              {t('title3')}{' '}

              <span
                style={{
                  color: '#4063A2',
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
                color: '#7788B6',
              }}
            >
              {t('description')}
            </p>
          </div>

          {/* ====================================================
              RIGHT FAQS
          ==================================================== */}

          <div className="space-y-4">
            {FAQS.map((faq, index) => (
              <details
                key={index}
                className={featureCard}
                style={{
                  background: '#FFFFFF',

                  border:
                    '1px solid rgba(3,73,224,0.08)',

                  boxShadow:
                    '0 8px 24px rgba(15,23,42,0.05)',
                }}
              >
                {/* QUESTION */}

                <summary
                  className="
                    list-none
                    cursor-pointer
                    flex
                    items-start
                    sm:items-center
                    justify-between
                    gap-4
                    px-5
                    py-5
                  "
                >
                  <h3
                    className={`
                      leading-snug
                      pr-2
                      text-left
                      flex-1
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
                      `${faq.key}Question`
                    )}
                  </h3>

                  {/* ICON */}

                  <div
                    className="
                      w-8
                      h-8
                      rounded-xl
                      flex
                      items-center
                      justify-center
                      flex-shrink-0
                      transition-transform
                      duration-300
                      group-open:rotate-45
                    "
                    style={{
                      background:
                        '#4063a2',
                    }}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="#FFFFFF"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M12 5v14" />

                      <path d="M5 12h14" />
                    </svg>
                  </div>
                </summary>

                {/* ANSWER */}

                <div
                  className="
                    px-5
                    pb-5
                    sm:pr-14
                  "
                >
                  <p
                    className={`
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
                      `${faq.key}Answer`
                    )}
                  </p>
                </div>
              </details>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}