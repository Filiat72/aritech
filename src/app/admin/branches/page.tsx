'use client'

import { useEffect, useState } from 'react'

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

import {
  MapPin,
  ExternalLink,
} from 'lucide-react'

type Branch = {
  id: string

  name: string

  address: string

  city: string

  phone: string

  mapUrl: string

  isActive: boolean
}

const empty = {
  name: '',

  address: '',

  city: '',

  phone: '',

  mapUrl: '',
}

export default function BranchesPage() {
  const [branches, setBranches] =
    useState<Branch[]>([])

  const [form, setForm] =
    useState(empty)

  const [editing, setEditing] =
    useState<Branch | null>(null)

  const [open, setOpen] =
    useState(false)

  const [loading, setLoading] =
    useState(false)

  /* ======================================================
      FETCH BRANCHES
  ====================================================== */

  async function fetchBranches() {
    const res = await fetch(
      '/api/branches'
    )

    const data = await res.json()

    setBranches(data)
  }

  useEffect(() => {
    fetchBranches()
  }, [])

  /* ======================================================
      OPEN ADD
  ====================================================== */

  function openAdd() {
    setEditing(null)

    setForm(empty)

    setOpen(true)
  }

  /* ======================================================
      OPEN EDIT
  ====================================================== */

  function openEdit(
    branch: Branch
  ) {
    setEditing(branch)

    setForm({
      name: branch.name,

      address:
        branch.address,

      city: branch.city,

      phone: branch.phone,

      mapUrl: branch.mapUrl,
    })

    setOpen(true)
  }

  /* ======================================================
      SUBMIT
  ====================================================== */

  async function handleSubmit(
    e: React.FormEvent
  ) {
    e.preventDefault()

    setLoading(true)

    if (editing) {
      await fetch(
        `/api/branches/${editing.id}`,
        {
          method: 'PUT',

          headers: {
            'Content-Type':
              'application/json',
          },

          body: JSON.stringify({
            ...form,

            isActive:
              editing.isActive,
          }),
        }
      )
    } else {
      await fetch(
        '/api/branches',
        {
          method: 'POST',

          headers: {
            'Content-Type':
              'application/json',
          },

          body: JSON.stringify(form),
        }
      )
    }

    setLoading(false)

    setOpen(false)

    fetchBranches()
  }

  /* ======================================================
      DELETE
  ====================================================== */

  async function handleDelete(
    id: string
  ) {
    if (
      !confirm(
        'Delete this branch?'
      )
    )
      return

    await fetch(
      `/api/branches/${id}`,
      {
        method: 'DELETE',
      }
    )

    fetchBranches()
  }

  /* ======================================================
      TOGGLE ACTIVE
  ====================================================== */

  async function toggleActive(
    branch: Branch
  ) {
    await fetch(
      `/api/branches/${branch.id}`,
      {
        method: 'PUT',

        headers: {
          'Content-Type':
            'application/json',
        },

        body: JSON.stringify({
          ...branch,

          isActive:
            !branch.isActive,
        }),
      }
    )

    fetchBranches()
  }

  return (
    <div className="space-y-6">

      {/* HEADER */}

      <div className="flex items-center justify-between">

        <div>

          <h1
            className="
              text-2xl
              font-bold
              text-black
            "
          >
            Branches
          </h1>

          <p className="text-sm text-gray-500 mt-1">
            Manage institute locations and branch information
          </p>

        </div>

        <Dialog
          open={open}
          onOpenChange={setOpen}
        >

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
                background:
                  '#31446b',

                color:
                  '#ffffff',
              }}
            >
              + Add Branch
            </button>

          </DialogTrigger>

          <DialogContent className="max-w-lg rounded-3xl">

            <DialogHeader>

              <DialogTitle>
                {editing
                  ? 'Edit Branch'
                  : 'Add Branch'}
              </DialogTitle>

            </DialogHeader>

            <form
              onSubmit={
                handleSubmit
              }
              className="space-y-4"
            >

              <div className="space-y-2">

                <Label>
                  Branch Name
                </Label>

                <Input
                  value={form.name}
                  onChange={e =>
                    setForm({
                      ...form,

                      name:
                        e.target
                          .value,
                    })
                  }
                  placeholder="e.g. Chennai Central"
                  required
                />

              </div>

              <div className="space-y-2">

                <Label>
                  City
                </Label>

                <Input
                  value={form.city}
                  onChange={e =>
                    setForm({
                      ...form,

                      city:
                        e.target
                          .value,
                    })
                  }
                  placeholder="e.g. Chennai"
                  required
                />

              </div>

              <div className="space-y-2">

                <Label>
                  Address
                </Label>

                <Input
                  value={
                    form.address
                  }
                  onChange={e =>
                    setForm({
                      ...form,

                      address:
                        e.target
                          .value,
                    })
                  }
                  placeholder="Full address"
                  required
                />

              </div>

              <div className="space-y-2">

                <Label>
                  Phone
                </Label>

                <Input
                  value={form.phone}
                  onChange={e =>
                    setForm({
                      ...form,

                      phone:
                        e.target
                          .value,
                    })
                  }
                  placeholder="+91 98765 43210"
                  required
                />

              </div>

              <div className="space-y-2">

                <Label>
                  Google Maps URL
                </Label>

                <Input
                  value={
                    form.mapUrl
                  }
                  onChange={e =>
                    setForm({
                      ...form,

                      mapUrl:
                        e.target
                          .value,
                    })
                  }
                  placeholder="https://maps.google.com/..."
                />

              </div>

              <div className="flex justify-end gap-2 pt-2">

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
                    loading
                  }
                >
                  {loading
                    ? 'Saving...'
                    : 'Save Branch'}
                </Button>

              </div>

            </form>

          </DialogContent>

        </Dialog>

      </div>

      {/* TABLE */}

      <Card className="rounded-3xl border border-gray-200 shadow-sm">

        <CardHeader>

          <CardTitle>
            All Branches (
            {branches.length})
          </CardTitle>

        </CardHeader>

        <CardContent>

          <Table>

            <TableHeader>

              <TableRow>

                <TableHead>
                  Branch
                </TableHead>

                <TableHead>
                  City
                </TableHead>

                <TableHead>
                  Phone
                </TableHead>

                <TableHead>
                  Map
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

              {branches.length ===
                0 && (
                <TableRow>

                  <TableCell
                    colSpan={6}
                    className="
                      text-center
                      py-16
                    "
                  >

                    <div className="flex flex-col items-center gap-3">

                      <div
                        className="
                          w-16
                          h-16
                          rounded-full
                          bg-blue-50
                          flex
                          items-center
                          justify-center
                        "
                      >

                        <MapPin className="w-7 h-7 text-[#31446b]" />

                      </div>

                      <div>

                        <p className="font-semibold text-gray-800">
                          No branches added yet
                        </p>

                        <p className="text-sm text-gray-400 mt-1">
                          Add your first institute branch
                        </p>

                      </div>

                    </div>

                  </TableCell>

                </TableRow>
              )}

              {branches.map(
                branch => (
                  <TableRow
                    key={branch.id}
                    className="
                      hover:bg-gray-50/70
                      transition-colors
                    "
                  >

                    {/* BRANCH */}

                    <TableCell>

                      <div className="flex items-start gap-4">

                        {/* AVATAR */}

                        <div
                          className="
                            w-11
                            h-11
                            rounded-full
                            bg-[#0d2580]
                            text-white
                            flex
                            items-center
                            justify-center
                            font-bold
                            text-sm
                            shrink-0
                          "
                        >
                          {branch.name
                            .charAt(0)
                            .toUpperCase()}
                        </div>

                        {/* INFO */}

                        <div>

                          <p className="font-semibold text-gray-900">
                            {
                              branch.name
                            }
                          </p>

                          <p
                            className="
                              text-sm
                              text-gray-500
                              mt-1
                              max-w-[250px]
                              truncate
                            "
                          >
                            {
                              branch.address
                            }
                          </p>

                        </div>

                      </div>

                    </TableCell>

                    {/* CITY */}

                    <TableCell>
                      {
                        branch.city
                      }
                    </TableCell>

                    {/* PHONE */}

                    <TableCell>
                      {
                        branch.phone
                      }
                    </TableCell>

                    {/* MAP */}

                    <TableCell>

                      {branch.mapUrl ? (

                        <a
                          href={
                            branch.mapUrl
                          }
                          target="_blank"
                          rel="noopener noreferrer"
                          className="
                            inline-flex
                            items-center
                            gap-1
                            text-sm
                            text-blue-600
                            hover:text-blue-800
                            font-medium
                          "
                        >
                          View Map

                          <ExternalLink className="w-3 h-3" />

                        </a>
                      ) : (

                        <span className="text-gray-400 text-sm">
                          —
                        </span>
                      )}

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
                            branch.isActive
                              ? '#16a34a'
                              : '#dc2626',
                        }}
                        onClick={() =>
                          toggleActive(
                            branch
                          )
                        }
                      >
                        {branch.isActive
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
                            openEdit(
                              branch
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
                              branch.id
                            )
                          }
                        >
                          Delete
                        </Button>

                      </div>

                    </TableCell>

                  </TableRow>
                )
              )}

            </TableBody>

          </Table>

        </CardContent>

      </Card>

    </div>
  )
}