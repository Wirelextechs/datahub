'use client'

import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Download, Filter } from 'lucide-react'

export default function AdminOrdersPage() {
  const orders = [
    { id: 1, customer: 'Kwame Asante', product: 'MTN - 5GB', amount: 'GHS 25.00', date: '12/3/2025', status: 'completed' },
    { id: 2, customer: 'Ama Osei', product: 'AirtelTigo - 3GB', amount: 'GHS 15.00', date: '12/2/2025', status: 'completed' },
    { id: 3, customer: 'Kofi Mensah', product: 'Telecel - 2GB', amount: 'GHS 11.00', date: '12/1/2025', status: 'processing' },
  ]

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">All Orders</h1>
        <p className="text-gray-600">View and manage all platform orders</p>
      </div>

      <div className="flex gap-4">
        <Button className="bg-blue-600 hover:bg-blue-700 text-white">
          <Filter className="mr-2 w-4 h-4" />
          Filter
        </Button>
        <Button className="bg-blue-600 hover:bg-blue-700 text-white">
          <Download className="mr-2 w-4 h-4" />
          Export
        </Button>
      </div>

      <Card className="border-0 shadow-md overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase">Customer</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase">Product</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase">Amount</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase">Date</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase">Status</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {orders.map((order) => (
                <tr key={order.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 text-sm font-medium text-gray-900">{order.customer}</td>
                  <td className="px-6 py-4 text-sm text-gray-600">{order.product}</td>
                  <td className="px-6 py-4 text-sm font-semibold text-gray-900">{order.amount}</td>
                  <td className="px-6 py-4 text-sm text-gray-600">{order.date}</td>
                  <td className="px-6 py-4 text-sm">
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold capitalize ${
                      order.status === 'completed' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {order.status}
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
    </div>
  )
}
