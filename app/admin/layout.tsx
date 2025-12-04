'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useRouter, usePathname } from 'next/navigation'
import { Button } from '@/components/ui/button'
import {
  LayoutDashboard,
  Users,
  ShoppingCart,
  AlertCircle,
  CheckCircle2,
  Settings,
  User,
  LogOut,
  Menu,
  X,
} from 'lucide-react'

interface User {
  id: number
  email: string
  name: string
  is_admin: boolean
}

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const router = useRouter()
  const pathname = usePathname()
  const [user, setUser] = useState<User | null>(null)
  const [sidebarOpen, setSidebarOpen] = useState(true)
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
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    )
  }

  const adminMenuItems = [
    { icon: LayoutDashboard, label: 'Dashboard', href: '/admin' },
    { icon: Users, label: 'Manage Users', href: '/admin/users' },
    { icon: ShoppingCart, label: 'Orders', href: '/admin/orders' },
    { icon: AlertCircle, label: 'Complaints', href: '/admin/complaints' },
    { icon: CheckCircle2, label: 'Approvals', href: '/admin/approvals' },
    { icon: Settings, label: 'Settings', href: '/admin/settings' },
  ]

  const isActive = (href: string) => pathname === href || pathname.startsWith(href + '/')

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <div
        className={`${
          sidebarOpen ? 'w-64' : 'w-20'
        } bg-gradient-to-b from-red-600 to-red-700 text-white transition-all duration-300 flex flex-col fixed h-screen z-40`}
      >
        {/* Logo */}
        <div className="p-4 border-b border-red-500 flex items-center justify-between">
          <div className={`flex items-center gap-3 ${!sidebarOpen && 'justify-center w-full'}`}>
            <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center font-bold text-red-600">
              A
            </div>
            {sidebarOpen && <span className="font-bold text-lg">Admin</span>}
          </div>
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="p-1 hover:bg-red-500 rounded-lg transition-colors"
          >
            {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        {/* Menu Items */}
        <nav className="flex-1 overflow-y-auto py-4 px-2">
          {adminMenuItems.map((item) => {
            const Icon = item.icon
            const active = isActive(item.href)
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg mb-2 transition-all ${
                  active
                    ? 'bg-white text-red-600 font-semibold'
                    : 'text-red-100 hover:bg-red-500'
                }`}
                title={!sidebarOpen ? item.label : ''}
              >
                <Icon size={20} />
                {sidebarOpen && <span>{item.label}</span>}
              </Link>
            )
          })}
        </nav>

        {/* Footer */}
        <div className="border-t border-red-500 p-4 space-y-2">
          <Link
            href="/admin"
            className="flex items-center gap-3 px-4 py-2 rounded-lg text-red-100 hover:bg-red-500 transition-all"
          >
            <User size={20} />
            {sidebarOpen && <span className="text-sm">{user?.name}</span>}
          </Link>
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-2 rounded-lg text-red-100 hover:bg-red-500 transition-all"
          >
            <LogOut size={20} />
            {sidebarOpen && <span className="text-sm">Logout</span>}
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className={`${sidebarOpen ? 'ml-64' : 'ml-20'} flex-1 overflow-auto transition-all duration-300`}>
        <div className="p-8">
          {children}
        </div>
      </div>
    </div>
  )
}
