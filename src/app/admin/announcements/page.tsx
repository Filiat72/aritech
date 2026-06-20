'use client'

import { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'

type Announcement = {
  id: string
  title: string
  message: string
  isActive: boolean
  expiresAt: string | null
  createdAt: string
}

const empty = { title: '', message: '', expiresAt: '' }

export default function AnnouncementsPage() {
  const [announcements, setAnnouncements] = useState<Announcement[]>([])
  const [form, setForm] = useState(empty)
  const [editing, setEditing] = useState<Announcement | null>(null)
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)

  async function fetchAnnouncements() {
    const res = await fetch('/api/announcements')
    const data = await res.json()
    setAnnouncements(data)
  }

  useEffect(() => { fetchAnnouncements() }, [])

  function openAdd() {
    setEditing(null)
    setForm(empty)
    setOpen(true)
  }

  function openEdit(a: Announcement) {
    setEditing(a)
    setForm({
      title: a.title,
      message: a.message,
      expiresAt: a.expiresAt
        ? new Date(a.expiresAt).toISOString().split('T')[0]
        : ''
    })
    setOpen(true)
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    if (editing) {
      await fetch(`/api/announcements/${editing.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, isActive: editing.isActive })
      })
    } else {
      await fetch('/api/announcements', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form)
      })
    }
    setLoading(false)
    setOpen(false)
    fetchAnnouncements()
  }

  async function handleDelete(id: string) {
    if (!confirm('Delete this announcement?')) return
    await fetch(`/api/announcements/${id}`, { method: 'DELETE' })
    fetchAnnouncements()
  }

  async function toggleActive(a: Announcement) {
    await fetch(`/api/announcements/${a.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...a, isActive: !a.isActive })
    })
    fetchAnnouncements()
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-black">Announcements</h1>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <button
  onClick={openAdd}
  className="px-4 py-2 rounded-xl text-sm font-bold transition-all"
  style={{ background: '#31446b', color: '#ffffff' }}
>
  + Add Announcement
</button>
          </DialogTrigger>
          <DialogContent className="max-w-lg">
            <DialogHeader>
              <DialogTitle>
                {editing ? 'Edit Announcement' : 'Add Announcement'}
              </DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label>Title</Label>
                <Input
                  value={form.title}
                  onChange={e => setForm({ ...form, title: e.target.value })}
                  placeholder="e.g. Limited Seats Available"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label>Message</Label>
                <textarea
                  className="w-full border rounded-md p-2 text-sm min-h-[100px]"
                  value={form.message}
                  onChange={e => setForm({ ...form, message: e.target.value })}
                  placeholder="Announcement message..."
                  required
                />
              </div>
              <div className="space-y-2">
                <Label>Expires On (optional)</Label>
                <Input
                  type="date"
                  value={form.expiresAt}
                  onChange={e => setForm({ ...form, expiresAt: e.target.value })}
                />
              </div>
              <div className="flex justify-end gap-2">
                <Button type="button" variant="outline" onClick={() => setOpen(false)}>
                  Cancel
                </Button>
                <Button type="submit" disabled={loading}>
                  {loading ? 'Saving...' : 'Save Announcement'}
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>All Announcements ({announcements.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Title</TableHead>
                <TableHead>Message</TableHead>
                <TableHead>Expires</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {announcements.length === 0 && (
                <TableRow>
                  <TableCell colSpan={5} className="text-center text-gray-400">
                    No announcements yet.
                  </TableCell>
                </TableRow>
              )}
              {announcements.map(a => (
                <TableRow key={a.id}>
                  <TableCell className="font-medium">{a.title}</TableCell>
                  <TableCell className="max-w-xs truncate">{a.message}</TableCell>
                  <TableCell className="text-sm text-gray-500">
                    {a.expiresAt
                      ? new Date(a.expiresAt).toLocaleDateString('en-IN')
                      : 'No expiry'}
                  </TableCell>
                  <TableCell>
                    {/* ✅ Active = green, Inactive = red */}
                    <Badge
                      className="cursor-pointer border-0 text-white"
                      style={{
                        background: a.isActive ? '#16a34a' : '#dc2626',
                      }}
                      onClick={() => toggleActive(a)}
                    >
                      {a.isActive ? 'Active' : 'Inactive'}
                    </Badge>
                    {/* <Badge
                      variant={a.isActive ? 'default' : 'secondary'}
                      className="cursor-pointer"
                      onClick={() => toggleActive(a)}
                    >
                      {a.isActive ? 'Active' : 'Inactive'}
                    </Badge> */}
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline" onClick={() => openEdit(a)}>
                        Edit
                      </Button>
                      <Button size="sm" variant="destructive" onClick={() => handleDelete(a.id)}>
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