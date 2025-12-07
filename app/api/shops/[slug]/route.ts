import { NextRequest, NextResponse } from 'next/server'
import { Pool } from 'pg'

const pool = new Pool({
  host: 'localhost',
  port: 5432,
  database: 'datahub_db',
  user: process.env.PGUSER,
  password: process.env.PGPASSWORD,
})

export async function GET(
  request: NextRequest,
  { params }: { params: { slug: string } }
) {
  try {
    const slug = params.slug

    // Get shop data
    const shopResult = await pool.query(
      'SELECT id, user_id, name, slug, description, owner_name FROM shops WHERE slug = $1',
      [slug]
    )

    if (shopResult.rows.length === 0) {
      return NextResponse.json(
        { message: 'Shop not found' },
        { status: 404 }
      )
    }

    const shop = shopResult.rows[0]

    // Get shop products
    const productsResult = await pool.query(
      'SELECT id, name, network, size, validity, base_price, profit_margin, selling_price FROM shop_products WHERE shop_id = $1 ORDER BY created_at DESC',
      [shop.id]
    )

    return NextResponse.json({
      shop,
      products: productsResult.rows,
    })
  } catch (error) {
    console.error('Error fetching shop:', error)
    return NextResponse.json(
      { message: 'An error occurred while fetching shop' },
      { status: 500 }
    )
  }
}
