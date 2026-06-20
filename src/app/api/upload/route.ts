import { NextResponse } from 'next/server'

import fs from 'fs'
import path from 'path'

/* ====================================================
    POST UPLOAD
==================================================== */

export async function POST(req: Request) {
  try {
    const data = await req.formData()

    const file = data.get('file') as File

    if (!file) {
      return NextResponse.json(
        { error: 'No file uploaded' },
        { status: 400 }
      )
    }

    /* ====================================================
        VALIDATION
    ==================================================== */

    const allowedTypes = [
      'image/jpeg',
      'image/png',
      'image/webp',
    ]

    if (!allowedTypes.includes(file.type)) {
      return NextResponse.json(
        {
          error:
            'Only JPG, PNG, and WEBP images are allowed',
        },
        { status: 400 }
      )
    }

    /* ====================================================
        CREATE BUFFER
    ==================================================== */

    const bytes = await file.arrayBuffer()

    const buffer = Buffer.from(bytes)

    /* ====================================================
        CREATE UNIQUE FILE NAME
    ==================================================== */

    const timestamp = Date.now()

    const cleanName = file.name.replace(/\s+/g, '-')

    const filename = `${timestamp}-${cleanName}`

    /* ====================================================
        UPLOAD DIRECTORY
    ==================================================== */

    const uploadDir = path.join(
      process.cwd(),
      'public/uploads'
    )

    /* ====================================================
        CREATE DIRECTORY IF NOT EXISTS
    ==================================================== */

    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, {
        recursive: true,
      })
    }

    /* ====================================================
        FINAL FILE PATH
    ==================================================== */

    const filePath = path.join(
      uploadDir,
      filename
    )

    /* ====================================================
        SAVE FILE
    ==================================================== */

    fs.writeFileSync(filePath, buffer)

    /* ====================================================
        RETURN IMAGE URL
    ==================================================== */

    const imageUrl = `/uploads/${filename}`

    return NextResponse.json({
      success: true,
      url: imageUrl,
    })
  } catch (error) {
    console.error(error)

    return NextResponse.json(
      {
        error: 'Upload failed',
      },
      {
        status: 500,
      }
    )
  }
}