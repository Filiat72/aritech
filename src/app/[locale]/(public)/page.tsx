
import { prisma } from '@/lib/prisma'

import HeroSection from '@/components/public/home/HeroSection'
import TestimonialSection from '@/components/public/home/TestimonialSection'
import LearningPathSection from '@/components/public/home/LearningPathSection'
import WhyChooseUsSection from '@/components/public/home/WhyChooseUsSection'
import LMSSection from '@/components/public/home/LMSSection'
import ResultsSection from '@/components/public/home/ResultsSection'
import FAQSection from '@/components/public/home/FAQSection'

// ─────────────────────────────────────────────────────────────
// PAGE
// ─────────────────────────────────────────────────────────────

export default async function HomePage() {

  const [
    courses,
    testimonials,
    results,
    announcements,
  ] = await Promise.all([
    prisma.course.findMany({
      where: { isActive: true },
      take: 6,
    }),

    prisma.testimonial.findMany({
      where: { isActive: true },
      take: 3,
    }),

    prisma.result.findMany({
      take: 4,
      orderBy: { createdAt: 'desc' },
    }),

    prisma.announcement.findMany({
      where: {
        isActive: true,

        OR: [
          { expiresAt: null },

          {
            expiresAt: {
              gt: new Date(),
            },
          },
        ],
      },

      take: 1,
    }),
  ])

  return (
    <div
      className={
  announcements.length > 0
    ? 'pt-[95px]'
    : 'pt-[70px]'
}
      style={{
        background: '#eff6ff',
      }}
    >

      {/* HERO */}
      <HeroSection />

<LearningPathSection />

  <WhyChooseUsSection />  

<LMSSection />     

<ResultsSection results={results} />


 
{testimonials.length > 0 && (
  <TestimonialSection testimonials={testimonials} />
)}
      

    
<FAQSection />
</div>
  )
}