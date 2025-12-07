import { NextRequest, NextResponse } from 'next/server'

// Mock shop data for demonstration
const MOCK_SHOPS: Record<string, any> = {
  'prosper-wedam-data-shop': {
    shop: {
      id: 1,
      user_id: 1,
      name: "Prosper's Data Shop",
      slug: 'prosper-wedam-data-shop',
      description: 'Quality data packages at affordable prices',
      owner_name: 'Prosper Wedam',
    },
    products: [
      {
        id: 1,
        name: '1GB Data Package',
        network: 'MTN',
        size: '1GB',
        validity: 'NON EXPIRE',
        base_price: '4.55',
        profit_margin: '0.45',
        selling_price: '5.00',
      },
      {
        id: 2,
        name: '2GB Data Package',
        network: 'MTN',
        size: '2GB',
        validity: 'NON EXPIRE',
        base_price: '9.09',
        profit_margin: '0.91',
        selling_price: '10.00',
      },
      {
        id: 3,
        name: '3GB Data Package',
        network: 'AirtelTigo',
        size: '3GB',
        validity: 'NON EXPIRE',
        base_price: '13.64',
        profit_margin: '1.36',
        selling_price: '15.00',
      },
      {
        id: 4,
        name: '5GB Data Package',
        network: 'Telecel',
        size: '5GB',
        validity: 'NON EXPIRE',
        base_price: '22.73',
        profit_margin: '2.27',
        selling_price: '25.00',
      },
      {
        id: 5,
        name: '1GB Data Package',
        network: 'MTN',
        size: '1GB',
        validity: 'NON EXPIRE',
        base_price: '4.55',
        profit_margin: '0.75',
        selling_price: '5.30',
      },
    ],
  },
}

let pool: any = null

// Try to initialize the database pool if credentials are available
if (process.env.PGUSER && process.env.PGPASSWORD) {
  try {
    const { Pool } = require('pg')
    pool = new Pool({
      host: 'localhost',
      port: 5432,
      database: process.env.PGDATABASE || 'datahub_db',
      user: process.env.PGUSER,
      password: process.env.PGPASSWORD,
    })
  } catch (error) {
    console.log('Database pool initialization skipped')
  }
}

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params

    // Try to fetch from database first
    if (pool) {
      try {
        // Get shop data
        const shopResult = await pool.query(
          'SELECT id, user_id, name, slug, description, owner_name FROM shops WHERE slug = $1',
          [slug]
        )

        if (shopResult.rows.length > 0) {
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
        }
      } catch (dbError) {
        console.log('Database query failed, falling back to mock data:', dbError)
      }
    }

    // Fall back to mock data
    if (MOCK_SHOPS[slug]) {
      return NextResponse.json(MOCK_SHOPS[slug])
    }

    return NextResponse.json(
      { message: 'Shop not found' },
      { status: 404 }
    )
  } catch (error) {
    console.error('Error fetching shop:', error)
    return NextResponse.json(
      { message: 'An error occurred while fetching shop' },
      { status: 500 }
    )
  }
}
