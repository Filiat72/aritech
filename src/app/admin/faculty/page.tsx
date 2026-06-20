'use client'

import { useEffect, useState, useRef } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { User, X, BookOpen, Briefcase, Camera } from 'lucide-react'

type Faculty = {
  id: string
  name: string
  bio: string
  experience: string
  subjects: string[]
  isActive: boolean
  photo?: string
}

const emptyForm = { name: '', bio: '', experience: '', subjects: '' }

export default function FacultyPage() {
  const [faculty, setFaculty] = useState<Faculty[]>([])
  const [loading, setLoading] = useState(false)

  // ── Add / Edit dialog ──────────────────────────────────────────────────────
  const [open, setOpen] = useState(false)
  const [editing, setEditing] = useState<Faculty | null>(null)
  const [form, setForm] = useState(emptyForm)

  // Photo state inside the form
  const [formPhotoFile, setFormPhotoFile] = useState<File | null>(null)
  const [formPhotoPreview, setFormPhotoPreview] = useState<string | null>(null)
  const formFileRef = useRef<HTMLInputElement>(null)

  // ── Profile modal (read-only) ──────────────────────────────────────────────
  const [profileOpen, setProfileOpen] = useState(false)
  const [selectedFaculty, setSelectedFaculty] = useState<Faculty | null>(null)

  // ── Data fetching ──────────────────────────────────────────────────────────
  async function fetchFaculty() {
    const res = await fetch('/api/faculty')
    const data = await res.json()
    setFaculty(data)
  }

  useEffect(() => { fetchFaculty() }, [])

  // ── Open add form ──────────────────────────────────────────────────────────
  function openAdd() {
    setEditing(null)
    setForm(emptyForm)
    setFormPhotoFile(null)
    setFormPhotoPreview(null)
    setOpen(true)
  }

  // ── Open edit form ─────────────────────────────────────────────────────────
  function openEdit(f: Faculty) {
    setEditing(f)
    setForm({
      name: f.name,
      bio: f.bio,
      experience: f.experience,
      subjects: f.subjects.join(', ')
    })
    setFormPhotoFile(null)
    setFormPhotoPreview(f.photo || null)
    setOpen(true)
  }

  // ── Open profile (read-only) ───────────────────────────────────────────────
  function openProfile(f: Faculty) {
    setSelectedFaculty(f)
    setProfileOpen(true)
  }

  // ── Photo picked inside form ───────────────────────────────────────────────
  function handleFormPhotoChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file) return
    setFormPhotoFile(file)
    const reader = new FileReader()
    reader.onload = () => setFormPhotoPreview(reader.result as string)
    reader.readAsDataURL(file)
    if (formFileRef.current) formFileRef.current.value = ''
  }

  function removeFormPhoto() {
    setFormPhotoFile(null)
    setFormPhotoPreview(null)
    if (formFileRef.current) formFileRef.current.value = ''
  }

  // ── Submit form (create or update) ────────────────────────────────────────
  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)

    const subjectsArray = form.subjects.split(',').map(s => s.trim()).filter(Boolean)
    let savedId = editing?.id

    if (editing) {
      await fetch(`/api/faculty/${editing.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: form.name,
          bio: form.bio,
          experience: form.experience,
          subjects: subjectsArray,
          isActive: editing.isActive,
        })
      })
    } else {
      const res = await fetch('/api/faculty', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: form.name,
          bio: form.bio,
          experience: form.experience,
          subjects: subjectsArray,
        })
      })
      const created = await res.json()
      savedId = created.id
    }

    // Upload photo if a new one was selected
    if (formPhotoFile && savedId) {
      const fd = new FormData()
      fd.append('photo', formPhotoFile)
      fd.append('facultyId', savedId)
      await fetch(`/api/faculty/${savedId}/photo`, { method: 'POST', body: fd })
    }

    setLoading(false)
    setOpen(false)
    fetchFaculty()
  }

  // ── Delete ─────────────────────────────────────────────────────────────────
  async function handleDelete(id: string) {
    if (!confirm('Delete this faculty?')) return
    await fetch(`/api/faculty/${id}`, { method: 'DELETE' })
    fetchFaculty()
  }

  // ── Toggle active ──────────────────────────────────────────────────────────
  async function toggleActive(f: Faculty) {
    await fetch(`/api/faculty/${f.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...f, isActive: !f.isActive })
    })
    fetchFaculty()
  }

  return (
    <div className="space-y-6">

      {/* ── Page header ───────────────────────────────────────────────────── */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-black">Faculty</h1>

        {/* ── Add / Edit Dialog ─────────────────────────────────────────── */}
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <button
              onClick={openAdd}
              className="px-4 py-2 rounded-xl text-sm font-bold transition-all"
              style={{ background: '#31446b', color: '#ffffff' }}
            >
              + Add Faculty
            </button>
          </DialogTrigger>

          <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>{editing ? 'Edit Faculty' : 'Add Faculty'}</DialogTitle>
            </DialogHeader>

            <form onSubmit={handleSubmit} className="space-y-5">

              {/* ── Photo upload ─────────────────────────────────────────── */}
              <div className="space-y-2">
                <Label>Profile Photo</Label>
                <div className="flex items-center gap-4">
                  {/* Preview circle */}
                  <div
                    className="w-20 h-20 rounded-full border-2 overflow-hidden flex items-center justify-center flex-shrink-0"
                    style={{ borderColor: '#bfdbfe', background: '#eff6ff' }}
                  >
                    {formPhotoPreview ? (
                      <img src={formPhotoPreview} alt="preview" className="w-full h-full object-cover" />
                    ) : (
                      <User className="w-9 h-9" style={{ color: '#93c5fd' }} />
                    )}
                  </div>

                  <div className="flex flex-col gap-2">
                    <button
                      type="button"
                      onClick={() => formFileRef.current?.click()}
                      className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium border transition-colors hover:bg-blue-50"
                      style={{ borderColor: '#bfdbfe', color: '#1a3fca' }}
                    >
                      <Camera className="w-4 h-4" />
                      {formPhotoPreview ? 'Change Photo' : 'Upload Photo'}
                    </button>
                    {formPhotoPreview && (
                      <button
                        type="button"
                        onClick={removeFormPhoto}
                        className="flex items-center gap-1.5 text-xs transition-opacity hover:opacity-70"
                        style={{ color: '#dc2626' }}
                      >
                        <X className="w-3 h-3" /> Remove
                      </button>
                    )}
                    <p className="text-xs" style={{ color: '#94a3b8' }}>
                      JPG, PNG or WEBP · max 5MB
                    </p>
                  </div>

                  <input
                    ref={formFileRef}
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handleFormPhotoChange}
                  />
                </div>
              </div>

              {/* Name */}
              <div className="space-y-2">
                <Label>Full Name</Label>
                <Input
                  value={form.name}
                  onChange={e => setForm({ ...form, name: e.target.value })}
                  placeholder="e.g. Dr. Rajesh Kumar"
                  required
                />
              </div>

              {/* Bio */}
              <div className="space-y-2">
                <Label>Bio</Label>
                <textarea
                  className="w-full border rounded-md p-2 text-sm min-h-[80px] outline-none focus:ring-2 focus:ring-blue-200"
                  value={form.bio}
                  onChange={e => setForm({ ...form, bio: e.target.value })}
                  placeholder="Short bio..."
                  required
                />
              </div>

              {/* Experience */}
              <div className="space-y-2">
                <Label>Experience</Label>
                <Input
                  value={form.experience}
                  onChange={e => setForm({ ...form, experience: e.target.value })}
                  placeholder="e.g. 10 years"
                  required
                />
              </div>

              {/* Subjects */}
              <div className="space-y-2">
                <Label>
                  Subjects <span className="text-xs text-gray-400">(comma separated)</span>
                </Label>
                <Input
                  value={form.subjects}
                  onChange={e => setForm({ ...form, subjects: e.target.value })}
                  placeholder="e.g. Physics, Chemistry, NEET"
                  required
                />
              </div>

              {/* Form actions */}
              <div className="flex justify-end gap-2 pt-1">
                <Button type="button" variant="outline" onClick={() => setOpen(false)}>
                  Cancel
                </Button>
                <Button
                  type="submit"
                  disabled={loading}
                  style={{ background: '#31446b', color: '#fff' }}
                >
                  {loading ? 'Saving…' : editing ? 'Save Changes' : 'Add Faculty'}
                </Button>
              </div>

            </form>
          </DialogContent>
        </Dialog>
      </div>

      {/* ── Faculty table ──────────────────────────────────────────────────── */}
      <Card>
        <CardHeader>
          <CardTitle>All Faculty ({faculty.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Experience</TableHead>
                <TableHead>Subjects</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {faculty.length === 0 && (
                <TableRow>
                  <TableCell colSpan={5} className="text-center text-gray-400 py-8">
                    No faculty yet. Add your first faculty member.
                  </TableCell>
                </TableRow>
              )}
              {faculty.map(f => (
                <TableRow key={f.id}>

                  {/* Name — click to open read-only profile */}
                  <TableCell>
                    <button className="flex items-center gap-2 group" onClick={() => openProfile(f)}>
                      <div
                        className="w-8 h-8 rounded-full overflow-hidden flex items-center justify-center flex-shrink-0 border-2"
                        style={{ borderColor: '#bfdbfe', background: '#eff6ff' }}
                      >
                        {f.photo ? (
                          <img src={f.photo} alt={f.name} className="w-full h-full object-cover" />
                        ) : (
                          <User className="w-4 h-4" style={{ color: '#2563eb' }} />
                        )}
                      </div>
                      <span
                        className="font-medium text-sm group-hover:underline"
                        style={{ color: '#1a3fca' }}
                      >
                        {f.name}
                      </span>
                    </button>
                  </TableCell>

                  <TableCell>{f.experience}</TableCell>

                  <TableCell>
                    <div className="flex flex-wrap gap-1">
                      {f.subjects.map(s => (
                        <Badge key={s} variant="secondary">{s}</Badge>
                      ))}
                    </div>
                  </TableCell>

                  <TableCell>
                    <Badge
                      className="cursor-pointer border-0 text-white"
                      style={{ background: f.isActive ? '#16a34a' : '#dc2626' }}
                      onClick={() => toggleActive(f)}
                    >
                      {f.isActive ? 'Active' : 'Inactive'}
                    </Badge>
                  </TableCell>

                  <TableCell>
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline" onClick={() => openEdit(f)}>Edit</Button>
                      <Button size="sm" variant="destructive" onClick={() => handleDelete(f.id)}>Delete</Button>
                    </div>
                  </TableCell>

                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* ── Profile modal (read-only, no upload) ──────────────────────────── */}
      <Dialog open={profileOpen} onOpenChange={setProfileOpen}>
        <DialogContent className="max-w-md p-0 overflow-hidden rounded-2xl">
          {selectedFaculty && (
            <>
              {/* Blue banner */}
              <div
                className="relative h-28 flex items-end px-6"
                style={{ background: 'linear-gradient(135deg, #0d2580 0%, #2563eb 100%)' }}
              >
                {/* Status — top left, away from dialog close button (top right) */}
                <span
                  className="absolute top-4 left-4 text-xs font-semibold px-3 py-1 rounded-full text-white"
                  style={{ background: selectedFaculty.isActive ? '#16a34a' : '#dc2626' }}
                >
                  {selectedFaculty.isActive ? 'Active' : 'Inactive'}
                </span>

                {/* Avatar — no upload button */}
                <div
                  className="w-20 h-20 rounded-full border-4 border-white overflow-hidden flex items-center justify-center translate-y-10 z-10"
                  style={{ background: '#dbeafe', boxShadow: '0 4px 16px rgba(13,37,128,0.25)' }}
                >
                  {selectedFaculty.photo ? (
                    <img src={selectedFaculty.photo} alt={selectedFaculty.name} className="w-full h-full object-cover" />
                  ) : (
                    <User className="w-10 h-10" style={{ color: '#2563eb' }} />
                  )}
                </div>
              </div>

              {/* Content */}
              <div className="pt-14 px-6 pb-6 space-y-5">

                <h2 className="text-xl font-bold" style={{ color: '#0d2580' }}>
                  {selectedFaculty.name}
                </h2>

                {/* Bio */}
                <div className="rounded-xl p-4" style={{ background: '#eff6ff', border: '1px solid #bfdbfe' }}>
                  <p className="text-xs font-semibold uppercase tracking-wider mb-1" style={{ color: '#4a6090' }}>Bio</p>
                  <p className="text-sm leading-relaxed" style={{ color: '#0d2580' }}>
                    {selectedFaculty.bio || '—'}
                  </p>
                </div>

                {/* Experience */}
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: '#dbeafe' }}>
                    <Briefcase className="w-4 h-4" style={{ color: '#2563eb' }} />
                  </div>
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wider" style={{ color: '#4a6090' }}>Experience</p>
                    <p className="text-sm font-medium" style={{ color: '#0d2580' }}>{selectedFaculty.experience || '—'}</p>
                  </div>
                </div>

                {/* Subjects */}
                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 mt-0.5" style={{ background: '#dbeafe' }}>
                    <BookOpen className="w-4 h-4" style={{ color: '#2563eb' }} />
                  </div>
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wider mb-2" style={{ color: '#4a6090' }}>Subjects</p>
                    <div className="flex flex-wrap gap-1.5">
                      {selectedFaculty.subjects.map(s => (
                        <span
                          key={s}
                          className="text-xs font-medium px-2.5 py-1 rounded-full"
                          style={{ background: '#dbeafe', color: '#1a3fca' }}
                        >
                          {s}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex gap-2 pt-1">
                  <Button
                    variant="outline"
                    className="flex-1"
                    onClick={() => { setProfileOpen(false); openEdit(selectedFaculty) }}
                  >
                    Edit Profile
                  </Button>
                  <Button
                    className="flex-1 text-white"
                    style={{ background: '#0d2580' }}
                    onClick={() => setProfileOpen(false)}
                  >
                    Close
                  </Button>
                </div>

              </div>
            </>
          )}
        </DialogContent>
      </Dialog>

    </div>
  )
}