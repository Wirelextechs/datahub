'use client'

import { useState } from 'react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { ShoppingCart, Zap, Check } from 'lucide-react'

export default function PackagesPage() {
  const [selectedNetwork, setSelectedNetwork] = useState('mtn')

  const packages = {
    mtn: [
      { size: '1GB', price: 'GHS 5.00', validity: 'NON EXPIRE' },
      { size: '2GB', price: 'GHS 10.00', validity: 'NON EXPIRE' },
      { size: '3GB', price: 'GHS 15.00', validity: 'NON EXPIRE' },
      { size: '4GB', price: 'GHS 20.00', validity: 'NON EXPIRE' },
      { size: '5GB', price: 'GHS 25.00', validity: 'NON EXPIRE' },
      { size: '10GB', price: 'GHS 45.00', validity: 'NON EXPIRE' },
    ],
    at: [
      { size: '1GB', price: 'GHS 4.50', validity: 'NON EXPIRE' },
      { size: '2GB', price: 'GHS 9.00', validity: 'NON EXPIRE' },
      { size: '3GB', price: 'GHS 13.50', validity: 'NON EXPIRE' },
      { size: '4GB', price: 'GHS 18.00', validity: 'NON EXPIRE' },
      { size: '5GB', price: 'GHS 22.50', validity: 'NON EXPIRE' },
      { size: '10GB', price: 'GHS 40.00', validity: 'NON EXPIRE' },
    ],
    telecel: [
      { size: '1GB', price: 'GHS 5.50', validity: 'NON EXPIRE' },
      { size: '2GB', price: 'GHS 11.00', validity: 'NON EXPIRE' },
      { size: '3GB', price: 'GHS 16.50', validity: 'NON EXPIRE' },
      { size: '4GB', price: 'GHS 22.00', validity: 'NON EXPIRE' },
      { size: '5GB', price: 'GHS 27.50', validity: 'NON EXPIRE' },
      { size: '10GB', price: 'GHS 50.00', validity: 'NON EXPIRE' },
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
          <TabsTrigger value="mtn" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-yellow-400 data-[state=active]:to-yellow-500 data-[state=active]:text-black rounded-md font-bold">
            MTN
          </TabsTrigger>
          <TabsTrigger value="at" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500 data-[state=active]:to-blue-600 data-[state=active]:text-white rounded-md font-bold">
            AirtelTigo (AT)
          </TabsTrigger>
          <TabsTrigger value="telecel" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-red-500 data-[state=active]:to-red-600 data-[state=active]:text-white rounded-md font-bold">
            Telecel
          </TabsTrigger>
        </TabsList>

        {/* MTN Packages */}
        <TabsContent value="mtn" className="mt-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {packages.mtn.map((pkg, idx) => (
              <Card key={idx} className="p-6 border-0 shadow-md hover:shadow-lg transition-all duration-300 hover:scale-105 transform">
                <div className={`bg-gradient-to-br ${getNetworkColor('mtn')} rounded-lg p-4 mb-4`}>
                  <p className={`text-sm font-semibold ${getNetworkTextColor('mtn')} mb-2`}>MTN</p>
                  <p className={`text-4xl font-bold ${getNetworkTextColor('mtn')}`}>{pkg.size}</p>
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
                <Button className="w-full bg-gradient-to-r from-yellow-400 to-yellow-500 hover:from-yellow-500 hover:to-yellow-600 text-black font-semibold rounded-lg">
                  <ShoppingCart className="mr-2 w-4 h-4" />
                  Buy Package
                </Button>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* AirtelTigo (AT) Packages */}
        <TabsContent value="at" className="mt-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {packages.at.map((pkg, idx) => (
              <Card key={idx} className="p-6 border-0 shadow-md hover:shadow-lg transition-all duration-300 hover:scale-105 transform">
                <div className={`bg-gradient-to-br ${getNetworkColor('at')} rounded-lg p-4 mb-4`}>
                  <p className={`text-sm font-semibold ${getNetworkTextColor('at')} mb-2`}>AirtelTigo (AT)</p>
                  <p className={`text-4xl font-bold ${getNetworkTextColor('at')}`}>{pkg.size}</p>
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
                <Button className="w-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-semibold rounded-lg">
                  <ShoppingCart className="mr-2 w-4 h-4" />
                  Buy Package
                </Button>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Telecel Packages */}
        <TabsContent value="telecel" className="mt-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {packages.telecel.map((pkg, idx) => (
              <Card key={idx} className="p-6 border-0 shadow-md hover:shadow-lg transition-all duration-300 hover:scale-105 transform">
                <div className={`bg-gradient-to-br ${getNetworkColor('telecel')} rounded-lg p-4 mb-4`}>
                  <p className={`text-sm font-semibold ${getNetworkTextColor('telecel')} mb-2`}>Telecel</p>
                  <p className={`text-4xl font-bold ${getNetworkTextColor('telecel')}`}>{pkg.size}</p>
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
                <Button className="w-full bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white font-semibold rounded-lg">
                  <ShoppingCart className="mr-2 w-4 h-4" />
                  Buy Package
                </Button>
              </Card>
            ))}
          </div>
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
