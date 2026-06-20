'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

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

type Result = {
  id: string

  studentName: string
  photo?: string | null

  result: string
  examType: string

  year: string

  achievement?: string | null

  isFeatured: boolean
  isActive: boolean
}

const examTypes = [
  'NEET',
  'JEE',
  'TNPSC',
  'School Coaching',
  'Spoken English',
  'IELTS',
  'Software Training',
  'Medical Coding',
  'Placement',
  'Other',
]

const emptyForm = {
  studentName: '',
  photo: '',

  result: '',
  examType: '',

  year: new Date().getFullYear().toString(),

  achievement: '',

  isFeatured: false,
  isActive: true,
}

export default function ResultsPage() {
  const [results, setResults] = useState<Result[]>([])

  const [form, setForm] = useState(emptyForm)

  const [editing, setEditing] = useState<Result | null>(null)

  const [open, setOpen] = useState(false)

  const [loading, setLoading] = useState(false)

  const [uploading, setUploading] = useState(false)

  async function fetchResults() {
    try {
      const res = await fetch('/api/results')

      const data = await res.json()

      if (Array.isArray(data)) {
        setResults(data)
      } else {
        console.error('Invalid API response:', data)
        setResults([])
      }
    } catch (error) {
      console.error('FETCH RESULTS ERROR:', error)
      setResults([])
    }
  }

  useEffect(() => {
    fetchResults()
  }, [])

  function openAdd() {
    setEditing(null)

    setForm(emptyForm)

    setOpen(true)
  }

  function openEdit(result: Result) {
    setEditing(result)

    setForm({
      studentName: result.studentName,
      photo: result.photo || '',

      result: result.result,
      examType: result.examType,

      year: result.year,

      achievement: result.achievement || '',

      isFeatured: result.isFeatured,
      isActive: result.isActive,
    })

    setOpen(true)
  }

  async function handleImageUpload(
    e: React.ChangeEvent<HTMLInputElement>
  ) {
    const file = e.target.files?.[0]

    if (!file) return

    try {
      setUploading(true)

      const formData = new FormData()

      formData.append('file', file)

      const res = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      })

      const data = await res.json()

      if (!data.url) {
        throw new Error('Upload failed')
      }

      setForm(prev => ({
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

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()

    try {
      setLoading(true)

      const payload = {
        studentName: form.studentName.trim(),

        photo: form.photo,

        result: form.result.trim(),

        examType: form.examType.trim(),

        year: form.year.trim(),

        achievement: form.achievement.trim(),

        isFeatured: form.isFeatured,

        isActive: form.isActive,
      }

      if (editing) {
        await fetch(`/api/results/${editing.id}`, {
          method: 'PUT',

          headers: {
            'Content-Type': 'application/json',
          },

          body: JSON.stringify(payload),
        })
      } else {
        await fetch('/api/results', {
          method: 'POST',

          headers: {
            'Content-Type': 'application/json',
          },

          body: JSON.stringify(payload),
        })
      }

      setOpen(false)

      setForm(emptyForm)

      fetchResults()
    } catch (error) {
      console.error(error)
      alert('Something went wrong')
    } finally {
      setLoading(false)
    }
  }

  async function handleDelete(id: string) {
    const confirmed = confirm(
      'Are you sure you want to delete this result?'
    )

    if (!confirmed) return

    try {
      await fetch(`/api/results/${id}`, {
        method: 'DELETE',
      })

      fetchResults()
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <div className="space-y-6">

      {/* top */}
      <div className="flex items-center justify-between">

        <div>
          <h1
            className="text-2xl font-semibold"
            style={{
              color: '#262C3A',
            }}
          >
            Student Results
          </h1>

          <p
            className="text-sm mt-1"
            style={{
              color: '#7788B6',
            }}
          >
            Manage student achievements and success stories
          </p>
        </div>

        <Dialog open={open} onOpenChange={setOpen}>

          <DialogTrigger asChild>
            <button
              onClick={openAdd}
              className="
                px-5
                py-2.5
                rounded-2xl
                text-sm
                font-medium
                transition-all
                duration-300
                hover:opacity-90
              "
              style={{
                background: '#31446b',
                color: '#FFFFFF',
              }}
            >
              + Add Result
            </button>
          </DialogTrigger>

          <DialogContent
  className="
    max-w-2xl
    max-h-[90vh]
    overflow-y-auto
    rounded-3xl
  "
>

            <DialogHeader>
              <DialogTitle className="text-xl font-semibold">
                {editing ? 'Edit Result' : 'Add Result'}
              </DialogTitle>
            </DialogHeader>

            <form
              onSubmit={handleSubmit}
              className="space-y-5 mt-4"
            >

              {/* image upload */}
              <div className="space-y-3">

                <Label>Student Photo</Label>

                <Input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                />

                {uploading && (
                  <p className="text-sm text-gray-500">
                    Uploading image...
                  </p>
                )}

                {form.photo && (
                  <div className="relative w-20 h-20 rounded-2xl overflow-hidden border">
                    <Image
                      src={form.photo}
                      alt="Student"
                      fill
                      className="object-cover"
                    />
                  </div>
                )}
              </div>

              {/* name */}
              <div className="space-y-2">

                <Label>Student Name</Label>

                <Input
                  value={form.studentName}
                  onChange={e =>
                    setForm({
                      ...form,
                      studentName: e.target.value,
                    })
                  }
                  placeholder="e.g. Priya Sharma"
                  required
                />
              </div>

              {/* result + year */}
              <div className="grid md:grid-cols-2 gap-4">

                <div className="space-y-2">

                  <Label>Result</Label>

                  <Input
                    value={form.result}
                    onChange={e =>
                      setForm({
                        ...form,
                        result: e.target.value,
                      })
                    }
                    placeholder="e.g. NEET AIR 42"
                    required
                  />
                </div>

                <div className="space-y-2">

                  <Label>Year</Label>

                  <Input
                    value={form.year}
                    onChange={e =>
                      setForm({
                        ...form,
                        year: e.target.value,
                      })
                    }
                    placeholder="2025"
                    required
                  />
                </div>
              </div>

              {/* exam type */}
              <div className="space-y-2">

                <Label>Exam Type</Label>

                <select
                  className="
                    w-full
                    border
                    rounded-xl
                    p-3
                    text-sm
                    outline-none
                  "
                  value={form.examType}
                  onChange={e =>
                    setForm({
                      ...form,
                      examType: e.target.value,
                    })
                  }
                  required
                >
                  <option value="">
                    Select exam type
                  </option>

                  {examTypes.map(type => (
                    <option
                      key={type}
                      value={type}
                    >
                      {type}
                    </option>
                  ))}
                </select>
              </div>

              {/* achievement */}
              <div className="space-y-2">

                <Label>Achievement Description</Label>

                <textarea
                  className="
                    w-full
                    border
                    rounded-xl
                    p-3
                    text-sm
                    min-h-[110px]
                    outline-none
                  "
                  placeholder="e.g. Secured AIR 42 in NEET after intensive mentorship and mock assessments."
                  value={form.achievement}
                  onChange={e =>
                    setForm({
                      ...form,
                      achievement: e.target.value,
                    })
                  }
                />
              </div>

              {/* toggles */}
              <div className="grid md:grid-cols-2 gap-4">

                {/* featured */}
                <label
                  className="
                    flex
                    items-center
                    justify-between
                    border
                    rounded-2xl
                    p-4
                  "
                >
                  <div>
                    <p className="font-medium text-sm">
                      Featured Result
                    </p>

                    <p className="text-xs text-gray-500 mt-1">
                      Highlight on homepage
                    </p>
                  </div>

                  <input
                    type="checkbox"
                    checked={form.isFeatured}
                    onChange={e =>
                      setForm({
                        ...form,
                        isFeatured: e.target.checked,
                      })
                    }
                    className="w-4 h-4"
                  />
                </label>

                {/* active */}
                <label
                  className="
                    flex
                    items-center
                    justify-between
                    border
                    rounded-2xl
                    p-4
                  "
                >
                  <div>
                    <p className="font-medium text-sm">
                      Active
                    </p>

                    <p className="text-xs text-gray-500 mt-1">
                      Display publicly
                    </p>
                  </div>

                  <input
                    type="checkbox"
                    checked={form.isActive}
                    onChange={e =>
                      setForm({
                        ...form,
                        isActive: e.target.checked,
                      })
                    }
                    className="w-4 h-4"
                  />
                </label>
              </div>

              {/* actions */}
              <div className="flex justify-end gap-3 pt-2">

                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setOpen(false)}
                >
                  Cancel
                </Button>

                <Button
                  type="submit"
                  disabled={loading}
                  style={{
                    background: '#31446b',
                    color: '#FFFFFF',
                  }}
                >
                  {loading
                    ? 'Saving...'
                    : editing
                    ? 'Update Result'
                    : 'Save Result'}
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {/* table */}
      <Card
        style={{
          borderColor: 'rgba(3,73,224,0.08)',
          boxShadow: '0 8px 24px rgba(15,23,42,0.04)',
        }}
      >
        <CardHeader>
          <CardTitle className="font-semibold">
            All Results ({results.length})
          </CardTitle>
        </CardHeader>

        <CardContent>

          <Table>

            <TableHeader>
              <TableRow>

                <TableHead>Student</TableHead>

                <TableHead>Result</TableHead>

                <TableHead>Exam</TableHead>

                <TableHead>Year</TableHead>

                <TableHead>Status</TableHead>

                <TableHead>Actions</TableHead>

              </TableRow>
            </TableHeader>

            <TableBody>

              {results.length === 0 && (
                <TableRow>
                  <TableCell
                    colSpan={6}
                    className="text-center text-gray-400 py-10"
                  >
                    No results added yet.
                  </TableCell>
                </TableRow>
              )}

              {results.map(result => (
                <TableRow key={result.id}>

                  {/* student */}
                  <TableCell>

                    <div className="flex items-center gap-3">

                      <div
                        className="
                          relative
                          w-11
                          h-11
                          rounded-full
                          overflow-hidden
                          bg-gray-100
                          flex-shrink-0
                        "
                      >
                        {result.photo ? (
                          <Image
                            src={result.photo}
                            alt={result.studentName}
                            fill
                            className="object-cover"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-xs text-gray-400">
                            N/A
                          </div>
                        )}
                      </div>

                      <div>

                        <p className="font-medium text-sm">
                          {result.studentName}
                        </p>

                        {result.isFeatured && (
                          <span
                            className="
                              inline-block
                              mt-1
                              text-[10px]
                              px-2
                              py-0.5
                              rounded-full
                            "
                            style={{
                              background:
                                'rgba(3,73,224,0.08)',
                              color: '#0349E0',
                            }}
                          >
                            Featured
                          </span>
                        )}
                      </div>
                    </div>
                  </TableCell>

                  {/* result */}
                  <TableCell className="font-medium">
                    {result.result}
                  </TableCell>

                  {/* exam */}
                  <TableCell>
                    {result.examType}
                  </TableCell>

                  {/* year */}
                  <TableCell>
                    {result.year}
                  </TableCell>

                  {/* status */}
                  <TableCell>

                    <span
                      className="
                        inline-flex
                        px-2.5
                        py-1
                        rounded-full
                        text-[11px]
                        font-medium
                      "
                      style={{
                        background: result.isActive
                          ? 'rgba(16,185,129,0.10)'
                          : 'rgba(239,68,68,0.10)',

                        color: result.isActive
                          ? '#059669'
                          : '#DC2626',
                      }}
                    >
                      {result.isActive
                        ? 'Active'
                        : 'Hidden'}
                    </span>
                  </TableCell>

                  {/* actions */}
                  <TableCell>

                    <div className="flex gap-2">

                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => openEdit(result)}
                      >
                        Edit
                      </Button>

                      <Button
                        size="sm"
                        variant="destructive"
                        onClick={() =>
                          handleDelete(result.id)
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