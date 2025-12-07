'use client'

import { useState, useEffect } from 'react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Copy, ExternalLink, AlertCircle } from 'lucide-react'
import { Alert, AlertDescription } from '@/components/ui/alert'

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
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    fetchShop()
  }, [])

  const fetchShop = async () => {
    try {
      setLoading(true)
      const token = localStorage.getItem('token')
      const user = localStorage.getItem('user')

      if (!token || !user) {
        setError('User not authenticated')
        setLoading(false)
        return
      }

      const userData = JSON.parse(user)
      const response = await fetch('/api/shops', {
        headers: {
          'x-user-id': userData.id.toString(),
        },
      })

      if (response.status === 404) {
        // Shop doesn't exist, create one with default values
        const shopSlug = userData.name
          .toLowerCase()
          .replace(/\s+/g, '-')
          .replace(/[^a-z0-9-]/g, '')

        const createResponse = await fetch('/api/shops', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            userId: userData.id,
            name: `${userData.name}'s Data Shop`,
            slug: shopSlug || 'my-data-shop',
            description: 'Quality data packages at affordable prices',
            ownerName: userData.name,
          }),
        })

        if (createResponse.ok) {
          const newShop = await createResponse.json()
          setShop(newShop)
        } else {
          setError('Failed to create shop')
        }
      } else if (response.ok) {
        const shopData = await response.json()
        setShop(shopData)
      } else {
        setError('Failed to fetch shop')
      }
    } catch (err) {
      console.error('Error fetching shop:', err)
      setError('An error occurred while fetching shop')
    } finally {
      setLoading(false)
    }
  }

  const shopUrl = shop ? `${window.location.origin}/shop/${shop.slug}` : ''

  const copyToClipboard = () => {
    if (shopUrl) {
      navigator.clipboard.writeText(shopUrl)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

  if (loading) {
    return (
      <Card className="p-6 bg-gradient-to-br from-blue-50 to-indigo-50 border-blue-200">
        <div className="animate-pulse">
          <div className="h-4 bg-blue-200 rounded w-1/4 mb-4"></div>
          <div className="h-10 bg-blue-200 rounded w-full"></div>
        </div>
      </Card>
    )
  }

  if (error) {
    return (
      <Alert variant="destructive">
        <AlertCircle className="h-4 w-4" />
        <AlertDescription>{error}</AlertDescription>
      </Alert>
    )
  }

  return (
    <Card className="p-6 bg-gradient-to-br from-blue-50 to-indigo-50 border-blue-200">
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
