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
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id: appId } = await params

    // Get the application with user details
    const appResult = await pool.query(
      `SELECT aa.user_id, aa.business_name, aa.business_description, u.username, u.name
       FROM agent_applications aa
       JOIN users u ON aa.user_id = u.id
       WHERE aa.id = $1`,
      [appId]
    )

    if (appResult.rows.length === 0) {
      return NextResponse.json(
        { message: 'Application not found' },
        { status: 404 }
      )
    }

    const { user_id: userId, business_name: businessName, business_description: businessDescription, username, name: ownerName } = appResult.rows[0]

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

    // Check if shop already exists
    const existingShop = await pool.query(
      'SELECT id FROM shops WHERE user_id = $1',
      [userId]
    )

    let shop = null

    // Create shop if it doesn't exist
    if (existingShop.rows.length === 0) {
      // Create slug from business name
      const slug = businessName
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-+|-+$/g, '')

      const shopResult = await pool.query(
        `INSERT INTO shops (user_id, username, name, slug, description, owner_name, business_name, business_description)
         VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
         RETURNING id, user_id, username, name, slug, description, owner_name, business_name, business_description`,
        [userId, username, businessName, slug, businessDescription || '', ownerName || '', businessName, businessDescription || '']
      )

      shop = shopResult.rows[0]
    } else {
      // Update existing shop with new business details
      const updateResult = await pool.query(
        `UPDATE shops 
         SET name = $1, business_name = $2, business_description = $3, description = $4, updated_at = CURRENT_TIMESTAMP
         WHERE user_id = $5
         RETURNING id, user_id, username, name, slug, description, owner_name, business_name, business_description`,
        [businessName, businessName, businessDescription || '', businessDescription || '', userId]
      )

      shop = updateResult.rows[0]
    }

    return NextResponse.json({
      message: 'Application approved successfully',
      shop,
    })
  } catch (error) {
    console.error('Error approving application:', error)
    return NextResponse.json(
      { message: 'An error occurred while approving the application' },
      { status: 500 }
    )
  }
}
