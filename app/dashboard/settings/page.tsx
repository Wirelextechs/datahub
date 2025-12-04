'use client'

import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Settings, Bell, Lock, Database } from 'lucide-react'

export default function SettingsPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Settings</h1>
        <p className="text-gray-600">Configure system settings and preferences</p>
      </div>

      <Card className="p-6 border-0 shadow-md">
        <div className="flex items-center gap-4 mb-6">
          <div className="p-3 bg-blue-100 rounded-lg">
            <Settings className="w-6 h-6 text-blue-600" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-gray-900">General Settings</h3>
            <p className="text-sm text-gray-600">Configure general platform settings</p>
          </div>
        </div>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Platform Name</label>
            <input
              type="text"
              placeholder="DataHub"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Support Email</label>
            <input
              type="email"
              placeholder="support@datahub.com"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <Button className="bg-blue-600 hover:bg-blue-700 text-white">Save Changes</Button>
        </div>
      </Card>

      <Card className="p-6 border-0 shadow-md">
        <div className="flex items-center gap-4 mb-6">
          <div className="p-3 bg-purple-100 rounded-lg">
            <Bell className="w-6 h-6 text-purple-600" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-gray-900">Notification Settings</h3>
            <p className="text-sm text-gray-600">Configure notification preferences</p>
          </div>
        </div>
        <div className="space-y-3">
          <label className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg cursor-pointer">
            <input type="checkbox" defaultChecked className="w-4 h-4" />
            <span className="font-medium text-gray-900">Email Notifications</span>
          </label>
          <label className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg cursor-pointer">
            <input type="checkbox" defaultChecked className="w-4 h-4" />
            <span className="font-medium text-gray-900">SMS Notifications</span>
          </label>
          <label className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg cursor-pointer">
            <input type="checkbox" className="w-4 h-4" />
            <span className="font-medium text-gray-900">Push Notifications</span>
          </label>
        </div>
      </Card>

      <Card className="p-6 border-0 shadow-md">
        <div className="flex items-center gap-4 mb-6">
          <div className="p-3 bg-red-100 rounded-lg">
            <Lock className="w-6 h-6 text-red-600" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-gray-900">Security Settings</h3>
            <p className="text-sm text-gray-600">Manage security and access control</p>
          </div>
        </div>
        <div className="space-y-3">
          <Button variant="outline" className="w-full justify-start">
            Enable Two-Factor Authentication
          </Button>
          <Button variant="outline" className="w-full justify-start">
            Manage API Keys
          </Button>
          <Button variant="outline" className="w-full justify-start">
            View Audit Logs
          </Button>
        </div>
      </Card>
    </div>
  )
}
