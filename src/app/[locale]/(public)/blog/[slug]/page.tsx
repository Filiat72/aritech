import { prisma } from '@/lib/prisma'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import ReactMarkdown from 'react-markdown'

import {
  ArrowLeft,
  Calendar,
  Clock3,
} from 'lucide-react'

import {
  container,
  sectionSpacingCompact,
} from '@/styles/layout'

import {
  heroHeading,
  heroDescription,
} from '@/styles/typography'

import {
  featureCard,
  tagPill,
  elevatedSurface,
} from '@/styles/cards'

export default async function BlogDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params

  const post = await prisma.blogPost.findUnique({
    where: {
      slug,
      isPublished: true,
    },
  })

  if (!post) notFound()

  const readingTime = Math.max(
    1,
    Math.ceil(post.content.length / 900)
  )

  return (
    <div className="pt-20 bg-white overflow-hidden">
      {/* HERO */}
      <section
        className={`
          relative
          ${sectionSpacingCompact}
        `}
      >
        {/* BACKGROUND GLOW */}
        <div className="absolute top-0 right-0 w-[320px] sm:w-[420px] h-[320px] sm:h-[420px] bg-[#EEF4FF] rounded-full blur-3xl opacity-70 pointer-events-none" />

        <div
          className={`
            ${container}
            relative
            z-10
          `}
        >
          <div className="max-w-4xl mx-auto">
            {/* BACK BUTTON */}
            <Link
              href="/blog"
              className="
                inline-flex
                items-center
                gap-2
                text-sm
                font-semibold
                text-[#4063a2]
                hover:text-[#4063a2]
                transition-colors
                mb-8
              "
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Blog
            </Link>

            {/* LABEL */}
            {/* <div
              className={`
                inline-flex
                items-center
                gap-2
                ${tagPill}
                mb-6
              `}
              style={{
                background:
                  'rgba(3,73,224,0.08)',

                border:
                  '1px solid rgba(3,73,224,0.12)',
              }}
            >
              <div className="w-2 h-2 rounded-full bg-[#0349E0]" />

              <span
                className="
                  text-[11px]
                  font-bold
                  uppercase
                  tracking-[0.22em]
                  text-[#0349E0]
                "
              >
                AriTech Blog
              </span>
            </div> */}

            {/* TITLE */}
            <h1
              className={`
                ${heroHeading.default}
                text-[#081C4B]
              `}
            >
              {post.title}
            </h1>

            {/* DESCRIPTION */}
            <p
              className={`
                ${heroDescription.default}
                mt-6
                text-[#7788B6]
                max-w-3xl
              `}
            >
              Educational insights, practical
              strategies and curated learning
              resources designed to help students
              grow academically and professionally.
            </p>

            {/* META */}
            <div className="flex flex-wrap items-center gap-4 mt-8">
              <div
                className="
                  inline-flex
                  items-center
                  gap-2
                  rounded-2xl
                  px-4
                  py-3
                "
                style={elevatedSurface}
              >
                <Calendar className="w-4 h-4 text-[#4063a2]" />

                <span className="text-sm font-medium text-[#081c4b]">
                  {post.createdAt
                    ? new Date(
                        post.createdAt
                      ).toLocaleDateString(
                        'en-IN',
                        {
                          day: 'numeric',
                          month: 'long',
                          year: 'numeric',
                        }
                      )
                    : 'Draft'}
                </span>
              </div>

              <div
                className="
                  inline-flex
                  items-center
                  gap-2
                  rounded-2xl
                  px-4
                  py-3
                "
                style={elevatedSurface}
              >
                <Clock3 className="w-4 h-4 text-[#4063a2]" />

                <span className="text-sm font-medium text-[#081C4B]">
                  {readingTime} min read
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CONTENT */}
      <section className="pb-20">
        <div className={container}>
          <div className="max-w-4xl mx-auto">
            <article
              className={`
                ${featureCard}
                rounded-[28px]
                p-5
                sm:p-7
                lg:p-10
                hover:translate-y-0
              `}
              style={elevatedSurface}
            >
              <div
                className="
                  prose
                  prose-sm
                  sm:prose-base
                  lg:prose-lg
                  max-w-none

                  prose-headings:text-[#081C4B]
                  prose-headings:font-black

                  prose-p:text-[#52607A]
                  prose-p:leading-8

                  prose-strong:text-[#081C4B]

                  prose-a:text-[#0349E0]

                  prose-li:text-[#52607A]

                  prose-blockquote:border-l-[#0349E0]
                  prose-blockquote:text-[#52607A]

                  prose-code:text-[#0349E0]

                  prose-pre:bg-[#081C4B]
                "
              >
                <ReactMarkdown>
                  {post.content}
                </ReactMarkdown>
              </div>
            </article>

            {/* BACK BUTTON */}
            <div className="flex justify-center mt-10">
              <Link
                href="/blog"
                className={`
                  ${tagPill}
                  inline-flex
                  items-center
                  gap-2
                  px-5
                  py-3
                  border
                  border-[#DCE7FF]
                  bg-white
                  text-sm
                  font-semibold
                  text-[#4063a2]
                  hover:bg-[#F8FAFF]
                  transition-all
                `}
              >
                <ArrowLeft className="w-4 h-4" />
                Back to Blog
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}