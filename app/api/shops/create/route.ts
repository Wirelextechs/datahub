import { NextRequest, NextResponse } from 'next/server'
import { Pool } from 'pg'

const pool = new Pool({
  host: 'localhost',
  port: 5432,
  database: 'datahub_db',
  user: process.env.PGUSER,
  password: process.env.PGPASSWORD,
})

export async function POST(request: NextRequest) {
  try {
    const { userId, businessName, businessDescription, username, ownerName } = await request.json()

    if (!userId || !businessName || !username) {
      return NextResponse.json(
        { message: 'Missing required fields: userId, businessName, username' },
        { status: 400 }
      )
    }

    // Check if shop already exists for this user
    const existingShop = await pool.query(
      'SELECT id FROM shops WHERE user_id = $1',
      [userId]
    )

    if (existingShop.rows.length > 0) {
      return NextResponse.json(
        { message: 'Shop already exists for this user' },
        { status: 400 }
      )
    }

    // Create slug from business name
    const slug = businessName
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '')

    // Create the shop
    const result = await pool.query(
      `INSERT INTO shops (user_id, username, name, slug, description, owner_name, business_name, business_description)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
       RETURNING id, user_id, username, name, slug, description, owner_name, business_name, business_description`,
      [userId, username, businessName, slug, businessDescription || '', ownerName || '', businessName, businessDescription || '']
    )

    const shop = result.rows[0]

    return NextResponse.json({
      message: 'Shop created successfully',
      shop,
    })
  } catch (error) {
    console.error('Error creating shop:', error)
    return NextResponse.json(
      { message: 'An error occurred while creating the shop' },
      { status: 500 }
    )
  }
}
