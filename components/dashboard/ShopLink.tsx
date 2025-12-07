'use client'

import { useState } from 'react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Copy, ExternalLink, Lock } from 'lucide-react'
import AgentApplicationModal from './AgentApplicationModal'

interface ShopLinkProps {
  username?: string
  isApprovedAgent?: boolean
  userId?: string
}

export default function ShopLink({ username = 'prosperwedam', isApprovedAgent = false, userId = '' }: ShopLinkProps) {
  const [copied, setCopied] = useState(false)
  const [applicationModalOpen, setApplicationModalOpen] = useState(false)

  const shopLink = `https://datahub-kohl.vercel.app/shop/@${username}`

  const copyToClipboard = () => {
    navigator.clipboard.writeText(shopLink)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  // Only show shop link for approved agents
  if (!isApprovedAgent) {
    return (
      <>
        <Card className="p-6 border-0 shadow-md bg-gradient-to-br from-amber-50 to-orange-50">
          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <Lock className="w-5 h-5 text-amber-600 mt-0.5 flex-shrink-0" />
              <div>
                <p className="font-semibold text-gray-900 mb-1">Shop Link Locked</p>
                <p className="text-sm text-gray-700 mb-3">
                  Your shop link will be available once you&apos;re approved as an agent. Apply now to start selling!
                </p>
                <Button 
                  className="bg-blue-600 hover:bg-blue-700 text-white"
                  onClick={() => setApplicationModalOpen(true)}
                >
                  Apply to Become an Agent
                </Button>
              </div>
            </div>
          </div>
        </Card>

        <AgentApplicationModal
          open={applicationModalOpen}
          onOpenChange={setApplicationModalOpen}
          userId={userId}
        />
      </>
    )
  }

  return (
    <Card className="p-6 border-0 shadow-md bg-gradient-to-br from-purple-50 to-blue-50">
      <div className="space-y-4">
        <div>
          <p className="text-sm font-medium text-gray-700 mb-2">Your Shop Link</p>
          <div className="flex items-center gap-2 bg-white p-3 rounded-lg border border-gray-200">
            <input
              type="text"
              value={shopLink}
              readOnly
              className="flex-1 bg-transparent text-gray-900 font-medium outline-none text-sm"
            />
            <Button
              size="sm"
              variant="ghost"
              className="text-blue-600 hover:text-blue-700"
              onClick={copyToClipboard}
              title="Copy shop link"
            >
              <Copy className="w-4 h-4" />
            </Button>
            <Button
              size="sm"
              variant="ghost"
              className="text-blue-600 hover:text-blue-700"
              onClick={() => window.open(shopLink, '_blank')}
              title="Visit shop"
            >
              <ExternalLink className="w-4 h-4" />
            </Button>
          </div>
          {copied && (
            <p className="text-sm text-green-600 mt-2">✓ Copied to clipboard!</p>
          )}
        </div>
        <p className="text-xs text-gray-600">
          Your shop username is <span className="font-mono font-bold">@{username}</span> and cannot be changed
        </p>
      </div>
    </Card>
  )
}
