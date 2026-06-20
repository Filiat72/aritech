import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

/* ======================================================
   ADD PACKAGE FEATURE
====================================================== */

export async function POST(req: Request) {
  try {
    const body = await req.json()

    const { feature, packageId } = body

    if (!feature || !packageId) {
      return NextResponse.json(
        {
          error:
            'Feature and packageId are required',
        },
        {
          status: 400,
        }
      )
    }

    const existing = await prisma.packageFeature.findFirst({
      where: {
        feature,
        packageId,
      },
    })

    if (existing) {
      return NextResponse.json(
        {
          error:
            'Feature already exists for this package',
        },
        {
          status: 400,
        }
      )
    }

    const packageFeature = await prisma.packageFeature.create({
      data: {
        feature,
        packageId,
      },
    })

    return NextResponse.json(packageFeature)
  } catch (error) {
    console.error(error)

    return NextResponse.json(
      {
        error: 'Failed to create feature',
      },
      {
        status: 500,
      }
    )
  }
}

/* ======================================================
   DELETE PACKAGE FEATURE
====================================================== */

export async function DELETE(req: Request) {
  try {
    const { searchParams } = new URL(req.url)

    const id = searchParams.get('id')

    if (!id) {
      return NextResponse.json(
        {
          error:
            'Feature id is required',
        },
        {
          status: 400,
        }
      )
    }

    await prisma.packageFeature.delete({
      where: { id },
    })

    return NextResponse.json({
      success: true,
    })
  } catch (error) {
    console.error(error)

    return NextResponse.json(
      {
        error: 'Failed to delete feature',
      },
      {
        status: 500,
      }
    )
  }
}
