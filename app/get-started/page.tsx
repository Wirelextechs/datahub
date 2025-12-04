'use client'

import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import Link from 'next/link'
import { CheckCircle, Zap, TrendingUp, Users, ArrowRight, Play } from 'lucide-react'

export default function GetStartedPage() {
  const steps = [
    {
      number: 1,
      title: 'Create Your Account',
      description: 'Sign up with your email and phone number to get started',
      icon: Users,
    },
    {
      number: 2,
      title: 'Browse Data Packages',
      description: 'Explore MTN, AirtelTigo, and Telecel data packages',
      icon: Zap,
    },
    {
      number: 3,
      title: 'Make Your First Purchase',
      description: 'Buy data packages and start earning commissions',
      icon: TrendingUp,
    },
    {
      number: 4,
      title: 'Become an Agent',
      description: 'Upgrade to agent status and build your own shop',
      icon: CheckCircle,
    },
  ]

  const features = [
    { title: 'Easy to Use', description: 'Simple and intuitive interface' },
    { title: 'Fast Transactions', description: 'Instant data delivery' },
    { title: 'Great Commissions', description: 'Earn up to 15% per sale' },
    { title: '24/7 Support', description: 'Always here to help' },
    { title: 'Secure Payments', description: 'Safe and encrypted transactions' },
    { title: 'Multiple Networks', description: 'MTN, AirtelTigo, Telecel' },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 right-10 w-96 h-96 bg-gradient-to-br from-blue-500/30 to-purple-500/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-20 w-80 h-80 bg-gradient-to-tr from-cyan-500/20 to-blue-500/10 rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10">
        {/* Header */}
        <div className="max-w-6xl mx-auto px-4 py-16 text-center">
          <h1 className="text-5xl font-bold text-white mb-4">Get Started with DataHub</h1>
          <p className="text-xl text-gray-400 mb-8">
            Join thousands of Ghanaians earning money by selling data packages
          </p>
          <div className="flex gap-4 justify-center">
            <Link href="/signup">
              <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold px-8 py-6 rounded-lg">
                <Play className="mr-2 w-5 h-5" />
                Start Now
              </Button>
            </Link>
            <Link href="/login">
              <Button variant="outline" className="border-blue-500 text-blue-400 hover:bg-blue-500/10 font-semibold px-8 py-6 rounded-lg">
                Already have an account?
              </Button>
            </Link>
          </div>
        </div>

        {/* Steps Section */}
        <div className="max-w-6xl mx-auto px-4 py-16">
          <h2 className="text-3xl font-bold text-white mb-12 text-center">4 Simple Steps</h2>
          <div className="grid md:grid-cols-4 gap-6">
            {steps.map((step) => {
              const Icon = step.icon
              return (
                <Card key={step.number} className="p-6 border-0 shadow-lg bg-slate-800/50 backdrop-blur-xl hover:shadow-xl transition-shadow">
                  <div className="flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 text-white font-bold mb-4">
                    {step.number}
                  </div>
                  <div className="p-3 bg-blue-500/20 rounded-lg mb-4 w-fit">
                    <Icon className="w-6 h-6 text-blue-400" />
                  </div>
                  <h3 className="text-lg font-bold text-white mb-2">{step.title}</h3>
                  <p className="text-gray-400 text-sm">{step.description}</p>
                </Card>
              )
            })}
          </div>
        </div>

        {/* Features Section */}
        <div className="max-w-6xl mx-auto px-4 py-16">
          <h2 className="text-3xl font-bold text-white mb-12 text-center">Why Choose DataHub?</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {features.map((feature, idx) => (
              <Card key={idx} className="p-6 border-0 shadow-lg bg-slate-800/50 backdrop-blur-xl hover:shadow-xl transition-shadow">
                <div className="flex items-center gap-3 mb-3">
                  <CheckCircle className="w-5 h-5 text-green-400" />
                  <h3 className="text-lg font-bold text-white">{feature.title}</h3>
                </div>
                <p className="text-gray-400 text-sm">{feature.description}</p>
              </Card>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="max-w-4xl mx-auto px-4 py-16">
          <Card className="p-12 border-0 shadow-2xl bg-gradient-to-r from-blue-600/20 to-purple-600/20 backdrop-blur-xl border border-blue-500/30">
            <div className="text-center">
              <h2 className="text-3xl font-bold text-white mb-4">Ready to Start Earning?</h2>
              <p className="text-gray-300 mb-8 text-lg">
                Join DataHub today and start selling data packages to earn commissions
              </p>
              <Link href="/signup">
                <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold px-8 py-6 rounded-lg">
                  Create Free Account
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </Link>
            </div>
          </Card>
        </div>

        {/* FAQ Section */}
        <div className="max-w-4xl mx-auto px-4 py-16">
          <h2 className="text-3xl font-bold text-white mb-12 text-center">Frequently Asked Questions</h2>
          <div className="space-y-4">
            {[
              { q: 'Is it free to join?', a: 'Yes, creating an account is completely free. No hidden charges.' },
              { q: 'How do I earn money?', a: 'You earn commissions on every data package you sell. The more you sell, the more you earn.' },
              { q: 'How do I withdraw my earnings?', a: 'You can request withdrawals anytime. We process withdrawals within 24-48 hours.' },
              { q: 'Which networks are supported?', a: 'We support MTN, AirtelTigo, and Telecel data packages.' },
            ].map((faq, idx) => (
              <Card key={idx} className="p-6 border-0 shadow-lg bg-slate-800/50 backdrop-blur-xl">
                <h3 className="text-lg font-bold text-white mb-2">{faq.q}</h3>
                <p className="text-gray-400">{faq.a}</p>
              </Card>
            ))}
          </div>
        </div>

        {/* Footer CTA */}
        <div className="max-w-6xl mx-auto px-4 py-16 text-center">
          <p className="text-gray-400 mb-6">Have questions? Contact our support team</p>
          <Link href="mailto:support@datahub.com">
            <Button variant="outline" className="border-blue-500 text-blue-400 hover:bg-blue-500/10">
              Contact Support
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}
