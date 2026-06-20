import { prisma } from '@/lib/prisma'
import Link from 'next/link'
import Image from 'next/image'

import {
  ArrowRight,
  BookOpen,
  Calendar,
  Clock3,
} from 'lucide-react'

import {
  container,
  sectionSpacingCompact,
  sectionHeader,
} from '@/styles/layout'

import {
  heroHeading,
  heroDescription,
  sectionHeading,
  sectionDescription,
  cardTitle,
  cardDescription,
  getTypography,
} from '@/styles/typography'

import { getLocale } from 'next-intl/server'

import {
  featureCard,
  tagPill,
  elevatedSurface,
} from '@/styles/cards'

import {
  ctaContainer,
  ctaWhiteButton,
  ctaBadge,
} from '@/styles/cta'

export default async function BlogPage() {

  const locale = await getLocale()
  const posts = await prisma.blogPost.findMany({
    where: { isPublished: true },
    orderBy: { createdAt: 'desc' },
  })

  const featuredPost = posts[0]
  const remainingPosts = posts.slice(1)

  return (
    <div className="pt-20 bg-white overflow-hidden">
      {/* HERO */}
      <section
        className={`relative ${sectionSpacingCompact}`}
      >
        <div className="absolute top-0 right-0 w-[320px] sm:w-[420px] h-[320px] sm:h-[420px] bg-[#EEF4FF] rounded-full blur-3xl opacity-70 pointer-events-none" />

        <div
          className={`${container} relative z-10`}
        >
          <div className="max-w-3xl mx-auto text-center">
            {/* LABEL */}
            <div
              className={`
                inline-flex
                items-center
                gap-2
                ${tagPill}
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
                className="w-2 h-2 rounded-full"
                style={{
                  background: '#FFFFFF',
                }}
              />

              <span
                className="
                  text-[11px]
                  font-bold
                  uppercase
                  tracking-[0.22em]
                "
                style={{
                  color: '#FFFFFF',
                }}
              >
                AriTech Knowledge Hub
              </span>
            </div>

            {/* HEADING */}
            <h1
              className={`
                ${getTypography(
  sectionHeading,
  locale
)}
                text-[#081C4B]
              `}
            >
              Educational Insights &
              <br className="hidden sm:block" />
              Resources
            </h1>

            {/* DESCRIPTION */}
            <p
              className={`
               ${getTypography(
  sectionDescription,
  locale
)}
                mt-6
                text-[#7788B6]
                max-w-2xl
                mx-auto
              `}
            >
              Explore educational strategies,
              preparation techniques, career
              guidance and practical learning
              insights crafted for ambitious
              students.
            </p>

            {/* STATS */}
            <div className="flex flex-wrap justify-center gap-4 mt-8">
              <div
                className="
                  min-w-[160px]
                  rounded-[22px]
                  px-5
                  py-5
                "
                style={elevatedSurface}
              >
                <p className="text-2xl font-black text-[#4063a2]">
                  {posts.length}+
                </p>

                <p className="mt-1 text-sm font-medium text-[#7788b6]">
                  Articles Published
                </p>
              </div>

              <div
                className="
                  min-w-[160px]
                  rounded-[22px]
                  px-5
                  py-5
                "
                style={elevatedSurface}
              >
                <p className="text-2xl font-black text-[#4063a2]">
                  Weekly
                </p>

                <p className="mt-1 text-sm font-medium text-[#7788B6]">
                  Fresh Content
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* BLOG GRID */}
      <section className="pb-20">
        <div className={container}>
          {/* HEADER */}
          <div
            className={`
              ${sectionHeader}
              lg:flex
              lg:items-end
              lg:justify-between
              lg:max-w-none
              text-center
              lg:text-left
              gap-6
            `}
          >
            <div>
              <p className="text-[#4063a2] text-[11px] font-bold uppercase tracking-[0.24em]">
                Latest Articles
              </p>

              <h2
                className={`
                  ${getTypography(
  sectionHeading,
  locale
)}
                  mt-4
                  text-[#081C4B]
                `}
              >
                Explore Our Blog
              </h2>

              <p
                className={`
                  ${getTypography(
  sectionDescription,
  locale
)}
                  mt-4
                  text-[#7788B6]
                  max-w-2xl
                `}
              >
                Practical educational insights,
                exam strategies and student-focused
                learning resources curated by
                AriTech.
              </p>
            </div>

            <div
              className="
                inline-flex
                items-center
                justify-center
                rounded-2xl
                border
                border-[#E6EEFF]
                bg-[#F8FAFF]
                px-5
                py-3
                text-sm
                font-semibold
                text-[#081C4B]
              "
            >
              {posts.length}+ Articles Published
            </div>
          </div>

          {/* EMPTY */}
          {posts.length === 0 ? (
            <div className="border border-[#E6EEFF] rounded-[28px] bg-[#F8FAFF] py-20 px-6 text-center">
              <div className="w-16 h-16 rounded-2xl bg-[#EEF4FF] flex items-center justify-center mx-auto">
                <BookOpen className="w-8 h-8 text-[#4063a2]" />
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
                No Blog Posts Yet
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
                Fresh educational articles will
                appear here shortly.
              </p>
            </div>
          ) : (
            <div className="grid sm:grid-cols-2 xl:grid-cols-4 gap-5">
              {/* FEATURED POST */}
              {featuredPost && (
                <Link
                  href={`/blog/${featuredPost.slug}`}
                  className={`
                    ${featureCard}
                    relative
                    block
                    sm:col-span-2
                    bg-white
                    border
                    border-[#E6EEFF]
                    rounded-[24px]
                    overflow-hidden
                    hover:shadow-[0_18px_50px_rgba(3,73,224,0.08)]
                  `}
                >
                  {/* ACCENT */}
                  <div className="absolute left-0 top-6 h-12 w-1 bg-[#4063a2] rounded-r-full z-20" />

                  {/* IMAGE */}
                  <div className="relative h-[220px] sm:h-[260px] overflow-hidden bg-[#F8FAFF]">
                    {featuredPost.coverImage ? (
                      <Image
                        src={featuredPost.coverImage}
                        alt={featuredPost.title}
                        fill
                        unoptimized
                        className="object-cover group-hover:scale-[1.03] transition-all duration-500"
                      />
                    ) : (
                      <div className="w-full h-full bg-gradient-to-br from-[#EEF4FF] to-[#F8FAFF] flex items-center justify-center">
                        <div className="w-20 h-20 rounded-full bg-white border border-[#E6EEFF] flex items-center justify-center">
                          <BookOpen className="w-8 h-8 text-[#4063a2]" />
                        </div>
                      </div>
                    )}
                  </div>

                  {/* CONTENT */}
                  <div className="p-5 sm:p-6">
                    {/* META */}
                    <div className="flex flex-wrap items-center gap-3 text-[13px] text-[#7788B6]">
                      <div className="flex items-center gap-1.5">
                        <Calendar className="w-3.5 h-3.5" />

                        {featuredPost.createdAt
                          ? new Date(
                              featuredPost.createdAt
                            ).toLocaleDateString(
                              'en-IN',
                              {
                                day: 'numeric',
                                month: 'long',
                                year: 'numeric',
                              }
                            )
                          : 'Draft'}
                      </div>

                      <div className="flex items-center gap-1.5">
                        <Clock3 className="w-3.5 h-3.5" />

                        {Math.max(
                          1,
                          Math.ceil(
                            featuredPost.content
                              .length / 900
                          )
                        )}{' '}
                        min read
                      </div>
                    </div>

                    {/* TITLE */}
                    <h2
                      className={`
                       ${getTypography(
  sectionHeading,
  locale
)}
                        mt-3
                        text-[#081C4B]
                        line-clamp-2
                        group-hover:text-[#4063a2]
                        transition-colors
                      `}
                    >
                      {featuredPost.title}
                    </h2>

                    {/* DESCRIPTION */}
                    <p
                      className={`
                       ${getTypography(
  sectionDescription,
  locale
)}
                        mt-3
                        text-[#7788B6]
                        line-clamp-2
                      `}
                    >
                      {featuredPost.content
                        .replace(/[#*`]/g, '')
                        .slice(0, 140)}
                      ...
                    </p>

                    {/* CTA */}
                    <div className="flex items-center gap-2 mt-4 text-[#4063a2] font-semibold text-sm">
                      Read Featured Article

                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-all" />
                    </div>
                  </div>
                </Link>
              )}

              {/* REMAINING POSTS */}
              {remainingPosts.map((post) => (
                <Link
                  href={`/blog/${post.slug}`}
                  key={post.id}
                  className={`
                    ${featureCard}
                    relative
                    block
                    bg-white
                    border
                    border-[#E6EEFF]
                    rounded-[22px]
                    hover:shadow-[0_16px_40px_rgba(3,73,224,0.08)]
                  `}
                >
                  {/* ACCENT */}
                  <div className="absolute left-0 top-5 h-10 w-1 bg-[#0349E0] rounded-r-full z-20" />

                  {/* IMAGE */}
                  <div className="relative h-[140px] overflow-hidden bg-[#F8FAFF]">
                    {post.coverImage ? (
                      <Image
                        src={post.coverImage}
                        alt={post.title}
                        fill
                        unoptimized
                        className="object-cover group-hover:scale-[1.03] transition-all duration-500"
                      />
                    ) : (
                      <div className="w-full h-full bg-gradient-to-br from-[#EEF4FF] to-[#F8FAFF] flex items-center justify-center">
                        <div className="w-14 h-14 rounded-full bg-white border border-[#E6EEFF] flex items-center justify-center">
                          <BookOpen className="w-6 h-6 text-[#0349E0]" />
                        </div>
                      </div>
                    )}
                  </div>

                  {/* CONTENT */}
                  <div className="p-4">
                    {/* META */}
                    <div className="flex flex-wrap items-center gap-3 text-[12px] text-[#7788B6]">
                      <div className="flex items-center gap-1">
                        <Calendar className="w-3 h-3" />

                        {post.createdAt
                          ? new Date(
                              post.createdAt
                            ).toLocaleDateString(
                              'en-IN',
                              {
                                day: 'numeric',
                                month: 'short',
                              }
                            )
                          : 'Draft'}
                      </div>

                      <div className="flex items-center gap-1">
                        <Clock3 className="w-3 h-3" />

                        {Math.max(
                          1,
                          Math.ceil(
                            post.content.length /
                              900
                          )
                        )}{' '}
                        min
                      </div>
                    </div>

                    {/* TITLE */}
                    <h3
                      className={`
                        ${getTypography(
  cardTitle,
  locale
)}
                        mt-2.5
                        text-[#081C4B]
                        line-clamp-2
                        group-hover:text-[#0349E0]
                        transition-colors
                      `}
                    >
                      {post.title}
                    </h3>

                    {/* DESCRIPTION */}
                    <p
                      className={`
                        ${getTypography(
  cardDescription,
  locale
)}
                        mt-2
                        text-[#7788B6]
                        line-clamp-2
                      `}
                    >
                      {post.content
                        .replace(/[#*`]/g, '')
                        .slice(0, 80)}
                      ...
                    </p>

                    {/* CTA */}
                    <div className="flex items-center gap-1.5 mt-3 text-[#0349E0] font-semibold text-[13px]">
                      Read

                      <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-all" />
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* CTA */}
      {/* <section className="pb-20">
        <div className={container}>
          <div
            className={ctaContainer}
            style={{
              background: '#0349E0',
            }}
          >
            <div className="relative z-10 max-w-3xl mx-auto text-center"> */}
              {/* BADGE */}
              {/* <div
                className={`
                  ${ctaBadge}
                  bg-white/10
                  border
                  border-white/10
                  text-blue-100
                  mb-6
                `}
              >
                <div className="w-2 h-2 rounded-full bg-blue-200" />

                <span className="text-[11px] uppercase tracking-[0.24em] font-bold">
                  Learn Something New
                </span>
              </div> */}

              {/* HEADING */}
              {/* <h2
                className={`
                  ${heroHeading.en}
                  text-white
                `}
              >
                Keep Learning With AriTech
              </h2> */}

              {/* DESCRIPTION */}
              {/* <p
                className={`
                  ${heroDescription.en}
                  mt-5
                  text-blue-100
                  max-w-2xl
                  mx-auto
                `}
              >
                Explore educational insights,
                exam preparation strategies and
                career-focused learning resources.
              </p> */}

              {/* BUTTON */}
              {/* <Link
                href="/courses"
                className={`
                  ${ctaWhiteButton}
                  mt-8
                  bg-white
                  hover:bg-blue-50
                  text-[#0349E0]
                `}
              >
                Explore Courses

                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section> */}
    </div>
  )
}