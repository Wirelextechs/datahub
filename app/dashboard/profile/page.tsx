'use client'

import { useState } from 'react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog'
import { User, Mail, Phone, MapPin, Edit2, CheckCircle } from 'lucide-react'

export default function ProfilePage() {
  const [accountType, setAccountType] = useState('customer') // Default to customer
  const [showApplyDialog, setShowApplyDialog] = useState(false)
  const [isApplying, setIsApplying] = useState(false)
  const [approvalMessage, setApprovalMessage] = useState('')

  const handleApplyAsAgent = async () => {
    setIsApplying(true)
    // Simulate API call
    setTimeout(() => {
      setAccountType('agent')
      setApprovalMessage('Your application has been automatically approved! You are now an Agent.')
      setIsApplying(false)
      setShowApplyDialog(false)
      // Clear message after 5 seconds
      setTimeout(() => setApprovalMessage(''), 5000)
    }, 1500)
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Profile</h1>
        <p className="text-gray-600">Manage your account information</p>
      </div>

      {/* Approval Message */}
      {approvalMessage && (
        <Card className="p-4 border-0 shadow-md bg-green-50 border-l-4 border-green-500">
          <div className="flex items-center gap-3">
            <CheckCircle className="w-5 h-5 text-green-600" />
            <p className="text-green-700 font-medium">{approvalMessage}</p>
          </div>
        </Card>
      )}

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
                <p className="font-medium text-gray-900 capitalize">{accountType}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Become an Agent Section */}
        {accountType === 'customer' && (
          <div className="mt-8 p-6 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg border border-blue-200">
            <h3 className="text-lg font-bold text-gray-900 mb-2">Ready to Earn More?</h3>
            <p className="text-gray-600 mb-4">
              Become an agent and start earning commissions on every sale. Apply now and get instant approval!
            </p>
            <Button 
              onClick={() => setShowApplyDialog(true)}
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white"
            >
              Become an Agent
            </Button>
          </div>
        )}

        {/* Agent Status Badge */}
        {accountType === 'agent' && (
          <div className="mt-8 p-6 bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg border border-green-200">
            <div className="flex items-center gap-3">
              <CheckCircle className="w-6 h-6 text-green-600" />
              <div>
                <h3 className="text-lg font-bold text-green-900">Agent Status Active</h3>
                <p className="text-green-700">You are now an approved agent and can earn commissions!</p>
              </div>
            </div>
          </div>
        )}
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

      {/* Apply as Agent Dialog */}
      <Dialog open={showApplyDialog} onOpenChange={setShowApplyDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Apply to Become an Agent</DialogTitle>
            <DialogDescription>
              Your application will be automatically approved. Once approved, you'll be able to earn commissions on every sale.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
              <h4 className="font-semibold text-gray-900 mb-2">Agent Benefits:</h4>
              <ul className="space-y-2 text-sm text-gray-700">
                <li>✓ Earn commissions on every sale</li>
                <li>✓ Access to agent dashboard</li>
                <li>✓ Withdrawal options</li>
                <li>✓ Profit tracking</li>
                <li>✓ Priority support</li>
              </ul>
            </div>
          </div>
          <div className="flex gap-3">
            <Button 
              variant="outline" 
              onClick={() => setShowApplyDialog(false)}
              disabled={isApplying}
            >
              Cancel
            </Button>
            <Button 
              onClick={handleApplyAsAgent}
              disabled={isApplying}
              className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white"
            >
              {isApplying ? 'Processing...' : 'Confirm Application'}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
