'use client'

import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Plus, Minus, Eye, Download, Wallet, TrendingUp } from 'lucide-react'
import { useState } from 'react'

export default function WalletPage() {
  const [showBalance, setShowBalance] = useState(true)

  const walletStats = [
    { label: 'Current Balance', value: 'GHS 125.50', icon: Wallet, color: 'from-blue-500 to-blue-600' },
    { label: 'Total Spent', value: 'GHS 450.00', icon: Minus, color: 'from-red-500 to-red-600' },
    { label: 'Total Topped Up', value: 'GHS 575.50', icon: Plus, color: 'from-green-500 to-green-600' },
    { label: 'Bonus Balance', value: 'GHS 25.00', icon: TrendingUp, color: 'from-purple-500 to-purple-600' },
  ]

  const transactions = [
    { id: '#TXN-001', type: 'Top Up', amount: '+GHS 50.00', date: '12/4/2025', time: '10:30 AM', status: 'Success', method: 'MTN Mobile Money' },
    { id: '#TXN-002', type: 'Purchase', amount: '-GHS 25.00', date: '12/4/2025', time: '09:15 AM', status: 'Success', method: 'Data Bundle' },
    { id: '#TXN-003', type: 'Top Up', amount: '+GHS 100.00', date: '12/3/2025', time: '02:45 PM', status: 'Success', method: 'Bank Transfer' },
    { id: '#TXN-004', type: 'Purchase', amount: '-GHS 15.00', date: '12/3/2025', time: '11:20 AM', status: 'Success', method: 'Data Bundle' },
    { id: '#TXN-005', type: 'Bonus', amount: '+GHS 10.00', date: '12/2/2025', time: '08:00 AM', status: 'Success', method: 'Referral Bonus' },
  ]

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold text-gray-900">My Wallet</h1>
          <p className="text-gray-600 mt-2">Manage your wallet balance and transactions</p>
        </div>
        <Button className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white">
          <Download className="w-4 h-4 mr-2" />
          Export Statement
        </Button>
      </div>

      {/* Wallet Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {walletStats.map((stat, idx) => {
          const Icon = stat.icon
          return (
            <Card key={idx} className="p-6 border-0 shadow-md">
              <div className="flex items-start justify-between mb-4">
                <div className={`p-3 rounded-lg bg-gradient-to-br ${stat.color} text-white`}>
                  <Icon size={24} />
                </div>
              </div>
              <p className="text-sm text-gray-600 mb-1">{stat.label}</p>
              <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
            </Card>
          )
        })}
      </div>

      {/* Quick Actions */}
      <Card className="p-6 border-0 shadow-md">
        <h3 className="text-lg font-bold text-gray-900 mb-4">Quick Actions</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Button className="bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white h-12">
            <Plus className="w-4 h-4 mr-2" />
            Top Up Wallet
          </Button>
          <Button className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white h-12">
            <Minus className="w-4 h-4 mr-2" />
            Buy Data
          </Button>
          <Button variant="outline" className="border-gray-300 h-12">
            <Eye className="w-4 h-4 mr-2" />
            View Details
          </Button>
          <Button variant="outline" className="border-gray-300 h-12">
            <Download className="w-4 h-4 mr-2" />
            Download Receipt
          </Button>
        </div>
      </Card>

      {/* Transaction History */}
      <Card className="p-6 border-0 shadow-md">
        <h3 className="text-lg font-bold text-gray-900 mb-6">Transaction History</h3>
        <div className="space-y-3">
          {transactions.map((txn) => (
            <div key={txn.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-1">
                  <p className="font-semibold text-gray-900">{txn.type}</p>
                  <span className={`px-2 py-1 rounded text-xs font-semibold ${
                    txn.status === 'Success' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'
                  }`}>
                    {txn.status}
                  </span>
                </div>
                <p className="text-sm text-gray-600">{txn.method}</p>
                <p className="text-xs text-gray-500">{txn.date} at {txn.time}</p>
              </div>
              <div className="text-right">
                <p className={`text-lg font-bold ${txn.amount.startsWith('+') ? 'text-green-600' : 'text-red-600'}`}>
                  {txn.amount}
                </p>
                <p className="text-xs text-gray-500">{txn.id}</p>
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* Wallet Information */}
      <Card className="p-6 border-0 shadow-md bg-blue-50">
        <h3 className="text-lg font-bold text-gray-900 mb-4">Wallet Information</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <p className="text-sm text-gray-600 mb-1">Wallet ID</p>
            <p className="font-semibold text-gray-900">WLT-2025-001234</p>
          </div>
          <div>
            <p className="text-sm text-gray-600 mb-1">Account Status</p>
            <p className="font-semibold text-green-600">Active & Verified</p>
          </div>
          <div>
            <p className="text-sm text-gray-600 mb-1">Last Top Up</p>
            <p className="font-semibold text-gray-900">12/4/2025 at 10:30 AM</p>
          </div>
          <div>
            <p className="text-sm text-gray-600 mb-1">Daily Limit</p>
            <p className="font-semibold text-gray-900">GHS 5,000.00</p>
          </div>
        </div>
      </Card>
    </div>
  )
}
