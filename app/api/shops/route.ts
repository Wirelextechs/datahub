import { NextRequest, NextResponse } from 'next/server'
import { Pool } from 'pg'

const pool = new Pool({
  host: 'localhost',
  port: 5432,
  database: 'datahub_db',
  user: process.env.PGUSER,
  password: process.env.PGPASSWORD,
})

// GET user's shop
export async function GET(request: NextRequest) {
  try {
    const userId = request.headers.get('x-user-id')

    if (!userId) {
      return NextResponse.json(
        { message: 'User ID is required' },
        { status: 400 }
      )
    }

    const result = await pool.query(
      'SELECT id, user_id, name, slug, description, owner_name, created_at FROM shops WHERE user_id = $1',
      [userId]
    )

    if (result.rows.length === 0) {
      return NextResponse.json(
        { message: 'Shop not found' },
        { status: 404 }
      )
    }

    return NextResponse.json(result.rows[0])
  } catch (error) {
    console.error('Error fetching shop:', error)
    return NextResponse.json(
      { message: 'An error occurred while fetching shop' },
      { status: 500 }
    )
  }
}

// POST create or update shop
export async function POST(request: NextRequest) {
  try {
    const { userId, name, slug, description, ownerName } = await request.json()

    if (!userId || !name || !slug) {
      return NextResponse.json(
        { message: 'User ID, name, and slug are required' },
        { status: 400 }
      )
    }

    // Check if shop already exists
    const existingShop = await pool.query(
      'SELECT id FROM shops WHERE user_id = $1',
      [userId]
    )

    if (existingShop.rows.length > 0) {
      // Update existing shop
      const result = await pool.query(
        'UPDATE shops SET name = $1, slug = $2, description = $3, owner_name = $4, updated_at = CURRENT_TIMESTAMP WHERE user_id = $5 RETURNING *',
        [name, slug, description, ownerName, userId]
      )
      return NextResponse.json(result.rows[0])
    } else {
      // Create new shop
      const result = await pool.query(
        'INSERT INTO shops (user_id, name, slug, description, owner_name) VALUES ($1, $2, $3, $4, $5) RETURNING *',
        [userId, name, slug, description, ownerName]
      )
      return NextResponse.json(result.rows[0], { status: 201 })
    }
  } catch (error) {
    console.error('Error creating/updating shop:', error)
    return NextResponse.json(
      { message: 'An error occurred while creating/updating shop' },
      { status: 500 }
    )
  }
}
