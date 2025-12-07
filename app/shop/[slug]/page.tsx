'use client'

import { useState, useEffect, useCallback } from 'react'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { ShoppingCart, Check, Phone, Mail, AlertCircle } from 'lucide-react'
import { Alert, AlertDescription } from '@/components/ui/alert'

interface Product {
  id: string | number
  name: string
  network: string
  size: string
  validity: string
  base_price: number
  profit_margin: number
  selling_price: number
}

interface Shop {
  id: number
  user_id: number
  name: string
  slug: string
  description?: string
  owner_name?: string
}

interface BuyFormData {
  beneficiaryNumber: string
  email: string
  productId: string | number
}

// Ghana network-specific validation patterns
const NETWORK_PATTERNS: Record<string, { prefixes: string[]; length: number; description: string }> = {
  MTN: {
    prefixes: ['024', '025', '053', '054', '055', '059'],
    length: 10,
    description: 'MTN numbers start with 024, 025, 053, 054, 055, or 059 (e.g., 0241234567)',
  },
  AirtelTigo: {
    prefixes: ['027', '057', '026', '056'],
    length: 10,
    description: 'AirtelTigo numbers start with 027, 057, 026, or 056 (e.g., 0271234567)',
  },
  Telecel: {
    prefixes: ['020', '050'],
    length: 10,
    description: 'Telecel numbers start with 020 or 050 (e.g., 0201234567)',
  },
}

export default function PublicShopPage({ params }: { params: { slug: string } }) {
  const [shop, setShop] = useState<Shop | null>(null)
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)
  const [formData, setFormData] = useState<BuyFormData>({
    beneficiaryNumber: '',
    email: '',
    productId: '',
  })
  const [isProcessing, setIsProcessing] = useState(false)
  const [successMessage, setSuccessMessage] = useState('')
  const [errorMessage, setErrorMessage] = useState('')

  const fetchShopData = useCallback(async () => {
    try {
      setLoading(true)
      const response = await fetch(`/api/shops/${params.slug}`)

      if (!response.ok) {
        setError('Shop not found')
        setLoading(false)
        return
      }

      const data = await response.json()
      setShop(data.shop)
      setProducts(data.products || [])
    } catch {
      console.error('Error fetching shop')
      setError('Failed to load shop')
    } finally {
      setLoading(false)
    }
  }, [params.slug])

  useEffect(() => {
    fetchShopData()
  }, [fetchShopData])

  const validateBeneficiaryNumber = (number: string, network: string): { valid: boolean; error?: string } => {
    if (!number.trim()) {
      return { valid: false, error: 'Please enter a beneficiary number' }
    }

    if (number.startsWith('+') || number.startsWith('00') || number.startsWith('233')) {
      return {
        valid: false,
        error: 'Do not include country code (+233 or 00)',
      }
    }

    const patterns = NETWORK_PATTERNS[network]
    if (!patterns) {
      return { valid: false, error: 'Invalid network' }
    }

    const hasValidPrefix = patterns.prefixes.some((prefix) => number.startsWith(prefix))
    if (!hasValidPrefix) {
      return {
        valid: false,
        error: `Invalid ${network} number. Must start with ${patterns.prefixes.join(', ')}`,
      }
    }

    if (number.length !== patterns.length) {
      return {
        valid: false,
        error: `${network} number must be ${patterns.length} digits`,
      }
    }

    return { valid: true }
  }

  const handleBeneficiaryNumberChange = (value: string) => {
    const cleaned = value.replace(/\s/g, '')
    setFormData({ ...formData, beneficiaryNumber: cleaned })
  }

  const handleProceedToPayment = async () => {
    if (!selectedProduct) return

    const validation = validateBeneficiaryNumber(formData.beneficiaryNumber, selectedProduct.network)
    if (!validation.valid) {
      setErrorMessage(validation.error || 'Invalid beneficiary number')
      return
    }

    if (!formData.email || !formData.email.includes('@')) {
      setErrorMessage('Please enter a valid email address')
      return
    }

    setIsProcessing(true)
    try {
      // Simulate payment processing
      await new Promise((resolve) => setTimeout(resolve, 2000))

      setSuccessMessage('✓ Payment successful! Your data will be delivered shortly.')
      setTimeout(() => {
        setFormData({ beneficiaryNumber: '', email: '', productId: '' })
        setSuccessMessage('')
        setSelectedProduct(null)
      }, 2000)
    } catch {
      setErrorMessage('Payment failed. Please try again.')
    } finally {
      setIsProcessing(false)
    }
  }

  const getNetworkColor = (network: string) => {
    switch (network) {
      case 'MTN':
        return 'from-yellow-400 to-yellow-600'
      case 'AirtelTigo':
        return 'from-blue-400 to-blue-600'
      case 'Telecel':
        return 'from-red-400 to-red-600'
      default:
        return 'from-gray-400 to-gray-600'
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto mb-4"></div>
          <p className="text-gray-400">Loading shop...</p>
        </div>
      </div>
    )
  }

  if (error || !shop) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-white mb-4">Shop Not Found</h1>
          <p className="text-gray-400">The shop you&apos;re looking for doesn&apos;t exist.</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-12 px-4">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-4xl font-bold mb-2">{shop.name}</h1>
          <p className="text-blue-100">{shop.description}</p>
          <p className="text-sm text-blue-200 mt-2">Owned by {shop.owner_name}</p>
        </div>
      </div>

      {/* Products Grid */}
      <div className="max-w-6xl mx-auto px-4 py-12">
        {products.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-400 text-lg">No products available in this shop yet.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map((product) => (
              <Card key={product.id} className="p-6 bg-slate-800 border-slate-700 hover:border-blue-500 transition-all">
                <div className="flex items-start justify-between mb-4">
                  <Badge className={`bg-gradient-to-r ${getNetworkColor(product.network)} text-white`}>
                    {product.network}
                  </Badge>
                </div>

                <h3 className="text-xl font-bold text-white mb-4">{product.name}</h3>

                <div className="space-y-3 mb-6">
                  <div>
                    <p className="text-xs text-gray-400 mb-1">Size</p>
                    <p className="text-2xl font-bold text-gray-100">{product.size}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-400 mb-1">Price</p>
                    <p className="text-2xl font-bold text-gray-900">GHS {product.selling_price.toFixed(2)}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-400 mb-1">Validity</p>
                    <p className="text-sm font-medium text-gray-100">{product.validity}</p>
                  </div>
                </div>

                <Dialog>
                  <DialogTrigger asChild>
                    <Button
                      onClick={() => {
                        setSelectedProduct(product)
                        setFormData({ ...formData, productId: product.id })
                        setErrorMessage('')
                        setSuccessMessage('')
                      }}
                      className={`w-full bg-gradient-to-r ${getNetworkColor(product.network)} ${
                        product.network === 'MTN' ? 'text-black hover:from-yellow-500 hover:to-yellow-600' : 'text-white'
                      } font-semibold rounded-lg`}
                    >
                      <ShoppingCart className="mr-2 w-4 h-4" />
                      Buy Package
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-md">
                    <DialogHeader>
                      <DialogTitle>Buy {selectedProduct?.size} Package</DialogTitle>
                      <DialogDescription>Enter your details to proceed with the purchase</DialogDescription>
                    </DialogHeader>

                    <div className="space-y-4">
                      {/* Error Message */}
                      {errorMessage && (
                        <Alert variant="destructive">
                          <AlertCircle className="h-4 w-4" />
                          <AlertDescription>{errorMessage}</AlertDescription>
                        </Alert>
                      )}

                      {/* Success Message */}
                      {successMessage && (
                        <Alert className="bg-green-50 border-green-200">
                          <Check className="h-4 w-4 text-green-600" />
                          <AlertDescription className="text-green-800">{successMessage}</AlertDescription>
                        </Alert>
                      )}

                      {/* Beneficiary Number Input */}
                      <div>
                        <Label htmlFor="beneficiary" className="flex items-center gap-2">
                          <Phone className="w-4 h-4" />
                          Beneficiary Number
                        </Label>
                        <Input
                          id="beneficiary"
                          type="tel"
                          placeholder={`e.g., ${NETWORK_PATTERNS[selectedProduct?.network as keyof typeof NETWORK_PATTERNS]?.prefixes[0]}1234567`}
                          value={formData.beneficiaryNumber}
                          onChange={(e) => handleBeneficiaryNumberChange(e.target.value)}
                          className="mt-1"
                          disabled={isProcessing}
                          maxLength={10}
                        />
                        <p className="text-xs text-gray-500 mt-1">
                          ✓ Spaces will be automatically removed
                          <br />
                          ✗ Do not include country code (+233 or 00)
                        </p>
                      </div>

                      {/* Email Input */}
                      <div>
                        <Label htmlFor="email" className="flex items-center gap-2">
                          <Mail className="w-4 h-4" />
                          Email Address
                        </Label>
                        <Input
                          id="email"
                          type="email"
                          placeholder="Enter your email"
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          className="mt-1"
                          disabled={isProcessing}
                        />
                        <p className="text-xs text-gray-500 mt-1">
                          We&apos;ll send the receipt and confirmation to this email
                        </p>
                      </div>

                      {/* Action Buttons */}
                      <div className="flex gap-2 pt-4">
                        <Button
                          onClick={handleProceedToPayment}
                          disabled={isProcessing}
                          className="flex-1 bg-blue-600 hover:bg-blue-700 text-white"
                        >
                          {isProcessing ? 'Processing...' : 'Proceed to Payment'}
                        </Button>
                        <Button
                          variant="outline"
                          disabled={isProcessing}
                          className="flex-1"
                        >
                          Cancel
                        </Button>
                      </div>
                    </div>
                  </DialogContent>
                </Dialog>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
