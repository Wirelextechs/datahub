'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import Link from 'next/link'
import { Mail, Lock, Eye, EyeOff, ArrowRight } from 'lucide-react'
import { useRouter } from 'next/navigation'

export default function LoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError('')

    try {
      // Call API to verify credentials
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      })

      const data = await response.json()

      if (!response.ok) {
        setError(data.message || 'Invalid email or password')
        setIsLoading(false)
        return
      }

      // Store user info in localStorage
      localStorage.setItem('user', JSON.stringify(data.user))
      localStorage.setItem('token', data.token)

      // Redirect based on role
      if (data.user.is_admin) {
        router.push('/dashboard/admin')
      } else {
        router.push('/dashboard')
      }
    } catch (err) {
      setError('An error occurred. Please try again.')
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center p-4">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 right-10 w-96 h-96 bg-gradient-to-br from-blue-500/30 to-purple-500/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-20 w-80 h-80 bg-gradient-to-tr from-cyan-500/20 to-blue-500/10 rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10 w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <span className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              DataHub
            </span>
          </div>
          <p className="text-gray-400">Ghana's #1 Data Hub Platform</p>
        </div>

        {/* Login Card */}
        <Card className="p-8 border-0 shadow-2xl bg-slate-800/50 backdrop-blur-xl">
          <h1 className="text-2xl font-bold text-white mb-2">Welcome Back</h1>
          <p className="text-gray-400 mb-6">Sign in to your account to continue</p>

          <form onSubmit={handleLogin} className="space-y-4">
            {/* Email Field */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-3 top-3 w-5 h-5 text-gray-500" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  className="w-full pl-10 pr-4 py-2 bg-slate-700/50 border border-slate-600 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                />
              </div>
            </div>

            {/* Password Field */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-3 w-5 h-5 text-gray-500" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-10 pr-10 py-2 bg-slate-700/50 border border-slate-600 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-3 text-gray-500 hover:text-gray-400"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>

            {/* Error Message */}
            {error && (
              <div className="p-3 bg-red-500/20 border border-red-500/50 rounded-lg text-red-300 text-sm">
                {error}
              </div>
            )}

            {/* Remember Me & Forgot Password */}
            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center gap-2 text-gray-400 cursor-pointer hover:text-gray-300">
                <input type="checkbox" className="w-4 h-4 rounded" />
                Remember me
              </label>
              <Link href="#" className="text-blue-400 hover:text-blue-300 transition-colors">
                Forgot password?
              </Link>
            </div>

            {/* Sign In Button */}
            <Button
              type="submit"
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold py-2 rounded-lg transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? 'Signing in...' : 'Sign In'}
              {!isLoading && <ArrowRight className="ml-2 w-4 h-4" />}
            </Button>
          </form>

          {/* Divider */}
          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-slate-600"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-slate-800/50 text-gray-400">Or continue with</span>
            </div>
          </div>

          {/* Social Login */}
          <div className="grid grid-cols-2 gap-4">
            <Button variant="outline" className="bg-slate-700/50 border-slate-600 text-white hover:bg-slate-700">
              Google
            </Button>
            <Button variant="outline" className="bg-slate-700/50 border-slate-600 text-white hover:bg-slate-700">
              Facebook
            </Button>
          </div>

          {/* Sign Up Link */}
          <p className="text-center text-gray-400 text-sm mt-6">
            Don't have an account?{' '}
            <Link href="/signup" className="text-blue-400 hover:text-blue-300 font-semibold transition-colors">
              Sign up here
            </Link>
          </p>
        </Card>

        {/* Demo Credentials */}
        <Card className="mt-6 p-4 border-0 shadow-lg bg-blue-500/10 border border-blue-500/30 backdrop-blur-xl">
          <p className="text-xs text-gray-400 mb-2">Demo Credentials:</p>
          <p className="text-sm text-blue-300 font-mono">Email: demo@datahub.com</p>
          <p className="text-sm text-blue-300 font-mono">Password: demo123</p>
          <p className="text-xs text-gray-400 mt-3 mb-2">Admin Credentials:</p>
          <p className="text-sm text-green-300 font-mono">Email: admin@datahub.com</p>
          <p className="text-sm text-green-300 font-mono">Password: admin123</p>
        </Card>
      </div>
    </div>
  )
}
