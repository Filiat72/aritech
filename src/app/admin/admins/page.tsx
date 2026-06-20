'use client'

import { useEffect, useState } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Shield, User, Clock, Trash2, KeyRound, ToggleLeft, ToggleRight, Plus } from 'lucide-react'

type Admin = {
  id: string
  name: string
  email: string
  role: string
  isActive: boolean
  lastLoginAt: string | null
  createdAt: string
}

type ModalType = 'add' | 'password' | null

const emptyForm = { name: '', email: '', password: '', role: 'editor' }

export default function ManageAdminsPage() {
  const { data: session, status } = useSession()
  const router = useRouter()

  const [admins, setAdmins] = useState<Admin[]>([])
  const [loading, setLoading] = useState(false)
  const [modal, setModal] = useState<ModalType>(null)

  // Add admin form
  const [form, setForm] = useState(emptyForm)
  const [formError, setFormError] = useState('')

  // Change password
  const [passwordTarget, setPasswordTarget] = useState<Admin | null>(null)
  const [newPassword, setNewPassword] = useState('')
  const [passwordError, setPasswordError] = useState('')

  // ── Guard: only super_admin ──────────────────────────────────────────────
  useEffect(() => {
    if (status === 'loading') return
    if (!session || session.user.role !== 'super_admin') {
      router.replace('/admin/dashboard')
    }
  }, [session, status, router])

  // ── Fetch ────────────────────────────────────────────────────────────────
  async function fetchAdmins() {
    const res = await fetch('/api/admins')
    const data = await res.json()
    setAdmins(data)
  }

  useEffect(() => { fetchAdmins() }, [])

  // ── Add admin ────────────────────────────────────────────────────────────
  function openAdd() {
    setForm(emptyForm)
    setFormError('')
    setModal('add')
  }

  async function handleAdd(e: React.FormEvent) {
    e.preventDefault()
    setFormError('')
    setLoading(true)

    const res = await fetch('/api/admins', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    })

    const data = await res.json()
    setLoading(false)

    if (!res.ok) {
      setFormError(data.error ?? 'Failed to create admin')
      return
    }

    setModal(null)
    fetchAdmins()
  }

  // ── Toggle active ────────────────────────────────────────────────────────
  async function toggleActive(admin: Admin) {
    await fetch(`/api/admins/${admin.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...admin, isActive: !admin.isActive }),
    })
    fetchAdmins()
  }

  // ── Toggle role ──────────────────────────────────────────────────────────
  async function toggleRole(admin: Admin) {
    const newRole = admin.role === 'super_admin' ? 'editor' : 'super_admin'
    await fetch(`/api/admins/${admin.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...admin, role: newRole }),
    })
    fetchAdmins()
  }

  // ── Delete ───────────────────────────────────────────────────────────────
  async function handleDelete(admin: Admin) {
    if (!confirm(`Delete ${admin.name}? This cannot be undone.`)) return
    await fetch(`/api/admins/${admin.id}`, { method: 'DELETE' })
    fetchAdmins()
  }

  // ── Reset password ───────────────────────────────────────────────────────
  function openPasswordReset(admin: Admin) {
    setPasswordTarget(admin)
    setNewPassword('')
    setPasswordError('')
    setModal('password')
  }

  async function handlePasswordReset(e: React.FormEvent) {
    e.preventDefault()
    setPasswordError('')
    setLoading(true)

    const res = await fetch(`/api/admins/${passwordTarget!.id}/password`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ newPassword }),
    })

    const data = await res.json()
    setLoading(false)

    if (!res.ok) {
      setPasswordError(data.error ?? 'Failed to update password')
      return
    }

    setModal(null)
  }

  // ── Helpers ───────────────────────────────────────────────────────────────
  function formatDate(dateStr: string | null) {
    if (!dateStr) return 'Never'
    return new Date(dateStr).toLocaleDateString('en-IN', {
      day: 'numeric', month: 'short', year: 'numeric',
      hour: '2-digit', minute: '2-digit'
    })
  }

  const isSelf = (admin: Admin) => admin.id === session?.user.id

  if (status === 'loading') return null

  return (
    <div className="space-y-6">

      {/* ── Header ──────────────────────────────────────────────────────── */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-black">Manage Admins</h1>
          <p className="text-sm mt-0.5" style={{ color: '#4a6090' }}>
            Super Admin access only
          </p>
        </div>
        <button
          onClick={openAdd}
          className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-bold transition-all"
          style={{ background: '#31446b', color: '#ffffff' }}
        >
          <Plus className="w-4 h-4" />
          Add Admin
        </button>
      </div>

      {/* ── Stats row ───────────────────────────────────────────────────── */}
      <div className="grid grid-cols-3 gap-4">
        {[
          { label: 'Total Admins',   value: admins.length,                                  color: '#2563eb' },
          { label: 'Super Admins',   value: admins.filter(a => a.role === 'super_admin').length, color: '#7c3aed' },
          { label: 'Active',         value: admins.filter(a => a.isActive).length,           color: '#16a34a' },
        ].map(stat => (
          <div
            key={stat.label}
            className="rounded-xl p-4 border"
            style={{ background: '#eff6ff', borderColor: '#bfdbfe' }}
          >
            <p className="text-xs font-semibold uppercase tracking-wider" style={{ color: '#4a6090' }}>
              {stat.label}
            </p>
            <p className="text-3xl font-black mt-1" style={{ color: stat.color }}>
              {stat.value}
            </p>
          </div>
        ))}
      </div>

      {/* ── Admins table ────────────────────────────────────────────────── */}
      <Card>
        <CardHeader>
          <CardTitle>All Admins ({admins.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Role</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Last Login</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {admins.length === 0 && (
                <TableRow>
                  <TableCell colSpan={6} className="text-center text-gray-400 py-8">
                    No admins found.
                  </TableCell>
                </TableRow>
              )}
              {admins.map(admin => (
                <TableRow key={admin.id}>

                  {/* Name */}
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <div
                        className="w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-bold flex-shrink-0"
                        style={{ background: admin.role === 'super_admin' ? '#7c3aed' : '#2563eb' }}
                      >
                        {admin.name.charAt(0).toUpperCase()}
                      </div>
                      <div>
                        <p className="font-medium text-sm" style={{ color: '#0d2580' }}>
                          {admin.name}
                          {isSelf(admin) && (
                            <span className="ml-1.5 text-xs px-1.5 py-0.5 rounded" style={{ background: '#dbeafe', color: '#1a3fca' }}>
                              You
                            </span>
                          )}
                        </p>
                      </div>
                    </div>
                  </TableCell>

                  {/* Email */}
                  <TableCell className="text-sm" style={{ color: '#4a6090' }}>
                    {admin.email}
                  </TableCell>

                  {/* Role */}
                  <TableCell>
                    <Badge
                      className="cursor-pointer border-0 text-white text-xs"
                      style={{ background: admin.role === 'super_admin' ? '#7c3aed' : '#2563eb' }}
                      onClick={() => !isSelf(admin) && toggleRole(admin)}
                      title={isSelf(admin) ? 'Cannot change your own role' : 'Click to toggle role'}
                    >
                      <Shield className="w-3 h-3 mr-1 inline" />
                      {admin.role === 'super_admin' ? 'Super Admin' : 'Editor'}
                    </Badge>
                  </TableCell>

                  {/* Status */}
                  <TableCell>
                    <Badge
                      className="cursor-pointer border-0 text-white text-xs"
                      style={{ background: admin.isActive ? '#16a34a' : '#dc2626' }}
                      onClick={() => !isSelf(admin) && toggleActive(admin)}
                      title={isSelf(admin) ? 'Cannot deactivate yourself' : 'Click to toggle'}
                    >
                      {admin.isActive ? (
                        <><ToggleRight className="w-3 h-3 mr-1 inline" /> Active</>
                      ) : (
                        <><ToggleLeft className="w-3 h-3 mr-1 inline" /> Inactive</>
                      )}
                    </Badge>
                  </TableCell>

                  {/* Last login */}
                  <TableCell>
                    <div className="flex items-center gap-1 text-xs" style={{ color: '#4a6090' }}>
                      <Clock className="w-3 h-3" />
                      {formatDate(admin.lastLoginAt)}
                    </div>
                  </TableCell>

                  {/* Actions */}
                  <TableCell>
                    <div className="flex items-center gap-2">
                      {/* Reset password */}
                      <button
                        onClick={() => openPasswordReset(admin)}
                        title="Reset password"
                        className="w-8 h-8 rounded-lg flex items-center justify-center transition-colors hover:bg-blue-50"
                        style={{ border: '1px solid #bfdbfe' }}
                      >
                        <KeyRound className="w-4 h-4" style={{ color: '#2563eb' }} />
                      </button>

                      {/* Delete — disabled for self */}
                      {!isSelf(admin) && (
                        <button
                          onClick={() => handleDelete(admin)}
                          title="Delete admin"
                          className="w-8 h-8 rounded-lg flex items-center justify-center transition-colors hover:bg-red-50"
                          style={{ border: '1px solid #fecaca' }}
                        >
                          <Trash2 className="w-4 h-4 text-red-500" />
                        </button>
                      )}
                    </div>
                  </TableCell>

                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* ── Add Admin Modal ──────────────────────────────────────────────── */}
      <Dialog open={modal === 'add'} onOpenChange={o => !o && setModal(null)}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Add New Admin</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleAdd} className="space-y-4">

            <div className="space-y-2">
              <Label>Full Name</Label>
              <Input
                value={form.name}
                onChange={e => setForm({ ...form, name: e.target.value })}
                placeholder="e.g. Ravi Kumar"
                required
              />
            </div>

            <div className="space-y-2">
              <Label>Email</Label>
              <Input
                type="email"
                value={form.email}
                onChange={e => setForm({ ...form, email: e.target.value })}
                placeholder="ravi@aritech.com"
                required
              />
            </div>

            <div className="space-y-2">
              <Label>Temporary Password</Label>
              <Input
                type="password"
                value={form.password}
                onChange={e => setForm({ ...form, password: e.target.value })}
                placeholder="Min. 8 characters"
                minLength={8}
                required
              />
              <p className="text-xs" style={{ color: '#94a3b8' }}>
                Share this with the admin — they should change it after first login.
              </p>
            </div>

            <div className="space-y-2">
              <Label>Role</Label>
              <div className="flex gap-3">
                {['editor', 'super_admin'].map(r => (
                  <button
                    key={r}
                    type="button"
                    onClick={() => setForm({ ...form, role: r })}
                    className="flex-1 py-2 px-3 rounded-xl text-sm font-medium border-2 transition-all"
                    style={{
                      borderColor: form.role === r ? '#2563eb' : '#e2e8f0',
                      background: form.role === r ? '#eff6ff' : 'transparent',
                      color: form.role === r ? '#1a3fca' : '#64748b',
                    }}
                  >
                    {r === 'super_admin' ? '🛡 Super Admin' : '✏️ Editor'}
                  </button>
                ))}
              </div>
            </div>

            {formError && (
              <p className="text-sm text-red-500 bg-red-50 px-3 py-2 rounded-lg">
                {formError}
              </p>
            )}

            <div className="flex justify-end gap-2 pt-1">
              <Button type="button" variant="outline" onClick={() => setModal(null)}>
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={loading}
                style={{ background: '#31446b', color: '#fff' }}
              >
                {loading ? 'Creating…' : 'Create Admin'}
              </Button>
            </div>

          </form>
        </DialogContent>
      </Dialog>

      {/* ── Reset Password Modal ─────────────────────────────────────────── */}
      <Dialog open={modal === 'password'} onOpenChange={o => !o && setModal(null)}>
        <DialogContent className="max-w-sm">
          <DialogHeader>
            <DialogTitle>Reset Password</DialogTitle>
          </DialogHeader>
          {passwordTarget && (
            <form onSubmit={handlePasswordReset} className="space-y-4">

              <div
                className="flex items-center gap-3 p-3 rounded-xl"
                style={{ background: '#eff6ff', border: '1px solid #bfdbfe' }}
              >
                <div
                  className="w-9 h-9 rounded-full flex items-center justify-center text-white text-sm font-bold"
                  style={{ background: '#2563eb' }}
                >
                  {passwordTarget.name.charAt(0).toUpperCase()}
                </div>
                <div>
                  <p className="text-sm font-semibold" style={{ color: '#0d2580' }}>
                    {passwordTarget.name}
                  </p>
                  <p className="text-xs" style={{ color: '#4a6090' }}>
                    {passwordTarget.email}
                  </p>
                </div>
              </div>

              <div className="space-y-2">
                <Label>New Password</Label>
                <Input
                  type="password"
                  value={newPassword}
                  onChange={e => setNewPassword(e.target.value)}
                  placeholder="Min. 8 characters"
                  minLength={8}
                  required
                />
              </div>

              {passwordError && (
                <p className="text-sm text-red-500 bg-red-50 px-3 py-2 rounded-lg">
                  {passwordError}
                </p>
              )}

              <div className="flex justify-end gap-2 pt-1">
                <Button type="button" variant="outline" onClick={() => setModal(null)}>
                  Cancel
                </Button>
                <Button
                  type="submit"
                  disabled={loading}
                  style={{ background: '#31446b', color: '#fff' }}
                >
                  {loading ? 'Updating…' : 'Reset Password'}
                </Button>
              </div>

            </form>
          )}
        </DialogContent>
      </Dialog>

    </div>
  )
}