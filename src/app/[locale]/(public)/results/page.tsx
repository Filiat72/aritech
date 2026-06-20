import { prisma } from '@/lib/prisma'
import Image from 'next/image'

import {
  container,
  sectionSpacingCompact,
} from '@/styles/layout'

import {
  tagPill,
  featureCard,
} from '@/styles/cards'

import {
  sectionHeading,
  sectionDescription,
  cardDescription,
  cardTitle,
  tagText,
  getTypography,
} from '@/styles/typography'

import { getLocale } from 'next-intl/server'

import {
  Trophy,
  GraduationCap,
} from 'lucide-react'

export default async function ResultsPage() {

  const locale = await getLocale()
  const results = await prisma.result.findMany({
    orderBy: { createdAt: 'desc' },
  })

  return (
    <div className="pt-20 bg-white overflow-hidden">
      {/* =======================================================
          HERO
      ======================================================= */}

      <section
        className={`
          relative
          px-4
          ${sectionSpacingCompact}
        `}
      >
        {/* BG */}

        <div
          className="
            absolute
            top-0
            right-0
            w-[320px]
            sm:w-[420px]
            h-[320px]
            sm:h-[420px]
            bg-[#EEF4FF]
            rounded-full
            blur-3xl
            opacity-70
          "
        />

        <div
          className={`
            ${container}
            relative
            z-10
            flex
            flex-col
            items-center
          `}
        >
          {/* HERO CONTENT */}

          <div
            className="
              max-w-3xl
              mx-auto
              text-center
              flex
              flex-col
              items-center
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
              }}
            >
              <div
                className="
                  w-2
                  h-2
                  rounded-full
                "
                style={{
                  background: '#FFFFFF',
                }}
              />

              <span
                className="
                  text-[10px]
                  sm:text-xs
                  font-bold
                  uppercase
                  tracking-[0.18em]
                "
                style={{
                  color: '#FFFFFF',
                }}
              >
                Student Achievements
              </span>
            </div>

            {/* TITLE */}

            <h1
              className={`
                ${getTypography(
  sectionHeading,
  locale
)}
                text-center
                leading-[1.05]
              `}
              style={{
                color: '#081C4B',
              }}
            >
              Real Results.

              <br />

              Real Student Success.
            </h1>

            {/* DESCRIPTION */}

            <p
              className={`
                ${getTypography(
  sectionDescription,
  locale
)}
                mt-5
                max-w-2xl
                text-center
              `}
              style={{
                color: '#7788B6',
              }}
            >
              Thousands of students transformed
              their academic and career journey
              through structured learning,
              mentorship, and practical
              training.
            </p>
          </div>
        </div>
      </section>

      {/* =======================================================
          RESULTS
      ======================================================= */}

      <section className="px-4 pb-16 sm:pb-20">
        <div className="max-w-7xl mx-auto flex flex-col items-center">
          {/* HEADER */}

          <div
            className="
              flex
              flex-col
              w-full
              lg:flex-row
              lg:items-end
              lg:justify-between
              gap-6
              mb-10
              text-center
              lg:text-left
            "
          >
            <div>
              <p
                className="
                  text-[#4063a2]
                  text-[10px]
                  sm:text-[11px]
                  font-bold
                  uppercase
                  tracking-[0.25em]
                "
              >
                Student Results
              </p>

              <h2
  className={`
    mt-3
    text-[#081C4B]
    ${getTypography(
      sectionHeading,
      locale
    )}
  `}
>
                Our Top Achievers
              </h2>
            </div>

            <div
              className="
                px-5
                py-3
                rounded-2xl
                border
                border-[#E6EEFF]
                bg-[#F8FAFF]
                text-sm
                font-semibold
                text-[#081C4B]
                mx-auto
                lg:mx-0
              "
            >
              {results.length}+ Results Published
            </div>
          </div>

          {/* EMPTY */}

          {results.length === 0 ? (
            <div
              className="
                border
                border-[#E6EEFF]
                rounded-[28px]
                bg-[#F8FAFF]
                py-16
                sm:py-20
                px-6
                text-center
                w-full
              "
            >
              <div
                className="
                  w-16
                  h-16
                  rounded-2xl
                  bg-[#EEF4FF]
                  flex
                  items-center
                  justify-center
                  mx-auto
                "
              >
                <Trophy className="w-8 h-8 text-[#4063a2]" />
              </div>

              <h3
  className={`
    mt-5
    text-[#081C4B]
    ${getTypography(
      cardTitle,
      locale
    )}
  `}
>
                Results Coming Soon
              </h3>

             <p
  className={`
    mt-3
    text-[#7788B6]
    ${getTypography(
      cardDescription,
      locale
    )}
  `}
>
                Student achievements will
                appear here shortly.
              </p>
            </div>
          ) : (
            <div
              className="
                grid
                grid-cols-1
                sm:grid-cols-2
                lg:grid-cols-3
                xl:grid-cols-4
                gap-5
                w-full
              "
            >
              {results.map((r) => (
                <div
                  key={r.id}
                  className={`
                    ${featureCard}
                    group
                    relative
                    border
                    border-[#E6EEFF]
                    rounded-[24px]
                    overflow-hidden
                    bg-white
                    hover:shadow-[0_18px_50px_rgba(3,73,224,0.08)]
                  `}
                >
                  {/* ACCENT */}

                  <div
                    className="
                      absolute
                      left-0
                      top-5
                      h-10
                      w-1
                      bg-[#4063a2]
                      rounded-r-full
                      z-20
                    "
                  />

                  {/* IMAGE */}

                  <div
                    className="
                      relative
                      h-[180px]
                      overflow-hidden
                      bg-[#F8FAFF]
                    "
                  >
                    {r.photo ? (
                      <Image
                        src={r.photo}
                        alt={r.studentName}
                        fill
                        unoptimized
                        className="
                          object-cover
                          object-top
                          group-hover:scale-[1.03]
                          transition-all
                          duration-500
                        "
                      />
                    ) : (
                      <div
                        className="
                          w-full
                          h-full
                          bg-gradient-to-br
                          from-[#EEF4FF]
                          to-[#F8FAFF]
                          flex
                          items-center
                          justify-center
                        "
                      >
                        <div
                          className="
                            w-20
                            h-20
                            rounded-full
                            bg-white
                            border
                            border-[#E6EEFF]
                            flex
                            items-center
                            justify-center
                            text-3xl
                            font-black
                            text-[#0349E0]
                          "
                        >
                          {r.studentName.charAt(0)}
                        </div>
                      </div>
                    )}

                    {/* OVERLAY */}

                    <div className="absolute inset-0 bg-gradient-to-t from-[#081C4B]/70 via-[#081C4B]/10 to-transparent" />

                    {/* EXAM */}

                    <div className="absolute top-4 left-4">
                      <span
  className={`
    px-3
    py-1
    rounded-full
    bg-white/90
    backdrop-blur-sm
    text-[#4063a2]
    uppercase
    tracking-wide
    ${getTypography(
      tagText,
      locale
    )}
  `}
>
                        {r.examType}
                      </span>
                    </div>

                    {/* RESULT */}

                    <div className="absolute bottom-4 left-4 right-4">
                      <p
                        className="
                          text-white/70
                          text-[10px]
                          uppercase
                          tracking-[0.18em]
                          font-bold
                        "
                      >
                        Rank / Achievement
                      </p>

                      <h3
                        className="
                          mt-1
                          text-[1.7rem]
                          font-extrabold
                          text-white
                          leading-tight
                        "
                      >
                        {r.result}
                      </h3>
                    </div>
                  </div>

                  {/* CONTENT */}

                  <div className="p-4">
                    {/* NAME */}

                    <div>
                      <h3
  className={`
    text-[#081C4B]
    ${getTypography(
      cardTitle,
      locale
    )}
  `}
>
                        {r.studentName}
                      </h3>

                      <p
                        className="
                          mt-1
                          text-xs
                          font-semibold
                          text-[#4063a2]
                        "
                      >
                        {r.year}
                      </p>
                    </div>

                    {/* ACHIEVEMENT */}

                    {r.achievement && (
                      <p
  className={`
    mt-3
    text-[#7788B6]
    line-clamp-2
    ${getTypography(
      cardDescription,
      locale
    )}
  `}
>
                        {r.achievement}
                      </p>
                    )}

                    {/* FOOTER */}

                    <div
                      className="
                        flex
                        items-center
                        gap-3
                        mt-4
                        pt-4
                        border-t
                        border-[#EEF4FF]
                      "
                    >
                      <div
                        className="
                          w-9
                          h-9
                          rounded-xl
                          bg-[#EEF4FF]
                          flex
                          items-center
                          justify-center
                        "
                      >
                        <GraduationCap className="w-4 h-4 text-[#4063a2]" />
                      </div>

                      <div>
                        <p
                          className="
                            text-sm
                            font-bold
                            text-[#081C4B]
                          "
                        >
                          AriTech Achiever
                        </p>

                        <p
                          className="
                            text-[11px]
                            text-[#7788B6]
                          "
                        >
                          Student Success Story
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  )
}