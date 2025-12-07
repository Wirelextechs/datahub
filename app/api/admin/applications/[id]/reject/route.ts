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

    // Update application status
    await pool.query(
      'UPDATE agent_applications SET status = $1 WHERE id = $2',
      ['rejected', appId]
    )

    return NextResponse.json({
      message: 'Application rejected successfully',
    })
  } catch (error) {
    console.error('Error rejecting application:', error)
    return NextResponse.json(
      { message: 'An error occurred while rejecting the application' },
      { status: 500 }
    )
  }
}
