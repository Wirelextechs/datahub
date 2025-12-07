import { NextRequest, NextResponse } from 'next/server'
import { Pool } from 'pg'
import { jwtVerify } from 'jose'

const pool = new Pool({
  host: 'localhost',
  port: 5432,
  database: 'datahub_db',
  user: process.env.PGUSER,
  password: process.env.PGPASSWORD,
})

const JWT_SECRET = new TextEncoder().encode(process.env.JWT_SECRET || 'your-secret-key')

export async function POST(request: NextRequest) {
  try {
    const { username } = await request.json()

    // Get user from token
    const token = request.cookies.get('token')?.value
    if (!token) {
      return NextResponse.json(
        { message: 'Unauthorized' },
        { status: 401 }
      )
    }

    let userId: number
    try {
      const verified = await jwtVerify(token, JWT_SECRET)
      userId = verified.payload.userId as number
    } catch {
      return NextResponse.json(
        { message: 'Invalid token' },
        { status: 401 }
      )
    }

    // Validate username
    if (!username || typeof username !== 'string') {
      return NextResponse.json(
        { message: 'Username is required' },
        { status: 400 }
      )
    }

    if (username.length < 3 || username.length > 30) {
      return NextResponse.json(
        { message: 'Username must be between 3 and 30 characters' },
        { status: 400 }
      )
    }

    if (!/^[a-z0-9_-]+$/.test(username)) {
      return NextResponse.json(
        { message: 'Username can only contain lowercase letters, numbers, hyphens, and underscores' },
        { status: 400 }
      )
    }

    // Check if user already has a username set
    const userCheck = await pool.query(
      'SELECT username_set FROM users WHERE id = $1',
      [userId]
    )

    if (userCheck.rows.length === 0) {
      return NextResponse.json(
        { message: 'User not found' },
        { status: 404 }
      )
    }

    if (userCheck.rows[0].username_set) {
      return NextResponse.json(
        { message: 'Username has already been set and cannot be changed' },
        { status: 400 }
      )
    }

    // Check if username is already taken
    const existingUsername = await pool.query(
      'SELECT id FROM users WHERE username = $1 AND id != $2',
      [username, userId]
    )

    if (existingUsername.rows.length > 0) {
      return NextResponse.json(
        { message: 'Username is already taken' },
        { status: 400 }
      )
    }

    // Update user with username
    const result = await pool.query(
      'UPDATE users SET username = $1, username_set = TRUE, updated_at = CURRENT_TIMESTAMP WHERE id = $2 RETURNING id, username, email',
      [username, userId]
    )

    return NextResponse.json({
      message: 'Username set successfully',
      user: result.rows[0],
    })
  } catch (error) {
    console.error('Error setting username:', error)
    return NextResponse.json(
      { message: 'An error occurred while setting username' },
      { status: 500 }
    )
  }
}
