'use client'

import { useState, useEffect } from 'react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Copy, ExternalLink } from 'lucide-react'

interface Shop {
  id: number
  user_id: number
  name: string
  slug: string
  description?: string
  owner_name?: string
}

export default function ShopLink() {
  const [shop, setShop] = useState<Shop | null>(null)
  const [copied, setCopied] = useState(false)
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
    // For now, set a demo shop
    const demoShop: Shop = {
      id: 1,
      user_id: 1,
      name: "Prosper's Data Shop",
      slug: 'prosper-wedam-data-shop',
      description: 'Quality data packages at affordable prices',
      owner_name: 'Prosper Wedam',
    }
    setShop(demoShop)
  }, [])

  if (!isClient) {
    return null
  }

  const shopUrl = shop ? `${window.location.origin}/shop/${shop.slug}` : ''

  const copyToClipboard = () => {
    if (shopUrl) {
      navigator.clipboard.writeText(shopUrl)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

  return (
    <Card className="p-6 bg-gradient-to-br from-blue-50 to-indigo-50 border-blue-200 mb-8">
      <div className="space-y-4">
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            🏪 Your Shop Link
          </h3>
          <p className="text-sm text-gray-600 mb-4">
            Share this unique link with customers to access your data shop
          </p>
        </div>

        <div className="flex gap-2">
          <Input
            type="text"
            value={shopUrl}
            readOnly
            className="bg-white border-blue-200 text-gray-900 font-mono text-sm"
          />
          <Button
            onClick={copyToClipboard}
            variant="outline"
            size="sm"
            className="whitespace-nowrap"
          >
            <Copy className="w-4 h-4 mr-2" />
            {copied ? 'Copied!' : 'Copy'}
          </Button>
          <Button
            onClick={() => window.open(shopUrl, '_blank')}
            size="sm"
            className="whitespace-nowrap bg-blue-600 hover:bg-blue-700 text-white"
          >
            <ExternalLink className="w-4 h-4 mr-2" />
            Visit
          </Button>
        </div>

        {shop && (
          <div className="pt-4 border-t border-blue-200">
            <p className="text-xs text-gray-600">
              <strong>Shop Name:</strong> {shop.name}
            </p>
            <p className="text-xs text-gray-600 mt-1">
              <strong>Shop Slug:</strong> {shop.slug}
            </p>
          </div>
        )}
      </div>
    </Card>
  )
}
