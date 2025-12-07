'use client'

import { useState } from 'react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { User, Mail, Phone, MapPin, Edit2, CheckCircle, Save, X, AlertCircle } from 'lucide-react'

interface ProfileData {
  fullName: string
  email: string
  phone: string
  location: string
  bio: string
}

export default function ProfilePage() {
  const [accountType, setAccountType] = useState('customer')
  const [showApplyDialog, setShowApplyDialog] = useState(false)
  const [isApplying, setIsApplying] = useState(false)
  const [approvalMessage, setApprovalMessage] = useState('')
  const [activeTab, setActiveTab] = useState('view')
  const [isSaving, setIsSaving] = useState(false)
  const [saveMessage, setSaveMessage] = useState('')
  const [usernameSet, setUsernameSet] = useState(true) // Set to true if username already exists
  const [username, setUsername] = useState('prosperwedam') // Demo username

  // Profile data state
  const [profileData, setProfileData] = useState<ProfileData>({
    fullName: 'Prosper Wedam',
    email: 'prosperwedam4424@gmail.com',
    phone: '+233 XXX XXX XXX',
    location: 'Accra, Ghana',
    bio: 'Data enthusiast and entrepreneur',
  })

  // Edit form state
  const [editData, setEditData] = useState<ProfileData>(profileData)
  const [editUsername, setEditUsername] = useState(username)

  const handleApplyAsAgent = async () => {
    setIsApplying(true)
    setTimeout(() => {
      setAccountType('agent')
      setApprovalMessage('Your application has been automatically approved! You are now an Agent.')
      setIsApplying(false)
      setShowApplyDialog(false)
      setTimeout(() => setApprovalMessage(''), 5000)
    }, 1500)
  }

  const handleEditChange = (field: keyof ProfileData, value: string) => {
    setEditData({ ...editData, [field]: value })
  }

  const handleSaveProfile = async () => {
    setIsSaving(true)
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500))
      
      // Update profile data
      setProfileData(editData)
      
      // If username wasn't set before, set it now
      if (!usernameSet && editUsername) {
        setUsername(editUsername)
        setUsernameSet(true)
      }
      
      setSaveMessage('✓ Profile updated successfully!')
      
      // Switch back to view tab
      setTimeout(() => {
        setActiveTab('view')
        setSaveMessage('')
      }, 2000)
    } catch (error) {
      setSaveMessage('✗ Failed to update profile. Please try again.')
    } finally {
      setIsSaving(false)
    }
  }

  const handleCancel = () => {
    setEditData(profileData)
    setEditUsername(username)
    setActiveTab('view')
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

      {/* Save Message */}
      {saveMessage && (
        <Card className={`p-4 border-0 shadow-md border-l-4 ${saveMessage.includes('✓') ? 'bg-green-50 border-green-500' : 'bg-red-50 border-red-500'}`}>
          <p className={saveMessage.includes('✓') ? 'text-green-700 font-medium' : 'text-red-700 font-medium'}>{saveMessage}</p>
        </Card>
      )}

      {/* Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="view">View Profile</TabsTrigger>
          <TabsTrigger value="edit">Edit Profile</TabsTrigger>
          <TabsTrigger value="security">Security</TabsTrigger>
        </TabsList>

        {/* View Profile Tab */}
        <TabsContent value="view" className="space-y-6">
          <Card className="p-8 border-0 shadow-md">
            <div className="flex items-start justify-between mb-8">
              <div className="flex items-center gap-6">
                <div className="w-24 h-24 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white text-4xl font-bold">
                  {profileData.fullName.split(' ').map(n => n[0]).join('')}
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">{profileData.fullName}</h2>
                  <p className="text-gray-600">{profileData.email}</p>
                  <p className="text-sm text-gray-500 mt-2">Member since December 2024</p>
                </div>
              </div>
              <Button 
                onClick={() => setActiveTab('edit')}
                className="bg-blue-600 hover:bg-blue-700 text-white"
              >
                <Edit2 className="mr-2 w-4 h-4" />
                Edit Profile
              </Button>
            </div>

            {/* Username Section */}
            <div className="mb-6 p-4 bg-purple-50 rounded-lg border border-purple-200">
              <p className="text-xs text-gray-600 mb-2">Shop Username (Permanent)</p>
              <p className="text-lg font-bold text-gray-900">@{username}</p>
              <p className="text-sm text-gray-600 mt-2">This username is used for your shop link and cannot be changed</p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg">
                  <Mail className="w-5 h-5 text-blue-600" />
                  <div>
                    <p className="text-xs text-gray-600">Email</p>
                    <p className="font-medium text-gray-900">{profileData.email}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg">
                  <Phone className="w-5 h-5 text-blue-600" />
                  <div>
                    <p className="text-xs text-gray-600">Phone</p>
                    <p className="font-medium text-gray-900">{profileData.phone}</p>
                  </div>
                </div>
              </div>
              <div className="space-y-4">
                <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg">
                  <MapPin className="w-5 h-5 text-blue-600" />
                  <div>
                    <p className="text-xs text-gray-600">Location</p>
                    <p className="font-medium text-gray-900">{profileData.location}</p>
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

            {/* Bio Section */}
            <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
              <p className="text-xs text-gray-600 mb-2">Bio</p>
              <p className="text-gray-900">{profileData.bio}</p>
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
        </TabsContent>

        {/* Edit Profile Tab */}
        <TabsContent value="edit" className="space-y-6">
          <Card className="p-8 border-0 shadow-md">
            <h3 className="text-xl font-bold text-gray-900 mb-6">Edit Your Profile</h3>
            
            <div className="space-y-6">
              {/* Username Field - Only editable if not set */}
              {!usernameSet && (
                <div>
                  <Label htmlFor="username" className="text-sm font-medium text-gray-700">
                    Shop Username
                  </Label>
                  <div className="mt-2 p-4 bg-amber-50 border border-amber-200 rounded-lg mb-4">
                    <div className="flex gap-3">
                      <AlertCircle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
                      <div className="text-sm text-amber-800">
                        <p className="font-semibold mb-1">Important: This username cannot be changed later</p>
                        <p>Your shop link will be: <span className="font-mono font-bold">https://datahub-kohl.vercel.app/shop/@{editUsername || 'your-username'}</span></p>
                        <p className="mt-2">Choose wisely as this will be permanent and used for all your shop links.</p>
                      </div>
                    </div>
                  </div>
                  <Input
                    id="username"
                    type="text"
                    value={editUsername}
                    onChange={(e) => setEditUsername(e.target.value.toLowerCase().replace(/[^a-z0-9_-]/g, ''))}
                    placeholder="Enter your shop username"
                    className="mt-2"
                  />
                  <p className="text-xs text-gray-500 mt-2">Lowercase letters, numbers, hyphens, and underscores only</p>
                </div>
              )}

              {/* Username Display - If already set */}
              {usernameSet && (
                <div>
                  <Label className="text-sm font-medium text-gray-700">Shop Username (Permanent)</Label>
                  <div className="mt-2 p-4 bg-purple-50 rounded-lg border border-purple-200">
                    <p className="text-lg font-bold text-gray-900">@{username}</p>
                    <p className="text-sm text-gray-600 mt-2">This username cannot be changed. Your shop link is: <span className="font-mono font-bold">https://datahub-kohl.vercel.app/shop/@{username}</span></p>
                  </div>
                </div>
              )}

              {/* Full Name */}
              <div>
                <Label htmlFor="fullName" className="text-sm font-medium text-gray-700">Full Name</Label>
                <Input
                  id="fullName"
                  type="text"
                  value={editData.fullName}
                  onChange={(e) => handleEditChange('fullName', e.target.value)}
                  placeholder="Enter your full name"
                  className="mt-2"
                />
              </div>

              {/* Email */}
              <div>
                <Label htmlFor="email" className="text-sm font-medium text-gray-700">Email Address</Label>
                <Input
                  id="email"
                  type="email"
                  value={editData.email}
                  onChange={(e) => handleEditChange('email', e.target.value)}
                  placeholder="Enter your email"
                  className="mt-2"
                />
              </div>

              {/* Phone */}
              <div>
                <Label htmlFor="phone" className="text-sm font-medium text-gray-700">Phone Number</Label>
                <Input
                  id="phone"
                  type="tel"
                  value={editData.phone}
                  onChange={(e) => handleEditChange('phone', e.target.value)}
                  placeholder="Enter your phone number"
                  className="mt-2"
                />
              </div>

              {/* Location */}
              <div>
                <Label htmlFor="location" className="text-sm font-medium text-gray-700">Location</Label>
                <Input
                  id="location"
                  type="text"
                  value={editData.location}
                  onChange={(e) => handleEditChange('location', e.target.value)}
                  placeholder="Enter your location"
                  className="mt-2"
                />
              </div>

              {/* Bio */}
              <div>
                <Label htmlFor="bio" className="text-sm font-medium text-gray-700">Bio</Label>
                <textarea
                  id="bio"
                  value={editData.bio}
                  onChange={(e) => handleEditChange('bio', e.target.value)}
                  placeholder="Tell us about yourself"
                  rows={4}
                  className="w-full mt-2 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3 pt-6">
                <Button
                  onClick={handleSaveProfile}
                  disabled={isSaving || (!usernameSet && !editUsername)}
                  className="flex-1 bg-blue-600 hover:bg-blue-700 text-white"
                >
                  <Save className="mr-2 w-4 h-4" />
                  {isSaving ? 'Saving...' : 'Save Changes'}
                </Button>
                <Button
                  onClick={handleCancel}
                  disabled={isSaving}
                  variant="outline"
                  className="flex-1"
                >
                  <X className="mr-2 w-4 h-4" />
                  Cancel
                </Button>
              </div>
            </div>
          </Card>
        </TabsContent>

        {/* Security Tab */}
        <TabsContent value="security" className="space-y-6">
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
        </TabsContent>
      </Tabs>

      {/* Apply as Agent Dialog */}
      <Dialog open={showApplyDialog} onOpenChange={setShowApplyDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Apply to Become an Agent</DialogTitle>
            <DialogDescription>
              Your application will be automatically approved. Once approved, you&apos;ll be able to earn commissions on every sale.
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
