'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import Link from 'next/link'
import { ShoppingCart, Check } from 'lucide-react'

export default function BrowsePackagesPage() {
  const [selectedNetwork, setSelectedNetwork] = useState('mtn')

  const packages = {
    mtn: [
      { id: 1, size: '100MB', price: 1, profit: 0.15, validity: 'NON EXPIRE' },
      { id: 2, size: '500MB', price: 2, profit: 0.30, validity: 'NON EXPIRE' },
      { id: 3, size: '1GB', price: 3, profit: 0.45, validity: 'NON EXPIRE' },
      { id: 4, size: '2GB', price: 5, profit: 0.75, validity: 'NON EXPIRE' },
      { id: 5, size: '5GB', price: 10, profit: 1.50, validity: 'NON EXPIRE' },
      { id: 6, size: '10GB', price: 18, profit: 2.70, validity: 'NON EXPIRE' },
    ],
    at: [
      { id: 1, size: '100MB', price: 0.99, profit: 0.15, validity: 'NON EXPIRE' },
      { id: 2, size: '500MB', price: 1.99, profit: 0.30, validity: 'NON EXPIRE' },
      { id: 3, size: '1GB', price: 2.99, profit: 0.45, validity: 'NON EXPIRE' },
      { id: 4, size: '2GB', price: 4.99, profit: 0.75, validity: 'NON EXPIRE' },
      { id: 5, size: '5GB', price: 9.99, profit: 1.50, validity: 'NON EXPIRE' },
      { id: 6, size: '10GB', price: 17.99, profit: 2.70, validity: 'NON EXPIRE' },
    ],
    telecel: [
      { id: 1, size: '100MB', price: 1.05, profit: 0.15, validity: 'NON EXPIRE' },
      { id: 2, size: '500MB', price: 2.05, profit: 0.30, validity: 'NON EXPIRE' },
      { id: 3, size: '1GB', price: 3.05, profit: 0.45, validity: 'NON EXPIRE' },
      { id: 4, size: '2GB', price: 5.05, profit: 0.75, validity: 'NON EXPIRE' },
      { id: 5, size: '5GB', price: 10.05, profit: 1.50, validity: 'NON EXPIRE' },
      { id: 6, size: '10GB', price: 18.05, profit: 2.70, validity: 'NON EXPIRE' },
    ],
  }

  const networkInfo = {
    mtn: { name: 'MTN', color: 'from-yellow-400 to-yellow-600', bgColor: 'bg-yellow-50' },
    at: { name: 'AirtelTigo (AT)', color: 'from-blue-400 to-blue-600', bgColor: 'bg-blue-50' },
    telecel: { name: 'Telecel', color: 'from-red-400 to-red-600', bgColor: 'bg-red-50' },
  }

  const currentPackages = packages[selectedNetwork as keyof typeof packages]
  const currentNetwork = networkInfo[selectedNetwork as keyof typeof networkInfo]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 right-10 w-96 h-96 bg-gradient-to-br from-blue-500/30 to-purple-500/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-20 w-80 h-80 bg-gradient-to-tr from-cyan-500/20 to-blue-500/10 rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10">
        {/* Header */}
        <div className="max-w-6xl mx-auto px-4 py-16">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-4xl font-bold text-white mb-2">Browse Data Packages</h1>
              <p className="text-gray-400">Choose from our wide range of data packages</p>
            </div>
            <Link href="/login">
              <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold">
                Sign In to Buy
              </Button>
            </Link>
          </div>

          {/* Network Tabs */}
          <Tabs defaultValue="mtn" className="w-full mb-8">
            <TabsList className="grid w-full max-w-md grid-cols-3 bg-slate-800/50 p-1 rounded-lg border border-slate-700">
              <TabsTrigger
                value="mtn"
                onClick={() => setSelectedNetwork('mtn')}
                className="rounded-md data-[state=active]:bg-gradient-to-r data-[state=active]:from-yellow-500 data-[state=active]:to-yellow-600 data-[state=active]:text-white"
              >
                MTN
              </TabsTrigger>
              <TabsTrigger
                value="at"
                onClick={() => setSelectedNetwork('at')}
                className="rounded-md data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500 data-[state=active]:to-blue-600 data-[state=active]:text-white"
              >
                AirtelTigo
              </TabsTrigger>
              <TabsTrigger
                value="telecel"
                onClick={() => setSelectedNetwork('telecel')}
                className="rounded-md data-[state=active]:bg-gradient-to-r data-[state=active]:from-red-500 data-[state=active]:to-red-600 data-[state=active]:text-white"
              >
                Telecel
              </TabsTrigger>
            </TabsList>

            {/* Packages Grid */}
            <TabsContent value={selectedNetwork} className="mt-8">
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {currentPackages.map((pkg) => (
                  <Card key={pkg.id} className="p-6 border-0 shadow-lg bg-slate-800/50 backdrop-blur-xl hover:shadow-xl transition-all hover:scale-105">
                    <div className={`p-3 rounded-lg bg-gradient-to-br ${currentNetwork.color} text-white mb-4 w-fit`}>
                      <ShoppingCart className="w-6 h-6" />
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-2">{pkg.size}</h3>
                    <div className="space-y-3 mb-6">
                      <div>
                        <p className="text-sm text-gray-400 mb-1">Price</p>
                        <p className="text-2xl font-bold text-white">GHS {pkg.price.toFixed(2)}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-400 mb-1">Your Profit</p>
                        <p className="text-xl font-bold text-green-400">+GHS {pkg.profit.toFixed(2)}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-400 mb-1">Validity</p>
                        <p className="text-sm text-white flex items-center gap-2">
                          <Check className="w-4 h-4 text-green-400" />
                          {pkg.validity}
                        </p>
                      </div>
                    </div>
                    <Link href="/login">
                      <Button className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold">
                        Buy Now
                      </Button>
                    </Link>
                  </Card>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>

        {/* Info Section */}
        <div className="max-w-6xl mx-auto px-4 py-16">
          <div className="grid md:grid-cols-3 gap-6">
            <Card className="p-6 border-0 shadow-lg bg-slate-800/50 backdrop-blur-xl">
              <h3 className="text-lg font-bold text-white mb-2">💰 Earn Commissions</h3>
              <p className="text-gray-400">Earn 15% commission on every package you sell</p>
            </Card>
            <Card className="p-6 border-0 shadow-lg bg-slate-800/50 backdrop-blur-xl">
              <h3 className="text-lg font-bold text-white mb-2">⚡ Instant Delivery</h3>
              <p className="text-gray-400">Data is delivered instantly to customers</p>
            </Card>
            <Card className="p-6 border-0 shadow-lg bg-slate-800/50 backdrop-blur-xl">
              <h3 className="text-lg font-bold text-white mb-2">🔒 Secure & Safe</h3>
              <p className="text-gray-400">All transactions are encrypted and secure</p>
            </Card>
          </div>
        </div>

        {/* CTA */}
        <div className="max-w-4xl mx-auto px-4 py-16 text-center">
          <Card className="p-12 border-0 shadow-2xl bg-gradient-to-r from-blue-600/20 to-purple-600/20 backdrop-blur-xl border border-blue-500/30">
            <h2 className="text-3xl font-bold text-white mb-4">Ready to Start Selling?</h2>
            <p className="text-gray-300 mb-8">Create an account and start earning today</p>
            <Link href="/signup">
              <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold px-8 py-6 rounded-lg">
                Create Free Account
              </Button>
            </Link>
          </Card>
        </div>
      </div>
    </div>
  )
}
