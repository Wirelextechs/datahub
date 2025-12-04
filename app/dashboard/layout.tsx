'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import {
  LayoutDashboard,
  Package,
  ShoppingCart,
  Wallet,
  History,
  User,
  AlertCircle,
  Store,
  BarChart3,
  Settings,
  LogOut,
  Users,
  Menu,
  X,
  Bell,
  Moon,
  LogIn,
  HelpCircle,
} from 'lucide-react'

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [userRole, setUserRole] = useState<'customer' | 'agent' | 'admin'>('customer')

  const menuItems = [
    { icon: LayoutDashboard, label: 'Dashboard', href: '/dashboard', roles: ['customer', 'agent', 'admin'] },
    { icon: Package, label: 'Data Packages', href: '/dashboard/packages', roles: ['customer', 'agent', 'admin'] },
    { icon: ShoppingCart, label: 'My Orders', href: '/dashboard/orders', roles: ['customer', 'agent', 'admin'] },
    { icon: AlertCircle, label: 'AFA Orders', href: '/dashboard/afa-orders', roles: ['customer', 'agent', 'admin'] },
    { icon: Wallet, label: 'Wallet', href: '/dashboard/wallet', roles: ['customer', 'agent', 'admin'] },
    { icon: History, label: 'Transactions', href: '/dashboard/transactions', roles: ['customer', 'agent', 'admin'] },
    { icon: HelpCircle, label: 'Support', href: '/dashboard/support', roles: ['customer', 'agent', 'admin'] },
    { icon: User, label: 'Profile', href: '/dashboard/profile', roles: ['customer', 'agent', 'admin'] },
    { icon: AlertCircle, label: 'My Complaints', href: '/dashboard/complaints', roles: ['customer', 'agent', 'admin'] },
  ]

  const shopItems = [
    { icon: Store, label: 'My Shop', href: '/dashboard/shop', roles: ['agent', 'admin'] },
    { icon: BarChart3, label: 'Shop Dashboard', href: '/dashboard/shop-dashboard', roles: ['agent', 'admin'] },
  ]

  const adminItems = [
    { icon: Users, label: 'Admin Panel', href: '/admin', roles: ['admin'] },
    { icon: Users, label: 'Manage Users', href: '/admin/users', roles: ['admin'] },
    { icon: ShoppingCart, label: 'Orders', href: '/admin/orders', roles: ['admin'] },
    { icon: AlertCircle, label: 'Complaints', href: '/admin/complaints', roles: ['admin'] },
    { icon: Package, label: 'Approvals', href: '/admin/approvals', roles: ['admin'] },
    { icon: Settings, label: 'Settings', href: '/admin/settings', roles: ['admin'] },
  ]

  const filteredMenuItems = menuItems.filter(item => item.roles.includes(userRole))
  const filteredShopItems = shopItems.filter(item => item.roles.includes(userRole))
  const filteredAdminItems = adminItems.filter(item => item.roles.includes(userRole))

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <div
        className={`${
          sidebarOpen ? 'w-64' : 'w-20'
        } bg-gradient-to-b from-blue-600 to-blue-700 text-white transition-all duration-300 flex flex-col fixed h-screen z-40 overflow-y-auto`}
      >
        {/* Logo */}
        <div className="p-4 border-b border-blue-500 flex items-center justify-between">
          <div className={`flex items-center gap-3 ${!sidebarOpen && 'justify-center w-full'}`}>
            <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center">
              <Image
                src="/images/logo.png"
                alt="DataHub"
                width={24}
                height={24}
                className="object-contain"
              />
            </div>
            {sidebarOpen && (
              <div>
                <p className="font-bold text-lg">DATAHUB</p>
                <p className="text-xs text-blue-200">Data Hub</p>
              </div>
            )}
          </div>
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="p-1 hover:bg-blue-500 rounded-lg transition-colors"
          >
            {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        {/* Main Menu */}
        <nav className="flex-1 p-4 space-y-2">
          {filteredMenuItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-blue-500 transition-colors group"
              title={!sidebarOpen ? item.label : ''}
            >
              <item.icon size={20} className="flex-shrink-0" />
              {sidebarOpen && <span className="text-sm font-medium">{item.label}</span>}
            </Link>
          ))}
        </nav>

        {/* Shop Section */}
        {filteredShopItems.length > 0 && (
          <div className="border-t border-blue-500 p-4">
            {sidebarOpen && <p className="text-xs font-semibold text-blue-200 mb-2 uppercase">Shop</p>}
            <nav className="space-y-2">
              {filteredShopItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-blue-500 transition-colors"
                  title={!sidebarOpen ? item.label : ''}
                >
                  <item.icon size={20} className="flex-shrink-0" />
                  {sidebarOpen && <span className="text-sm font-medium">{item.label}</span>}
                </Link>
              ))}
            </nav>
          </div>
        )}

        {/* Admin Section */}
        {filteredAdminItems.length > 0 && (
          <div className="border-t border-blue-500 p-4">
            {sidebarOpen && <p className="text-xs font-semibold text-blue-200 mb-2 uppercase">Admin</p>}
            <nav className="space-y-2">
              {filteredAdminItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-blue-500 transition-colors"
                  title={!sidebarOpen ? item.label : ''}
                >
                  <item.icon size={20} className="flex-shrink-0" />
                  {sidebarOpen && <span className="text-sm font-medium">{item.label}</span>}
                </Link>
              ))}
            </nav>
          </div>
        )}

        {/* Bottom Actions */}
        <div className="border-t border-blue-500 p-4 space-y-2">
          <button className="w-full flex items-center gap-3 px-4 py-3 rounded-lg bg-green-500 hover:bg-green-600 transition-colors font-medium text-sm">
            <Users size={20} />
            {sidebarOpen && <span>Join Community</span>}
          </button>
          <button className="w-full flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-blue-500 transition-colors font-medium text-sm">
            <LogOut size={20} />
            {sidebarOpen && <span>Logout</span>}
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className={`${sidebarOpen ? 'ml-64' : 'ml-20'} flex-1 flex flex-col transition-all duration-300`}>
        {/* Top Bar */}
        <div className="bg-white border-b border-gray-200 px-8 py-4 flex items-center justify-between sticky top-0 z-30">
          <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
          <div className="flex items-center gap-4">
            {/* Role Selector */}
            <select
              value={userRole}
              onChange={(e) => setUserRole(e.target.value as 'customer' | 'agent' | 'admin')}
              className="px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="customer">Customer</option>
              <option value="agent">Agent</option>
              <option value="admin">Admin</option>
            </select>

            {/* Notifications */}
            <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors relative">
              <Bell size={20} className="text-gray-600" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
            </button>

            {/* Dark Mode */}
            <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
              <Moon size={20} className="text-gray-600" />
            </button>

            {/* User Avatar */}
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold cursor-pointer hover:shadow-lg transition-shadow">
              PW
            </div>
          </div>
        </div>

        {/* Page Content */}
        <div className="flex-1 overflow-auto p-8">
          {children}
        </div>
      </div>
    </div>
  )
}
