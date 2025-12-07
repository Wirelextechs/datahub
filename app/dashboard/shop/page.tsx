'use client'

import { useState, useEffect } from 'react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Copy, ExternalLink, Settings } from 'lucide-react'

interface Shop {
  id: number
  user_id: number
  name: string
  slug: string
  description?: string
  owner_name?: string
}

export default function ShopPage() {
  const [shop, setShop] = useState<Shop | null>(null)
  const [loading, setLoading] = useState(true)
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    // For now, use demo shop data
    const demoShop: Shop = {
      id: 1,
      user_id: 1,
      name: "Prosper's Data Shop",
      slug: 'prosper-wedam-data-shop',
      description: 'Quality data packages at affordable prices',
      owner_name: 'Prosper Wedam',
    }
    setShop(demoShop)
    setLoading(false)
  }, [])

  const shopLink = shop ? `${typeof window !== 'undefined' ? window.location.origin : 'https://datahub-kohl.vercel.app'}/shop/${shop.slug}` : ''

  const copyToClipboard = () => {
    if (shopLink) {
      navigator.clipboard.writeText(shopLink)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

  if (loading) {
    return (
      <div className="space-y-8">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-1/4 mb-4"></div>
          <div className="h-4 bg-gray-200 rounded w-1/2"></div>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">My Shop</h1>
        <p className="text-gray-600">Manage your personal data shop and storefront</p>
      </div>

      <Card className="p-8 border-0 shadow-md bg-gradient-to-br from-blue-50 to-purple-50">
        <div className="mb-6">
          <p className="text-sm text-gray-600 mb-2">Your Shop Link</p>
          <div className="flex items-center gap-2 bg-white p-4 rounded-lg border border-gray-200">
            <input
              type="text"
              value={shopLink}
              readOnly
              className="flex-1 bg-transparent text-gray-900 font-medium outline-none text-sm"
            />
            <Button 
              size="sm" 
              variant="ghost" 
              className="text-blue-600 hover:text-blue-700"
              onClick={copyToClipboard}
              title="Copy shop link"
            >
              <Copy className="w-4 h-4" />
            </Button>
            <Button 
              size="sm" 
              variant="ghost" 
              className="text-blue-600 hover:text-blue-700"
              onClick={() => window.open(shopLink, '_blank')}
              title="Visit shop"
            >
              <ExternalLink className="w-4 h-4" />
            </Button>
          </div>
          {copied && (
            <p className="text-xs text-green-600 mt-2">✓ Link copied to clipboard!</p>
          )}
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <p className="text-xs text-gray-600 mb-1">Shop Status</p>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              <span className="font-semibold text-gray-900">Active</span>
            </div>
          </div>
          <div>
            <p className="text-xs text-gray-600 mb-1">Shop Slug</p>
            <p className="font-semibold text-gray-900">{shop?.slug}</p>
          </div>
        </div>
      </Card>

      <Card className="p-6 border-0 shadow-md">
        <h3 className="text-lg font-bold text-gray-900 mb-4">Shop Customization</h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Shop Name</label>
            <input
              type="text"
              placeholder="Enter your shop name"
              defaultValue={shop?.name}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Shop Description</label>
            <textarea
              placeholder="Describe your shop"
              defaultValue={shop?.description}
              rows={4}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <Button className="bg-blue-600 hover:bg-blue-700 text-white">
            <Settings className="mr-2 w-4 h-4" />
            Save Changes
          </Button>
        </div>
      </Card>

      <Card className="p-6 border-0 shadow-md">
        <h3 className="text-lg font-bold text-gray-900 mb-4">Shop Statistics</h3>
        <div className="grid md:grid-cols-3 gap-4">
          <div className="p-4 bg-blue-50 rounded-lg">
            <p className="text-sm text-gray-600 mb-1">Total Visits</p>
            <p className="text-3xl font-bold text-blue-600">1,234</p>
          </div>
          <div className="p-4 bg-green-50 rounded-lg">
            <p className="text-sm text-gray-600 mb-1">Total Sales</p>
            <p className="text-3xl font-bold text-green-600">156</p>
          </div>
          <div className="p-4 bg-purple-50 rounded-lg">
            <p className="text-sm text-gray-600 mb-1">Conversion Rate</p>
            <p className="text-3xl font-bold text-purple-600">12.6%</p>
          </div>
        </div>
      </Card>
    </div>
  )
}
