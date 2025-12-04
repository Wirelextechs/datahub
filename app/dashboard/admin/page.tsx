'use client'

import { useEffect, useState } from 'react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Users, ShoppingCart, Wallet, TrendingUp, Settings, LogOut, BarChart3, AlertCircle, CheckCircle2, Activity } from 'lucide-react'
import { useRouter } from 'next/navigation'

interface AdminUser {
  id: number
  email: string
  name: string
  is_admin: boolean
}

export default function AdminPanelPage() {
  const router = useRouter()
  const [user, setUser] = useState<AdminUser | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Check if user is logged in and is admin
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

  const handleLogout = () => {
    localStorage.removeItem('user')
    localStorage.removeItem('token')
    router.push('/')
  }

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

  const stats = [
    { title: 'Total Users', value: '50,000+', icon: Users, color: 'from-blue-500 to-blue-600', trend: '+12%' },
    { title: 'Total Orders', value: '1M+', icon: ShoppingCart, color: 'from-green-500 to-green-600', trend: '+8%' },
    { title: 'Total Revenue', value: 'GHS 500K+', icon: Wallet, color: 'from-purple-500 to-purple-600', trend: '+15%' },
    { title: 'Growth Rate', value: '25%', icon: TrendingUp, color: 'from-orange-500 to-orange-600', trend: '+3%' },
  ]

  const recentActivities = [
    { type: 'user_signup', message: '5 new users signed up', time: '2 hours ago', icon: Users },
    { type: 'transaction', message: '₵2,500 in transactions processed', time: '1 hour ago', icon: ShoppingCart },
    { type: 'agent_join', message: '3 new agents joined', time: '30 minutes ago', icon: TrendingUp },
    { type: 'payment', message: 'Payment gateway synced', time: '15 minutes ago', icon: Wallet },
  ]

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Admin Dashboard</h1>
          <p className="text-gray-600">Welcome back, <span className="font-semibold text-blue-600">{user?.name}</span></p>
        </div>
        <div className="flex items-center gap-4">
          <Button variant="outline" className="flex items-center gap-2">
            <Settings className="w-4 h-4" />
            Settings
          </Button>
          <Button 
            onClick={handleLogout}
            className="bg-red-600 hover:bg-red-700 text-white flex items-center gap-2"
          >
            <LogOut className="w-4 h-4" />
            Logout
          </Button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, idx) => {
          const Icon = stat.icon
          return (
            <Card key={idx} className="p-6 border-0 shadow-md hover:shadow-lg transition-all duration-300 hover:scale-105 transform">
              <div className="flex items-start justify-between mb-4">
                <div className={`p-3 rounded-lg bg-gradient-to-br ${stat.color} text-white`}>
                  <Icon size={24} />
                </div>
                <span className="text-xs font-semibold text-green-600 bg-green-50 px-2 py-1 rounded-full">
                  {stat.trend}
                </span>
              </div>
              <p className="text-sm text-gray-600 mb-1">{stat.title}</p>
              <p className="text-3xl font-bold text-gray-900">{stat.value}</p>
            </Card>
          )
        })}
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* System Status */}
        <Card className="lg:col-span-2 p-6 border-0 shadow-md">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2">
              <Activity className="w-5 h-5 text-blue-600" />
              System Status
            </h3>
            <span className="text-xs font-semibold text-green-600 bg-green-50 px-3 py-1 rounded-full">
              All Systems Operational
            </span>
          </div>
          <div className="space-y-3">
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

        {/* Quick Actions */}
        <Card className="p-6 border-0 shadow-md">
          <h3 className="text-lg font-bold text-gray-900 mb-4">Quick Actions</h3>
          <div className="space-y-3">
            <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white justify-start">
              <Users className="w-4 h-4 mr-2" />
              Manage Users
            </Button>
            <Button className="w-full bg-purple-600 hover:bg-purple-700 text-white justify-start">
              <ShoppingCart className="w-4 h-4 mr-2" />
              View Orders
            </Button>
            <Button className="w-full bg-green-600 hover:bg-green-700 text-white justify-start">
              <Wallet className="w-4 h-4 mr-2" />
              Manage Payments
            </Button>
            <Button className="w-full bg-orange-600 hover:bg-orange-700 text-white justify-start">
              <BarChart3 className="w-4 h-4 mr-2" />
              View Reports
            </Button>
          </div>
        </Card>
      </div>

      {/* Recent Activities */}
      <Card className="p-6 border-0 shadow-md">
        <h3 className="text-lg font-bold text-gray-900 mb-6 flex items-center gap-2">
          <Activity className="w-5 h-5 text-blue-600" />
          Recent Activities
        </h3>
        <div className="space-y-4">
          {recentActivities.map((activity, idx) => {
            const ActivityIcon = activity.icon
            return (
              <div key={idx} className="flex items-start gap-4 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <ActivityIcon className="w-5 h-5 text-blue-600" />
                </div>
                <div className="flex-1">
                  <p className="font-medium text-gray-900">{activity.message}</p>
                  <p className="text-sm text-gray-500">{activity.time}</p>
                </div>
              </div>
            )
          })}
        </div>
      </Card>

      {/* Admin Info Card */}
      <Card className="p-6 border-0 shadow-md bg-gradient-to-r from-blue-50 to-purple-50">
        <div className="flex items-start justify-between">
          <div>
            <h3 className="text-lg font-bold text-gray-900 mb-2">Admin Account Information</h3>
            <p className="text-gray-600 mb-4">You have full access to all admin features and settings.</p>
            <div className="space-y-2">
              <p className="text-sm"><span className="font-semibold text-gray-900">Email:</span> {user?.email}</p>
              <p className="text-sm"><span className="font-semibold text-gray-900">Name:</span> {user?.name}</p>
              <p className="text-sm"><span className="font-semibold text-gray-900">Role:</span> <span className="text-blue-600 font-semibold">Administrator</span></p>
            </div>
          </div>
          <AlertCircle className="w-12 h-12 text-blue-600 opacity-20" />
        </div>
      </Card>
    </div>
  )
}
