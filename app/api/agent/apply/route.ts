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
    const { userId, businessName, businessDescription, experience } = await request.json()

    // Validate input
    if (!userId || !businessName || !businessDescription) {
      return NextResponse.json(
        { message: 'Missing required fields' },
        { status: 400 }
      )
    }

    // Check if user already has an application pending or is already an agent
    const existingApp = await pool.query(
      'SELECT id FROM agent_applications WHERE user_id = $1 AND status IN ($2, $3)',
      [userId, 'pending', 'approved']
    )

    if (existingApp.rows.length > 0) {
      return NextResponse.json(
        { message: 'You already have a pending or approved application' },
        { status: 400 }
      )
    }

    // Check if user is already an approved agent
    const user = await pool.query(
      'SELECT is_approved_agent FROM users WHERE id = $1',
      [userId]
    )

    if (user.rows.length === 0) {
      return NextResponse.json(
        { message: 'User not found' },
        { status: 404 }
      )
    }

    if (user.rows[0].is_approved_agent) {
      return NextResponse.json(
        { message: 'You are already an approved agent' },
        { status: 400 }
      )
    }

    // Create agent application
    const result = await pool.query(
      `INSERT INTO agent_applications (user_id, business_name, business_description, experience, status, created_at)
       VALUES ($1, $2, $3, $4, $5, NOW())
       RETURNING id, status, created_at`,
      [userId, businessName, businessDescription, experience || null, 'pending']
    )

    const application = result.rows[0]

    return NextResponse.json({
      message: 'Application submitted successfully',
      application: {
        id: application.id,
        status: application.status,
        createdAt: application.created_at,
      },
    })
  } catch (error) {
    console.error('Error submitting agent application:', error)
    return NextResponse.json(
      { message: 'An error occurred while submitting your application' },
      { status: 500 }
    )
  }
}

// GET endpoint to check application status
export async function GET(request: NextRequest) {
  try {
    const userId = request.nextUrl.searchParams.get('userId')

    if (!userId) {
      return NextResponse.json(
        { message: 'User ID is required' },
        { status: 400 }
      )
    }

    const result = await pool.query(
      'SELECT id, status, created_at FROM agent_applications WHERE user_id = $1 ORDER BY created_at DESC LIMIT 1',
      [userId]
    )

    if (result.rows.length === 0) {
      return NextResponse.json({
        hasApplication: false,
      })
    }

    const application = result.rows[0]

    return NextResponse.json({
      hasApplication: true,
      application: {
        id: application.id,
        status: application.status,
        createdAt: application.created_at,
      },
    })
  } catch (error) {
    console.error('Error fetching application status:', error)
    return NextResponse.json(
      { message: 'An error occurred while fetching application status' },
      { status: 500 }
    )
  }
}
