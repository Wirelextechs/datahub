'use client'

import { useState } from 'react'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { AlertCircle, CheckCircle2, Lock } from 'lucide-react'

interface UsernameSetupModalProps {
  isOpen: boolean
  onComplete: (username: string) => void
  userEmail: string
}

export function UsernameSetupModal({ isOpen, onComplete, userEmail }: UsernameSetupModalProps) {
  const [username, setUsername] = useState('')
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const validateUsername = (value: string): { valid: boolean; error?: string } => {
    if (!value.trim()) {
      return { valid: false, error: 'Username is required' }
    }

    if (value.length < 3) {
      return { valid: false, error: 'Username must be at least 3 characters' }
    }

    if (value.length > 30) {
      return { valid: false, error: 'Username must be at most 30 characters' }
    }

    if (!/^[a-z0-9_-]+$/.test(value)) {
      return {
        valid: false,
        error: 'Username can only contain lowercase letters, numbers, hyphens, and underscores',
      }
    }

    return { valid: true }
  }

  const handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.toLowerCase()
    setUsername(value)
    setError('')
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    const validation = validateUsername(username)
    if (!validation.valid) {
      setError(validation.error || 'Invalid username')
      return
    }

    setIsLoading(true)
    try {
      const response = await fetch('/api/auth/set-username', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username }),
      })

      if (!response.ok) {
        const data = await response.json()
        setError(data.message || 'Failed to set username')
        return
      }

      onComplete(username)
    } catch (err) {
      setError('An error occurred. Please try again.')
      console.error(err)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={() => {}}>
      <DialogContent className="max-w-md" onPointerDownOutside={(e) => e.preventDefault()}>
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Lock className="w-5 h-5 text-blue-600" />
            Set Your Shop Username
          </DialogTitle>
          <DialogDescription>
            This is a one-time setup. Choose wisely as this cannot be changed later.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          {/* Information Alert */}
          <Alert className="bg-blue-50 border-blue-200">
            <AlertCircle className="h-4 w-4 text-blue-600" />
            <AlertDescription className="text-blue-900 text-sm">
              Your username will be used to create your unique shop link: <br />
              <code className="font-semibold">@{username || 'yourname'}</code>
            </AlertDescription>
          </Alert>

          {/* Username Input */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="username" className="text-sm font-medium">
                Choose Your Username
              </Label>
              <div className="flex items-center gap-2 mt-2">
                <span className="text-gray-600">@</span>
                <Input
                  id="username"
                  type="text"
                  placeholder="e.g., prosper-wedam"
                  value={username}
                  onChange={handleUsernameChange}
                  disabled={isLoading}
                  className="flex-1"
                  autoFocus
                />
              </div>
              <p className="text-xs text-gray-500 mt-2">
                3-30 characters. Lowercase letters, numbers, hyphens, and underscores only.
              </p>
            </div>

            {/* Error Message */}
            {error && (
              <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            {/* Important Notice */}
            <Alert className="bg-amber-50 border-amber-200">
              <AlertCircle className="h-4 w-4 text-amber-600" />
              <AlertDescription className="text-amber-900 text-sm">
                <strong>⚠️ Important:</strong> This username cannot be changed once set. It will be permanently linked to your account and used for your shop link.
              </AlertDescription>
            </Alert>

            {/* Action Buttons */}
            <div className="flex gap-2 pt-4">
              <Button
                type="submit"
                disabled={isLoading || !username.trim()}
                className="flex-1 bg-blue-600 hover:bg-blue-700 text-white"
              >
                {isLoading ? 'Setting up...' : 'Confirm & Continue'}
              </Button>
            </div>

            {/* Benefits */}
            <div className="bg-gray-50 p-3 rounded-lg space-y-2">
              <p className="text-xs font-semibold text-gray-700">Your username will be used for:</p>
              <ul className="text-xs text-gray-600 space-y-1">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3 h-3 text-green-600" />
                  Your unique shop link
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3 h-3 text-green-600" />
                  Customer identification
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3 h-3 text-green-600" />
                  Account branding
                </li>
              </ul>
            </div>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  )
}
