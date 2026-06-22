'use client'
import { useEffect } from 'react'
import { useState } from 'react'
import { useRouter } from 'next/navigation'

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

export default function NewCoursePage() {
  const router = useRouter()

  const [loading, setLoading] =
    useState(false)

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

  async function fetchCategories() {
  try {
    const res = await fetch('/api/course-categories')
    const data = await res.json()

    setCategories(data)

   if (data.length > 0) {
  setCategoryId(prev =>
    prev || data[0].id
  )
}
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


useEffect(() => {
  fetchCategories()
}, [])

  const [isFeatured, setIsFeatured] =
    useState(false)

  const [isActive, setIsActive] =
    useState(true)

  const [boards, setBoards] = useState<any[]>([])
  const [newBoard, setNewBoard] = useState('')
  const [boardLoading, setBoardLoading] = useState(false)

  const [modes, setModes] = useState<any[]>([])
  const [newMode, setNewMode] = useState('')
  const [modeLoading, setModeLoading] = useState(false)

  const [courseInfo, setCourseInfo] =
    useState<
      {
        label: string
        value: string
      }[]
    >([])

  function generateTempId() {
    return `temp-${Math.random().toString(36).slice(2)}-${Date.now()}`
  }

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
          ? { ...item, [field]: value }
          : item
      )
    )
  }

  function handleAddBoardDraft() {
    if (!newBoard.trim()) {
      return
    }

    setBoardLoading(true)
    setBoards(prev => [
      ...prev,
      {
        id: generateTempId(),
        board: newBoard.trim(),
      },
    ])
    setNewBoard('')
    setBoardLoading(false)
  }

  function handleDeleteBoardDraft(
    id: string
  ) {
    setBoards(prev =>
      prev.filter(board => board.id !== id)
    )
  }

  function handleAddModeDraft() {
    if (!newMode.trim()) {
      return
    }

    setModeLoading(true)
    setModes(prev => [
      ...prev,
      {
        id: generateTempId(),
        modeName: newMode.trim(),
        packages: [],
      },
    ])
    setNewMode('')
    setModeLoading(false)
  }

  function handleDeleteModeDraft(
    id: string
  ) {
    setModes(prev =>
      prev.filter(mode => mode.id !== id)
    )
  }

  /* ======================================================
      SLUG PREVIEW
  ====================================================== */

  const slugPreview = title
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\\s-]/g, '')
    .replace(/\\s+/g, '-')

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
      CREATE COURSE
  ====================================================== */

  async function handleSubmit(
    e: React.FormEvent
  ) {
    e.preventDefault()

    if (!title) {
      toast.error(
        'Please fill all required fields'
      )

      return
    }

    try {
      setLoading(true)

      const res = await fetch(
        '/api/courses',
        {
          method: 'POST',

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
})
        }
      )

      const data = await res.json()

      if (!res.ok) {
        throw new Error(
          data.error ||
            'Failed to create course'
        )
      }

      const courseId = data.id

      if (boards.length > 0) {
        await Promise.all(
          boards.map(async board => {
            const boardRes = await fetch(
              '/api/course-boards',
              {
                method: 'POST',
                headers: {
                  'Content-Type':
                    'application/json',
                },
                body: JSON.stringify({
                  board: board.board,
                  courseId,
                }),
              }
            )

            const boardData = await boardRes.json()

            if (!boardRes.ok) {
              throw new Error(
                boardData.error ||
                  'Failed to create board'
              )
            }

            return boardData
          })
        )
      }

      if (modes.length > 0) {
        const createdModes = await Promise.all(
          modes.map(async mode => {
            const modeRes = await fetch(
              '/api/course-modes',
              {
                method: 'POST',
                headers: {
                  'Content-Type':
                    'application/json',
                },
                body: JSON.stringify({
                  modeName: mode.modeName,
                  courseId,
                }),
              }
            )

            const modeData = await modeRes.json()

            if (!modeRes.ok) {
              throw new Error(
                modeData.error ||
                  'Failed to create mode'
              )
            }

            return {
              id: modeData.id,
              packages: mode.packages || [],
            }
          })
        )

        const createdPackages = await Promise.all(
          createdModes.flatMap(mode =>
            (mode.packages || []).map(
              async (pkg: any) => {
                const pkgRes = await fetch(
                  '/api/course-packages',
                  {
                    method: 'POST',
                    headers: {
                      'Content-Type':
                        'application/json',
                    },
                    body: JSON.stringify({
                      packageName:
                        pkg.packageName,
                      monthlyPrice: Number(pkg.monthlyPrice),
                      duration:
                        pkg.duration || null,
                      modeId: mode.id,
                    }),
                  }
                )

                const pkgData = await pkgRes.json()

                if (!pkgRes.ok) {
                  throw new Error(
                    pkgData.error ||
                      'Failed to create package'
                  )
                }

                return {
                  id: pkgData.id,
                  features: pkg.features || [],
                }
              }
            )
          )
        )

        if (createdPackages.length > 0) {
          const featurePromises = createdPackages.flatMap(
            pkg =>
              (pkg.features || []).map(
                async (feature: any) => {
                  const featureRes = await fetch(
                    '/api/package-features',
                    {
                      method: 'POST',
                      headers: {
                        'Content-Type':
                          'application/json',
                      },
                      body: JSON.stringify({
                        feature: feature.feature,
                        packageId: pkg.id,
                      }),
                    }
                  )

                  const featureData = await featureRes.json()

                  if (!featureRes.ok) {
                    throw new Error(
                      featureData.error ||
                        'Failed to create feature'
                    )
                  }

                  return featureData
                }
              )
          )

          if (featurePromises.length > 0) {
            await Promise.all(featurePromises)
          }
        }
      }

      toast.success(
        'Course created successfully'
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

  return (
    <div className="space-y-6">

      {/* HEADER */}

      <div>
        <h1 className="text-2xl font-bold">
          Create Course
        </h1>

        <p className="text-sm text-gray-500 mt-1">
          Create a new course for your
          platform.
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
  handleAddBoard={handleAddBoardDraft}
  handleDeleteBoard={
    handleDeleteBoardDraft
  }
  boardLoading={boardLoading}
/>

<CourseModesSection
  modes={modes}
  setModes={setModes}
  newMode={newMode}
  setNewMode={setNewMode}
  handleAddMode={handleAddModeDraft}
  handleDeleteMode={
    handleDeleteModeDraft
  }
  modeLoading={modeLoading}
  isDraft
/>

            {/* COURSE INFORMATION */}

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <Label>Course Information</Label>

                <Button
                  type="button"
                  onClick={handleAddCourseInfoRow}
                >
                  Add Row
                </Button>
              </div>

              {courseInfo.length === 0 ? (
                <p className="text-sm text-gray-500">
                  Add course information rows to show on the course page.
                </p>
              ) : (
                <div className="space-y-4">
                  {courseInfo.map(
                    (item, index) => (
                      <div
                        key={index}
                        className="grid gap-3 sm:grid-cols-[1fr_1fr_auto] items-end"
                      >
                        <div>
                          <Label>Label</Label>
                          <Input
                            value={item.label}
                            onChange={e =>
                              handleCourseInfoChange(
                                index,
                                'label',
                                e.target.value
                              )
                            }
                            placeholder="e.g. Duration"
                          />
                        </div>

                        <div>
                          <Label>Value</Label>
                          <Input
                            value={item.value}
                            onChange={e =>
                              handleCourseInfoChange(
                                index,
                                'value',
                                e.target.value
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
    {categories.map(category => (
      <option
        key={category.id}
        value={category.id}
      >
        {category.name}
      </option>
    ))}
  </select>

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

            <div
              className="
                flex
                items-center
                gap-3
              "
            >

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

            <div
              className="
                flex
                items-center
                gap-3
              "
            >

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
                  ? 'Creating...'
                  : 'Create Course'}
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