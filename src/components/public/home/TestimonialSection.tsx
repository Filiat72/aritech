'use client'

import {
  useEffect,
  useState,
} from 'react'

import Image from 'next/image'
import { useLocale } from 'next-intl'
import {
  ChevronLeft,
  ChevronRight,
} from 'lucide-react'

import { useTranslations } from 'next-intl'



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
  testimonialQuote,
  getTypography,
} from '@/styles/typography'

export default function TestimonialSection({
  testimonials,
}: {
  testimonials: any[]
}) {
const locale = useLocale()

  const t =
    useTranslations(
      'home.testimonials'
    )

  /* ====================================================
      ACTIVE TESTIMONIALS
  ==================================================== */

  const activeTestimonials =
    testimonials?.filter(
      (t) => t.isActive
    ) || []

  const [startIndex, setStartIndex] =
    useState(0)

  const [itemsPerView, setItemsPerView] =
    useState(3)

  /* ====================================================
      RESPONSIVE ITEMS
  ==================================================== */

  useEffect(() => {
    function handleResize() {
      if (window.innerWidth < 768) {
        setItemsPerView(1)
      } else if (
        window.innerWidth < 1280
      ) {
        setItemsPerView(2)
      } else {
        setItemsPerView(3)
      }
    }

    handleResize()

    window.addEventListener(
      'resize',
      handleResize
    )

    return () =>
      window.removeEventListener(
        'resize',
        handleResize
      )
  }, [])

  /* ====================================================
      VISIBLE TESTIMONIALS
  ==================================================== */

  const visibleTestimonials = []

  for (
    let i = 0;
    i < itemsPerView;
    i++
  ) {
    if (activeTestimonials.length > 0) {
      visibleTestimonials.push(
        activeTestimonials[
          (startIndex + i) %
            activeTestimonials.length
        ]
      )
    }
  }

  /* ====================================================
      SLIDER FUNCTIONS
  ==================================================== */

  function handlePrev() {
    if (activeTestimonials.length === 0)
      return

    setStartIndex((prev) =>
      prev === 0
        ? activeTestimonials.length - 1
        : prev - 1
    )
  }

  function handleNext() {
    if (activeTestimonials.length === 0)
      return

    setStartIndex((prev) =>
      (prev + 1) %
      activeTestimonials.length
    )
  }

  /* ====================================================
      EMPTY STATE
  ==================================================== */

  if (activeTestimonials.length === 0) {
    return null
  }

  return (
    <section
      className={`
        ${sectionSpacingCompact}
        px-4
        overflow-hidden
      `}
      style={{
        background: '#F8FAFF',
      }}
    >
      <div className={container}>
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

            {/* <br /> */}

            {t('title2')}
          </h2>

          {/* DESCRIPTION */}

          <p
            className={`
              mt-4
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
            TESTIMONIAL SLIDER
        ==================================================== */}

        <div className="relative">
          {/* LEFT ARROW */}

          {activeTestimonials.length >
            1 && (
            <button
              onClick={handlePrev}
              className="
                flex
                absolute
                left-0
                sm:left-[-10px]
                xl:left-[-20px]
                top-[32%]
                -translate-y-1/2
                z-10
                w-11
                h-11
                sm:w-12
                sm:h-12
                rounded-full
                items-center
                justify-center
                transition-all
                duration-300
                hover:scale-105
              "
              style={{
                background: '#FFFFFF',

                border:
                  '1px solid rgba(3,73,224,0.08)',

                boxShadow:
                  '0 8px 24px rgba(15,23,42,0.06)',
              }}
            >
              <ChevronLeft
                className="w-5 h-5 sm:w-6 sm:h-6"
                style={{
                  color: '#31446b',
                }}
              />
            </button>
          )}

          {/* RIGHT ARROW */}

          {activeTestimonials.length >
            1 && (
            <button
              onClick={handleNext}
              className="
                flex
                absolute
                right-0
                sm:right-[-10px]
                xl:right-[-20px]
                top-[32%]
                -translate-y-1/2
                z-10
                w-11
                h-11
                sm:w-12
                sm:h-12
                rounded-full
                items-center
                justify-center
                transition-all
                duration-300
                hover:scale-105
              "
              style={{
                background: '#FFFFFF',

                border:
                  '1px solid rgba(3,73,224,0.08)',

                boxShadow:
                  '0 8px 24px rgba(15,23,42,0.06)',
              }}
            >
              <ChevronRight
                className="w-5 h-5 sm:w-6 sm:h-6"
                style={{
                  color: '#31446b',
                }}
              />
            </button>
          )}

          {/* CARDS */}

          <div
            key={startIndex}
            className={`
              grid
              ${
                itemsPerView === 1
                  ? 'grid-cols-1'
                  : itemsPerView === 2
                  ? 'md:grid-cols-2'
                  : 'xl:grid-cols-3'
              }
              gap-8
              lg:gap-10
              animate-fade
            `}
          >
            {visibleTestimonials.map(
              (
                testimonial: any,
                index: number
              ) => (
                <div
                  key={`${testimonial.id}-${index}`}
                  className="
                    text-center
                    max-w-[360px]
                    mx-auto
                  "
                >
                  {/* IMAGE */}

                  <div
                    className="
                      relative
                      w-[120px]
                      h-[120px]
                      sm:w-[140px]
                      sm:h-[140px]
                      mx-auto
                      overflow-hidden
                    "
                    style={{
                      borderRadius:
                        '42% 58% 60% 40% / 42% 40% 60% 58%',

                      background:
                        'linear-gradient(135deg, #D3E2F6 0%, #BFD5FF 100%)',

                      boxShadow:
                        '0 12px 28px rgba(3,73,224,0.10)',
                    }}
                  >
                    {testimonial.photo ? (
                      <Image
                        src={
                          testimonial.photo
                        }
                        alt={
                          testimonial.studentName
                        }
                        fill
                        className="object-cover"
                      />
                    ) : (
                      <div
                        className="
                          w-full
                          h-full
                          flex
                          items-center
                          justify-center
                          text-3xl
                          font-semibold
                          text-[#0349E0]
                        "
                      >
                        {testimonial.studentName?.charAt(
                          0
                        )}
                      </div>
                    )}
                  </div>

                  {/* QUOTE */}

                 <p
  className={`
    mt-7
    min-h-[10px]
    ${getTypography(
      testimonialQuote,
      locale
    )}
  `}

                    style={{
                      color: '#3B4454',
                    }}
                  >
                    “{testimonial.quote}”
                  </p>

                  {/* NAME */}

                  <h3
                    className={`
                      mt-5
                    ${getTypography(
  cardTitle,
  locale
)}
                    `}
                    style={{
                      color: '#262C3A',
                    }}
                  >
                    {testimonial.studentName}
                  </h3>

                  {/* COURSE */}

                  <p
                    className={`
                      mt-2
                      ${getTypography(
  cardDescription,
  locale
)}
                    `}
                    style={{
                      color: '#7788B6',
                    }}
                  >
                    {testimonial.course}
                  </p>
                </div>
              )
            )}
          </div>
        </div>
      </div>
    </section>
  )
}