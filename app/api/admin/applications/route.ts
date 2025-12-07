import { NextRequest, NextResponse } from 'next/server'
import { Pool } from 'pg'

const pool = new Pool({
  host: 'localhost',
  port: 5432,
  database: 'datahub_db',
  user: process.env.PGUSER,
  password: process.env.PGPASSWORD,
})

export async function GET(request: NextRequest) {
  try {
    const result = await pool.query(
      `SELECT 
        aa.id,
        aa.user_id,
        aa.business_name,
        aa.business_description,
        aa.experience,
        aa.status,
        aa.created_at,
        u.email as user_email,
        u.name as user_name
      FROM agent_applications aa
      LEFT JOIN users u ON aa.user_id = u.id
      ORDER BY aa.created_at DESC`
    )

    return NextResponse.json({
      applications: result.rows,
    })
  } catch (error) {
    console.error('Error fetching applications:', error)
    return NextResponse.json(
      { message: 'An error occurred while fetching applications' },
      { status: 500 }
    )
  }
}
