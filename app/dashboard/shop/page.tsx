'use client'

import { useState, useEffect } from 'react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Copy, ExternalLink, Settings } from 'lucide-react'

interface Shop {
  id: number
  user_id: number
  name: string
  username: string
  description?: string
  owner_name?: string
}

export default function ShopPage() {
  const [shop, setShop] = useState<Shop | null>(null)
  const [loading, setLoading] = useState(true)
  const [copied, setCopied] = useState(false)
  const [shopName, setShopName] = useState('')
  const [shopDescription, setShopDescription] = useState('')
  const [isSaving, setIsSaving] = useState(false)
  const [saveMessage, setSaveMessage] = useState('')

  useEffect(() => {
    // For now, use demo shop data
    const demoShop: Shop = {
      id: 1,
      user_id: 1,
      name: "Prosper's Data Shop",
      username: 'prosperwedam',
      description: 'Quality data packages at affordable prices',
      owner_name: 'Prosper Wedam',
    }
    setShop(demoShop)
    setShopName(demoShop.name)
    setShopDescription(demoShop.description || '')
    setLoading(false)
  }, [])

  const handleShopNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newName = e.target.value
    setShopName(newName)
  }

  const handleShopDescriptionChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setShopDescription(e.target.value)
  }

  // Shop link uses username (permanent)
  const shopLink = shop?.username 
    ? `${typeof window !== 'undefined' ? window.location.origin : 'https://datahub-kohl.vercel.app'}/shop/@${shop.username}` 
    : ''

  const copyToClipboard = () => {
    if (shopLink) {
      navigator.clipboard.writeText(shopLink)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

  const handleSaveChanges = async () => {
    setIsSaving(true)
    try {
      // TODO: Implement API call to save shop changes
      // For now, just update the local state
      if (shop) {
        setShop({
          ...shop,
          name: shopName,
          description: shopDescription,
        })
      }
      
      setSaveMessage('✓ Shop updated successfully!')
      
      // Clear message after 3 seconds
      setTimeout(() => {
        setSaveMessage('')
      }, 3000)
      
      setIsSaving(false)
    } catch (error) {
      console.error('Error saving shop:', error)
      setSaveMessage('✗ Failed to update shop. Please try again.')
      setIsSaving(false)
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

      {/* Save Message */}
      {saveMessage && (
        <Card className={`p-4 border-0 shadow-md border-l-4 ${saveMessage.includes('✓') ? 'bg-green-50 border-green-500' : 'bg-red-50 border-red-500'}`}>
          <p className={saveMessage.includes('✓') ? 'text-green-700 font-medium' : 'text-red-700 font-medium'}>{saveMessage}</p>
        </Card>
      )}

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
            <p className="text-sm text-green-600 mt-2">✓ Copied to clipboard!</p>
          )}
          <p className="text-xs text-gray-500 mt-2">
            Your shop username is <span className="font-mono font-bold">@{shop?.username}</span> and cannot be changed
          </p>
        </div>
      </Card>

      <Card className="p-8 border-0 shadow-md">
        <h3 className="text-xl font-bold text-gray-900 mb-6">Shop Settings</h3>
        
        <div className="space-y-6">
          {/* Shop Name */}
          <div>
            <label className="text-sm font-medium text-gray-700">Shop Name (Storefront Hero Name)</label>
            <input
              type="text"
              value={shopName}
              onChange={handleShopNameChange}
              placeholder="Enter your shop name"
              className="w-full mt-2 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <p className="text-xs text-gray-500 mt-2">This is the name displayed on your shop storefront and can be changed anytime</p>
          </div>

          {/* Shop Description */}
          <div>
            <label className="text-sm font-medium text-gray-700">Shop Description</label>
            <textarea
              value={shopDescription}
              onChange={handleShopDescriptionChange}
              placeholder="Describe your shop and the data you offer"
              rows={4}
              className="w-full mt-2 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Save Button */}
          <div className="flex gap-3 pt-6">
            <Button
              onClick={handleSaveChanges}
              disabled={isSaving}
              className="bg-blue-600 hover:bg-blue-700 text-white"
            >
              {isSaving ? 'Saving...' : 'Save Changes'}
            </Button>
          </div>
        </div>
      </Card>

      {/* Shop Info Card */}
      <Card className="p-6 border-0 shadow-md bg-blue-50 border-l-4 border-blue-500">
        <h3 className="text-lg font-bold text-gray-900 mb-4">Shop Information</h3>
        <div className="space-y-3 text-sm text-gray-700">
          <div>
            <p className="font-semibold text-gray-900">Shop Username (Permanent)</p>
            <p className="text-gray-600">@{shop?.username}</p>
          </div>
          <div>
            <p className="font-semibold text-gray-900">Shop Name</p>
            <p className="text-gray-600">{shopName}</p>
          </div>
          <div>
            <p className="font-semibold text-gray-900">Owner</p>
            <p className="text-gray-600">{shop?.owner_name}</p>
          </div>
        </div>
      </Card>
    </div>
  )
}
