import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { hubspotClient } from '@/lib/hubspot'

export async function GET() {
  try {
    const leads = await prisma.lead.findMany({
      orderBy: {
        createdAt: 'desc',
      },
    })

    return NextResponse.json(leads)
  } catch (error) {
    return NextResponse.json(
      {
        error: 'Failed to fetch leads',
      },
      {
        status: 500,
      }
    )
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json()

const lead = await prisma.lead.create({
  data: {
    name:
      body.name ||
      `${body.firstName || ''} ${body.lastName || ''}`,

    email: body.email,

    phone: body.phone,

    courseInterest:
      body.courseInterest || body.subject,

    studentCategory:
      body.studentCategory || null,

    preferredMode:
      body.preferredMode || null,

    schoolCollegeName:
      body.schoolCollegeName || null,

    referralCode:
      body.referralCode || null,

    branch: 'Website',

    source: body.source || 'Website',

    leadType:
      body.leadType || 'Contact Inquiry',

    status: 'new',
  },
})

    await hubspotClient.crm.contacts.basicApi.create({
      properties: {
        firstname:
          body.firstName ||
          body.name?.split(' ')[0] ||
          '',

        lastname:
          body.lastName ||
          body.name?.split(' ').slice(1).join(' ') ||
          '',

        email: body.email || '',

        phone: body.phone || '',
      },
    })

    return NextResponse.json({
      success: true,
      lead,
    })
  } catch (error) {
    console.error(
      'Lead Create Error:',
      JSON.stringify(error, null, 2)
    )

    return NextResponse.json(
      {
        success: false,
        error: 'Failed to create lead',
      },
      {
        status: 500,
      }
    )
  }
}