import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

/* ======================================================
   GET ALL COURSES
   
   Query parameters:
   - public=true: Only return active courses (for public pages)
====================================================== */

export async function GET(req: Request) {
  try {
    const url = new URL(req.url)
    const isPublic = url.searchParams.get('public') === 'true'

    /* Filter to active courses only if requested for public access */
    const whereClause = isPublic 
      ? { isActive: true }
      : undefined

    const courses =
      await prisma.course.findMany({
        where: whereClause,
        orderBy: {
          createdAt: 'desc',
        },

       include: {
  categoryRef: true,

  boards: true,

  modes: {
    include: {
      packages: true,
    },
  },
},
      })

    return NextResponse.json(courses)
  } catch (error) {
    console.error('GET COURSES ERROR:', error)

    return NextResponse.json(
      [],
      {
        status: 500,
      }
    )
  }
}

/* ======================================================
   CREATE COURSE
====================================================== */

export async function POST(req: Request) {
    console.log("POST CATEGORY HIT");
  try {
    const body = await req.json()

    const {
  title,
  shortDescription,
  description,
  categoryId,
  thumbnail,
  isFeatured,
  isActive,
  courseInfo = [],
} = body

    /* ======================================================
       VALIDATION
    ====================================================== */

    if (
      !title ||
      !categoryId
    ) {
      return NextResponse.json(
        {
          error:
            'Title and category are required',
        },
        {
          status: 400,
        }
      )
    }

    /* ======================================================
       GENERATE SLUG
    ====================================================== */

    const baseSlug = title
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9\s-]/g, '')
      .replace(/\s+/g, '-')

    let slug = baseSlug

    let counter = 1

    while (
      await prisma.course.findUnique({
        where: { slug },
      })
    ) {
      slug = `${baseSlug}-${counter}`
      counter++
    }

    /* ======================================================
       CREATE COURSE
    ====================================================== */

    const courseInfoItems = Array.isArray(courseInfo)
      ? courseInfo.filter(
          (item: any) =>
            item.label?.trim() &&
            item.value?.trim()
        )
      : []

    const course = await prisma.course.create({
  data: {
    title,

    slug,

    shortDescription:
      shortDescription || '',

    description:
      description || '',

    categoryId,

    category: '',

    thumbnail:
      thumbnail?.trim() || null,

    isFeatured:
      isFeatured ?? false,

    isActive:
      isActive ?? true,

    courseInfo: {
      create: courseInfoItems.map(
        (item: any, index: number) => ({
          label: item.label,
          value: item.value,
          sortOrder: index,
        })
      ),
    },
  },
})

    return NextResponse.json(course)
  } catch (error) {
    console.error(error)

    return NextResponse.json(
      {
        error: 'Failed to create course',
      },
      {
        status: 500,
      }
    )
  }
}