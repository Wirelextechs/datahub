'use client'

import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Search, Download, Eye, Filter, ArrowUpRight, ArrowDownLeft } from 'lucide-react'
import { useState } from 'react'

export default function TransactionsPage() {
  const [searchTerm, setSearchTerm] = useState('')

  const transactions = [
    { id: '#TXN-001', type: 'Top Up', description: 'MTN Mobile Money', amount: '+GHS 50.00', date: '12/4/2025', time: '10:30 AM', status: 'Success', category: 'Credit' },
    { id: '#TXN-002', type: 'Purchase', description: 'MTN - 5GB Data Bundle', amount: '-GHS 25.00', date: '12/4/2025', time: '09:15 AM', status: 'Success', category: 'Debit' },
    { id: '#TXN-003', type: 'Top Up', description: 'Bank Transfer', amount: '+GHS 100.00', date: '12/3/2025', time: '02:45 PM', status: 'Success', category: 'Credit' },
    { id: '#TXN-004', type: 'Purchase', description: 'AirtelTigo - 3GB Data Bundle', amount: '-GHS 15.00', date: '12/3/2025', time: '11:20 AM', status: 'Success', category: 'Debit' },
    { id: '#TXN-005', type: 'Bonus', description: 'Referral Bonus', amount: '+GHS 10.00', date: '12/2/2025', time: '08:00 AM', status: 'Success', category: 'Credit' },
    { id: '#TXN-006', type: 'Purchase', description: 'Telecel - 2GB Data Bundle', amount: '-GHS 11.00', date: '12/2/2025', time: '03:30 PM', status: 'Success', category: 'Debit' },
  ]

  const stats = [
    { label: 'Total Transactions', value: '156', color: 'from-blue-500 to-blue-600' },
    { label: 'Total Credited', value: 'GHS 1,250.00', color: 'from-green-500 to-green-600' },
    { label: 'Total Debited', value: 'GHS 1,124.50', color: 'from-red-500 to-red-600' },
    { label: 'This Month', value: '24', color: 'from-purple-500 to-purple-600' },
  ]

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold text-gray-900">Transactions</h1>
          <p className="text-gray-600 mt-2">View all your transaction history</p>
        </div>
        <Button className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white">
          <Download className="w-4 h-4 mr-2" />
          Export Transactions
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, idx) => (
          <Card key={idx} className="p-6 border-0 shadow-md">
            <p className="text-sm text-gray-600 mb-2">{stat.label}</p>
            <p className="text-2xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">{stat.value}</p>
          </Card>
        ))}
      </div>

      {/* Search and Filter */}
      <Card className="p-6 border-0 shadow-md">
        <div className="flex gap-4 flex-wrap">
          <div className="flex-1 min-w-[200px] relative">
            <Search className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search by transaction ID or description..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <select className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
            <option>All Types</option>
            <option>Top Up</option>
            <option>Purchase</option>
            <option>Bonus</option>
          </select>
          <select className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
            <option>All Status</option>
            <option>Success</option>
            <option>Pending</option>
            <option>Failed</option>
          </select>
          <Button variant="outline" className="border-gray-300">
            <Filter className="w-4 h-4 mr-2" />
            Filter
          </Button>
        </div>
      </Card>

      {/* Transactions List */}
      <div className="space-y-3">
        {transactions.map((txn) => (
          <Card key={txn.id} className="p-4 border-0 shadow-md hover:shadow-lg transition-all">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4 flex-1">
                <div className={`p-3 rounded-lg ${
                  txn.category === 'Credit' 
                    ? 'bg-green-100' 
                    : 'bg-red-100'
                }`}>
                  {txn.category === 'Credit' ? (
                    <ArrowDownLeft className={`w-6 h-6 text-green-600`} />
                  ) : (
                    <ArrowUpRight className={`w-6 h-6 text-red-600`} />
                  )}
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <p className="font-semibold text-gray-900">{txn.type}</p>
                    <span className={`px-2 py-1 rounded text-xs font-semibold ${
                      txn.status === 'Success' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'
                    }`}>
                      {txn.status}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600">{txn.description}</p>
                  <p className="text-xs text-gray-500">{txn.date} at {txn.time}</p>
                </div>
              </div>
              <div className="text-right">
                <p className={`text-lg font-bold ${txn.category === 'Credit' ? 'text-green-600' : 'text-red-600'}`}>
                  {txn.amount}
                </p>
                <p className="text-xs text-gray-500">{txn.id}</p>
              </div>
              <Button size="sm" variant="outline" className="border-blue-200 text-blue-600 hover:bg-blue-50 ml-4">
                <Eye className="w-4 h-4" />
              </Button>
            </div>
          </Card>
        ))}
      </div>

      {/* Pagination */}
      <Card className="p-4 border-0 shadow-md flex items-center justify-between">
        <p className="text-sm text-gray-600">Showing 1 to 6 of 156 transactions</p>
        <div className="flex gap-2">
          <Button variant="outline" className="border-gray-300">Previous</Button>
          <Button className="bg-blue-600 hover:bg-blue-700 text-white">1</Button>
          <Button variant="outline" className="border-gray-300">2</Button>
          <Button variant="outline" className="border-gray-300">3</Button>
          <Button variant="outline" className="border-gray-300">Next</Button>
        </div>
      </Card>
    </div>
  )
}
