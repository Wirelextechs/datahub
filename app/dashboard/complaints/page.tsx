'use client'

import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Plus } from 'lucide-react'

export default function ComplaintsPage() {
  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">My Complaints</h1>
          <p className="text-gray-600">Report and track your complaints</p>
        </div>
        <Button className="bg-blue-600 hover:bg-blue-700 text-white">
          <Plus className="mr-2 w-4 h-4" />
          New Complaint
        </Button>
      </div>

      <Card className="p-12 border-0 shadow-md text-center">
        <p className="text-gray-600 text-lg">No complaints yet</p>
        <p className="text-gray-500 mt-2">If you have any issues, please submit a complaint</p>
      </Card>
    </div>
  )
}
