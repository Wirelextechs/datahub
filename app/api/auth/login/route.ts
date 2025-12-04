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
    const { email, password } = await request.json()

    if (!email || !password) {
      return NextResponse.json(
        { message: 'Email and password are required' },
        { status: 400 }
      )
    }

    // Query the database
    const result = await pool.query(
      'SELECT id, email, name, role, is_admin FROM users WHERE email = $1 AND password = $2',
      [email, password]
    )

    if (result.rows.length === 0) {
      return NextResponse.json(
        { message: 'Invalid email or password' },
        { status: 401 }
      )
    }

    const user = result.rows[0]

    // Create a simple token (in production, use JWT)
    const token = Buffer.from(`${user.id}:${user.email}`).toString('base64')

    return NextResponse.json({
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role,
        is_admin: user.is_admin,
      },
      token,
    })
  } catch (error) {
    console.error('Login error:', error)
    return NextResponse.json(
      { message: 'An error occurred during login' },
      { status: 500 }
    )
  }
}
