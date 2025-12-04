'use client'

import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Search, MessageSquare, CheckCircle2, Clock, AlertCircle } from 'lucide-react'
import { useState } from 'react'

export default function ComplaintsPage() {
  const [searchTerm, setSearchTerm] = useState('')

  const complaints = [
    {
      id: '#CMP-001',
      customer: 'John Doe',
      issue: 'Data not received',
      status: 'Open',
      priority: 'High',
      date: '12/4/2025',
      description: 'Customer claims data bundle was not delivered after payment',
    },
    {
      id: '#CMP-002',
      customer: 'Jane Smith',
      issue: 'Wrong package received',
      status: 'In Progress',
      priority: 'Medium',
      date: '12/3/2025',
      description: 'Received 2GB instead of 5GB package',
    },
    {
      id: '#CMP-003',
      customer: 'Mike Johnson',
      issue: 'Duplicate charge',
      status: 'Resolved',
      priority: 'High',
      date: '12/2/2025',
      description: 'Customer was charged twice for the same order',
    },
  ]

  const stats = [
    { label: 'Total Complaints', value: '45', icon: AlertCircle, color: 'from-red-500 to-red-600' },
    { label: 'Open', value: '12', icon: Clock, color: 'from-orange-500 to-orange-600' },
    { label: 'In Progress', value: '8', icon: MessageSquare, color: 'from-blue-500 to-blue-600' },
    { label: 'Resolved', value: '25', icon: CheckCircle2, color: 'from-green-500 to-green-600' },
  ]

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-4xl font-bold text-gray-900">Customer Complaints</h1>
        <p className="text-gray-600 mt-2">View and resolve customer complaints</p>
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
              placeholder="Search complaints by ID, customer, or issue..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <select className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
            <option>All Status</option>
            <option>Open</option>
            <option>In Progress</option>
            <option>Resolved</option>
          </select>
        </div>
      </Card>

      {/* Complaints List */}
      <div className="space-y-4">
        {complaints.map((complaint) => (
          <Card key={complaint.id} className="p-6 border-0 shadow-md hover:shadow-lg transition-all">
            <div className="flex items-start justify-between mb-4">
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <h3 className="font-bold text-gray-900">{complaint.id}</h3>
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                    complaint.status === 'Open' ? 'bg-red-100 text-red-700' :
                    complaint.status === 'In Progress' ? 'bg-blue-100 text-blue-700' :
                    'bg-green-100 text-green-700'
                  }`}>
                    {complaint.status}
                  </span>
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                    complaint.priority === 'High' ? 'bg-red-100 text-red-700' :
                    complaint.priority === 'Medium' ? 'bg-yellow-100 text-yellow-700' :
                    'bg-green-100 text-green-700'
                  }`}>
                    {complaint.priority}
                  </span>
                </div>
                <p className="text-sm text-gray-600">Customer: {complaint.customer}</p>
              </div>
              <p className="text-sm text-gray-500">{complaint.date}</p>
            </div>

            <div className="mb-4">
              <p className="font-semibold text-gray-900 mb-2">{complaint.issue}</p>
              <p className="text-gray-600 text-sm">{complaint.description}</p>
            </div>

            <div className="flex gap-3">
              <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                <MessageSquare className="w-4 h-4 mr-2" />
                View Details
              </Button>
              <Button variant="outline" className="border-gray-300">
                Add Note
              </Button>
              {complaint.status !== 'Resolved' && (
                <Button className="bg-green-600 hover:bg-green-700 text-white">
                  <CheckCircle2 className="w-4 h-4 mr-2" />
                  Mark Resolved
                </Button>
              )}
            </div>
          </Card>
        ))}
      </div>
    </div>
  )
}
