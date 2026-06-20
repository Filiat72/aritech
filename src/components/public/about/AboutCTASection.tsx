'use client'

import { ArrowRight } from 'lucide-react'

import { useTranslations } from 'next-intl'

import { Link } from '@/i18n/navigation'
import { useLocale } from 'next-intl'
import {
  badgeText,
  buttonText,
  ctaHeading,
  ctaDescription,
  getTypography,
} from '@/styles/typography'


export default function AboutCTASection() {
  const locale = useLocale()

  const t =
    useTranslations(
      'about.cta'
    )

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
          top-[-100px]
          right-[-100px]
          w-[260px]
          h-[260px]
          rounded-full
          blur-3xl
          opacity-10
        "
        style={{
          background: '#93C5FD',
        }}
      />

      <div className="max-w-6xl mx-auto">
        <div
          className="
            relative
            overflow-hidden
            rounded-[40px]
            px-6
            md:px-12
            py-16
            text-center
          "
          style={{
            background:
              '#4063a2',

            boxShadow:
              '0 30px 80px rgba(3,73,224,0.22)',
          }}
        >
          {/* ====================================================
              BACKGROUND CIRCLES
          ==================================================== */}

          <div
            className="
              absolute
              top-[-80px]
              left-[-80px]
              w-[220px]
              h-[220px]
              rounded-full
              opacity-10
            "
            style={{
              background: '#FFFFFF',
            }}
          />

          <div
            className="
              absolute
              bottom-[-100px]
              right-[-100px]
              w-[260px]
              h-[260px]
              rounded-full
              opacity-10
            "
            style={{
              background: '#FFFFFF',
            }}
          />

          <div className="relative z-10 max-w-3xl mx-auto">
            {/* ====================================================
                LABEL
            ==================================================== */}

            <div
              className="
                inline-flex
                items-center
                gap-2
                px-4
                py-2
                rounded-full
                mb-6
              "
              style={{
                background:
                  'rgba(255,255,255,0.12)',

                border:
                  '1px solid rgba(255,255,255,0.14)',
              }}
            >
              <div className="w-2 h-2 rounded-full bg-white" />

              <span
                className={`
                  uppercase
                  text-white
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

            {/* ====================================================
                HEADING
            ==================================================== */}

            <h2
  className={`
    text-white
    ${getTypography(
      ctaHeading,
      locale
    )}
  `}
>
              {t('title1')}

              <span className="block">
                {t('title2')}
              </span>
            </h2>

            {/* ====================================================
                DESCRIPTION
            ==================================================== */}

            <p
              className={`
                mt-6
                mx-auto
                ${getTypography(
  ctaDescription,
  locale
)}
              `}
              style={{
                color:
                  'rgba(255,255,255,0.78)',

                maxWidth: '720px',
              }}
            >
              {t('description')}
            </p>

            {/* ====================================================
                BUTTON
            ==================================================== */}

            <div className="mt-10">
              <Link
                href="/contact"
                className={`
                  inline-flex
                  items-center
                  gap-3
                  px-8
                  py-4
                  rounded-2xl
                  transition-all
                  duration-300
                  hover:scale-[1.02]
                  ${getTypography(
  buttonText,
  locale
)}
                `}
                style={{
                  background: '#FFFFFF',

                  color: '#31446b',

                  boxShadow:
                    '0 12px 30px rgba(0,0,0,0.12)',
                }}
              >
                {t('button')}

                <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}