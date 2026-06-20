import { NextResponse } from 'next/server'

import { prisma } from '@/lib/prisma'

/* ======================================================
   ADD COURSE PACKAGE
====================================================== */

export async function POST(req: Request) {
  try {
    const body = await req.json()

    const {
      packageName,
      monthlyPrice,
      duration,
      description,
      isPopular,
      isRecommended,
      modeId,
    } = body

    /* ======================================================
       VALIDATION
    ====================================================== */

    if (
      !packageName ||
      monthlyPrice === undefined ||
      !modeId
    ) {
      return NextResponse.json(
        {
          error:
            'Package name, monthly price and modeId are required',
        },
        {
          status: 400,
        }
      )
    }

    /* ======================================================
       CHECK DUPLICATE
    ====================================================== */

    const existing =
      await prisma.coursePackage.findFirst({
        where: {
          packageName,
          modeId,
        },
      })

    if (existing) {
      return NextResponse.json(
        {
          error:
            'Package already exists for this mode',
        },
        {
          status: 400,
        }
      )
    }

    /* ======================================================
       CREATE PACKAGE
    ====================================================== */

    const coursePackage =
      await prisma.coursePackage.create({
        data: {
          packageName,

          monthlyPrice:
            Number(monthlyPrice),

          duration,

          description,

          isPopular:
            isPopular || false,

          isRecommended:
            isRecommended || false,

          modeId,
        },
      })

    return NextResponse.json(
      coursePackage
    )
  } catch (error) {
    console.error(error)

    return NextResponse.json(
      {
        error:
          'Failed to create package',
      },
      {
        status: 500,
      }
    )
  }
}

/* ======================================================
   DELETE PACKAGE
====================================================== */

export async function DELETE(
  req: Request
) {
  try {
    const { searchParams } =
      new URL(req.url)

    const id =
      searchParams.get('id')

    if (!id) {
      return NextResponse.json(
        {
          error:
            'Package id is required',
        },
        {
          status: 400,
        }
      )
    }

    await prisma.coursePackage.delete({
      where: { id },
    })

    return NextResponse.json({
      success: true,
    })
  } catch (error) {
    console.error(error)

    return NextResponse.json(
      {
        error:
          'Failed to delete package',
      },
      {
        status: 500,
      }
    )
  }
}