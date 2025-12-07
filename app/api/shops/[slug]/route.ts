import { NextRequest, NextResponse } from 'next/server'
import { Pool } from 'pg'

const pool = new Pool({
  host: 'localhost',
  port: 5432,
  database: 'datahub_db',
  user: process.env.PGUSER,
  password: process.env.PGPASSWORD,
})

// Mock products for demonstration
const MOCK_PRODUCTS = [
  {
    id: 1,
    name: '1GB Data Package',
    network: 'MTN',
    size: '1GB',
    validity: 'NON EXPIRE',
    base_price: 4.55,
    profit_margin: 0.45,
    selling_price: 5.00,
  },
  {
    id: 2,
    name: '2GB Data Package',
    network: 'MTN',
    size: '2GB',
    validity: 'NON EXPIRE',
    base_price: 9.09,
    profit_margin: 0.91,
    selling_price: 10.00,
  },
  {
    id: 3,
    name: '3GB Data Package',
    network: 'AirtelTigo',
    size: '3GB',
    validity: 'NON EXPIRE',
    base_price: 13.64,
    profit_margin: 1.36,
    selling_price: 15.00,
  },
  {
    id: 4,
    name: '5GB Data Package',
    network: 'Telecel',
    size: '5GB',
    validity: 'NON EXPIRE',
    base_price: 22.73,
    profit_margin: 2.27,
    selling_price: 25.00,
  },
  {
    id: 5,
    name: '1GB Data Package',
    network: 'MTN',
    size: '1GB',
    validity: 'NON EXPIRE',
    base_price: 4.55,
    profit_margin: 0.75,
    selling_price: 5.30,
  },
]

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params

  try {
    // Handle both @username and username formats
    let lookupKey = slug
    if (slug.startsWith('@')) {
      lookupKey = slug.substring(1)
    }

    // Try to fetch from database first
    const shopResult = await pool.query(
      `SELECT id, user_id, username, name, slug, description, owner_name, business_name, business_description, created_at
       FROM shops
       WHERE username = $1 OR slug = $2`,
      [lookupKey, lookupKey]
    )

    if (shopResult.rows.length === 0) {
      return NextResponse.json(
        { message: 'Shop not found' },
        { status: 404 }
      )
    }

    const shop = shopResult.rows[0]

    // Return shop with mock products
    return NextResponse.json({
      shop: {
        id: shop.id,
        user_id: shop.user_id,
        name: shop.name || shop.business_name,
        username: shop.username,
        slug: shop.slug,
        description: shop.description || shop.business_description,
        owner_name: shop.owner_name,
        business_name: shop.business_name,
        business_description: shop.business_description,
      },
      products: MOCK_PRODUCTS,
    })
  } catch (error) {
    console.error('Error fetching shop:', error)
    return NextResponse.json(
      { message: 'An error occurred while fetching the shop' },
      { status: 500 }
    )
  }
}
