import Link from 'next/link'

import { prisma } from '@/lib/prisma'
import { notFound } from 'next/navigation'
import { getLocale } from 'next-intl/server'

import CoursePricingSection from '@/components/public/courses/CoursePricingSection'

import {
  CheckCircle,
  GraduationCap,
} from 'lucide-react'

import { container } from '@/styles/layout'

import {
  sectionDescription,
  getTypography,
} from '@/styles/typography'
import {
  featureCard,
  tagPill,
} from '@/styles/cards'

export default async function CourseDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params

const locale = await getLocale()

  const course =
    await prisma.course.findUnique({
      where: {
        slug,
      },

      include: {
        faqs: true,

        boards: true,

        courseInfo: {
          orderBy: {
            sortOrder: 'asc',
          },
        },

        modes: {
          include: {
            packages: {
              include: {
                features: true,
              },
            },
          },
        },
      },
    })

  if (!course || !course.isActive)
    notFound()

  const allPackages =
    course.modes.flatMap(
      mode => mode.packages
    )

  const startingPrice =
    allPackages.length > 0
      ? Math.min(
          ...allPackages.map(
            pkg =>
              pkg.monthlyPrice
          )
        )
      : null

  return (
    <div
      className="
        relative
        overflow-hidden
        bg-white
        pt-16
      "
    >
      

      {/* =======================================================
          HERO
      ======================================================= */}

      <section
  className="
    relative
    px-4
    py-8
    sm:py-10
  "
>
  <div className={container}>
    {/* BACK */}

    <Link
      href="/courses"
      className="
        inline-flex
        items-center
        gap-2
        text-sm
        font-semibold
        transition-all
        hover:-translate-x-1
      "
      style={{
        color: '#4063a2',
      }}
    >
      ← Back to Courses
    </Link>

    {/* GRID */}

    <div
      className="
        grid
        lg:grid-cols-[1.12fr_0.88fr]
        gap-6
        xl:gap-10
        items-start
        mt-6
      "
    >
      {/* =======================================================
          LEFT
      ======================================================= */}

      <div>
        {/* BADGE */}

        <div
          className={`
            ${tagPill}
            inline-flex
            items-center
            gap-2
            mb-4
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
              background:
                '#FFFFFF',
            }}
          />

          <span
            className="
              text-[10px]
              font-bold
              uppercase
              tracking-[0.18em]
            "
            style={{
              color: '#FFFFFF',
            }}
          >
            Career-Focused Program
          </span>
        </div>

        {/* TITLE */}

        <h2
          className="
            text-[1.5rem]
            sm:text-[3rem]
            lg:text-[2.7rem]
            font-semibold
            tracking-[-0.05em]
            leading-[0.95]
          "
          style={{
            color: '#081C4B',
          }}
        >
          {course.title}
        </h2>

        {/* DESCRIPTION */}

        <p
          className={`
            mt-4
            ${getTypography(
  sectionDescription,
  locale
)}
            max-w-2xl
          `}
          style={{
            color: '#64748B',
          }}
        >
          {course.description ||
            'Practical learning program designed for academic growth, career readiness, and long-term success.'}
        </p>

        {/* BOARDS */}

        {course.boards.length >
          0 && (
          <div className="mt-6">
            <div className="flex flex-wrap gap-2.5">
              {course.boards.map(
                board => (
                  <div
                    key={board.id}
                    className="
                      px-3
                      py-1.5
                      rounded-full
                      border
                      text-xs
                      font-semibold
                    "
                    style={{
                      borderColor:
                        '#DCE7FF',

                      background:
                        '#F8FAFF',

                      color:
                        '#081C4B',
                    }}
                  >
                    {
                      board.board
                    }
                  </div>
                )
              )}
            </div>
          </div>
        )}

        {/* INFO */}

        {course.courseInfo
          .length > 0 && (
          <div className="mt-7 space-y-2.5">
            {course.courseInfo.map(
              item => (
                <div
                  key={item.id}
                  className="
                    flex
                    items-center
                    justify-between
                    gap-4
                    pb-2.5
                    border-b
                    border-[#DCE7FF]
                  "
                >
                  <div
                    className="
                      flex
                      items-center
                      gap-2.5
                    "
                  >
                    <CheckCircle
                      className="
                        w-4
                        h-4
                      "
                      style={{
                        color:
                          '#4063a2',
                      }}
                    />

                    <span
                      className="
                        text-sm
                        font-semibold
                      "
                      style={{
                        color:
                          '#081C4B',
                        }}
                    >
                      {item.label}
                    </span>
                  </div>

                  <span
                    className="
                      text-sm
                      font-medium
                      text-right
                    "
                    style={{
                      color:
                        '#4B5C88',
                    }}
                  >
                    {item.value}
                  </span>
                </div>
              )
            )}
          </div>
        )}
      </div>

     {/* =======================================================
    RIGHT
======================================================= */}

<div
  className="
    lg:pl-4
    flex
    justify-center
    lg:justify-end
  "
>
  <div
    className={`
      ${featureCard}
      relative
      overflow-hidden
      border
      rounded-[24px]
      w-full
      max-w-[360px]
    `}
    style={{
      background: '#FFFFFF',

      border:
        '1px solid rgba(3,73,224,0.08)',

      boxShadow:
        '0 12px 28px rgba(15,23,42,0.05)',
    }}
  >
{/* ACCENT */}

        <div
          className="
            absolute
            left-0
            top-6
            w-[4px]
            h-12
            rounded-r-full
            z-20
          "
          style={{
            background:
              '#4063a2',
          }}
        />

    {/* IMAGE */}

    <div className="relative">
      <img
        src={
          course.thumbnail ||
          '/images/course-placeholder.jpg'
        }
        alt={course.title}
        className="
          w-full
          h-[200px]
          object-cover
        "
      />

      {/* OVERLAY */}

      <div
        className="
          absolute
          inset-0
        "
        style={{
          background:
            'linear-gradient(to top, rgba(8,28,75,0.45), rgba(8,28,75,0.02))',
        }}
      />

      {/* TITLE */}

      <div
        className="
          absolute
          left-5
          bottom-5
        "
      >
        <span
          className="
            inline-flex
            items-center
            gap-2
            px-3
            py-1.5
            rounded-full
            text-[10px]
            font-bold
            uppercase
            tracking-[0.14em]
          "
          style={{
            background:
              'rgba(255,255,255,0.18)',

            backdropFilter:
              'blur(12px)',

            color: '#FFFFFF',
          }}
        >
          Featured Program
        </span>

        <h3
          className="
            mt-3
            text-[1.6rem]
            font-black
            leading-[1]
          "
          style={{
            color: '#FFFFFF',
          }}
        >
          {course.title}
        </h3>
      </div>
    </div>

    {/* CONTENT */}

    <div className="p-5">
      {/* PRICE */}

      <div
        className="
          flex
          items-center
          justify-between
          gap-4
        "
      >
        <div>
          <p
            className="
              text-[11px]
              font-semibold
              uppercase
              tracking-[0.12em]
            "
            style={{
              color: '#64748B',
            }}
          >
            Starting From
          </p>

          <h3
            className="
              mt-1
              text-[2rem]
              font-black
              leading-none
            "
            style={{
              color: '#4063a2',
            }}
          >
            {startingPrice !== null
              ? `₹${startingPrice.toLocaleString()}`
              : 'Contact'}
          </h3>
        </div>

        <div
          className="
            w-11
            h-11
            rounded-2xl
            flex
            items-center
            justify-center
          "
          style={{
            background:
              'rgba(64,99,162,0.08)',
          }}
        >
          <GraduationCap
            className="
              w-5
              h-5
            "
            style={{
              color: '#4063a2',
            }}
          />
        </div>
      </div>

      {/* CTA */}

      <Link
        href="#pricing"
        className="
          mt-5
          inline-flex
          items-center
          justify-center
          w-full
          py-3
          rounded-xl
          text-sm
          font-semibold
          transition-all
          duration-300
          hover:scale-[1.01]
        "
        style={{
          background:
            '#31446b',

          color:
            '#FFFFFF',

          boxShadow:
            '0 10px 20px rgba(64,99,162,0.14)',
        }}
      >
        View Plans
      </Link>
    </div>
  </div>
</div>
</div>
  </div>
</section>

      {/* =======================================================
          PRICING
      ======================================================= */}

      <CoursePricingSection
        modes={course.modes}
        courseId={course.id}
      />

      {/* =======================================================
          FAQ
      ======================================================= */}

      {course.faqs.length > 0 && (
        <section className="py-14 sm:py-16 px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center">
              <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#0349E0]">
                FAQs
              </span>

              <h2
                className="
                  mt-3
                  text-[2rem]
                  sm:text-[3rem]
                  font-black
                  leading-[1.05]
                  tracking-[-0.04em]
                  text-[#081C4B]
                "
              >
                Frequently Asked Questions
              </h2>
            </div>

            <div className="mt-8 space-y-4">
              {course.faqs.map(
                faq => (
                  <div
                    key={faq.id}
                    className="
                      bg-[#F8FAFF]
                      border
                      border-[#E6EEFF]
                      rounded-[20px]
                      p-5
                    "
                  >
                    <h3
                      className="
                        text-[15px]
                        font-bold
                        text-[#081C4B]
                      "
                    >
                      {faq.question}
                    </h3>

                    <p
                      className="
                        mt-2
                        text-sm
                        text-[#7788B6]
                        leading-7
                      "
                    >
                      {faq.answer}
                    </p>
                  </div>
                )
              )}
            </div>
          </div>
        </section>
      )}
    </div>
  )
}