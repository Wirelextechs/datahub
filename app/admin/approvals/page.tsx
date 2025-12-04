'use client'

import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Search, CheckCircle2, XCircle, Eye, Clock } from 'lucide-react'
import { useState } from 'react'

export default function ApprovalsPage() {
  const [searchTerm, setSearchTerm] = useState('')

  const approvals = [
    {
      id: '#APP-001',
      shopName: 'Tech Store Ghana',
      owner: 'Kwame Asante',
      email: 'kwame@techstore.com',
      status: 'Pending',
      date: '12/4/2025',
      description: 'New shop registration for electronics retail',
    },
    {
      id: '#APP-002',
      shopName: 'Mobile Deals',
      owner: 'Ama Boateng',
      email: 'ama@mobiledeals.com',
      status: 'Pending',
      date: '12/3/2025',
      description: 'Shop registration for mobile phone sales',
    },
    {
      id: '#APP-003',
      shopName: 'Data Plus',
      owner: 'Kofi Mensah',
      email: 'kofi@dataplus.com',
      status: 'Approved',
      date: '12/2/2025',
      description: 'Data bundle reseller shop',
    },
    {
      id: '#APP-004',
      shopName: 'Quick Services',
      owner: 'Abena Osei',
      email: 'abena@quickservices.com',
      status: 'Rejected',
      date: '12/1/2025',
      description: 'Service provider shop - rejected due to incomplete documentation',
    },
  ]

  const stats = [
    { label: 'Total Applications', value: '156', icon: Clock, color: 'from-blue-500 to-blue-600' },
    { label: 'Pending', value: '12', icon: Clock, color: 'from-orange-500 to-orange-600' },
    { label: 'Approved', value: '140', icon: CheckCircle2, color: 'from-green-500 to-green-600' },
    { label: 'Rejected', value: '4', icon: XCircle, color: 'from-red-500 to-red-600' },
  ]

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-4xl font-bold text-gray-900">Shop Approvals</h1>
        <p className="text-gray-600 mt-2">Approve or reject shop creations</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, idx) => {
          const Icon = stat.icon
          return (
            <Card key={idx} className="p-6 border-0 shadow-md">
              <div className="flex items-start justify-between mb-4">
                <div className={`p-3 rounded-lg bg-gradient-to-br ${stat.color} text-white`}>
                  <Icon size={24} />
                </div>
              </div>
              <p className="text-sm text-gray-600 mb-1">{stat.label}</p>
              <p className="text-3xl font-bold text-gray-900">{stat.value}</p>
            </Card>
          )
        })}
      </div>

      {/* Search */}
      <Card className="p-6 border-0 shadow-md">
        <div className="flex gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search by shop name, owner, or email..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <select className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
            <option>All Status</option>
            <option>Pending</option>
            <option>Approved</option>
            <option>Rejected</option>
          </select>
        </div>
      </Card>

      {/* Approvals List */}
      <div className="space-y-4">
        {approvals.map((approval) => (
          <Card key={approval.id} className="p-6 border-0 shadow-md hover:shadow-lg transition-all">
            <div className="flex items-start justify-between mb-4">
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <h3 className="font-bold text-gray-900">{approval.id}</h3>
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                    approval.status === 'Pending' ? 'bg-yellow-100 text-yellow-700' :
                    approval.status === 'Approved' ? 'bg-green-100 text-green-700' :
                    'bg-red-100 text-red-700'
                  }`}>
                    {approval.status}
                  </span>
                </div>
                <p className="text-lg font-semibold text-gray-900 mb-1">{approval.shopName}</p>
                <p className="text-sm text-gray-600">Owner: {approval.owner}</p>
                <p className="text-sm text-gray-600">Email: {approval.email}</p>
              </div>
              <p className="text-sm text-gray-500">{approval.date}</p>
            </div>

            <div className="mb-4">
              <p className="text-gray-600 text-sm">{approval.description}</p>
            </div>

            <div className="flex gap-3">
              <Button variant="outline" className="border-blue-300 text-blue-600 hover:bg-blue-50">
                <Eye className="w-4 h-4 mr-2" />
                View Details
              </Button>
              {approval.status === 'Pending' && (
                <>
                  <Button className="bg-green-600 hover:bg-green-700 text-white">
                    <CheckCircle2 className="w-4 h-4 mr-2" />
                    Approve
                  </Button>
                  <Button className="bg-red-600 hover:bg-red-700 text-white">
                    <XCircle className="w-4 h-4 mr-2" />
                    Reject
                  </Button>
                </>
              )}
            </div>
          </Card>
        ))}
      </div>
    </div>
  )
}
