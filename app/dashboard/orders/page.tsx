'use client'

import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Search, Download, Eye, Filter, Package } from 'lucide-react'
import { useState } from 'react'

export default function OrdersPage() {
  const [searchTerm, setSearchTerm] = useState('')

  const orders = [
    { id: '#ORD-001', package: 'MTN - 5GB', amount: 'GHS 25.00', status: 'Completed', date: '12/4/2025', provider: 'MTN' },
    { id: '#ORD-002', package: 'AirtelTigo - 3GB', amount: 'GHS 15.00', status: 'Processing', date: '12/3/2025', provider: 'AirtelTigo' },
    { id: '#ORD-003', package: 'Telecel - 2GB', amount: 'GHS 11.00', status: 'Pending', date: '12/3/2025', provider: 'Telecel' },
    { id: '#ORD-004', package: 'MTN - 10GB', amount: 'GHS 45.00', status: 'Completed', date: '12/2/2025', provider: 'MTN' },
    { id: '#ORD-005', package: 'Vodafone - 1GB', amount: 'GHS 5.00', status: 'Completed', date: '12/1/2025', provider: 'Vodafone' },
  ]

  const stats = [
    { label: 'Total Orders', value: '24', color: 'from-blue-500 to-blue-600' },
    { label: 'Completed', value: '22', color: 'from-green-500 to-green-600' },
    { label: 'Processing', value: '1', color: 'from-orange-500 to-orange-600' },
    { label: 'Pending', value: '1', color: 'from-yellow-500 to-yellow-600' },
  ]

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold text-gray-900">My Orders</h1>
          <p className="text-gray-600 mt-2">View and manage all your data orders</p>
        </div>
        <Button className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white">
          <Download className="w-4 h-4 mr-2" />
          Export Orders
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, idx) => (
          <Card key={idx} className="p-6 border-0 shadow-md">
            <p className="text-sm text-gray-600 mb-2">{stat.label}</p>
            <p className="text-3xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">{stat.value}</p>
          </Card>
        ))}
      </div>

      {/* Search and Filter */}
      <Card className="p-6 border-0 shadow-md">
        <div className="flex gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search orders by ID, package, or provider..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <select className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
            <option>All Status</option>
            <option>Completed</option>
            <option>Processing</option>
            <option>Pending</option>
          </select>
          <Button variant="outline" className="border-gray-300">
            <Filter className="w-4 h-4 mr-2" />
            Filter
          </Button>
        </div>
      </Card>

      {/* Orders Table */}
      <Card className="p-6 border-0 shadow-md overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-200">
              <th className="text-left py-3 px-4 font-semibold text-gray-900">Order ID</th>
              <th className="text-left py-3 px-4 font-semibold text-gray-900">Package</th>
              <th className="text-left py-3 px-4 font-semibold text-gray-900">Provider</th>
              <th className="text-left py-3 px-4 font-semibold text-gray-900">Amount</th>
              <th className="text-left py-3 px-4 font-semibold text-gray-900">Status</th>
              <th className="text-left py-3 px-4 font-semibold text-gray-900">Date</th>
              <th className="text-left py-3 px-4 font-semibold text-gray-900">Action</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order.id} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                <td className="py-3 px-4 text-gray-900 font-medium">{order.id}</td>
                <td className="py-3 px-4 text-gray-600">{order.package}</td>
                <td className="py-3 px-4 text-gray-600">{order.provider}</td>
                <td className="py-3 px-4 text-gray-900 font-semibold">{order.amount}</td>
                <td className="py-3 px-4">
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                    order.status === 'Completed' ? 'bg-green-100 text-green-700' :
                    order.status === 'Processing' ? 'bg-blue-100 text-blue-700' :
                    order.status === 'Pending' ? 'bg-yellow-100 text-yellow-700' :
                    'bg-red-100 text-red-700'
                  }`}>
                    {order.status}
                  </span>
                </td>
                <td className="py-3 px-4 text-gray-600">{order.date}</td>
                <td className="py-3 px-4">
                  <Button size="sm" variant="outline" className="border-blue-200 text-blue-600 hover:bg-blue-50">
                    <Eye className="w-4 h-4" />
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>
    </div>
  )
}
