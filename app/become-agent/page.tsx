'use client'

import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import Link from 'next/link'
import { CheckCircle, TrendingUp, Users, Zap, Award, BarChart3, ArrowRight } from 'lucide-react'

export default function BecomeAgentPage() {
  const benefits = [
    { icon: TrendingUp, title: 'Higher Commissions', description: 'Earn up to 20% commission as an agent' },
    { icon: Users, title: 'Build Your Team', description: 'Recruit sub-agents and earn from their sales' },
    { icon: Zap, title: 'Priority Support', description: '24/7 dedicated support for agents' },
    { icon: Award, title: 'Exclusive Rewards', description: 'Access to exclusive bonuses and incentives' },
    { icon: BarChart3, title: 'Advanced Analytics', description: 'Detailed reports and sales analytics' },
    { icon: CheckCircle, title: 'Verified Badge', description: 'Get a verified agent badge on your profile' },
  ]

  const requirements = [
    'Must be 18 years or older',
    'Valid Ghana ID or Passport',
    'Active phone number and email',
    'Minimum 5 successful transactions',
    'Good account standing (no complaints)',
    'Willing to promote DataHub services',
  ]

  const agentTiers = [
    {
      name: 'Silver Agent',
      commission: '15%',
      minSales: '0',
      features: ['Basic analytics', 'Email support', 'Agent badge'],
      color: 'from-gray-400 to-gray-600',
    },
    {
      name: 'Gold Agent',
      commission: '18%',
      minSales: '100',
      features: ['Advanced analytics', 'Priority support', 'Agent badge', 'Exclusive offers'],
      color: 'from-yellow-400 to-yellow-600',
      popular: true,
    },
    {
      name: 'Platinum Agent',
      commission: '20%',
      minSales: '500',
      features: ['Full analytics', '24/7 support', 'Agent badge', 'Exclusive offers', 'Team management'],
      color: 'from-blue-400 to-blue-600',
    },
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
          <h1 className="text-5xl font-bold text-white mb-4">Become a DataHub Agent</h1>
          <p className="text-xl text-gray-400 mb-8">
            Unlock higher commissions and build your own data reselling business
          </p>
          <Link href="/signup">
            <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold px-8 py-6 rounded-lg">
              Apply Now
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </Link>
        </div>

        {/* Benefits Section */}
        <div className="max-w-6xl mx-auto px-4 py-16">
          <h2 className="text-3xl font-bold text-white mb-12 text-center">Agent Benefits</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {benefits.map((benefit, idx) => {
              const Icon = benefit.icon
              return (
                <Card key={idx} className="p-6 border-0 shadow-lg bg-slate-800/50 backdrop-blur-xl hover:shadow-xl transition-shadow">
                  <div className="p-3 bg-blue-500/20 rounded-lg mb-4 w-fit">
                    <Icon className="w-6 h-6 text-blue-400" />
                  </div>
                  <h3 className="text-lg font-bold text-white mb-2">{benefit.title}</h3>
                  <p className="text-gray-400 text-sm">{benefit.description}</p>
                </Card>
              )
            })}
          </div>
        </div>

        {/* Agent Tiers */}
        <div className="max-w-6xl mx-auto px-4 py-16">
          <h2 className="text-3xl font-bold text-white mb-12 text-center">Agent Tiers</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {agentTiers.map((tier, idx) => (
              <Card
                key={idx}
                className={`p-8 border-0 shadow-lg backdrop-blur-xl transition-all ${
                  tier.popular
                    ? 'bg-gradient-to-br from-yellow-500/20 to-yellow-600/20 border border-yellow-500/50 scale-105'
                    : 'bg-slate-800/50'
                }`}
              >
                {tier.popular && (
                  <div className="mb-4">
                    <span className="px-3 py-1 bg-gradient-to-r from-yellow-400 to-yellow-600 text-white text-xs font-bold rounded-full">
                      MOST POPULAR
                    </span>
                  </div>
                )}
                <h3 className="text-2xl font-bold text-white mb-2">{tier.name}</h3>
                <div className="mb-6">
                  <p className="text-gray-400 text-sm mb-1">Commission Rate</p>
                  <p className="text-4xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                    {tier.commission}
                  </p>
                </div>
                <div className="mb-6 pb-6 border-b border-slate-700">
                  <p className="text-gray-400 text-sm mb-1">Minimum Monthly Sales</p>
                  <p className="text-xl font-semibold text-white">GHS {tier.minSales}</p>
                </div>
                <div className="space-y-3 mb-6">
                  {tier.features.map((feature, fidx) => (
                    <div key={fidx} className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-green-400" />
                      <span className="text-gray-300 text-sm">{feature}</span>
                    </div>
                  ))}
                </div>
                <Link href="/signup">
                  <Button className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold">
                    Choose Plan
                  </Button>
                </Link>
              </Card>
            ))}
          </div>
        </div>

        {/* Requirements Section */}
        <div className="max-w-4xl mx-auto px-4 py-16">
          <h2 className="text-3xl font-bold text-white mb-8 text-center">Agent Requirements</h2>
          <Card className="p-8 border-0 shadow-lg bg-slate-800/50 backdrop-blur-xl">
            <div className="grid md:grid-cols-2 gap-6">
              {requirements.map((req, idx) => (
                <div key={idx} className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-400 mt-1 flex-shrink-0" />
                  <p className="text-gray-300">{req}</p>
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* How It Works */}
        <div className="max-w-6xl mx-auto px-4 py-16">
          <h2 className="text-3xl font-bold text-white mb-12 text-center">How It Works</h2>
          <div className="grid md:grid-cols-4 gap-6">
            {[
              { step: 1, title: 'Apply', desc: 'Submit your agent application' },
              { step: 2, title: 'Verify', desc: 'We verify your information' },
              { step: 3, title: 'Activate', desc: 'Your agent account is activated' },
              { step: 4, title: 'Earn', desc: 'Start earning higher commissions' },
            ].map((item) => (
              <Card key={item.step} className="p-6 border-0 shadow-lg bg-slate-800/50 backdrop-blur-xl text-center">
                <div className="flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 text-white font-bold mb-4 mx-auto">
                  {item.step}
                </div>
                <h3 className="text-lg font-bold text-white mb-2">{item.title}</h3>
                <p className="text-gray-400 text-sm">{item.desc}</p>
              </Card>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="max-w-4xl mx-auto px-4 py-16 text-center">
          <Card className="p-12 border-0 shadow-2xl bg-gradient-to-r from-blue-600/20 to-purple-600/20 backdrop-blur-xl border border-blue-500/30">
            <h2 className="text-3xl font-bold text-white mb-4">Ready to Become an Agent?</h2>
            <p className="text-gray-300 mb-8 text-lg">
              Join our growing network of successful agents and start earning more today
            </p>
            <Link href="/signup">
              <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold px-8 py-6 rounded-lg">
                Apply as Agent
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>
          </Card>
        </div>
      </div>
    </div>
  )
}
