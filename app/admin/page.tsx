'use client'

import { useEffect, useState } from 'react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Users, ShoppingCart, AlertCircle, CheckCircle2, Settings, TrendingUp, Download, Eye } from 'lucide-react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

interface User {
  is_admin?: boolean
}

export default function AdminPage() {
  const router = useRouter()
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const storedUser = localStorage.getItem('user')
    if (!storedUser) {
      router.push('/login')
      return
    }

    const userData = JSON.parse(storedUser)
    if (!userData.is_admin) {
      router.push('/dashboard')
      return
    }

    setUser(userData)
    setIsLoading(false)
  }, [router])

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading admin panel...</p>
        </div>
      </div>
    )
  }

  const adminStats = [
    {
      title: 'Total Users',
      value: '50,000+',
      icon: Users,
      color: 'from-blue-500 to-blue-600',
      bgColor: 'bg-blue-50',
      trend: '+12%',
    },
    {
      title: 'Total Orders',
      value: '1M+',
      icon: ShoppingCart,
      color: 'from-green-500 to-green-600',
      bgColor: 'bg-green-50',
      trend: '+8%',
    },
    {
      title: 'Total Revenue',
      value: 'GHS 500K+',
      icon: TrendingUp,
      color: 'from-purple-500 to-purple-600',
      bgColor: 'bg-purple-50',
      trend: '+15%',
    },
    {
      title: 'Pending Approvals',
      value: '12',
      icon: AlertCircle,
      color: 'from-orange-500 to-orange-600',
      bgColor: 'bg-orange-50',
      trend: '+3',
    },
  ]

  const adminActions = [
    {
      title: 'Manage Users',
      description: 'View users, manage balance and roles',
      icon: Users,
      color: 'from-green-500 to-green-600',
      href: '/admin/users',
      buttonText: 'Go to Users',
    },
    {
      title: 'Orders',
      description: 'Download and manage all orders',
      icon: ShoppingCart,
      color: 'from-orange-500 to-orange-600',
      href: '/admin/orders',
      buttonText: 'Go to Orders',
    },
    {
      title: 'Shop Approvals',
      description: 'Approve or reject shop creations',
      icon: CheckCircle2,
      color: 'from-purple-500 to-purple-600',
      href: '/admin/approvals',
      buttonText: 'Go to Approvals',
    },
    {
      title: 'Customer Complaints',
      description: 'View and resolve customer complaints',
      icon: AlertCircle,
      color: 'from-red-500 to-red-600',
      href: '/admin/complaints',
      buttonText: 'Go to Complaints',
    },
  ]

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-4xl font-bold text-gray-900">Admin Panel</h1>
        <p className="text-gray-600 mt-2">Manage platform, users, and orders</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {adminStats.map((stat, idx) => {
          const Icon = stat.icon
          return (
            <Card key={idx} className={`p-6 border-0 shadow-md hover:shadow-lg transition-all ${stat.bgColor}`}>
              <div className="flex items-start justify-between mb-4">
                <div className={`p-3 rounded-lg bg-gradient-to-br ${stat.color} text-white`}>
                  <Icon size={24} />
                </div>
                <span className="text-xs font-semibold text-green-600 bg-green-100 px-2 py-1 rounded-full">
                  {stat.trend}
                </span>
              </div>
              <p className="text-sm text-gray-600 mb-1">{stat.title}</p>
              <p className="text-3xl font-bold text-gray-900">{stat.value}</p>
            </Card>
          )
        })}
      </div>

      {/* Admin Actions Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {adminActions.map((action, idx) => {
          const Icon = action.icon
          return (
            <Link key={idx} href={action.href}>
              <Card className="p-6 border-0 shadow-md hover:shadow-lg transition-all cursor-pointer hover:scale-105 transform h-full">
                <div className="flex items-start justify-between mb-4">
                  <div className={`p-3 rounded-lg bg-gradient-to-br ${action.color} text-white`}>
                    <Icon size={24} />
                  </div>
                  <Eye className="w-5 h-5 text-gray-400" />
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">{action.title}</h3>
                <p className="text-sm text-gray-600 mb-4">{action.description}</p>
                <Button className={`w-full bg-gradient-to-r ${action.color} hover:opacity-90 text-white`}>
                  {action.buttonText}
                </Button>
              </Card>
            </Link>
          )
        })}
      </div>

      {/* System Status */}
      <Card className="p-6 border-0 shadow-md">
        <h3 className="text-lg font-bold text-gray-900 mb-6">System Status</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[
            { name: 'API Status', status: 'operational' },
            { name: 'Database Status', status: 'operational' },
            { name: 'Payment Gateway', status: 'operational' },
            { name: 'Email Service', status: 'operational' },
          ].map((item, idx) => (
            <div key={idx} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
              <span className="font-medium text-gray-900">{item.name}</span>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-green-500" />
                <span className="text-sm font-semibold text-green-600 capitalize">{item.status}</span>
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="p-6 border-0 shadow-md bg-gradient-to-br from-blue-50 to-blue-100">
          <h4 className="font-bold text-gray-900 mb-2">📊 Today&apos;s Stats</h4>
          <div className="space-y-2">
            <p className="text-sm text-gray-700"><span className="font-semibold">New Users:</span> 245</p>
            <p className="text-sm text-gray-700"><span className="font-semibold">New Orders:</span> 1,234</p>
            <p className="text-sm text-gray-700"><span className="font-semibold">Revenue:</span> GHS 5,234</p>
          </div>
        </Card>

        <Card className="p-6 border-0 shadow-md bg-gradient-to-br from-green-50 to-green-100">
          <h4 className="font-bold text-gray-900 mb-2">✅ Pending Actions</h4>
          <div className="space-y-2">
            <p className="text-sm text-gray-700"><span className="font-semibold">Shop Approvals:</span> 12</p>
            <p className="text-sm text-gray-700"><span className="font-semibold">Complaints:</span> 5</p>
            <p className="text-sm text-gray-700"><span className="font-semibold">Withdrawals:</span> 8</p>
          </div>
        </Card>

        <Card className="p-6 border-0 shadow-md bg-gradient-to-br from-purple-50 to-purple-100">
          <h4 className="font-bold text-gray-900 mb-2">🎯 Performance</h4>
          <div className="space-y-2">
            <p className="text-sm text-gray-700"><span className="font-semibold">Success Rate:</span> 99.8%</p>
            <p className="text-sm text-gray-700"><span className="font-semibold">Avg Response:</span> 2.3s</p>
            <p className="text-sm text-gray-700"><span className="font-semibold">Uptime:</span> 99.9%</p>
          </div>
        </Card>
      </div>
    </div>
  )
}
