'use client'

import { useState, useEffect } from 'react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { CheckCircle, XCircle, Clock, Loader2 } from 'lucide-react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'

interface AgentApplication {
  id: number
  user_id: number
  business_name: string
  business_description: string
  experience: string | null
  status: 'pending' | 'approved' | 'rejected'
  created_at: string
  user_email?: string
  user_name?: string
}

export default function AdminApplications() {
  const [applications, setApplications] = useState<AgentApplication[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedApp, setSelectedApp] = useState<AgentApplication | null>(null)
  const [actionLoading, setActionLoading] = useState(false)

  useEffect(() => {
    fetchApplications()
  }, [])

  const fetchApplications = async () => {
    try {
      const response = await fetch('/api/admin/applications')
      const data = await response.json()
      setApplications(data.applications || [])
    } catch (error) {
      console.error('Error fetching applications:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleApprove = async (appId: number) => {
    setActionLoading(true)
    try {
      const response = await fetch(`/api/admin/applications/${appId}/approve`, {
        method: 'POST',
      })

      if (response.ok) {
        setApplications(
          applications.map((app) =>
            app.id === appId ? { ...app, status: 'approved' } : app
          )
        )
        setSelectedApp(null)
      }
    } catch (error) {
      console.error('Error approving application:', error)
    } finally {
      setActionLoading(false)
    }
  }

  const handleReject = async (appId: number) => {
    setActionLoading(true)
    try {
      const response = await fetch(`/api/admin/applications/${appId}/reject`, {
        method: 'POST',
      })

      if (response.ok) {
        setApplications(
          applications.map((app) =>
            app.id === appId ? { ...app, status: 'rejected' } : app
          )
        )
        setSelectedApp(null)
      }
    } catch (error) {
      console.error('Error rejecting application:', error)
    } finally {
      setActionLoading(false)
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'approved':
        return <CheckCircle className="w-5 h-5 text-green-600" />
      case 'rejected':
        return <XCircle className="w-5 h-5 text-red-600" />
      case 'pending':
        return <Clock className="w-5 h-5 text-yellow-600" />
      default:
        return null
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'approved':
        return 'bg-green-100 text-green-800'
      case 'rejected':
        return 'bg-red-100 text-red-800'
      case 'pending':
        return 'bg-yellow-100 text-yellow-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
      </div>
    )
  }

  const pendingApps = applications.filter((app) => app.status === 'pending')
  const approvedApps = applications.filter((app) => app.status === 'approved')
  const rejectedApps = applications.filter((app) => app.status === 'rejected')

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Agent Applications</h1>
        <p className="text-gray-600 mt-2">Review and manage agent applications</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="p-6 border-0 shadow-md">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">Pending</p>
              <p className="text-3xl font-bold text-yellow-600">{pendingApps.length}</p>
            </div>
            <Clock className="w-8 h-8 text-yellow-600 opacity-20" />
          </div>
        </Card>

        <Card className="p-6 border-0 shadow-md">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">Approved</p>
              <p className="text-3xl font-bold text-green-600">{approvedApps.length}</p>
            </div>
            <CheckCircle className="w-8 h-8 text-green-600 opacity-20" />
          </div>
        </Card>

        <Card className="p-6 border-0 shadow-md">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">Rejected</p>
              <p className="text-3xl font-bold text-red-600">{rejectedApps.length}</p>
            </div>
            <XCircle className="w-8 h-8 text-red-600 opacity-20" />
          </div>
        </Card>
      </div>

      {/* Pending Applications */}
      {pendingApps.length > 0 && (
        <div className="space-y-4">
          <h2 className="text-xl font-bold text-gray-900">Pending Applications</h2>
          <div className="space-y-3">
            {pendingApps.map((app) => (
              <Card
                key={app.id}
                className="p-4 border-0 shadow-md hover:shadow-lg transition-shadow cursor-pointer"
                onClick={() => setSelectedApp(app)}
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <h3 className="font-semibold text-gray-900">{app.business_name}</h3>
                      <Badge className={getStatusColor(app.status)}>
                        {app.status}
                      </Badge>
                    </div>
                    <p className="text-sm text-gray-600 mb-2">{app.business_description}</p>
                    <p className="text-xs text-gray-500">
                      Applied: {new Date(app.created_at).toLocaleDateString()}
                    </p>
                  </div>
                  <div className="flex-shrink-0">
                    {getStatusIcon(app.status)}
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      )}

      {/* Approved Applications */}
      {approvedApps.length > 0 && (
        <div className="space-y-4">
          <h2 className="text-xl font-bold text-gray-900">Approved Applications</h2>
          <div className="space-y-3">
            {approvedApps.map((app) => (
              <Card
                key={app.id}
                className="p-4 border-0 shadow-md bg-green-50"
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <h3 className="font-semibold text-gray-900">{app.business_name}</h3>
                      <Badge className={getStatusColor(app.status)}>
                        {app.status}
                      </Badge>
                    </div>
                    <p className="text-sm text-gray-600 mb-2">{app.business_description}</p>
                    <p className="text-xs text-gray-500">
                      Approved: {new Date(app.created_at).toLocaleDateString()}
                    </p>
                  </div>
                  <div className="flex-shrink-0">
                    {getStatusIcon(app.status)}
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      )}

      {/* Application Detail Modal */}
      {selectedApp && (
        <Dialog open={!!selectedApp} onOpenChange={() => setSelectedApp(null)}>
          <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle>{selectedApp.business_name}</DialogTitle>
              <DialogDescription>
                Application Details
              </DialogDescription>
            </DialogHeader>

            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium text-gray-700">Status</label>
                <Badge className={`${getStatusColor(selectedApp.status)} mt-1`}>
                  {selectedApp.status}
                </Badge>
              </div>

              <div>
                <label className="text-sm font-medium text-gray-700">Business Description</label>
                <p className="text-sm text-gray-600 mt-1">{selectedApp.business_description}</p>
              </div>

              {selectedApp.experience && (
                <div>
                  <label className="text-sm font-medium text-gray-700">Experience</label>
                  <p className="text-sm text-gray-600 mt-1">{selectedApp.experience}</p>
                </div>
              )}

              <div>
                <label className="text-sm font-medium text-gray-700">Applied Date</label>
                <p className="text-sm text-gray-600 mt-1">
                  {new Date(selectedApp.created_at).toLocaleString()}
                </p>
              </div>

              {selectedApp.status === 'pending' && (
                <div className="flex gap-3 pt-4">
                  <Button
                    variant="outline"
                    className="flex-1"
                    onClick={() => handleReject(selectedApp.id)}
                    disabled={actionLoading}
                  >
                    {actionLoading ? (
                      <>
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                        Processing...
                      </>
                    ) : (
                      'Reject'
                    )}
                  </Button>
                  <Button
                    className="flex-1 bg-green-600 hover:bg-green-700"
                    onClick={() => handleApprove(selectedApp.id)}
                    disabled={actionLoading}
                  >
                    {actionLoading ? (
                      <>
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                        Processing...
                      </>
                    ) : (
                      'Approve'
                    )}
                  </Button>
                </div>
              )}
            </div>
          </DialogContent>
        </Dialog>
      )}
    </div>
  )
}
