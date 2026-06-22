import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function DELETE(
  req: Request,
  context: {
    params: Promise<{ id: string }>;
  }
) {
  try {
    const { id } = await context.params;

    const category =
      await prisma.courseCategory.findUnique({
        where: { id },

        include: {
          courses: true,
        },
      });

    if (!category) {
      return NextResponse.json(
        {
          error: "Category not found",
        },
        {
          status: 404,
        }
      );
    }

    if (category.courses.length > 0) {
      return NextResponse.json(
        {
          error:
            "Cannot delete category with courses",
        },
        {
          status: 400,
        }
      );
    }

    await prisma.courseCategory.delete({
      where: { id },
    });

    return NextResponse.json({
      success: true,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        error: "Failed to delete category",
      },
      {
        status: 500,
      }
    );
  }
}