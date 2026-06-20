'use client'

import Image from 'next/image'

import { useTranslations } from 'next-intl'

import { useLocale } from 'next-intl'

import ourstory from '@/assets/our_story.jpg'

import {
  container,
  sectionSpacingCompact,
} from '@/styles/layout'

import {
  sectionHeading,
  sectionDescription,
  badgeText,
  getTypography,
} from '@/styles/typography'

import {
  tagPill,
} from '@/styles/cards'

export default function StorySection() {
  const locale = useLocale()

  const t =
    useTranslations(
      'about.story'
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
          left-[-120px]
          bottom-[-120px]
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
        <div
          className="
            grid
            lg:grid-cols-2
            gap-10
            xl:gap-16
            items-center
          "
        >
          {/* ====================================================
              LEFT VISUAL
          ==================================================== */}

          <div
            className="
              relative
              flex
              justify-center
              lg:justify-start
              order-1
            "
          >
            {/* BLUE SHAPE */}

            <div
              className="
                absolute
                bottom-[-14px]
                right-[20px]
                sm:right-[40px]
                w-[84%]
                h-[92%]
                rounded-[28px]
                sm:rounded-[38px]
              "
              style={{
                background:
                  '#4063a2',

                boxShadow:
                  '0 30px 60px rgba(3,73,224,0.18)',
              }}
            />

            {/* IMAGE */}

            <div
              className="
                relative
                z-10
                overflow-hidden
                rounded-[24px]
                sm:rounded-[34px]
                border
                w-full
                max-w-[520px]
              "
              style={{
                borderColor:
                  'rgba(3,73,224,0.08)',

                boxShadow:
                  '0 24px 50px rgba(15,23,42,0.10)',
              }}
            >
              <Image
                src={ourstory}
                alt="Aritech Mentor"
                width={1200}
                height={1600}
                className="
                  w-full
                  h-[320px]
                  sm:h-[420px]
                  lg:h-[520px]
                  object-cover
                "
              />
            </div>
          </div>

          {/* ====================================================
              RIGHT CONTENT
          ==================================================== */}

          <div
            className="
              text-center
              lg:text-left
              order-2
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

              {t('title2')}
            </h2>

            {/* PARAGRAPH 1 */}

            <p
              className={`
                mt-7
                ${getTypography(
  sectionDescription,
  locale
)}
              `}
              style={{
                color: '#64748B',
              }}
            >
              {t('paragraph1')}
            </p>

            {/* PARAGRAPH 2 */}

            <p
              className={`
                mt-5
                ${getTypography(
  sectionDescription,
  locale
)}
              `}
              style={{
                color: '#64748B',
              }}
            >
              {t('paragraph2')}
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}