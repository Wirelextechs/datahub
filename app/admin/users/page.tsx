'use client'

import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Search, Download, Eye, Trash2, Edit } from 'lucide-react'
import { useState } from 'react'

export default function ManageUsersPage() {
  const [searchTerm, setSearchTerm] = useState('')

  const users = [
    { id: 1, name: 'Prosper Wedam', email: 'prosperwedam4424@gmail.com', role: 'Admin', status: 'Active', joined: '12/4/2025' },
    { id: 2, name: 'John Doe', email: 'john@example.com', role: 'User', status: 'Active', joined: '12/3/2025' },
    { id: 3, name: 'Jane Smith', email: 'jane@example.com', role: 'Agent', status: 'Active', joined: '12/2/2025' },
    { id: 4, name: 'Mike Johnson', email: 'mike@example.com', role: 'User', status: 'Inactive', joined: '12/1/2025' },
  ]

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold text-gray-900">Manage Users</h1>
          <p className="text-gray-600 mt-2">View, manage, and control user accounts</p>
        </div>
        <Button className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white">
          <Download className="w-4 h-4 mr-2" />
          Export Users
        </Button>
      </div>

      {/* Search and Filter */}
      <Card className="p-6 border-0 shadow-md">
        <div className="flex gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search users by name or email..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <select className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
            <option>All Roles</option>
            <option>Admin</option>
            <option>Agent</option>
            <option>User</option>
          </select>
          <select className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
            <option>All Status</option>
            <option>Active</option>
            <option>Inactive</option>
          </select>
        </div>
      </Card>

      {/* Users Table */}
      <Card className="p-6 border-0 shadow-md overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-200">
              <th className="text-left py-3 px-4 font-semibold text-gray-900">Name</th>
              <th className="text-left py-3 px-4 font-semibold text-gray-900">Email</th>
              <th className="text-left py-3 px-4 font-semibold text-gray-900">Role</th>
              <th className="text-left py-3 px-4 font-semibold text-gray-900">Status</th>
              <th className="text-left py-3 px-4 font-semibold text-gray-900">Joined</th>
              <th className="text-left py-3 px-4 font-semibold text-gray-900">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                <td className="py-3 px-4 text-gray-900 font-medium">{user.name}</td>
                <td className="py-3 px-4 text-gray-600">{user.email}</td>
                <td className="py-3 px-4">
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                    user.role === 'Admin' ? 'bg-red-100 text-red-700' :
                    user.role === 'Agent' ? 'bg-blue-100 text-blue-700' :
                    'bg-gray-100 text-gray-700'
                  }`}>
                    {user.role}
                  </span>
                </td>
                <td className="py-3 px-4">
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                    user.status === 'Active' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'
                  }`}>
                    {user.status}
                  </span>
                </td>
                <td className="py-3 px-4 text-gray-600">{user.joined}</td>
                <td className="py-3 px-4 flex gap-2">
                  <Button size="sm" variant="outline" className="border-blue-200 text-blue-600 hover:bg-blue-50">
                    <Eye className="w-4 h-4" />
                  </Button>
                  <Button size="sm" variant="outline" className="border-gray-200 text-gray-600 hover:bg-gray-50">
                    <Edit className="w-4 h-4" />
                  </Button>
                  <Button size="sm" variant="outline" className="border-red-200 text-red-600 hover:bg-red-50">
                    <Trash2 className="w-4 h-4" />
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
