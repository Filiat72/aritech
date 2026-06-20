'use client'

import { useEffect, useState } from 'react'

import Image from 'next/image'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Badge } from '@/components/ui/badge'
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'

/* ====================================================
    TYPES
==================================================== */

type Testimonial = {
  id: string
  studentName: string
  photo?: string
  quote: string
  course: string
  branch: string
  isActive: boolean
}

/* ====================================================
    PROGRAMS
==================================================== */

const courses = [
  'NEET Coaching',
  'JEE Coaching',
  'TNPSC & Competitive Exam Coaching',
  'School Coaching',
  'Retake Coaching',
  'Spoken English',
  'Spoken Hindi',
  'Vedic Maths',
  'Phonics Program',
  'Leadership Training',
  'MIS Training',
  'Typewriting Training',
  'Medical Coding Job Training',
  'Software Training',
  'Hardware Training',
  'Other',
]

/* ====================================================
    EMPTY FORM
==================================================== */

const empty = {
  studentName: '',
  photo: '',
  quote: '',
  course: '',
  branch: '',
}

/* ====================================================
    COMPONENT
==================================================== */

export default function TestimonialsPage() {
  const [testimonials, setTestimonials] =
    useState<Testimonial[]>([])

  const [form, setForm] = useState(empty)

  const [editing, setEditing] =
    useState<Testimonial | null>(null)

  const [open, setOpen] = useState(false)

  const [loading, setLoading] = useState(false)

  const [uploading, setUploading] =
    useState(false)

  const maxQuoteLength = 160

  /* ====================================================
      FETCH
  ==================================================== */

  async function fetchTestimonials() {
    const res = await fetch('/api/testimonials')

    const data = await res.json()

    setTestimonials(data)
  }

  useEffect(() => {
    fetchTestimonials()
  }, [])

  /* ====================================================
      IMAGE UPLOAD
  ==================================================== */

  async function handleImageUpload(
    file: File
  ) {
    try {
      setUploading(true)

      const formData = new FormData()

      formData.append('file', file)

      const res = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      })

      const data = await res.json()

      if (!res.ok) {
        alert(data.error || 'Upload failed')
        return
      }

      setForm((prev) => ({
        ...prev,
        photo: data.url,
      }))
    } catch (error) {
      console.error(error)

      alert('Image upload failed')
    } finally {
      setUploading(false)
    }
  }

  /* ====================================================
      OPEN ADD
  ==================================================== */

  function openAdd() {
    setEditing(null)

    setForm(empty)

    setOpen(true)
  }

  /* ====================================================
      OPEN EDIT
  ==================================================== */

  function openEdit(t: Testimonial) {
    setEditing(t)

    setForm({
      studentName: t.studentName,
      photo: t.photo || '',
      quote: t.quote,
      course: t.course,
      branch: t.branch || '',
    })

    setOpen(true)
  }

  /* ====================================================
      SUBMIT
  ==================================================== */

  async function handleSubmit(
    e: React.FormEvent
  ) {
    e.preventDefault()

    setLoading(true)

    if (editing) {
      await fetch(
        `/api/testimonials/${editing.id}`,
        {
          method: 'PUT',

          headers: {
            'Content-Type':
              'application/json',
          },

          body: JSON.stringify({
            ...form,
            isActive: editing.isActive,
          }),
        }
      )
    } else {
      await fetch('/api/testimonials', {
        method: 'POST',

        headers: {
          'Content-Type':
            'application/json',
        },

        body: JSON.stringify(form),
      })
    }

    setLoading(false)

    setOpen(false)

    fetchTestimonials()
  }

  /* ====================================================
      DELETE
  ==================================================== */

  async function handleDelete(id: string) {
    if (!confirm('Delete this testimonial?'))
      return

    await fetch(`/api/testimonials/${id}`, {
      method: 'DELETE',
    })

    fetchTestimonials()
  }

  /* ====================================================
      TOGGLE ACTIVE
  ==================================================== */

  async function toggleActive(t: Testimonial) {
    await fetch(`/api/testimonials/${t.id}`, {
      method: 'PUT',

      headers: {
        'Content-Type':
          'application/json',
      },

      body: JSON.stringify({
        ...t,
        isActive: !t.isActive,
      }),
    })

    fetchTestimonials()
  }

  /* ====================================================
      UI
  ==================================================== */

  return (
    <div className="space-y-6">

      {/* ====================================================
          HEADER
      ==================================================== */}

      <div className="flex items-center justify-between">

        <h1 className="text-2xl font-bold text-black">
          Testimonials
        </h1>

        {/* ====================================================
            DIALOG
        ==================================================== */}

        <Dialog open={open} onOpenChange={setOpen}>

          <DialogTrigger asChild>

            <button
              onClick={openAdd}
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
              + Add Testimonial
            </button>

          </DialogTrigger>

          {/* ====================================================
              DIALOG CONTENT
          ==================================================== */}

          <DialogContent className="max-w-lg">

            <DialogHeader>

              <DialogTitle>
                {editing
                  ? 'Edit Testimonial'
                  : 'Add Testimonial'}
              </DialogTitle>

            </DialogHeader>

            {/* ====================================================
                FORM
            ==================================================== */}

            <form
              onSubmit={handleSubmit}
              className="space-y-4"
            >

              {/* Student Name */}

              <div className="space-y-2">

                <Label>
                  Student Name
                </Label>

                <Input
                  value={form.studentName}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      studentName:
                        e.target.value,
                    })
                  }
                  placeholder="e.g. Rahul Kumar"
                  required
                />
              </div>

              {/* Student Photo Upload */}

              <div className="space-y-2">

                <Label>
                  Student Photo
                </Label>

                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => {
                    const file =
                      e.target.files?.[0]

                    if (file) {
                      handleImageUpload(file)
                    }
                  }}
                  className="
                    w-full
                    border
                    rounded-md
                    p-2
                    text-sm
                    bg-white
                  "
                />

                {uploading && (
                  <p className="text-sm text-blue-600">
                    Uploading image...
                  </p>
                )}
              </div>

              {/* IMAGE PREVIEW */}

              {form.photo && (
                <div className="flex justify-center">

                  <div
                    className="
                      relative
                      w-20
                      h-20
                      rounded-full
                      overflow-hidden
                      border
                    "
                    style={{
                      borderColor:
                        '#dbeafe',
                    }}
                  >

                    <Image
                      src={form.photo}
                      alt="Student Preview"
                      fill
                      className="object-cover"
                    />
                  </div>
                </div>
              )}

              {/* Quote */}

              <div className="space-y-2">

                <div className="flex items-center justify-between">

                  <Label>
                    Short Quote
                  </Label>

                  <span
                    className="text-xs"
                    style={{
                      color:
                        form.quote.length >
                        maxQuoteLength
                          ? '#dc2626'
                          : '#6b7280',
                    }}
                  >
                    {form.quote.length}/
                    {maxQuoteLength}
                  </span>
                </div>

                <textarea
                  className="
                    w-full
                    border
                    rounded-md
                    p-2
                    text-sm
                    min-h-[100px]
                    resize-none
                  "
                  value={form.quote}
                  onChange={(e) => {
                    if (
                      e.target.value.length <=
                      maxQuoteLength
                    ) {
                      setForm({
                        ...form,
                        quote:
                          e.target.value,
                      })
                    }
                  }}
                  placeholder="What the student said..."
                  required
                />
              </div>

              {/* Program */}

              <div className="space-y-2">

                <Label>Program</Label>

                <select
                  className="
                    w-full
                    border
                    rounded-md
                    p-2
                    text-sm
                  "
                  value={form.course}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      course:
                        e.target.value,
                    })
                  }
                  required
                >
                  <option value="">
                    Select program
                  </option>

                  {courses.map((c) => (
                    <option
                      key={c}
                      value={c}
                    >
                      {c}
                    </option>
                  ))}
                </select>
              </div>

              {/* Branch */}

              <div className="space-y-2">

                <Label>
                  Branch (optional)
                </Label>

                <Input
                  value={form.branch}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      branch:
                        e.target.value,
                    })
                  }
                  placeholder="e.g. Chennai"
                />
              </div>

              {/* BUTTONS */}

              <div className="flex justify-end gap-2">

                <Button
                  type="button"
                  variant="outline"
                  onClick={() =>
                    setOpen(false)
                  }
                >
                  Cancel
                </Button>

                <Button
                  type="submit"
                  disabled={
                    loading || uploading
                  }
                >
                  {loading
                    ? 'Saving...'
                    : 'Save Testimonial'}
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {/* ====================================================
          TABLE
      ==================================================== */}

      <Card>

        <CardHeader>

          <CardTitle>
            All Testimonials (
            {testimonials.length})
          </CardTitle>

        </CardHeader>

        <CardContent>

          <Table>

            <TableHeader>

              <TableRow>

                <TableHead>
                  Student
                </TableHead>

                <TableHead>
                  Quote
                </TableHead>

                <TableHead>
                  Program
                </TableHead>

                <TableHead>
                  Branch
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

              {testimonials.length === 0 && (
                <TableRow>

                  <TableCell
                    colSpan={6}
                    className="
                      text-center
                      text-gray-400
                    "
                  >
                    No testimonials yet.
                    Add your first testimonial.
                  </TableCell>

                </TableRow>
              )}

              {testimonials.map((t) => (

                <TableRow key={t.id}>

                  {/* STUDENT */}

                  <TableCell>

                    <div className="flex items-center gap-3">

                      {/* PHOTO */}

                      <div
                        className="
                          relative
                          w-10
                          h-10
                          rounded-full
                          overflow-hidden
                          border
                          flex-shrink-0
                        "
                        style={{
                          borderColor:
                            '#dbeafe',
                          background:
                            '#f3f4f6',
                        }}
                      >

                        {t.photo ? (
                          <Image
                            src={t.photo}
                            alt={t.studentName}
                            fill
                            className="object-cover"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-xs text-gray-500">
                            N/A
                          </div>
                        )}
                      </div>

                      {/* NAME */}

                      <span className="font-medium">
                        {t.studentName}
                      </span>
                    </div>

                  </TableCell>

                  {/* QUOTE */}

                  <TableCell className="max-w-xs truncate text-gray-600 italic">
                    "{t.quote}"
                  </TableCell>

                  {/* PROGRAM */}

                  <TableCell>
                    {t.course}
                  </TableCell>

                  {/* BRANCH */}

                  <TableCell>
                    {t.branch || '-'}
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
                          t.isActive
                            ? '#16a34a'
                            : '#dc2626',
                      }}
                      onClick={() =>
                        toggleActive(t)
                      }
                    >
                      {t.isActive
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
                          openEdit(t)
                        }
                      >
                        Edit
                      </Button>

                      <Button
                        size="sm"
                        variant="destructive"
                        onClick={() =>
                          handleDelete(t.id)
                        }
                      >
                        Delete
                      </Button>

                    </div>

                  </TableCell>

                </TableRow>
              ))}

            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}