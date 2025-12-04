'use client'

import { Card } from '@/components/ui/card'

export default function AFAOrdersPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">AFA Orders</h1>
        <p className="text-gray-600">View and manage your AFA (Airtime For All) orders</p>
      </div>

      <Card className="p-12 border-0 shadow-md text-center">
        <p className="text-gray-600 text-lg">No AFA orders yet</p>
        <p className="text-gray-500 mt-2">Start by purchasing an AFA package</p>
      </Card>
    </div>
  )
}
