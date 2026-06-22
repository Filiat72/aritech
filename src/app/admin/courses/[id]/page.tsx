'use client'

import { useEffect, useState } from 'react'

import {
  useRouter,
  useParams,
} from 'next/navigation'

import { Button } from '@/components/ui/button'

import CourseBoardsSection from '@/components/admin/courses/CourseBoardsSection'

import CourseModesSection from '@/components/admin/courses/CourseModesSection'

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'

import { Input } from '@/components/ui/input'

import { Label } from '@/components/ui/label'

import { toast } from 'sonner'

export default function EditCoursePage() {
  const router = useRouter()

  const params = useParams()

  const courseId = params.id as string

  const [loading, setLoading] =
    useState(false)

  const [fetching, setFetching] =
    useState(true)

  const [uploading, setUploading] =
    useState(false)

  const [thumbnail, setThumbnail] =
    useState('')

  const [title, setTitle] = useState('')

  const [categoryId, setCategoryId] =
  useState('')

const [categories, setCategories] =
  useState<any[]>([])

const [newCategoryName, setNewCategoryName] =
  useState('')

const [showCategoryManager, setShowCategoryManager] =
  useState(false)

  const [isFeatured, setIsFeatured] =
    useState(false)

  const [isActive, setIsActive] =
    useState(true)

  const [courseInfo, setCourseInfo] =
    useState<
      {
        label: string
        value: string
      }[]
    >([])

  const [boards, setBoards] =
    useState<any[]>([])

  const [newBoard, setNewBoard] =
    useState('')

  const [boardLoading, setBoardLoading] =
    useState(false)

  const [modes, setModes] =
    useState<any[]>([])

  const [newMode, setNewMode] =
    useState('')

  const [modeLoading, setModeLoading] =
    useState(false)

  const [newPackageName, setNewPackageName] =
    useState('')

  const [
    newPackagePrice,
    setNewPackagePrice,
  ] = useState('')

  const [
    newPackageDuration,
    setNewPackageDuration,
  ] = useState('')

  const [packageLoading, setPackageLoading] =
    useState(false)

  /* ======================================================
      COURSE INFO ROWS
  ====================================================== */

  function handleAddCourseInfoRow() {
    setCourseInfo(prev => [
      ...prev,
      {
        label: '',
        value: '',
      },
    ])
  }

  function handleRemoveCourseInfoRow(
    index: number
  ) {
    setCourseInfo(prev =>
      prev.filter((_, i) => i !== index)
    )
  }

  function handleCourseInfoChange(
    index: number,
    field: 'label' | 'value',
    value: string
  ) {
    setCourseInfo(prev =>
      prev.map((item, i) =>
        i === index
          ? {
              ...item,
              [field]: value,
            }
          : item
      )
    )
  }

  /* ======================================================
      FETCH COURSE
  ====================================================== */
async function fetchCategories() {
  try {
    const res = await fetch(
      '/api/course-categories'
    )

    const data = await res.json()

    setCategories(data || [])
  } catch (error) {
    console.error(error)
  }
}

async function handleCreateCategory() {
  if (!newCategoryName.trim()) {
    toast.error('Enter category name')
    return
  }


  try {
    const res = await fetch(
      '/api/course-categories',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: newCategoryName,
        }),
      }
    )

    const data = await res.json()

    if (!res.ok) {
      throw new Error(data.error)
    }

toast.success('Category created')

setCategoryId(data.id)

setNewCategoryName('')

await fetchCategories()
  } catch (error: any) {
    toast.error(error.message)
  }
}

async function handleDeleteCategory(
  id: string
) {
  const confirmed = window.confirm(
    'Delete this category?'
  )

  if (!confirmed) {
    return
  }

  try {
    const res = await fetch(
      `/api/course-categories/${id}`,
      {
        method: 'DELETE',
      }
    )

    const data = await res.json()

    if (!res.ok) {
      throw new Error(
        data.error ||
          'Failed to delete category'
      )
    }

    toast.success(
      'Category deleted'
    )

    if (categoryId === id) {
      setCategoryId('')
    }

    await fetchCategories()
  } catch (error: any) {
    toast.error(error.message)
  }
}


  async function fetchCourse() {
    try {
      const res = await fetch(
        `/api/courses/${courseId}`
      )

      const data = await res.json()

      if (!res.ok) {
        throw new Error(
          data.error ||
            'Failed to fetch course'
        )
      }

      setTitle(data.title || '')

      setCategoryId(
  data.categoryId || ''
)

      setThumbnail(
        data.thumbnail || ''
      )

      setIsFeatured(
        data.isFeatured || false
      )

      setIsActive(
        data.isActive ?? true
      )

      setBoards(data.boards || [])

      setModes(data.modes || [])

      setCourseInfo(
        (data.courseInfo || []).map(
          (item: any) => ({
            label: item.label,
            value: item.value,
          })
        )
      )
    } catch (error: any) {
      toast.error(
        error.message ||
          'Failed to load course'
      )
    } finally {
      setFetching(false)
    }
  }

 useEffect(() => {
  if (
    typeof courseId === 'string' &&
    courseId.trim() &&
    courseId !== 'undefined'
  ) {
    fetchCategories()
    fetchCourse()
  }
}, [courseId])

  /* ======================================================
      SLUG PREVIEW
  ====================================================== */

  const slugPreview = title
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')

  /* ======================================================
      IMAGE UPLOAD
  ====================================================== */

  async function handleImageUpload(
    file: File
  ) {
    try {
      setUploading(true)

      const formData = new FormData()

      formData.append('file', file)

      const res = await fetch(
        '/api/upload',
        {
          method: 'POST',
          body: formData,
        }
      )

      const data = await res.json()

      if (!res.ok) {
        throw new Error(
          data.error || 'Upload failed'
        )
      }

      setThumbnail(data.url)

      toast.success(
        'Thumbnail uploaded successfully'
      )
    } catch (error: any) {
      toast.error(
        error.message || 'Upload failed'
      )
    } finally {
      setUploading(false)
    }
  }

  /* ======================================================
      ADD BOARD
  ====================================================== */

  async function handleAddBoard() {
    if (!newBoard.trim()) {
      return
    }

    try {
      setBoardLoading(true)

      const res = await fetch(
        '/api/course-boards',
        {
          method: 'POST',

          headers: {
            'Content-Type':
              'application/json',
          },

          body: JSON.stringify({
            board: newBoard,
            courseId,
          }),
        }
      )

      const data = await res.json()

      if (!res.ok) {
        throw new Error(
          data.error ||
            'Failed to add board'
        )
      }

      setBoards(prev => [
        ...prev,
        data,
      ])

      setNewBoard('')

      toast.success(
        'Board added successfully'
      )
    } catch (error: any) {
      toast.error(
        error.message ||
          'Failed to add board'
      )
    } finally {
      setBoardLoading(false)
    }
  }

  /* ======================================================
      DELETE BOARD
  ====================================================== */

  async function handleDeleteBoard(
    id: string
  ) {
    try {
      const res = await fetch(
        `/api/course-boards?id=${id}`,
        {
          method: 'DELETE',
        }
      )

      const data = await res.json()

      if (!res.ok) {
        throw new Error(
          data.error ||
            'Failed to delete board'
        )
      }

      setBoards(prev =>
        prev.filter(
          board => board.id !== id
        )
      )

      toast.success(
        'Board removed successfully'
      )
    } catch (error: any) {
      toast.error(
        error.message ||
          'Failed to delete board'
      )
    }
  }

  /* ======================================================
      ADD MODE
  ====================================================== */

  async function handleAddMode() {
    if (!newMode.trim()) {
      return
    }

    try {
      setModeLoading(true)

      const res = await fetch(
        '/api/course-modes',
        {
          method: 'POST',

          headers: {
            'Content-Type':
              'application/json',
          },

          body: JSON.stringify({
            modeName: newMode,
            courseId,
          }),
        }
      )

      const data = await res.json()

      if (!res.ok) {
        throw new Error(
          data.error ||
            'Failed to add mode'
        )
      }

      setModes(prev => [
        ...prev,
        data,
      ])

      setNewMode('')

      toast.success(
        'Mode added successfully'
      )
    } catch (error: any) {
      toast.error(
        error.message ||
          'Failed to add mode'
      )
    } finally {
      setModeLoading(false)
    }
  }

  /* ======================================================
      DELETE MODE
  ====================================================== */

  async function handleDeleteMode(
    id: string
  ) {
    try {
      const res = await fetch(
        `/api/course-modes?id=${id}`,
        {
          method: 'DELETE',
        }
      )

      const data = await res.json()

      if (!res.ok) {
        throw new Error(
          data.error ||
            'Failed to delete mode'
        )
      }

      setModes(prev =>
        prev.filter(
          mode => mode.id !== id
        )
      )

      toast.success(
        'Mode removed successfully'
      )
    } catch (error: any) {
      toast.error(
        error.message ||
          'Failed to delete mode'
      )
    }
  }

  /* ======================================================
      UPDATE COURSE
  ====================================================== */

  async function handleSubmit(
    e: React.FormEvent
  ) {
    e.preventDefault()

    if (
      !title
    ) {
      toast.error(
        'Please fill all required fields'
      )

      return
    }

    try {
      setLoading(true)

      const res = await fetch(
        `/api/courses/${courseId}`,
        {
          method: 'PUT',

          headers: {
            'Content-Type':
              'application/json',
          },

         body: JSON.stringify({
  title,
  categoryId,
  thumbnail,
  isFeatured,
  isActive,
  courseInfo,
}),
        }
      )

      const data = await res.json()

      if (!res.ok) {
        throw new Error(
          data.error ||
            'Failed to update course'
        )
      }

      toast.success(
        'Course updated successfully'
      )

      router.push('/admin/courses')
    } catch (error: any) {
      toast.error(
        error.message ||
          'Something went wrong'
      )
    } finally {
      setLoading(false)
    }
  }

  if (fetching) {
    return (
      <div className="p-6">
        Loading course...
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* HEADER */}

      <div>
        <h1 className="text-2xl font-bold">
          Edit Course
        </h1>

        <p className="text-sm text-gray-500 mt-1">
          Update course information.
        </p>
      </div>

      {/* FORM */}

      <Card>
        <CardHeader>
          <CardTitle>
            Course Information
          </CardTitle>
        </CardHeader>

        <CardContent>
          <form
            onSubmit={handleSubmit}
            className="space-y-6"
          >
            {/* THUMBNAIL */}

            <div className="space-y-2">
              <Label>
                Thumbnail
              </Label>

              <Input
                type="file"
                accept="image/*"
                disabled={uploading}
                onChange={e => {
                  const file =
                    e.target.files?.[0]

                  if (file) {
                    handleImageUpload(file)
                  }
                }}
              />

              {uploading && (
                <p className="text-sm text-blue-600">
                  Uploading image...
                </p>
              )}

              {thumbnail && (
                <img
                  src={thumbnail}
                  alt="Thumbnail Preview"
                  className="
                    w-40
                    h-24
                    object-cover
                    rounded-lg
                    border
                  "
                />
              )}
            </div>

            {/* TITLE */}

            <div className="space-y-2">
              <Label>
                Course Title *
              </Label>

              <Input
                value={title}
                onChange={e =>
                  setTitle(e.target.value)
                }
                placeholder="Enter course title"
              />
            </div>

            {/* SLUG */}

            <div className="space-y-2">
              <Label>
                Slug Preview
              </Label>

              <div
                className="
                  px-3
                  py-2
                  rounded-md
                  border
                  bg-gray-50
                  text-sm
                  text-gray-600
                "
              >
                {slugPreview ||
                  'course-slug-preview'}
              </div>
            </div>



            <CourseBoardsSection
              boards={boards}
              newBoard={newBoard}
              setNewBoard={setNewBoard}
              handleAddBoard={
                handleAddBoard
              }
              handleDeleteBoard={
                handleDeleteBoard
              }
              boardLoading={boardLoading}
            />
 <CourseModesSection
              modes={modes}
              setModes={setModes}
              newMode={newMode}
              setNewMode={setNewMode}
              handleAddMode={
                handleAddMode
              }
              handleDeleteMode={
                handleDeleteMode
              }
              modeLoading={modeLoading}
            />


            {/* COURSE INFORMATION */}

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <Label>
                  Course Information
                </Label>

                <Button
                  type="button"
                  onClick={
                    handleAddCourseInfoRow
                  }
                >
                  Add Row
                </Button>
              </div>

              {courseInfo.length === 0 ? (
                <p className="text-sm text-gray-500">
                  Add course information
                  rows to show on the course
                  page.
                </p>
              ) : (
                <div className="space-y-4">
                  {courseInfo.map(
                    (item, index) => (
                      <div
                        key={`${item.label}-${item.value}-${index}`}
                        className="grid gap-3 sm:grid-cols-[1fr_1fr_auto] items-end"
                      >
                        <div>
                          <Label>
                            Label
                          </Label>

                          <Input
                            value={
                              item.label
                            }
                            onChange={e =>
                              handleCourseInfoChange(
                                index,
                                'label',
                                e.target
                                  .value
                              )
                            }
                            placeholder="e.g. Duration"
                          />
                        </div>

                        <div>
                          <Label>
                            Value
                          </Label>

                          <Input
                            value={
                              item.value
                            }
                            onChange={e =>
                              handleCourseInfoChange(
                                index,
                                'value',
                                e.target
                                  .value
                              )
                            }
                            placeholder="e.g. 3 Months"
                          />
                        </div>

                        <div className="pt-6">
                          <Button
                            type="button"
                            variant="secondary"
                            onClick={() =>
                              handleRemoveCourseInfoRow(
                                index
                              )
                            }
                          >
                            Remove
                          </Button>
                        </div>
                      </div>
                    )
                  )}
                </div>
              )}
            </div>

            {/* CATEGORY */}

    
           
           <div className="space-y-2">

  <Label>Category</Label>

  <select
    value={categoryId}
    onChange={e =>
      setCategoryId(e.target.value)
    }
    className="
      w-full
      rounded-md
      border
      p-3
      text-sm
      bg-white
    "
  >

    <option value="">
  Select Category
</option>
    {categories.map(category => (
      <option
        key={category.id}
        value={category.id}
      >
        {category.name}
      </option>
    ))}
  </select>
{!categoryId && (
  <p className="text-xs text-amber-600">
    Category not assigned
  </p>
)}
  <div className="flex gap-2">

    <Input
      value={newCategoryName}
      onChange={e =>
        setNewCategoryName(
          e.target.value
        )
      }
      placeholder="Create new category"
    />

    <Button
      type="button"
      onClick={handleCreateCategory}
    >
      Add
    </Button>
<Button
  type="button"
  variant="outline"
  onClick={() =>
    setShowCategoryManager(true)
  }
>
  Manage Categories
</Button>
  </div>



</div>

           

            {/* FEATURED */}

            <div className="flex items-center gap-3">
              <input
                type="checkbox"
                checked={isFeatured}
                onChange={e =>
                  setIsFeatured(
                    e.target.checked
                  )
                }
              />

              <Label>
                Featured Course
              </Label>
            </div>

            {/* ACTIVE */}

            <div className="flex items-center gap-3">
              <input
                type="checkbox"
                checked={isActive}
                onChange={e =>
                  setIsActive(
                    e.target.checked
                  )
                }
              />

              <Label>
                Active Course
              </Label>
            </div>

            {/* ACTIONS */}

            <div className="flex gap-3">
              <Button
                type="submit"
                disabled={loading}
              >
                {loading
                  ? 'Updating...'
                  : 'Update Course'}
              </Button>

              <Button
                type="button"
                variant="outline"
                onClick={() =>
                  router.push(
                    '/admin/courses'
                  )
                }
              >
                Cancel
              </Button>
            </div>
          </form>
        </CardContent>

        {showCategoryManager && (
  <div
    className="
      fixed
      inset-0
      bg-black/50
      flex
      items-center
      justify-center
      z-50
    "
  >
    <div
      className="
        bg-white
        rounded-2xl
        p-5
        w-full
        max-w-md
        max-h-[70vh]
        overflow-y-auto
        shadow-xl
      "
    >
      <div className="flex items-center justify-between mb-4">

        <div>
          <h2 className="text-lg font-semibold">
            Manage Categories
          </h2>

          <p className="text-sm text-gray-500">
            {categories.length} Categories
          </p>
        </div>

        <Button
          type="button"
          variant="outline"
          onClick={() =>
            setShowCategoryManager(false)
          }
        >
          Close
        </Button>

      </div>

      <div className="space-y-3">

        {categories.map(category => (
          <div
            key={category.id}
            className="
              flex
              items-center
              justify-between
              rounded-lg
              border
              px-4
              py-3
            "
          >
            <div>
              <p className="font-medium">
                {category.name}
              </p>

              <p className="text-xs text-gray-500">
                {category.courses?.length || 0} course
                {(category.courses?.length || 0) !== 1
                  ? 's'
                  : ''}
              </p>
            </div>

            {(category.courses?.length || 0) === 0 ? (
              <Button
                type="button"
                variant="destructive"
                size="sm"
                onClick={() =>
                  handleDeleteCategory(category.id)
                }
              >
                Delete
              </Button>
            ) : (
              <span className="text-xs text-gray-400">
                In Use
              </span>
            )}
          </div>
        ))}

      </div>
    </div>
  </div>
)}
      </Card>
    </div>
  )
}