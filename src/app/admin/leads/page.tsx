'use client'

import { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'

type Lead = {
  id: string
  name: string
  email: string
  phone: string
  courseInterest: string
  branch: string
  source: string
  status: string
  createdAt: string
}

const statuses = ['new', 'contacted', 'enrolled', 'lost']

const statusStyles: Record<string, { bg: string; color: string }> = {
  new:       { bg: '#dbeafe', color: '#1a3fca' },
  contacted: { bg: '#fef9c3', color: '#854d0e' },
  enrolled:  { bg: '#dcfce7', color: '#15803d' },
  lost:      { bg: '#fee2e2', color: '#dc2626' },
}

export default function LeadsPage() {
  const [leads, setLeads] = useState<Lead[]>([])
  const [filter, setFilter] = useState('all')

  async function fetchLeads() {
    const res = await fetch('/api/leads')
    const data = await res.json()
    setLeads(data)
  }

  useEffect(() => { fetchLeads() }, [])

  async function updateStatus(id: string, status: string) {
    await fetch(`/api/leads/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status })
    })
    fetchLeads()
  }

  async function handleDelete(id: string) {
    if (!confirm('Delete this lead?')) return
    await fetch(`/api/leads/${id}`, { method: 'DELETE' })
    fetchLeads()
  }

  const filtered = filter === 'all' ? leads : leads.filter(l => l.status === filter)

  const counts = {
    all:       leads.length,
    new:       leads.filter(l => l.status === 'new').length,
    contacted: leads.filter(l => l.status === 'contacted').length,
    enrolled:  leads.filter(l => l.status === 'enrolled').length,
    lost:      leads.filter(l => l.status === 'lost').length,
  }

  return (
    <div className="space-y-6">

      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-black">Leads</h1>
        <p className="text-sm" style={{ color: '#4a6090' }}>
          Total: {leads.length}
        </p>
      </div>

      {/* ── Stat cards — 2 cols on mobile, 3 on sm, 5 on lg ─────────────── */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
        {Object.entries(counts).map(([key, count]) => (
          <Card
            key={key}
            className="cursor-pointer transition-all"
            style={{
              border: filter === key ? '2px solid #0d2580' : '1px solid #bfdbfe',
              background: filter === key ? '#eff6ff' : '#ffffff',
            }}
            onClick={() => setFilter(key)}
          >
            <CardContent className="pt-5 pb-4 px-4">
              <p
                className="text-2xl font-black"
                style={{ color: filter === key ? '#0d2580' : '#1e293b' }}
              >
                {count}
              </p>
              <p
                className="text-xs font-medium capitalize mt-0.5"
                style={{ color: filter === key ? '#2563eb' : '#64748b' }}
              >
                {key}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* ── Leads table ───────────────────────────────────────────────────── */}
      <Card style={{ border: '1px solid #bfdbfe' }}>
        <CardHeader>
          <CardTitle>
            {filter === 'all'
              ? 'All Leads'
              : `${filter.charAt(0).toUpperCase() + filter.slice(1)} Leads`
            } ({filtered.length})
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          {/* Horizontal scroll wrapper for mobile */}
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="whitespace-nowrap">Name</TableHead>
                  <TableHead className="whitespace-nowrap">Phone</TableHead>
                  <TableHead className="whitespace-nowrap">Course Interest</TableHead>
                  <TableHead className="whitespace-nowrap">Source</TableHead>
                  <TableHead className="whitespace-nowrap">Status</TableHead>
                  <TableHead className="whitespace-nowrap">Date</TableHead>
                  <TableHead className="whitespace-nowrap">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filtered.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={7} className="text-center text-gray-400 py-8">
                      No leads found.
                    </TableCell>
                  </TableRow>
                )}
                {filtered.map(lead => (
                  <TableRow key={lead.id}>
                    <TableCell>
                      <div className="min-w-[120px]">
                        <p className="font-medium text-sm">{lead.name}</p>
                        <p className="text-xs" style={{ color: '#64748b' }}>{lead.email}</p>
                      </div>
                    </TableCell>
                    <TableCell className="whitespace-nowrap text-sm">{lead.phone}</TableCell>
                    <TableCell className="whitespace-nowrap text-sm">{lead.courseInterest || '—'}</TableCell>
                    <TableCell className="whitespace-nowrap text-sm">{lead.source || '—'}</TableCell>
                    <TableCell>
                      <select
                        className="text-xs border rounded-lg px-2 py-1.5 font-medium outline-none cursor-pointer"
                        style={{
                          background: statusStyles[lead.status]?.bg ?? '#f1f5f9',
                          color: statusStyles[lead.status]?.color ?? '#334155',
                          borderColor: 'transparent',
                          minWidth: '90px',
                        }}
                        value={lead.status}
                        onChange={e => updateStatus(lead.id, e.target.value)}
                      >
                        {statuses.map(s => (
                          <option key={s} value={s}>{s}</option>
                        ))}
                      </select>
                    </TableCell>
                    <TableCell className="whitespace-nowrap text-sm" style={{ color: '#64748b' }}>
                      {new Date(lead.createdAt).toLocaleDateString('en-IN')}
                    </TableCell>
                    <TableCell>
                      <Button
                        size="sm"
                        variant="destructive"
                        onClick={() => handleDelete(lead.id)}
                      >
                        Delete
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

    </div>
  )
}