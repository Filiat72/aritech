import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

function slugify(text: string) {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-");
}

export async function GET(req: Request) {
  try {
    const categories =
      await prisma.courseCategory.findMany({
        where: {
          isActive: true,
        },

        include: {
          courses: {
            where: {
              isActive: true,
            },

            select: {
              id: true,
              title: true,
              slug: true,
            },

            orderBy: {
              title: "asc",
            },
          },
        },

        orderBy: {
          name: "asc",
        },
      });

    const url = new URL(req.url);

const withCoursesOnly =
  url.searchParams.get(
    "withCoursesOnly"
  ) === "true";

if (withCoursesOnly) {
  const filteredCategories =
    categories.filter(
      (category) =>
        category.courses.length > 0
    );

  return NextResponse.json(
    filteredCategories
  );
}

return NextResponse.json(
  categories
);
  } catch (error) {
    console.error(error);

    return NextResponse.json([], {
      status: 500,
    });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const { name } = body;

    if (!name?.trim()) {
      return NextResponse.json(
        {
          error: "Category name is required",
        },
        {
          status: 400,
        }
      );
    }

    const slug = slugify(name);

    const existing =
      await prisma.courseCategory.findFirst({
        where: {
          OR: [
            { name },
            { slug },
          ],
        },
      });

    if (existing) {
      return NextResponse.json(
        {
          error: "Category already exists",
        },
        {
          status: 400,
        }
      );
    }

    const category =
      await prisma.courseCategory.create({
        data: {
          name: name.trim(),
          slug,
        },
      });

    return NextResponse.json(category);
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        error: "Failed to create category",
      },
      {
        status: 500,
      }
    );
  }
}