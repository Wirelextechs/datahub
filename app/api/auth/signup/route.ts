import { NextRequest, NextResponse } from 'next/server'
import { Pool } from 'pg'
import bcrypt from 'bcryptjs'
import { SignJWT } from 'jose'

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
    const { name, email, phone, password } = await request.json()

    // Validate input
    if (!name || !email || !phone || !password) {
      return NextResponse.json(
        { message: 'All fields are required' },
        { status: 400 }
      )
    }

    // Check if email already exists
    const existingUser = await pool.query(
      'SELECT id FROM users WHERE email = $1',
      [email]
    )

    if (existingUser.rows.length > 0) {
      return NextResponse.json(
        { message: 'Email already registered' },
        { status: 400 }
      )
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10)

    // Create user with customer role
    const result = await pool.query(
      'INSERT INTO users (name, email, phone, password, account_type, role) VALUES ($1, $2, $3, $4, $5, $6) RETURNING id, email, name',
      [name, email, phone, hashedPassword, 'customer', 'user']
    )

    const user = result.rows[0]

    // Create JWT token
    const token = await new SignJWT({ userId: user.id, email: user.email })
      .setProtectedHeader({ alg: 'HS256' })
      .setExpirationTime('7d')
      .sign(JWT_SECRET)

    // Set token in cookie
    const response = NextResponse.json({
      message: 'Signup successful',
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
      },
    })

    response.cookies.set('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 7 * 24 * 60 * 60, // 7 days
    })

    return response
  } catch (error) {
    console.error('Error during signup:', error)
    return NextResponse.json(
      { message: 'An error occurred during signup' },
      { status: 500 }
    )
  }
}
