export const dynamic = 'force-dynamic'
import { prisma } from '@/lib/prisma'

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'

export default async function DashboardPage() {
  const [
    courses,
    branches,
    faculty,
    posts,
    results,
    testimonials,
    announcements,

    recentCourses,
    recentResults,
    recentPosts,
    recentTestimonials,
    recentAnnouncements,
  ] = await Promise.all([
    prisma.course.count(),

    prisma.branch.count(),

    prisma.faculty.count(),

    prisma.blogPost.count(),

    prisma.result.count(),

    prisma.testimonial.count(),

    prisma.announcement.count(),

    prisma.course.findMany({
      orderBy: {
        createdAt: 'desc',
      },

      take: 3,

      select: {
        id: true,

        title: true,

        createdAt: true,
      },
    }),

    prisma.result.findMany({
      orderBy: {
        createdAt: 'desc',
      },

      take: 3,

      select: {
        id: true,

        studentName: true,

        createdAt: true,
      },
    }),

    prisma.blogPost.findMany({
      orderBy: {
        createdAt: 'desc',
      },

      take: 3,

      select: {
        id: true,

        title: true,

        createdAt: true,
      },
    }),

    prisma.testimonial.findMany({
      orderBy: {
        createdAt: 'desc',
      },

      take: 3,

      select: {
        id: true,

        studentName: true,

        createdAt: true,
      },
    }),

    prisma.announcement.findMany({
      orderBy: {
        createdAt: 'desc',
      },

      take: 3,

      select: {
        id: true,

        title: true,

        createdAt: true,
      },
    }),
  ])

  /* ======================================================
      ACTIVE COUNTS
  ====================================================== */

  const activeCourses =
    await prisma.course.count({
      where: {
        isActive: true,
      },
    })

  /* ======================================================
      STATS
  ====================================================== */

  const stats = [
    {
      label: 'Total Courses',

      value: courses,

      sub: `${activeCourses} active`,

      color:
        'from-blue-500 to-blue-700',
    },

    {
      label: 'Branches',

      value: branches,

      sub: 'locations',

      color:
        'from-emerald-500 to-green-700',
    },

    {
      label: 'Faculty',

      value: faculty,

      sub: 'members',

      color:
        'from-yellow-400 to-orange-500',
    },

    {
      label: 'Blog Posts',

      value: posts,

      sub: 'articles',

      color:
        'from-purple-500 to-violet-700',
    },

    {
      label: 'Results',

      value: results,

      sub: 'achievements',

      color:
        'from-cyan-500 to-sky-700',
    },

    {
      label: 'Testimonials',

      value: testimonials,

      sub: 'reviews',

      color:
        'from-pink-500 to-rose-700',
    },

    {
      label: 'Announcements',

      value: announcements,

      sub: 'active banners',

      color:
        'from-slate-600 to-slate-800',
    },
  ]

  /* ======================================================
      RECENT ACTIVITIES
  ====================================================== */

  const activities = [
    ...recentCourses.map(
      item => ({
        id: item.id,

        type: 'Course',

        title: item.title,

        createdAt:
          item.createdAt,

        color:
          'bg-blue-500',
      })
    ),

    ...recentResults.map(
      item => ({
        id: item.id,

        type: 'Result',

        title:
          item.studentName,

        createdAt:
          item.createdAt,

        color:
          'bg-cyan-500',
      })
    ),

    ...recentPosts.map(
      item => ({
        id: item.id,

        type: 'Blog',

        title: item.title,

        createdAt:
          item.createdAt,

        color:
          'bg-purple-500',
      })
    ),

    ...recentTestimonials.map(
      item => ({
        id: item.id,

        type: 'Testimonial',

        title:
          item.studentName,

        createdAt:
          item.createdAt,

        color:
          'bg-pink-500',
      })
    ),

    ...recentAnnouncements.map(
      item => ({
        id: item.id,

        type:
          'Announcement',

        title: item.title,

        createdAt:
          item.createdAt,

        color:
          'bg-slate-500',
      })
    ),
  ]
    .sort(
      (a, b) =>
        new Date(
          b.createdAt
        ).getTime() -
        new Date(
          a.createdAt
        ).getTime()
    )
    .slice(0, 10)

  return (
    <div className="space-y-8">

      {/* HEADER */}

      <div>

        <h1
          className="
            text-3xl
            font-bold
            tracking-tight
            text-black
          "
        >
          Dashboard
        </h1>

        <p className="text-gray-500 mt-2">
          Welcome to Aritech CMS
        </p>

      </div>

      {/* STATS GRID */}

      <div
        className="
          grid
          grid-cols-1
          sm:grid-cols-2
          xl:grid-cols-4
          gap-5
        "
      >

        {stats.map(stat => (

          <div
            key={stat.label}
            className={`
              bg-gradient-to-br
              ${stat.color}
              rounded-3xl
              p-5
              text-white
              shadow-lg
              hover:scale-[1.02]
              hover:shadow-2xl
              transition-all
              duration-300
              relative
              overflow-hidden
              min-h-[150px]
              flex
              flex-col
              justify-between
            `}
          >

            {/* GLOW */}

            <div
              className="
                absolute
                top-0
                right-0
                w-28
                h-28
                bg-white/10
                rounded-full
                blur-3xl
              "
            />

            {/* NUMBER */}

            <h2
              className="
                text-4xl
                font-bold
                tracking-tight
                relative
                z-10
              "
            >
              {stat.value}
            </h2>

            {/* CONTENT */}

            <div className="relative z-10">

              <p
                className="
                  text-lg
                  font-semibold
                "
              >
                {stat.label}
              </p>

              <p
                className="
                  text-sm
                  text-white/80
                  mt-1
                "
              >
                {stat.sub}
              </p>

            </div>

          </div>
        ))}

      </div>

      {/* RECENT ACTIVITIES */}

      <Card
        className="
          rounded-3xl
          border
          border-gray-200
          shadow-sm
        "
      >

        <CardHeader>

          <CardTitle
            className="
              text-2xl
              font-bold
              text-gray-900
            "
          >
            Recent Activities
          </CardTitle>

        </CardHeader>

        <CardContent>

          {activities.length ===
          0 ? (

            <p
              className="
                text-gray-400
                text-sm
              "
            >
              No recent activities yet.
            </p>
          ) : (

            <div className="space-y-5">

              {activities.map(
                activity => (

                  <div
                    key={`${activity.type}-${activity.id}`}
                    className="
                      flex
                      items-start
                      gap-4
                      border-b
                      border-gray-100
                      pb-5
                      last:border-none
                    "
                  >

                    {/* DOT */}

                    <div
                      className={`
                        w-3
                        h-3
                        rounded-full
                        mt-2
                        ${activity.color}
                      `}
                    />

                    {/* CONTENT */}

                    <div className="flex-1">

                      <p
                        className="
                          text-sm
                          font-semibold
                          text-gray-900
                        "
                      >
                        [{activity.type}]{' '}
                        {activity.title}
                      </p>

                      <p
                        className="
                          text-xs
                          text-gray-400
                          mt-1
                        "
                      >
                        {new Date(
                          activity.createdAt
                        ).toLocaleDateString(
                          'en-IN',
                          {
                            day: 'numeric',

                            month: 'short',

                            year: 'numeric',
                          }
                        )}
                      </p>

                    </div>

                  </div>
                )
              )}

            </div>
          )}

        </CardContent>

      </Card>

    </div>
  )
}