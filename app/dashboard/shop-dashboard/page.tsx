'use client'

import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Wallet, TrendingUp, ShoppingCart, Clock, Download } from 'lucide-react'

export default function ShopDashboardPage() {
  const stats = [
    {
      title: 'Available Balance',
      value: 'GHS 0.10',
      subtitle: 'Ready to withdraw',
      icon: Wallet,
      color: 'from-blue-500 to-blue-600',
    },
    {
      title: 'Total Profit',
      value: 'GHS 0.10',
      subtitle: 'All time profit',
      icon: TrendingUp,
      color: 'from-green-500 to-green-600',
    },
    {
      title: 'Total Orders',
      value: '1',
      subtitle: 'All orders',
      icon: ShoppingCart,
      color: 'from-orange-500 to-orange-600',
    },
    {
      title: 'Pending Withdrawals',
      value: '0',
      subtitle: 'Awaiting approval',
      icon: Clock,
      color: 'from-red-500 to-red-600',
    },
  ]

  const recentOrders = [
    {
      id: 1,
      customer: 'Prosper Wedam',
      product: 'MTN - 100GB',
      date: '12/3/2025 4:38:19 PM',
      profit: '+GHS 0.10',
      status: 'processing',
    },
  ]

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Shop Dashboard</h1>
        <p className="text-gray-600">Track your profits and manage withdrawals</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, idx) => {
          const Icon = stat.icon
          return (
            <Card key={idx} className="p-6 border-0 shadow-md hover:shadow-lg transition-shadow">
              <div className="flex items-start justify-between mb-4">
                <div className={`p-3 rounded-lg bg-gradient-to-br ${stat.color} text-white`}>
                  <Icon size={24} />
                </div>
              </div>
              <p className="text-sm text-gray-600 mb-1">{stat.title}</p>
              <p className="text-3xl font-bold text-gray-900 mb-1">{stat.value}</p>
              <p className="text-xs text-gray-500">{stat.subtitle}</p>
            </Card>
          )
        })}
      </div>

      {/* Action Button */}
      <Button className="bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white font-semibold px-8 py-6 rounded-lg">
        Request Withdrawal
      </Button>

      {/* Tabs Section */}
      <Tabs defaultValue="orders" className="w-full">
        <TabsList className="grid w-full max-w-md grid-cols-3 bg-gray-100 p-1 rounded-lg">
          <TabsTrigger value="orders" className="rounded-md">
            Recent Orders (1)
          </TabsTrigger>
          <TabsTrigger value="profit" className="rounded-md">
            Profit History (1)
          </TabsTrigger>
          <TabsTrigger value="withdrawals" className="rounded-md">
            Withdrawals (1)
          </TabsTrigger>
        </TabsList>

        {/* Recent Orders Tab */}
        <TabsContent value="orders" className="mt-6">
          <Card className="border-0 shadow-md overflow-hidden">
            <div className="p-6 border-b border-gray-200">
              <h3 className="text-lg font-bold text-gray-900">Recent Orders</h3>
              <p className="text-sm text-gray-600">Orders from your shop customers</p>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase">Customer</th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase">Product</th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase">Date</th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase">Profit</th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {recentOrders.map((order) => (
                    <tr key={order.id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4 text-sm font-medium text-gray-900">{order.customer}</td>
                      <td className="px-6 py-4 text-sm text-gray-600">{order.product}</td>
                      <td className="px-6 py-4 text-sm text-gray-600">{order.date}</td>
                      <td className="px-6 py-4 text-sm font-semibold text-green-600">{order.profit}</td>
                      <td className="px-6 py-4 text-sm">
                        <span className="px-3 py-1 rounded-full text-xs font-semibold capitalize bg-yellow-100 text-yellow-800">
                          {order.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        </TabsContent>

        {/* Profit History Tab */}
        <TabsContent value="profit" className="mt-6">
          <Card className="border-0 shadow-md overflow-hidden">
            <div className="p-6 border-b border-gray-200">
              <h3 className="text-lg font-bold text-gray-900">Profit History</h3>
              <p className="text-sm text-gray-600">Your earnings over time</p>
            </div>
            <div className="p-6">
              <div className="text-center py-8">
                <p className="text-gray-600">No profit history yet</p>
              </div>
            </div>
          </Card>
        </TabsContent>

        {/* Withdrawals Tab */}
        <TabsContent value="withdrawals" className="mt-6">
          <Card className="border-0 shadow-md overflow-hidden">
            <div className="p-6 border-b border-gray-200">
              <h3 className="text-lg font-bold text-gray-900">Withdrawal History</h3>
              <p className="text-sm text-gray-600">Your withdrawal requests and status</p>
            </div>
            <div className="p-6">
              <div className="text-center py-8">
                <p className="text-gray-600">No withdrawals yet</p>
              </div>
            </div>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
