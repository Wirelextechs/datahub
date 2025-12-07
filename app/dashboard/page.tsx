'use client'

import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import ShopLink from '@/components/dashboard/ShopLink'
import {
  Wallet,
  ShoppingCart,
  ArrowUpRight,
  ArrowDownLeft,
  Eye,
  MoreVertical,
} from 'lucide-react'

export default function Dashboard() {
  // TODO: Get user data from session/context
  // For now, using mock data
  const isApprovedAgent = false // This should come from user session
  const username = 'prosperwedam' // This should come from user session
  const userId = '1' // This should come from user session

  // Sample data - Customer only sees balance and orders
  const stats = [
    {
      title: 'Available Balance',
      value: 'GHS 250.50',
      subtitle: 'Ready to spend',
      icon: Wallet,
      color: 'from-blue-500 to-blue-600',
      bgColor: 'bg-blue-50',
    },
    {
      title: 'Total Orders',
      value: '156',
      subtitle: 'All time orders',
      icon: ShoppingCart,
      color: 'from-orange-500 to-orange-600',
      bgColor: 'bg-orange-50',
    },
  ]

  const recentOrders = [
    {
      id: 1,
      product: 'MTN - 5GB',
      amount: 'GHS 25.00',
      date: '12/3/2025 4:38:19 PM',
      status: 'completed',
    },
    {
      id: 2,
      product: 'AirtelTigo - 3GB',
      amount: 'GHS 15.00',
      date: '12/2/2025 2:15:45 PM',
      status: 'completed',
    },
    {
      id: 3,
      product: 'Telecel - 2GB',
      amount: 'GHS 10.00',
      date: '12/1/2025 10:22:30 AM',
      status: 'processing',
    },
    {
      id: 4,
      product: 'MTN - 10GB',
      amount: 'GHS 50.00',
      date: '11/30/2025 6:45:12 PM',
      status: 'completed',
    },
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-800'
      case 'processing':
        return 'bg-yellow-100 text-yellow-800'
      case 'pending':
        return 'bg-blue-100 text-blue-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  return (
    <div className="space-y-8">
      {/* Shop Link Section - Only for approved agents */}
      <ShopLink username={username} isApprovedAgent={isApprovedAgent} userId={userId} />

      {/* Stats Grid - Customer Only */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {stats.map((stat, idx) => {
          const Icon = stat.icon
          return (
            <Card key={idx} className="p-6 border-0 shadow-md hover:shadow-lg transition-shadow">
              <div className="flex items-start justify-between mb-4">
                <div className={`p-3 rounded-lg bg-gradient-to-br ${stat.color} text-white`}>
                  <Icon size={24} />
                </div>
                <button className="p-1 hover:bg-gray-100 rounded-lg transition-colors">
                  <MoreVertical size={16} className="text-gray-400" />
                </button>
              </div>
              <p className="text-sm text-gray-600 mb-1">{stat.title}</p>
              <p className="text-3xl font-bold text-gray-900 mb-1">{stat.value}</p>
              <p className="text-xs text-gray-500">{stat.subtitle}</p>
            </Card>
          )
        })}
      </div>

      {/* Action Button - View Reports Only */}
      <div className="flex gap-4">
        <Button variant="outline" className="px-8 py-6 rounded-lg font-semibold">
          <Eye className="mr-2 w-5 h-5" />
          View Reports
        </Button>
      </div>

      {/* Recent Orders Section */}
      <Card className="border-0 shadow-md overflow-hidden">
        <div className="p-6 border-b border-gray-200">
          <h3 className="text-lg font-bold text-gray-900">Recent Orders</h3>
          <p className="text-sm text-gray-600">Your recent data purchases</p>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase">Product</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase">Amount</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase">Date</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {recentOrders.map((order) => (
                <tr key={order.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 text-sm font-medium text-gray-900">{order.product}</td>
                  <td className="px-6 py-4 text-sm font-semibold text-gray-900">{order.amount}</td>
                  <td className="px-6 py-4 text-sm text-gray-600">{order.date}</td>
                  <td className="px-6 py-4 text-sm">
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold capitalize ${getStatusColor(order.status)}`}>
                      {order.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  )
}
