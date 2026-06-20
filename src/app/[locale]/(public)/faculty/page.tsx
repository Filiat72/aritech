import Image from 'next/image'
import Link from 'next/link'
import { prisma } from '@/lib/prisma'

import {
  Users,
  ArrowRight,
  Briefcase,
} from 'lucide-react'

import { useLocale } from 'next-intl'

import {
  sectionHeading,
  sectionDescription,
  cardTitle,
  cardDescription,
  tagText,
  getTypography,
} from '@/styles/typography'
import { getLocale } from 'next-intl/server'
export default async function FacultyPage() {

  const locale = await getLocale()
  const faculty = await prisma.faculty.findMany({
    where: { isActive: true },
    orderBy: { createdAt: 'desc' },
  })

  return (
    <div className="pt-20 bg-white overflow-hidden">
      {/* HERO */}
      <section className="relative px-4 py-16">
        <div className="absolute top-0 right-0 w-[420px] h-[420px] bg-[#EEF4FF] rounded-full blur-3xl opacity-70" />

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="max-w-3xl">
            {/* label */}
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
          background: '#4062a2b3',
          border: '1px solid #4063a2',
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
            text-xs
            font-bold
            uppercase
            tracking-[0.2em]
          "
          style={{
            color: '#FFFFFF',
          }}
        >
          Our Faculty Team
        </span>
      </div>

            <h1
  className={`
    mt-5
    text-[#081C4B]
    ${getTypography(
      sectionHeading,
      locale
    )}
  `}
>
              Learn From
              <br />
              Experienced Mentors
            </h1>

            <p
  className={`
    mt-5
    max-w-2xl
    text-[#7788B6]
    ${getTypography(
      sectionDescription,
      locale
    )}
  `}
>
              Our faculty team consists of experienced trainers
              and industry professionals focused on practical
              learning, mentorship, and career-focused guidance.
            </p>
          </div>

          
          
        </div>
      </section>

      {/* FACULTY GRID */}
      <section className="px-4 pb-16">
        <div className="max-w-7xl mx-auto">
          {faculty.length === 0 ? (
            <div className="border border-[#E6EEFF] rounded-[28px] bg-[#F8FAFF] py-20 px-6 text-center">
              <div className="w-16 h-16 rounded-2xl bg-[#EEF4FF] flex items-center justify-center mx-auto">
                <Users className="w-8 h-8 text-[#4063a2]" />
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
                Faculty Profiles Coming Soon
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
                Faculty information will be updated shortly.
              </p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
              {faculty.map((f) => (
                <div
                  key={f.id}
                  className="bg-white border border-[#E6EEFF] rounded-[28px] overflow-hidden"
                >
                  {/* IMAGE */}
                  <div className="relative h-[260px] bg-[#F8FAFF]">
                    {f.photo ? (
                      <Image
                        src={f.photo}
                        alt={f.name}
                        fill
                        unoptimized
                        className="object-cover object-top"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-6xl font-black text-[#0349E0] bg-[#EEF4FF]">
                        {f.name.charAt(0)}
                      </div>
                    )}
                  </div>

                  {/* CONTENT */}
                  <div className="p-6">
                   {/* SUBJECT */}
<div
  className={`
    inline-flex
    items-center
    px-3
    py-1
    rounded-full
    bg-[#EEF4FF]
    text-[#0349E0]
    uppercase
    tracking-wide
    ${getTypography(
      tagText,
      locale
    )}
  `}
>
  {f.subjects?.[0] || 'Faculty'}
</div>

                    {/* NAME */}
                    <h3
  className={`
    mt-4
    text-[#081C4B]
    ${getTypography(
      cardTitle,
      locale
    )}
  `}
>
                      {f.name}
                    </h3>

                    {/* ROLE */}
                    <p className="mt-1 text-sm font-semibold text-[#0349E0]">
                      Senior Faculty Trainer
                    </p>

                    {/* BIO */}
                    <p
  className={`
    mt-4
    text-[#7788B6]
    line-clamp-3
    ${getTypography(
      cardDescription,
      locale
    )}
  `}
>
                      {f.bio}
                    </p>

                    {/* EXPERIENCE */}
                    <div className="flex items-center gap-2 mt-5 text-sm text-[#081C4B] font-semibold">
                      <Briefcase className="w-4 h-4 text-[#0349E0]" />

                      <span>{f.experience} Experience</span>
                    </div>

                    {/* TAGS */}
                    {f.subjects?.length > 0 && (
                      <div className="flex flex-wrap gap-2 mt-5">
                        {f.subjects.slice(0, 2).map((s) => (
                          <span
                            key={s}
                            className="px-3 py-1 rounded-full bg-[#F8FAFF] border border-[#E6EEFF] text-[#7788B6] text-[11px] font-medium"
                          >
                            {s}
                          </span>
                        ))}
                      </div>
                    )}
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