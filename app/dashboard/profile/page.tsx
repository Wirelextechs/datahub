'use client'

import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { User, Mail, Phone, MapPin, Edit2 } from 'lucide-react'

export default function ProfilePage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Profile</h1>
        <p className="text-gray-600">Manage your account information</p>
      </div>

      <Card className="p-8 border-0 shadow-md">
        <div className="flex items-start justify-between mb-8">
          <div className="flex items-center gap-6">
            <div className="w-24 h-24 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white text-4xl font-bold">
              PW
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-900">Prosper Wedam</h2>
              <p className="text-gray-600">prosperwedam4424@gmail.com</p>
              <p className="text-sm text-gray-500 mt-2">Member since December 2024</p>
            </div>
          </div>
          <Button className="bg-blue-600 hover:bg-blue-700 text-white">
            <Edit2 className="mr-2 w-4 h-4" />
            Edit Profile
          </Button>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg">
              <Mail className="w-5 h-5 text-blue-600" />
              <div>
                <p className="text-xs text-gray-600">Email</p>
                <p className="font-medium text-gray-900">prosperwedam4424@gmail.com</p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg">
              <Phone className="w-5 h-5 text-blue-600" />
              <div>
                <p className="text-xs text-gray-600">Phone</p>
                <p className="font-medium text-gray-900">+233 XXX XXX XXX</p>
              </div>
            </div>
          </div>
          <div className="space-y-4">
            <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg">
              <MapPin className="w-5 h-5 text-blue-600" />
              <div>
                <p className="text-xs text-gray-600">Location</p>
                <p className="font-medium text-gray-900">Accra, Ghana</p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg">
              <User className="w-5 h-5 text-blue-600" />
              <div>
                <p className="text-xs text-gray-600">Account Type</p>
                <p className="font-medium text-gray-900">Agent</p>
              </div>
            </div>
          </div>
        </div>
      </Card>

      <Card className="p-6 border-0 shadow-md">
        <h3 className="text-lg font-bold text-gray-900 mb-4">Security Settings</h3>
        <div className="space-y-3">
          <Button variant="outline" className="w-full justify-start">
            Change Password
          </Button>
          <Button variant="outline" className="w-full justify-start">
            Two-Factor Authentication
          </Button>
          <Button variant="outline" className="w-full justify-start">
            Active Sessions
          </Button>
        </div>
      </Card>
    </div>
  )
}
