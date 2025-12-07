'use client'

import { useState } from 'react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { CheckCircle, AlertCircle, Loader2 } from 'lucide-react'

interface AgentApplicationModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  userId: string
  onSuccess?: () => void
}

export default function AgentApplicationModal({
  open,
  onOpenChange,
  userId,
  onSuccess,
}: AgentApplicationModalProps) {
  const [businessName, setBusinessName] = useState('')
  const [businessDescription, setBusinessDescription] = useState('')
  const [experience, setExperience] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      const response = await fetch('/api/agent/apply', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId,
          businessName,
          businessDescription,
          experience: experience || null,
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        setError(data.message || 'Failed to submit application')
        return
      }

      setSuccess(true)
      setTimeout(() => {
        onOpenChange(false)
        setBusinessName('')
        setBusinessDescription('')
        setExperience('')
        setSuccess(false)
        onSuccess?.()
      }, 2000)
    } catch (err) {
      setError('An error occurred. Please try again.')
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Apply to Become an Agent</DialogTitle>
          <DialogDescription>
            Fill out the form below to apply for agent status. Our team will review your application and get back to you within 24-48 hours.
          </DialogDescription>
        </DialogHeader>

        {success ? (
          <div className="space-y-4 py-6">
            <div className="flex justify-center">
              <CheckCircle className="w-16 h-16 text-green-500" />
            </div>
            <div className="text-center space-y-2">
              <h3 className="font-semibold text-lg text-gray-900">Application Submitted!</h3>
              <p className="text-sm text-gray-600">
                Thank you for applying. We'll review your application and notify you soon.
              </p>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
              <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Business Name *</label>
              <Input
                placeholder="e.g., Prosper's Data Solutions"
                value={businessName}
                onChange={(e) => setBusinessName(e.target.value)}
                required
                disabled={loading}
              />
              <p className="text-xs text-gray-500">
                This will be displayed as your shop name
              </p>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Business Description *</label>
              <Textarea
                placeholder="Describe your business, what data packages you plan to offer, and your target market..."
                value={businessDescription}
                onChange={(e) => setBusinessDescription(e.target.value)}
                required
                disabled={loading}
                rows={4}
              />
              <p className="text-xs text-gray-500">
                Help us understand your business better
              </p>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Experience (Optional)</label>
              <Textarea
                placeholder="Tell us about your experience in data sales, customer service, or related fields..."
                value={experience}
                onChange={(e) => setExperience(e.target.value)}
                disabled={loading}
                rows={3}
              />
            </div>

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 space-y-2">
              <p className="text-sm font-medium text-blue-900">What happens next?</p>
              <ul className="text-xs text-blue-800 space-y-1">
                <li>✓ Our team reviews your application</li>
                <li>✓ We verify your business details</li>
                <li>✓ You'll receive approval notification via email</li>
                <li>✓ Your shop link becomes active immediately</li>
              </ul>
            </div>

            <div className="flex gap-3 pt-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => onOpenChange(false)}
                disabled={loading}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                className="flex-1 bg-blue-600 hover:bg-blue-700"
                disabled={loading || !businessName || !businessDescription}
              >
                {loading ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Submitting...
                  </>
                ) : (
                  'Submit Application'
                )}
              </Button>
            </div>
          </form>
        )}
      </DialogContent>
    </Dialog>
  )
}
