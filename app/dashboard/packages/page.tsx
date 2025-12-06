'use client'

import { useState } from 'react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { ShoppingCart, Zap, Check, Phone, Mail, AlertCircle, Info } from 'lucide-react'
import { Alert, AlertDescription } from '@/components/ui/alert'

interface Package {
  size: string
  price: string
  validity: string
  priceValue: number
}

interface BuyFormData {
  beneficiaryNumber: string
  email: string
}

// Network-specific validation patterns
const NETWORK_PATTERNS: Record<string, { prefix: string; length: number; description: string }> = {
  mtn: {
    prefix: '05',
    length: 10,
    description: 'MTN numbers start with 05 (e.g., 0501234567)',
  },
  at: {
    prefix: '02',
    length: 10,
    description: 'AirtelTigo numbers start with 02 (e.g., 0201234567)',
  },
  telecel: {
    prefix: '02',
    length: 10,
    description: 'Telecel numbers start with 02 (e.g., 0201234567)',
  },
}

export default function PackagesPage() {
  const [selectedNetwork, setSelectedNetwork] = useState('mtn')
  const [selectedPackage, setSelectedPackage] = useState<Package | null>(null)
  const [isBuyDialogOpen, setIsBuyDialogOpen] = useState(false)
  const [formData, setFormData] = useState<BuyFormData>({
    beneficiaryNumber: '',
    email: '',
  })
  const [isProcessing, setIsProcessing] = useState(false)
  const [successMessage, setSuccessMessage] = useState('')
  const [errorMessage, setErrorMessage] = useState('')

  const packages = {
    mtn: [
      { size: '1GB', price: 'GHS 5.00', validity: 'NON EXPIRE', priceValue: 5.0 },
      { size: '2GB', price: 'GHS 10.00', validity: 'NON EXPIRE', priceValue: 10.0 },
      { size: '3GB', price: 'GHS 15.00', validity: 'NON EXPIRE', priceValue: 15.0 },
      { size: '4GB', price: 'GHS 20.00', validity: 'NON EXPIRE', priceValue: 20.0 },
      { size: '5GB', price: 'GHS 25.00', validity: 'NON EXPIRE', priceValue: 25.0 },
      { size: '10GB', price: 'GHS 45.00', validity: 'NON EXPIRE', priceValue: 45.0 },
    ],
    at: [
      { size: '1GB', price: 'GHS 4.50', validity: 'NON EXPIRE', priceValue: 4.5 },
      { size: '2GB', price: 'GHS 9.00', validity: 'NON EXPIRE', priceValue: 9.0 },
      { size: '3GB', price: 'GHS 13.50', validity: 'NON EXPIRE', priceValue: 13.5 },
      { size: '4GB', price: 'GHS 18.00', validity: 'NON EXPIRE', priceValue: 18.0 },
      { size: '5GB', price: 'GHS 22.50', validity: 'NON EXPIRE', priceValue: 22.5 },
      { size: '10GB', price: 'GHS 40.00', validity: 'NON EXPIRE', priceValue: 40.0 },
    ],
    telecel: [
      { size: '1GB', price: 'GHS 5.50', validity: 'NON EXPIRE', priceValue: 5.5 },
      { size: '2GB', price: 'GHS 11.00', validity: 'NON EXPIRE', priceValue: 11.0 },
      { size: '3GB', price: 'GHS 16.50', validity: 'NON EXPIRE', priceValue: 16.5 },
      { size: '4GB', price: 'GHS 22.00', validity: 'NON EXPIRE', priceValue: 22.0 },
      { size: '5GB', price: 'GHS 27.50', validity: 'NON EXPIRE', priceValue: 27.5 },
      { size: '10GB', price: 'GHS 50.00', validity: 'NON EXPIRE', priceValue: 50.0 },
    ],
  }

  const getNetworkColor = (network: string) => {
    switch (network) {
      case 'mtn':
        return 'from-yellow-400 to-yellow-500'
      case 'at':
        return 'from-blue-500 to-blue-600'
      case 'telecel':
        return 'from-red-500 to-red-600'
      default:
        return 'from-gray-500 to-gray-600'
    }
  }

  const getNetworkTextColor = (network: string) => {
    switch (network) {
      case 'mtn':
        return 'text-black'
      case 'at':
        return 'text-white'
      case 'telecel':
        return 'text-white'
      default:
        return 'text-white'
    }
  }

  const getNetworkDisplayName = (network: string) => {
    switch (network) {
      case 'mtn':
        return 'MTN'
      case 'at':
        return 'AirtelTigo (AT)'
      case 'telecel':
        return 'Telecel'
      default:
        return network
    }
  }

  // Validate beneficiary number based on network
  const validateBeneficiaryNumber = (number: string, network: string): { valid: boolean; error?: string } => {
    if (!number.trim()) {
      return { valid: false, error: 'Please enter a beneficiary number' }
    }

    // Check for country code (starts with +, 00, or 233)
    if (number.startsWith('+') || number.startsWith('00') || number.startsWith('233')) {
      return {
        valid: false,
        error: 'Please remove the country code. Enter only the local number (e.g., 0501234567)',
      }
    }

    const networkPattern = NETWORK_PATTERNS[network as keyof typeof NETWORK_PATTERNS]
    if (!networkPattern) {
      return { valid: false, error: 'Invalid network' }
    }

    // Check if number starts with correct prefix for the network
    if (!number.startsWith(networkPattern.prefix)) {
      return {
        valid: false,
        error: `${getNetworkDisplayName(network)} numbers must start with ${networkPattern.prefix}. ${networkPattern.description}`,
      }
    }

    // Check length
    if (number.length !== networkPattern.length) {
      return {
        valid: false,
        error: `${getNetworkDisplayName(network)} numbers must be exactly ${networkPattern.length} digits long`,
      }
    }

    // Check if all characters are digits
    if (!/^\d+$/.test(number)) {
      return {
        valid: false,
        error: 'Beneficiary number must contain only digits',
      }
    }

    return { valid: true }
  }

  // Auto-clean beneficiary number (remove spaces)
  const handleBeneficiaryNumberChange = (value: string) => {
    // Remove all spaces
    const cleanedValue = value.replace(/\s+/g, '')
    setFormData({ ...formData, beneficiaryNumber: cleanedValue })
  }

  const handleBuyClick = (pkg: Package) => {
    setSelectedPackage(pkg)
    setFormData({
      beneficiaryNumber: '',
      email: '',
    })
    setSuccessMessage('')
    setErrorMessage('')
    setIsBuyDialogOpen(true)
  }

  const validateForm = (): boolean => {
    if (!selectedPackage) {
      setErrorMessage('Package not found')
      return false
    }

    // Validate beneficiary number with network-specific rules
    const beneficiaryValidation = validateBeneficiaryNumber(
      formData.beneficiaryNumber,
      selectedNetwork
    )
    if (!beneficiaryValidation.valid) {
      setErrorMessage(beneficiaryValidation.error || 'Invalid beneficiary number')
      return false
    }

    if (!formData.email.trim()) {
      setErrorMessage('Please enter an email address')
      return false
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(formData.email)) {
      setErrorMessage('Please enter a valid email address')
      return false
    }

    return true
  }

  const handleProceedToPayment = async () => {
    setErrorMessage('')
    setSuccessMessage('')

    if (!validateForm()) {
      return
    }

    setIsProcessing(true)

    // Simulate API call
    setTimeout(() => {
      setIsProcessing(false)
      setSuccessMessage(
        `Order confirmed! Sending ${selectedPackage?.size} to ${formData.beneficiaryNumber}. You will be redirected to payment for ${selectedPackage?.price}`
      )

      // In production, this would redirect to a payment gateway
      setTimeout(() => {
        setIsBuyDialogOpen(false)
        // Redirect to payment gateway
        // window.location.href = '/payment?orderId=...';
      }, 2000)
    }, 1500)
  }

  const renderPackageCards = (networkKey: string) => {
    const networkPackages = packages[networkKey as keyof typeof packages]
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {networkPackages.map((pkg, idx) => (
          <Card key={idx} className="p-6 border-0 shadow-md hover:shadow-lg transition-all duration-300 hover:scale-105 transform">
            <div className={`bg-gradient-to-br ${getNetworkColor(networkKey)} rounded-lg p-4 mb-4`}>
              <p className={`text-sm font-semibold ${getNetworkTextColor(networkKey)} mb-2`}>
                {getNetworkDisplayName(networkKey)}
              </p>
              <p className={`text-4xl font-bold ${getNetworkTextColor(networkKey)}`}>{pkg.size}</p>
            </div>
            <div className="space-y-3 mb-4">
              <div>
                <p className="text-xs text-gray-600 mb-1">Price</p>
                <p className="text-2xl font-bold text-gray-900">{pkg.price}</p>
              </div>
              <div>
                <p className="text-xs text-gray-600 mb-1">Validity</p>
                <p className="text-sm font-medium text-gray-900">{pkg.validity}</p>
              </div>
            </div>

            <Dialog open={isBuyDialogOpen && selectedPackage === pkg} onOpenChange={setIsBuyDialogOpen}>
              <DialogTrigger asChild>
                <Button
                  onClick={() => handleBuyClick(pkg)}
                  className={`w-full bg-gradient-to-r ${getNetworkColor(networkKey)} ${
                    networkKey === 'mtn' ? 'text-black hover:from-yellow-500 hover:to-yellow-600' : 'text-white'
                  } font-semibold rounded-lg`}
                >
                  <ShoppingCart className="mr-2 w-4 h-4" />
                  Buy Package
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-md">
                <DialogHeader>
                  <DialogTitle>Buy {selectedPackage?.size} Package</DialogTitle>
                  <DialogDescription>
                    Enter your details to proceed with the purchase
                  </DialogDescription>
                </DialogHeader>

                <div className="space-y-4">
                  {/* Product Summary */}
                  <div className="bg-slate-100 p-4 rounded-lg">
                    <div className="flex justify-between mb-2">
                      <span className="text-gray-600">Network:</span>
                      <span className="font-semibold text-gray-900">{getNetworkDisplayName(selectedNetwork)}</span>
                    </div>
                    <div className="flex justify-between mb-2">
                      <span className="text-gray-600">Size:</span>
                      <span className="font-semibold text-gray-900">{selectedPackage?.size}</span>
                    </div>
                    <div className="flex justify-between mb-2">
                      <span className="text-gray-600">Validity:</span>
                      <span className="font-semibold text-gray-900">{selectedPackage?.validity}</span>
                    </div>
                    <div className="border-t pt-2 flex justify-between">
                      <span className="text-gray-600 font-semibold">Total Price:</span>
                      <span className="font-bold text-green-600">{selectedPackage?.price}</span>
                    </div>
                  </div>

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

                  {/* Network Info Alert */}
                  <Alert className="bg-blue-50 border-blue-200">
                    <Info className="h-4 w-4 text-blue-600" />
                    <AlertDescription className="text-blue-800">
                      <strong>{getNetworkDisplayName(selectedNetwork)} Network:</strong>{' '}
                      {NETWORK_PATTERNS[selectedNetwork as keyof typeof NETWORK_PATTERNS]?.description}
                    </AlertDescription>
                  </Alert>

                  {/* Beneficiary Number Input */}
                  <div>
                    <Label htmlFor="beneficiary" className="flex items-center gap-2">
                      <Phone className="w-4 h-4" />
                      Beneficiary Number
                    </Label>
                    <Input
                      id="beneficiary"
                      type="tel"
                      placeholder={`e.g., ${NETWORK_PATTERNS[selectedNetwork as keyof typeof NETWORK_PATTERNS]?.prefix}01234567`}
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
                      We'll send the receipt and confirmation to this email
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
                      onClick={() => setIsBuyDialogOpen(false)}
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
    )
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Data Packages</h1>
        <p className="text-gray-600">Browse and purchase data packages instantly</p>
      </div>

      {/* Network Tabs */}
      <Tabs value={selectedNetwork} onValueChange={setSelectedNetwork} className="w-full">
        <TabsList className="grid w-full max-w-md grid-cols-3 bg-gray-100 p-1 rounded-lg">
          <TabsTrigger
            value="mtn"
            className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-yellow-400 data-[state=active]:to-yellow-500 data-[state=active]:text-black rounded-md font-bold"
          >
            MTN
          </TabsTrigger>
          <TabsTrigger
            value="at"
            className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500 data-[state=active]:to-blue-600 data-[state=active]:text-white rounded-md font-bold"
          >
            AirtelTigo (AT)
          </TabsTrigger>
          <TabsTrigger
            value="telecel"
            className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-red-500 data-[state=active]:to-red-600 data-[state=active]:text-white rounded-md font-bold"
          >
            Telecel
          </TabsTrigger>
        </TabsList>

        {/* MTN Packages */}
        <TabsContent value="mtn" className="mt-8">
          {renderPackageCards('mtn')}
        </TabsContent>

        {/* AirtelTigo (AT) Packages */}
        <TabsContent value="at" className="mt-8">
          {renderPackageCards('at')}
        </TabsContent>

        {/* Telecel Packages */}
        <TabsContent value="telecel" className="mt-8">
          {renderPackageCards('telecel')}
        </TabsContent>
      </Tabs>

      {/* Info Card */}
      <Card className="p-6 border-0 shadow-md bg-gradient-to-r from-blue-50 to-purple-50">
        <div className="flex items-start gap-4">
          <div className="p-3 bg-blue-500 rounded-lg text-white">
            <Zap size={24} />
          </div>
          <div>
            <h3 className="text-lg font-bold text-gray-900 mb-2">Quick Tips</h3>
            <ul className="space-y-2 text-sm text-gray-700">
              <li className="flex items-center gap-2">
                <Check size={16} className="text-green-600" />
                All packages have non-expiring validity
              </li>
              <li className="flex items-center gap-2">
                <Check size={16} className="text-green-600" />
                Instant delivery to customer accounts
              </li>
              <li className="flex items-center gap-2">
                <Check size={16} className="text-green-600" />
                Secure and safe transactions
              </li>
            </ul>
          </div>
        </div>
      </Card>
    </div>
  )
}
