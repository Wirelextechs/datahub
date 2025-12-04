'use client'

import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import {
  Wallet,
  TrendingUp,
  ShoppingCart,
  Clock,
  ArrowUpRight,
  ArrowDownLeft,
  Download,
  Eye,
  MoreVertical,
} from 'lucide-react'

export default function Dashboard() {
  // Sample data
  const stats = [
    {
      title: 'Available Balance',
      value: 'GHS 250.50',
      subtitle: 'Ready to withdraw',
      icon: Wallet,
      color: 'from-blue-500 to-blue-600',
      bgColor: 'bg-blue-50',
    },
    {
      title: 'Total Profit',
      value: 'GHS 1,250.00',
      subtitle: 'All time profit',
      icon: TrendingUp,
      color: 'from-green-500 to-green-600',
      bgColor: 'bg-green-50',
    },
    {
      title: 'Total Orders',
      value: '156',
      subtitle: 'All orders',
      icon: ShoppingCart,
      color: 'from-orange-500 to-orange-600',
      bgColor: 'bg-orange-50',
    },
    {
      title: 'Pending Withdrawals',
      value: '3',
      subtitle: 'Awaiting approval',
      icon: Clock,
      color: 'from-red-500 to-red-600',
      bgColor: 'bg-red-50',
    },
  ]

  const recentOrders = [
    {
      id: 1,
      customer: 'Kwame Asante',
      product: 'MTN - 5GB',
      date: '12/3/2025 4:38:19 PM',
      profit: '+GHS 0.50',
      status: 'completed',
    },
    {
      id: 2,
      customer: 'Ama Osei',
      product: 'AirtelTigo - 3GB',
      date: '12/2/2025 2:15:45 PM',
      profit: '+GHS 0.35',
      status: 'completed',
    },
    {
      id: 3,
      customer: 'Kofi Mensah',
      product: 'Telecel - 2GB',
      date: '12/1/2025 10:22:30 AM',
      profit: '+GHS 0.25',
      status: 'processing',
    },
    {
      id: 4,
      customer: 'Abena Boateng',
      product: 'MTN - 10GB',
      date: '11/30/2025 6:45:12 PM',
      profit: '+GHS 0.75',
      status: 'completed',
    },
  ]

  const transactions = [
    {
      id: 1,
      type: 'withdrawal',
      amount: 'GHS 500.00',
      date: '12/1/2025',
      status: 'completed',
      icon: ArrowDownLeft,
    },
    {
      id: 2,
      type: 'deposit',
      amount: 'GHS 1,000.00',
      date: '11/28/2025',
      status: 'completed',
      icon: ArrowUpRight,
    },
    {
      id: 3,
      type: 'withdrawal',
      amount: 'GHS 250.00',
      date: '11/25/2025',
      status: 'pending',
      icon: ArrowDownLeft,
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

      {/* Action Button */}
      <div className="flex gap-4">
        <Button className="bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white font-semibold px-8 py-6 rounded-lg">
          <Download className="mr-2 w-5 h-5" />
          Request Withdrawal
        </Button>
        <Button variant="outline" className="px-8 py-6 rounded-lg font-semibold">
          <Eye className="mr-2 w-5 h-5" />
          View Reports
        </Button>
      </div>

      {/* Tabs Section */}
      <Tabs defaultValue="orders" className="w-full">
        <TabsList className="grid w-full max-w-md grid-cols-3 bg-gray-100 p-1 rounded-lg">
          <TabsTrigger value="orders" className="rounded-md">
            Recent Orders (4)
          </TabsTrigger>
          <TabsTrigger value="profit" className="rounded-md">
            Profit History (4)
          </TabsTrigger>
          <TabsTrigger value="withdrawals" className="rounded-md">
            Withdrawals (3)
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
        </TabsContent>

        {/* Profit History Tab */}
        <TabsContent value="profit" className="mt-6">
          <Card className="border-0 shadow-md overflow-hidden">
            <div className="p-6 border-b border-gray-200">
              <h3 className="text-lg font-bold text-gray-900">Profit History</h3>
              <p className="text-sm text-gray-600">Your earnings over time</p>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase">Date</th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase">Amount</th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase">Type</th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {transactions.map((tx) => (
                    <tr key={tx.id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4 text-sm text-gray-600">{tx.date}</td>
                      <td className="px-6 py-4 text-sm font-semibold text-gray-900">{tx.amount}</td>
                      <td className="px-6 py-4 text-sm capitalize text-gray-600">{tx.type}</td>
                      <td className="px-6 py-4 text-sm">
                        <span className={`px-3 py-1 rounded-full text-xs font-semibold capitalize ${getStatusColor(tx.status)}`}>
                          {tx.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
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
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase">Date</th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase">Amount</th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase">Status</th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {transactions
                    .filter((tx) => tx.type === 'withdrawal')
                    .map((tx) => (
                      <tr key={tx.id} className="hover:bg-gray-50 transition-colors">
                        <td className="px-6 py-4 text-sm text-gray-600">{tx.date}</td>
                        <td className="px-6 py-4 text-sm font-semibold text-gray-900">{tx.amount}</td>
                        <td className="px-6 py-4 text-sm">
                          <span className={`px-3 py-1 rounded-full text-xs font-semibold capitalize ${getStatusColor(tx.status)}`}>
                            {tx.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-sm">
                          <button className="text-blue-600 hover:text-blue-700 font-medium">View</button>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
