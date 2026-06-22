import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

/* ======================================================
   UPDATE COURSE
====================================================== */

export async function PUT(
  req: Request,
  context: {
    params: Promise<{ id: string }>
  }
) {
  try {
    const { id } = await context.params

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
       FILTER VALID COURSE INFO ITEMS
    ====================================================== */

    const courseInfoItems =
      Array.isArray(courseInfo)
        ? courseInfo.filter(
            (item: any) =>
              item.label?.trim() &&
              item.value?.trim()
          )
        : []

    /* ======================================================
       UPDATE COURSE
    ====================================================== */

    const updateData: any = {
      title,

      categoryId,

      thumbnail:
        thumbnail?.trim() || null,

      isFeatured,

      isActive,

      courseInfo: {
        deleteMany: {},

        create:
          courseInfoItems.map(
            (
              item: any,
              index: number
            ) => ({
              label: item.label,

              value: item.value,

              sortOrder: index,
            })
          ),
      },
    }

    /* Only update description fields if provided */
    if (shortDescription !== undefined) {
      updateData.shortDescription = shortDescription
    }
    if (description !== undefined) {
      updateData.description = description
    }

    const course =
      await prisma.course.update({
        where: { id },

        data: updateData,

        include: {
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

    return NextResponse.json(course)
  } catch (error) {
    console.error(
      'UPDATE COURSE ERROR:',
      error
    )

    return NextResponse.json(
      {
        error: 'Failed to update course',
      },
      {
        status: 500,
      }
    )
  }
}

/* ======================================================
   GET SINGLE COURSE
====================================================== */

export async function GET(
  req: Request,
  context: {
    params: Promise<{ id: string }>
  }
) {
  try {
    const { id } = await context.params

    const course =
      await prisma.course.findUnique({
        where: { id },

        include: {
          categoryRef: true,
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

    if (!course) {
      return NextResponse.json(
        {
          error: 'Course not found',
        },
        {
          status: 404,
        }
      )
    }

    return NextResponse.json(course)
  } catch (error) {
    console.error(
      'GET COURSE ERROR:',
      error
    )

    return NextResponse.json(
      {
        error: 'Failed to fetch course',
      },
      {
        status: 500,
      }
    )
  }
}

/* ======================================================
   DELETE COURSE
====================================================== */

export async function DELETE(
  req: Request,
  context: {
    params: Promise<{ id: string }>
  }
) {
  try {
    const { id } = await context.params

    /* ======================================================
       DELETE PACKAGE FEATURES
    ====================================================== */

    await prisma.packageFeature.deleteMany({
      where: {
        package: {
          mode: {
            courseId: id,
          },
        },
      },
    })

    /* ======================================================
       DELETE PACKAGES
    ====================================================== */

    await prisma.coursePackage.deleteMany({
      where: {
        mode: {
          courseId: id,
        },
      },
    })

    /* ======================================================
       DELETE MODES
    ====================================================== */

    await prisma.courseMode.deleteMany({
      where: {
        courseId: id,
      },
    })

    /* ======================================================
       DELETE BOARDS
    ====================================================== */

    await prisma.courseBoard.deleteMany({
      where: {
        courseId: id,
      },
    })

    /* ======================================================
       DELETE COURSE INFO
    ====================================================== */

    await prisma.courseInfo.deleteMany({
      where: {
        courseId: id,
      },
    })

    /* ======================================================
       DELETE COURSE
    ====================================================== */

    await prisma.course.delete({
      where: { id },
    })

    return NextResponse.json({
      success: true,
    })
  } catch (error) {
    console.error(
      'DELETE COURSE ERROR:',
      error
    )

    return NextResponse.json(
      {
        error: 'Failed to delete course',
      },
      {
        status: 500,
      }
    )
  }
}