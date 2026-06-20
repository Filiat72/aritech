'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'

import {
  ArrowRight,
  BookOpen,
  ChevronDown,
} from 'lucide-react'

import {
  container,
  sectionSpacingCompact,
} from '@/styles/layout'

import {
  sectionHeading,
  sectionDescription,
  cardTitle,
  cardDescription,
  getTypography,
} from '@/styles/typography'

import { useLocale } from 'next-intl'

import {
  featureCard,
  tagPill,
} from '@/styles/cards'
import {
  ctaContainer,
  ctaHeading,
  ctaDescription,
  ctaWhiteButton,
  ctaBadge,
} from '@/styles/cta'



export default function CoursesPage() {
  const [courses, setCourses] = useState([])
const locale = useLocale()
  const [selectedCategory, setSelectedCategory] =
    useState('All')

  const [loading, setLoading] = useState(true)

  /* ====================================================
      FETCH COURSES
  ==================================================== */

  useEffect(() => {
    async function fetchCourses() {
      try {
        const res = await fetch('/api/courses?public=true')

        const data = await res.json()

        setCourses(data)
        console.log(courses)

      } catch (error) {
        console.error(
          'Failed to fetch courses:',
          error
        )

      } finally {
        setLoading(false)
      }
    }

    fetchCourses()

  }, [])

  /* ====================================================
      FILTER LOGIC
  ==================================================== */

 const filteredCourses =
  selectedCategory === 'All'
    ? courses
    : courses.filter(
        (course: any) =>
          course.category
            ?.trim()
            .toLowerCase() ===
          selectedCategory
            .trim()
            .toLowerCase()
      )
      const categories = [
  'All',

  ...new Set(
    courses
      .map(
        (course: any) =>
          course.category
      )
      .filter(Boolean)
  ),
]

  return (
    <div
      className="
        pt-20
        min-h-screen
        overflow-hidden
        relative
      "
      style={{
        background: '#FFFFFF',
      }}
    >
      {/* ====================================================
          BACKGROUND
      ==================================================== */}

      <div className="absolute inset-0 overflow-hidden pointer-events-none">

        <div
          className="
            absolute
            top-0
            right-[-180px]
            w-[500px]
            h-[500px]
            rounded-full
            bg-blue-100
            blur-3xl
            opacity-30
          "
        />

        <div
          className="
            absolute
            bottom-0
            left-[-180px]
            w-[500px]
            h-[500px]
            rounded-full
            bg-blue-100
            blur-3xl
            opacity-20
          "
        />
      </div>

      {/* ====================================================
          PAGE
      ==================================================== */}

      <section
        className={`
          relative
          z-10
          px-4
          ${sectionSpacingCompact}
        `}
      >
        <div className={container}>

          {/* ====================================================
              HERO
          ==================================================== */}

          <div
            className="
              max-w-3xl
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
                  text-xs
                  font-bold
                  uppercase
                  tracking-[0.2em]
                "
                style={{
                  color: '#FFFFFF',
                }}
              >
                All Programs
              </span>
            </div>

            {/* HEADING */}

            <h1
              className={`
                leading-[1.05]
                ${getTypography(
  sectionHeading,
  locale
)}
              `}
              style={{
                color: '#081C4B',
              }}
            >
              Explore Career-Focused

              <span
                className="block"
                style={{
                  color: '#4063a2',
                }}
              >
                Learning Programs
              </span>
            </h1>

            {/* DESCRIPTION */}

            <p
              className={`
                mt-6
                max-w-2xl
                ${getTypography(
  sectionDescription,
  locale
)}
              `}
              style={{
                color: '#64748B',
              }}
            >
              Industry-focused programs designed
              to help students gain practical
              skills, confidence and real-world
              career opportunities.
            </p>
          </div>

          {/* ====================================================
              FILTER BAR
          ==================================================== */}

          <div
            className="
              flex
              flex-col
              lg:flex-row
              lg:items-center
              lg:justify-between
              gap-6
              mt-12
              mb-10
            "
          >
            {/* LEFT */}

            <div>
              <h3
                className={`
                  ${getTypography(
  cardTitle,
  locale
)}
                `}
                style={{
                  color: '#081C4B',
                }}
              >
                Explore Our Courses
              </h3>

              <p
                className={`
                  mt-2
                  max-w-[520px]
                  ${getTypography(
  cardDescription,
  locale
)}
                `}
                style={{
                  color: '#7788B6',
                }}
              >
                Filter programs by category and
                discover practical learning paths
                designed for career growth.
              </p>
            </div>

            {/* DROPDOWN */}

            <div
              className="
                relative
                w-full
                lg:w-[280px]
              "
            >
              <select
                value={selectedCategory}
                onChange={(e) =>
                  setSelectedCategory(
                    e.target.value
                  )
                }
                className="
                  w-full
                  h-14
                  rounded-2xl
                  appearance-none
                  border
                  bg-white
                  px-5
                  pr-12
                  text-sm
                  font-semibold
                  outline-none
                  cursor-pointer
                "
                style={{
                  border:
                    '1px solid rgba(3,73,224,0.10)',

                  color: '#081C4B',

                  boxShadow:
                    '0 8px 24px rgba(15,23,42,0.04)',
                }}
              >
                {categories.map(
                  (category, index) => (
                    <option
                      key={index}
                      value={category}
                    >
                      {category}
                    </option>
                  )
                )}
              </select>

              <div
                className="
                  absolute
                  right-5
                  top-1/2
                  -translate-y-1/2
                  pointer-events-none
                "
              >
                <ChevronDown
                  className="w-5 h-5"
                  style={{
                    color: '#4063a2',
                  }}
                />
              </div>
            </div>
          </div>

          {/* ====================================================
              COURSES GRID
          ==================================================== */}

          {loading ? (

            <div className="text-center py-20">
              <p
                className="
                  text-lg
                  font-semibold
                "
                style={{
                  color: '#4063a2',
                }}
              >
                Loading courses...
              </p>
            </div>

          ) : filteredCourses.length === 0 ? (

            <div
              className="
                bg-white
                rounded-[32px]
                border
                border-[#E5EEFF]
                p-10
                sm:p-14
                text-center
              "
            >
              <div
                className="
                  w-20
                  h-20
                  rounded-full
                  bg-[#EEF4FF]
                  flex
                  items-center
                  justify-center
                  mx-auto
                "
              >
                <BookOpen
                  className="
                    w-10
                    h-10
                    text-[#1D4ED8]
                  "
                />
              </div>

              <h3
                className={`
                  mt-6
                  ${getTypography(
  cardTitle,
  locale
)}
                `}
                style={{
                  color: '#081C4B',
                }}
              >
                No Courses Available
              </h3>

              <p
                className={`
                  mt-3
                  ${getTypography(
  cardDescription,
  locale
)}
                `}
                style={{
                  color: '#64748B',
                }}
              >
                Courses will appear here once
                added.
              </p>
            </div>

          ) : (
<div
  className="
    grid
    sm:grid-cols-2
    xl:grid-cols-3
    gap-5
  "
>
  {filteredCourses.map(
    (course: any) => (
      <Link
        key={course.id}
        href={`/courses/${course.slug}`}
        className={`
          ${featureCard}
          group
          rounded-[20px]
          overflow-hidden
          border
          transition-all
          duration-300
          hover:-translate-y-1
        `}
        style={{
          background: '#FFFFFF',

          border:
            '1px solid rgba(3,73,224,0.08)',

          boxShadow:
            '0 4px 14px rgba(15,23,42,0.04)',
        }}
      >

         {/* ACCENT */}

        <div
          className="
            absolute
            left-0
            top-5
            w-[3px]
            h-10
            rounded-r-full
            z-20
          "
          style={{
            background: '#4063a2',
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
              h-[150px]
              object-cover
              transition-transform
              duration-500
              group-hover:scale-[1.03]
            "
          />

          {/* CATEGORY */}

          <div
            className="
              absolute
              top-3
              left-3
              px-2.5
              py-1
              rounded-full
              text-[10px]
              font-semibold
            "
            style={{
              background:
                'rgba(255,255,255,0.92)',

              color: '#4063a2',

              backdropFilter:
                'blur(10px)',
            }}
          >
            {course.category}
          </div>
        </div>

        {/* CONTENT */}

        <div className="p-4">
          {/* TITLE + BUTTON */}

          <div
            className="
              flex
              items-start
              justify-between
              gap-3
            "
          >
            <h3
              className="
                text-[1rem]
                font-bold
                leading-snug
                line-clamp-2
                transition-colors
                duration-300
                group-hover:text-[#0349E0]
            "
              style={{
                color: '#081C4B',
              }}
            >
              {course.title}
            </h3>

            <div
              className="
                shrink-0
                w-8
                h-8
                rounded-lg
                flex
                items-center
                justify-center
                transition-all
                duration-300
                group-hover:translate-x-1
              "
              style={{
                background:
                  'rgba(64, 99, 162, 0.08)',

                color: '#4063a2',
              }}
            >
              <ArrowRight className="w-4 h-4" />
            </div>
          </div>

          {/* DESCRIPTION */}

          <p
            className="
              mt-2
              text-sm
              leading-relaxed
              line-clamp-2
            "
            style={{
              color: '#7788B6',
            }}
          >
            {course.description}
          </p>
        </div>
      </Link>
    )
  )}
</div>
          )}

            {/* ====================================================
            CTA
        ==================================================== */}

        <div className="mt-16">
          <div
            className={ctaContainer}
            style={{
              background:
                '#4063a2',

              boxShadow:
                '0 30px 80px rgba(3,73,224,0.22)',
            }}
          >
            <div
              className="
                relative
                z-10
                max-w-3xl
                mx-auto
              "
            >
              {/* BADGE */}

              <div
                className={`
                  ${ctaBadge}
                  mb-6
                `}
                style={{
                  background:
                    'rgba(255,255,255,0.12)',

                  border:
                    '1px solid rgba(255,255,255,0.14)',
                }}
              >
                <div
                  className="
                    w-2
                    h-2
                    rounded-full
                    bg-white
                  "
                />

                <span
                  className="
                    text-xs
                    font-bold
                    uppercase
                    tracking-[0.1em]
                    text-white
                  "
                >
                  Start Learning Today
                </span>
              </div>

              {/* HEADING */}

              <h2
                className={`
                ${getTypography(
  sectionHeading,
  locale
)}
                  text-white
                `}
              >
                Build Skills.

                <span className="block">
                  Grow Your Career.
                </span>
              </h2>

              {/* DESCRIPTION */}

              <p
                className={`
                  ${getTypography(
  sectionDescription,
  locale
)}
                  mt-6
                  mx-auto
                `}
                style={{
                  color:
                    'rgba(255,255,255,0.78)',

                  maxWidth: '720px',
                }}
              >
                Choose practical,
                career-focused learning
                programs designed to help
                students gain confidence and
                real-world opportunities.
              </p>

              {/* BUTTON */}

              <div className="mt-10">
                <Link
                  href="/contact"
                  className={ctaWhiteButton}
                  style={{
                    background: '#FFFFFF',

                    color: '#31446b',

                    boxShadow:
                      '0 12px 30px rgba(0,0,0,0.12)',
                  }}
                >
                  Contact Our Team

                  <ArrowRight className="w-5 h-5" />
                </Link>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  </div>
)
}