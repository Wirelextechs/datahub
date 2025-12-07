import { NextRequest, NextResponse } from 'next/server'

// Mock shop data for demonstration
const MOCK_SHOPS: Record<string, { shop: Record<string, unknown>; products: Record<string, unknown>[] }> = {
  'prosperwedam': {
    shop: {
      id: 1,
      user_id: 1,
      name: "Prosper's Data Shop",
      username: 'prosperwedam',
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
    ],
  },
  'prosper-wedam-data-shop': {
    shop: {
      id: 1,
      user_id: 1,
      name: "Prosper's Data Shop",
      username: 'prosperwedam',
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
    ],
  },
}

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params

  try {
    // For now, always use mock data since Vercel doesn't have database access
    // In production, you would connect to a cloud database like Supabase, Neon, or AWS RDS
    
    // Handle both @username and username formats
    let lookupKey = slug
    if (slug.startsWith('@')) {
      lookupKey = slug.substring(1)
    }
    
    if (MOCK_SHOPS[lookupKey]) {
      return NextResponse.json(MOCK_SHOPS[lookupKey])
    }

    return NextResponse.json(
      { message: 'Shop not found' },
      { status: 404 }
    )
  } catch (error) {
    console.error('Error in GET handler:', error)
    
    // Always try to return mock data as fallback
    let lookupKey = slug
    if (slug.startsWith('@')) {
      lookupKey = slug.substring(1)
    }
    
    if (MOCK_SHOPS[lookupKey]) {
      return NextResponse.json(MOCK_SHOPS[lookupKey])
    }

    return NextResponse.json(
      { message: 'Shop not found' },
      { status: 404 }
    )
  }
}
