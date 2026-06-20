'use client'

import { useEffect, useState } from 'react'

import { useRouter } from 'next/navigation'

import { Button } from '@/components/ui/button'

import { Badge } from '@/components/ui/badge'

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'

type Course = {
  id: string

  title: string

  slug: string

  category: string

  thumbnail?: string | null

  isFeatured: boolean

  isActive: boolean

  boards: {
    id: string

    board: string
  }[]

  modes: {
    id: string

    packages: {
      id: string

      monthlyPrice: number
    }[]
  }[]
}

export default function CoursesPage() {
  const router = useRouter()

  const [courses, setCourses] = useState<
    Course[]
  >([])

  const [loading, setLoading] =
    useState(true)

  /* ======================================================
      FETCH COURSES
  ====================================================== */

  async function fetchCourses() {
    try {
      const res = await fetch(
        '/api/courses'
      )

      const data = await res.json()

      setCourses(
        Array.isArray(data)
          ? data
          : []
      )
    } catch (error) {
      console.error(
        'Failed to fetch courses',
        error
      )
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchCourses()
  }, [])

  /* ======================================================
      DELETE COURSE
  ====================================================== */

  async function handleDelete(
    id: string
  ) {
    const confirmDelete = confirm(
      'Delete this course?'
    )

    if (!confirmDelete) return

    try {
      await fetch(
        `/api/courses/${id}`,
        {
          method: 'DELETE',
        }
      )

      fetchCourses()
    } catch (error) {
      console.error(
        'Delete failed',
        error
      )
    }
  }

  /* ======================================================
      TOGGLE ACTIVE
  ====================================================== */

  async function toggleActive(
    course: Course
  ) {
    try {
      await fetch(
        `/api/courses/${course.id}`,
        {
          method: 'PUT',

          headers: {
            'Content-Type':
              'application/json',
          },

          body: JSON.stringify({
            isActive:
              !course.isActive,
          }),
        }
      )

      fetchCourses()
    } catch (error) {
      console.error(
        'Status update failed',
        error
      )
    }
  }

  /* ======================================================
      STARTING PRICE
  ====================================================== */

  function getStartingPrice(
    course: Course
  ) {
    const prices =
      course.modes.flatMap(mode =>
        mode.packages
          .map(
            pkg =>
              pkg.monthlyPrice
          )
          .filter(
            price =>
              typeof price ===
              'number'
          )
      )

    if (prices.length === 0)
      return null

    return Math.min(...prices)
  }

  return (
    <div className="space-y-6">

      {/* HEADER */}

      <div className="flex items-center justify-between">

        <h1 className="text-2xl font-bold text-black">
          Courses
        </h1>

        <button
          onClick={() =>
            router.push(
              '/admin/courses/new'
            )
          }
          className="
            px-4
            py-2
            rounded-xl
            text-sm
            font-bold
            transition-all
          "
          style={{
            background: '#31446b',

            color: '#ffffff',
          }}
        >
          + Add Course
        </button>

      </div>

      {/* TABLE */}

      <Card>

        <CardHeader>

          <CardTitle>
            All Courses (
            {courses.length})
          </CardTitle>

        </CardHeader>

        <CardContent>

          <Table>

            <TableHeader>

              <TableRow>

                <TableHead>
                  Thumbnail
                </TableHead>

                <TableHead>
                  Course Name
                </TableHead>

                <TableHead>
                  Category
                </TableHead>

                <TableHead>
                  Boards
                </TableHead>

                <TableHead>
                  Modes Count
                </TableHead>

                <TableHead>
                  Starting Price
                </TableHead>

                <TableHead>
                  Featured
                </TableHead>

                <TableHead>
                  Status
                </TableHead>

                <TableHead>
                  Actions
                </TableHead>

              </TableRow>

            </TableHeader>

            <TableBody>

              {!loading &&
                courses.length ===
                  0 && (
                  <TableRow>

                    <TableCell
                      colSpan={9}
                      className="
                        text-center
                        text-gray-400
                      "
                    >
                      No courses yet.
                    </TableCell>

                  </TableRow>
                )}

              {courses.map(course => {
                const startingPrice =
                  getStartingPrice(
                    course
                  )

                return (
                  <TableRow
                    key={course.id}
                  >

                    {/* THUMBNAIL */}

                    <TableCell>

                      {course.thumbnail ? (
                        <img
                          src={
                            course.thumbnail
                          }
                          alt={
                            course.title
                          }
                          className="
                            w-14
                            h-14
                            rounded-lg
                            object-cover
                            border
                          "
                        />
                      ) : (
                        <div
                          className="
                            w-14
                            h-14
                            rounded-lg
                            bg-gray-100
                            border
                          "
                        />
                      )}

                    </TableCell>

                    {/* TITLE */}

                    <TableCell className="font-medium">
                      {course.title}
                    </TableCell>

                    {/* CATEGORY */}

                    <TableCell>
                      {
                        course.category
                      }
                    </TableCell>

                    {/* BOARDS */}

                    <TableCell>

                      <div className="flex flex-wrap gap-1">

                        {course.boards
                          .length ===
                        0 ? (
                          <span className="text-gray-400 text-sm">
                            —
                          </span>
                        ) : (
                          course.boards.map(
                            board => (
                              <Badge
                                key={
                                  board.id
                                }
                                variant="secondary"
                              >
                                {
                                  board.board
                                }
                              </Badge>
                            )
                          )
                        )}

                      </div>

                    </TableCell>

                    {/* MODES COUNT */}

                    <TableCell>
                      {
                        course.modes
                          .length
                      }
                    </TableCell>

                    {/* STARTING PRICE */}

                    <TableCell>

                      {startingPrice !==
                      null ? (
                        <span>
                          ₹
                          {
                            startingPrice
                          }
                        </span>
                      ) : (
                        <span className="text-gray-400">
                          —
                        </span>
                      )}

                    </TableCell>

                    {/* FEATURED */}

                    <TableCell>

                      <Badge
                        className="border-0 text-white"
                        style={{
                          background:
                            course.isFeatured
                              ? '#2563eb'
                              : '#6b7280',
                        }}
                      >
                        {course.isFeatured
                          ? 'Featured'
                          : 'Normal'}
                      </Badge>

                    </TableCell>

                    {/* STATUS */}

                    <TableCell>

                      <Badge
                        className="
                          cursor-pointer
                          border-0
                          text-white
                        "
                        style={{
                          background:
                            course.isActive
                              ? '#16a34a'
                              : '#dc2626',
                        }}
                        onClick={() =>
                          toggleActive(
                            course
                          )
                        }
                      >
                        {course.isActive
                          ? 'Active'
                          : 'Inactive'}
                      </Badge>

                    </TableCell>

                    {/* ACTIONS */}

                    <TableCell>

                      <div className="flex gap-2">

                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() =>
                            router.push(
                              `/admin/courses/${course.id}`
                            )
                          }
                        >
                          Edit
                        </Button>

                        <Button
                          size="sm"
                          variant="destructive"
                          onClick={() =>
                            handleDelete(
                              course.id
                            )
                          }
                        >
                          Delete
                        </Button>

                      </div>

                    </TableCell>

                  </TableRow>
                )
              })}

            </TableBody>

          </Table>

        </CardContent>

      </Card>

    </div>
  )
}