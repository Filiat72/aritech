import { NextResponse } from 'next/server'

import { prisma } from '@/lib/prisma'

/* ======================================================
   GET POSTS
====================================================== */

export async function GET() {
  try {
    const posts =
      await prisma.blogPost.findMany({
        orderBy: {
          createdAt: 'desc',
        },
      })

    return NextResponse.json(
      posts
    )
  } catch (error) {
    console.error(error)

    return NextResponse.json(
      {
        error:
          'Failed to fetch posts',
      },
      {
        status: 500,
      }
    )
  }
}

/* ======================================================
   CREATE POST
====================================================== */

export async function POST(
  req: Request
) {
  try {
    const body = await req.json()

    const {
      title,
      slug,
      excerpt,
      coverImage,
      content,
      isPublished,
    } = body

    /* ======================================================
       VALIDATION
    ====================================================== */

    if (
      !title ||
      !slug ||
      !content
    ) {
      return NextResponse.json(
        {
          error:
            'Title, slug and content are required',
        },
        {
          status: 400,
        }
      )
    }

    /* ======================================================
       CHECK DUPLICATE SLUG
    ====================================================== */

    const existing =
      await prisma.blogPost.findUnique({
        where: { slug },
      })

    if (existing) {
      return NextResponse.json(
        {
          error:
            'Slug already exists',
        },
        {
          status: 400,
        }
      )
    }

    /* ======================================================
       CREATE POST
    ====================================================== */

    const post =
      await prisma.blogPost.create({
        data: {
          title,

          slug,

          excerpt:
            excerpt || null,

          coverImage:
            coverImage || null,

          content,

          isPublished:
            isPublished ||
            false,
        },
      })

    return NextResponse.json(
      post
    )
  } catch (error) {
    console.error(error)

    return NextResponse.json(
      {
        error:
          'Failed to create post',
      },
      {
        status: 500,
      }
    )
  }
}