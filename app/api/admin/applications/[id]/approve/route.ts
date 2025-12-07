import { NextRequest, NextResponse } from 'next/server'
import { Pool } from 'pg'

const pool = new Pool({
  host: 'localhost',
  port: 5432,
  database: 'datahub_db',
  user: process.env.PGUSER,
  password: process.env.PGPASSWORD,
})

export async function POST(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const appId = params.id

    // Get the application
    const appResult = await pool.query(
      'SELECT user_id FROM agent_applications WHERE id = $1',
      [appId]
    )

    if (appResult.rows.length === 0) {
      return NextResponse.json(
        { message: 'Application not found' },
        { status: 404 }
      )
    }

    const userId = appResult.rows[0].user_id

    // Update application status
    await pool.query(
      'UPDATE agent_applications SET status = $1 WHERE id = $2',
      ['approved', appId]
    )

    // Update user to approved agent
    await pool.query(
      'UPDATE users SET is_approved_agent = true, account_type = $1 WHERE id = $2',
      ['agent', userId]
    )

    return NextResponse.json({
      message: 'Application approved successfully',
    })
  } catch (error) {
    console.error('Error approving application:', error)
    return NextResponse.json(
      { message: 'An error occurred while approving the application' },
      { status: 500 }
    )
  }
}
