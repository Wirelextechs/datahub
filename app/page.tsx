'use client'

import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { ArrowRight, Package, Zap, Users, Shield, Star, CheckCircle2, Lock, Smartphone, TrendingUp, Headphones, Wallet, Zap as Lightning, Sparkles } from 'lucide-react'
import Link from 'next/link'
import { useState, useEffect } from 'react'

export default function Home() {
  const [selectedNetwork, setSelectedNetwork] = useState('mtn')
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    setIsLoaded(true)
  }, [])

  // Sample data packages for different networks
  const packages = {
    mtn: [
      { size: '1GB', price: 'GH₵5.00', validity: 'NON EXPIRE' },
      { size: '2GB', price: 'GH₵10.00', validity: 'NON EXPIRE' },
      { size: '3GB', price: 'GH₵15.00', validity: 'NON EXPIRE' },
      { size: '4GB', price: 'GH₵20.00', validity: 'NON EXPIRE' },
      { size: '5GB', price: 'GH₵25.00', validity: 'NON EXPIRE' },
      { size: '10GB', price: 'GH₵45.00', validity: 'NON EXPIRE' },
    ],
    at: [
      { size: '1GB', price: 'GH₵4.50', validity: 'NON EXPIRE' },
      { size: '2GB', price: 'GH₵9.00', validity: 'NON EXPIRE' },
      { size: '3GB', price: 'GH₵13.50', validity: 'NON EXPIRE' },
      { size: '4GB', price: 'GH₵18.00', validity: 'NON EXPIRE' },
      { size: '5GB', price: 'GH₵22.50', validity: 'NON EXPIRE' },
      { size: '10GB', price: 'GH₵40.00', validity: 'NON EXPIRE' },
    ],
    telecel: [
      { size: '1GB', price: 'GH₵5.50', validity: 'NON EXPIRE' },
      { size: '2GB', price: 'GH₵11.00', validity: 'NON EXPIRE' },
      { size: '3GB', price: 'GH₵16.50', validity: 'NON EXPIRE' },
      { size: '4GB', price: 'GH₵22.00', validity: 'NON EXPIRE' },
      { size: '5GB', price: 'GH₵27.50', validity: 'NON EXPIRE' },
      { size: '10GB', price: 'GH₵50.00', validity: 'NON EXPIRE' },
    ],
  }

  // Ghanaian testimonials
  const testimonials = [
    {
      name: 'Kwame Asante',
      role: 'Business Owner, Accra',
      text: 'DataHub has transformed how I manage my data needs. The instant delivery is amazing and the prices are unbeatable!',
      rating: 5,
      initials: 'KA',
      color: 'bg-blue-500'
    },
    {
      name: 'Ama Osei',
      role: 'Student, Kumasi',
      text: 'I love how easy it is to use. No more hassle with data bundles. Highly recommended to all my friends!',
      rating: 5,
      initials: 'AO',
      color: 'bg-purple-500'
    },
    {
      name: 'Kofi Mensah',
      role: 'Reseller Agent, Takoradi',
      text: 'As an agent, I\'m earning great commissions. The platform is reliable and the support team is always helpful.',
      rating: 5,
      initials: 'KM',
      color: 'bg-green-500'
    },
    {
      name: 'Abena Boateng',
      role: 'Freelancer, Tema',
      text: 'Best data service I\'ve used in Ghana. Fast, secure, and the customer service is top-notch!',
      rating: 5,
      initials: 'AB',
      color: 'bg-pink-500'
    },
    {
      name: 'Yaw Owusu',
      role: 'Tech Entrepreneur, Osu',
      text: 'DataHub is a game-changer. The multi-vendor feature allows me to scale my business effortlessly.',
      rating: 5,
      initials: 'YO',
      color: 'bg-orange-500'
    },
    {
      name: 'Nana Ama Adjei',
      role: 'Content Creator, Accra',
      text: 'Perfect for my streaming needs. Never run out of data and the prices are so competitive!',
      rating: 5,
      initials: 'NA',
      color: 'bg-cyan-500'
    },
  ]

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-white/95 backdrop-blur-md z-50 border-b border-gray-100 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 relative">
              <Image
                src="/images/logo.png"
                alt="DataHub Logo"
                width={40}
                height={40}
                className="object-contain"
              />
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              DataHub
            </span>
          </div>
          <div className="flex items-center gap-4">
            <Link href="/login">
              <Button variant="ghost" className="text-gray-700 hover:text-gray-900">
                Sign In
              </Button>
            </Link>
            <Link href="/get-started">
              <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-lg">
                Get Started
              </Button>
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section - Modern M4U Style */}
      <section className="relative pt-32 pb-24 overflow-hidden bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          {/* Gradient Orbs */}
          <div className="absolute top-20 right-10 w-96 h-96 bg-gradient-to-br from-blue-500/30 to-purple-500/20 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-0 left-20 w-80 h-80 bg-gradient-to-tr from-cyan-500/20 to-blue-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
          <div className="absolute top-1/2 left-1/3 w-72 h-72 bg-gradient-to-br from-purple-500/20 to-pink-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>

          {/* Grid Pattern */}
          <div className="absolute inset-0 opacity-10">
            <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                  <path d="M 40 0 L 0 0 0 40" fill="none" stroke="white" strokeWidth="0.5"/>
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#grid)" />
            </svg>
          </div>
        </div>

        {/* Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Badge */}
          <div className={`inline-block mb-8 px-4 py-2 bg-gradient-to-r from-blue-500/20 to-purple-500/20 border border-blue-400/30 rounded-full backdrop-blur-sm transition-all duration-1000 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
            <span className="text-sm font-semibold bg-gradient-to-r from-blue-300 to-purple-300 bg-clip-text text-transparent flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-blue-400" />
              Ghana's #1 Data Hub Platform
            </span>
          </div>

          {/* Main Heading */}
          <div className={`mb-8 transition-all duration-1000 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <h1 className="text-6xl sm:text-7xl lg:text-8xl font-black text-white mb-4 leading-tight">
              Instant Data
            </h1>
            <div className="relative inline-block">
              <h2 className="text-6xl sm:text-7xl lg:text-8xl font-black bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent leading-tight">
                Bundles at Best Prices
              </h2>
              {/* Glow Effect */}
              <div className="absolute -inset-2 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-lg blur-2xl -z-10"></div>
            </div>
          </div>

          {/* Subheading */}
          <p className={`text-lg sm:text-xl text-gray-300 mb-10 max-w-2xl leading-relaxed transition-all duration-1000 delay-200 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            Get instant data bundles from all major networks. <span className="text-white font-semibold">Scam-free, secure, and lightning-fast.</span> Join 50,000+ satisfied customers today.
          </p>

          {/* CTA Buttons */}
          <div className={`flex flex-col sm:flex-row gap-4 mb-12 transition-all duration-1000 delay-300 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <Link href="/browse-packages">
              <Button size="lg" className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white text-lg px-8 py-6 rounded-xl font-bold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
                Browse Packages
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>
            <Link href="/become-agent">
              <Button size="lg" className="bg-white/10 hover:bg-white/20 text-white border-2 border-white/30 hover:border-white/50 text-lg px-8 py-6 rounded-xl font-bold backdrop-blur-sm transition-all duration-300">
                Become an Agent
              </Button>
            </Link>
          </div>

          {/* Trust Badges */}
          <div className={`flex flex-col sm:flex-row items-center gap-4 transition-all duration-1000 delay-400 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <div className="flex items-center gap-3 bg-white/5 backdrop-blur-md px-5 py-3 rounded-xl border border-white/10 hover:border-white/20 transition-all">
              <Shield className="w-5 h-5 text-green-400" />
              <span className="font-semibold text-white">Scam-Free</span>
            </div>
            <div className="flex items-center gap-3 bg-white/5 backdrop-blur-md px-5 py-3 rounded-xl border border-white/10 hover:border-white/20 transition-all">
              <Lock className="w-5 h-5 text-blue-400" />
              <span className="font-semibold text-white">Secure</span>
            </div>
            <div className="flex items-center gap-3 bg-white/5 backdrop-blur-md px-5 py-3 rounded-xl border border-white/10 hover:border-white/20 transition-all">
              <Lightning className="w-5 h-5 text-yellow-400" />
              <span className="font-semibold text-white">Instant Delivery</span>
            </div>
          </div>
        </div>

        {/* Floating 3D Elements */}
        <div className="absolute bottom-10 right-10 w-32 h-32 opacity-20 animate-bounce">
          <div className="w-full h-full bg-gradient-to-br from-blue-500 to-purple-500 rounded-3xl transform rotate-45"></div>
        </div>
        <div className="absolute top-1/3 left-10 w-24 h-24 opacity-15 animate-bounce" style={{ animationDelay: '0.5s' }}>
          <div className="w-full h-full bg-gradient-to-br from-cyan-500 to-blue-500 rounded-2xl transform rotate-12"></div>
        </div>
      </section>

      {/* Data Packages Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
              Browse Data Packages
            </h2>
            <p className="text-xl text-gray-600">
              Select your network and choose the perfect data bundle
            </p>
          </div>

          {/* Network Tabs */}
          <div className="mb-12">
            <Tabs value={selectedNetwork} onValueChange={setSelectedNetwork} className="w-full">
              <TabsList className="grid w-full max-w-md mx-auto grid-cols-3 bg-gray-100 p-1 rounded-lg">
                <TabsTrigger value="mtn" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-yellow-400 data-[state=active]:to-yellow-500 data-[state=active]:text-black rounded-md font-bold">
                  MTN
                </TabsTrigger>
                <TabsTrigger value="at" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500 data-[state=active]:to-blue-600 data-[state=active]:text-white rounded-md font-bold">
                  AirtelTigo (AT)
                </TabsTrigger>
                <TabsTrigger value="telecel" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-red-500 data-[state=active]:to-red-600 data-[state=active]:text-white rounded-md font-bold">
                  Telecel
                </TabsTrigger>
              </TabsList>

              {/* MTN Packages */}
              <TabsContent value="mtn" className="mt-8">
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                  {packages.mtn.map((pkg, idx) => (
                    <Card key={idx} className="p-4 border-0 bg-gradient-to-b from-yellow-400 to-yellow-500 rounded-xl hover:shadow-lg transition-all duration-300 cursor-pointer group hover:scale-105 transform">
                      <div className="text-center">
                        <p className="text-xs font-semibold text-black/70 mb-2">MTN</p>
                        <p className="text-3xl font-bold text-black mb-2">{pkg.size}</p>
                        <p className="text-xs text-black/60 mb-3">{pkg.validity}</p>
                        <Link href="/login">
                          <Button size="sm" className="w-full bg-black text-yellow-400 hover:bg-gray-900 rounded-lg text-xs font-semibold">
                            Buy Now
                          </Button>
                        </Link>
                      </div>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              {/* AirtelTigo (AT) Packages - Blue and White */}
              <TabsContent value="at" className="mt-8">
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                  {packages.at.map((pkg, idx) => (
                    <Card key={idx} className="p-4 border-0 bg-gradient-to-b from-blue-500 to-blue-600 rounded-xl hover:shadow-lg transition-all duration-300 cursor-pointer group hover:scale-105 transform">
                      <div className="text-center">
                        <p className="text-xs font-semibold text-white/90 mb-2">AT</p>
                        <p className="text-3xl font-bold text-white mb-2">{pkg.size}</p>
                        <p className="text-xs text-white/80 mb-3">{pkg.validity}</p>
                        <Link href="/login">
                          <Button size="sm" className="w-full bg-white text-blue-600 hover:bg-gray-100 rounded-lg text-xs font-semibold">
                            Buy Now
                          </Button>
                        </Link>
                      </div>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              {/* Telecel Packages - Red and White */}
              <TabsContent value="telecel" className="mt-8">
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                  {packages.telecel.map((pkg, idx) => (
                    <Card key={idx} className="p-4 border-0 bg-gradient-to-b from-red-500 to-red-600 rounded-xl hover:shadow-lg transition-all duration-300 cursor-pointer group hover:scale-105 transform">
                      <div className="text-center">
                        <p className="text-xs font-semibold text-white/90 mb-2">TELECEL</p>
                        <p className="text-3xl font-bold text-white mb-2">{pkg.size}</p>
                        <p className="text-xs text-white/80 mb-3">{pkg.validity}</p>
                        <Link href="/login">
                          <Button size="sm" className="w-full bg-white text-red-600 hover:bg-gray-100 rounded-lg text-xs font-semibold">
                            Buy Now
                          </Button>
                        </Link>
                      </div>
                    </Card>
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </section>

      {/* Why Choose Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
              Why Choose DataHub?
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Everything you need to manage your data packages efficiently and securely
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <Card className="p-8 hover:shadow-lg transition-all duration-300 border-0 bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl hover:scale-105 transform">
              <div className="w-14 h-14 bg-blue-500 rounded-xl flex items-center justify-center mb-6">
                <Zap className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Instant Delivery</h3>
              <p className="text-gray-700 leading-relaxed">
                Get your data packages delivered instantly to your account. No waiting, no delays.
              </p>
            </Card>

            {/* Feature 2 */}
            <Card className="p-8 hover:shadow-lg transition-all duration-300 border-0 bg-gradient-to-br from-purple-50 to-purple-100 rounded-2xl hover:scale-105 transform">
              <div className="w-14 h-14 bg-purple-500 rounded-xl flex items-center justify-center mb-6">
                <Shield className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Secure & Safe</h3>
              <p className="text-gray-700 leading-relaxed">
                Your transactions are protected with industry-standard security and encryption.
              </p>
            </Card>

            {/* Feature 3 */}
            <Card className="p-8 hover:shadow-lg transition-all duration-300 border-0 bg-gradient-to-br from-cyan-50 to-cyan-100 rounded-2xl hover:scale-105 transform">
              <div className="w-14 h-14 bg-cyan-500 rounded-xl flex items-center justify-center mb-6">
                <Headphones className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">24/7 Support</h3>
              <p className="text-gray-700 leading-relaxed">
                Our dedicated support team is always available to help you with any questions.
              </p>
            </Card>

            {/* Feature 4 */}
            <Card className="p-8 hover:shadow-lg transition-all duration-300 border-0 bg-gradient-to-br from-green-50 to-green-100 rounded-2xl hover:scale-105 transform">
              <div className="w-14 h-14 bg-green-500 rounded-xl flex items-center justify-center mb-6">
                <Wallet className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Best Prices</h3>
              <p className="text-gray-700 leading-relaxed">
                Competitive pricing on all data packages from all major networks.
              </p>
            </Card>

            {/* Feature 5 */}
            <Card className="p-8 hover:shadow-lg transition-all duration-300 border-0 bg-gradient-to-br from-orange-50 to-orange-100 rounded-2xl hover:scale-105 transform">
              <div className="w-14 h-14 bg-orange-500 rounded-xl flex items-center justify-center mb-6">
                <TrendingUp className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Grow Your Business</h3>
              <p className="text-gray-700 leading-relaxed">
                Become an agent and earn commissions on every sale you make.
              </p>
            </Card>

            {/* Feature 6 */}
            <Card className="p-8 hover:shadow-lg transition-all duration-300 border-0 bg-gradient-to-br from-pink-50 to-pink-100 rounded-2xl hover:scale-105 transform">
              <div className="w-14 h-14 bg-pink-500 rounded-xl flex items-center justify-center mb-6">
                <Users className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Multi-Vendor</h3>
              <p className="text-gray-700 leading-relaxed">
                Join our marketplace and sell data bundles with your own vendor link.
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* Testimonials Section - Ghanaian Names */}
      <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
              Loved by Ghanaians
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Join thousands of satisfied customers across Ghana who trust DataHub
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {testimonials.map((testimonial, idx) => (
              <Card key={idx} className="p-6 border-0 bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 hover:scale-105 transform">
                {/* Stars */}
                <div className="flex gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>

                {/* Review Text */}
                <p className="text-gray-700 mb-6 leading-relaxed italic">
                  "{testimonial.text}"
                </p>

                {/* User Info */}
                <div className="flex items-center gap-4">
                  <div className={`w-12 h-12 ${testimonial.color} rounded-full flex items-center justify-center text-white font-bold text-lg`}>
                    {testimonial.initials}
                  </div>
                  <div>
                    <p className="font-bold text-gray-900">{testimonial.name}</p>
                    <p className="text-sm text-gray-600">{testimonial.role}</p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
              How to Get Started
            </h2>
            <p className="text-xl text-gray-600">
              Join thousands of successful users and agents across Ghana
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-8">
            {[
              { num: '1', title: 'Sign Up', desc: 'Quick and free registration. Choose your preferred role.' },
              { num: '2', title: 'Browse Packages', desc: 'Select from all major networks and data sizes.' },
              { num: '3', title: 'Make Purchase', desc: 'Secure payment and instant delivery to your account.' },
              { num: '4', title: 'Start Selling', desc: 'Become an agent and earn commissions on sales.' },
            ].map((step, idx) => (
              <div key={idx} className="relative">
                <div className="flex flex-col items-center">
                  <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center mb-4 hover:scale-110 transition-transform duration-300">
                    <span className="text-2xl font-bold text-white">{step.num}</span>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2 text-center">{step.title}</h3>
                  <p className="text-gray-600 text-center text-sm">{step.desc}</p>
                </div>
                {idx < 3 && (
                  <div className="hidden md:block absolute top-8 -right-4 w-8 h-1 bg-gradient-to-r from-blue-600 to-purple-600"></div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">
                50K+
              </div>
              <p className="text-gray-600 text-lg">Active Users</p>
            </div>
            <div className="text-center">
              <div className="text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">
                1M+
              </div>
              <p className="text-gray-600 text-lg">Transactions</p>
            </div>
            <div className="text-center">
              <div className="text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">
                99.9%
              </div>
              <p className="text-gray-600 text-lg">Uptime</p>
            </div>
            <div className="text-center">
              <div className="text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">
                24/7
              </div>
              <p className="text-gray-600 text-lg">Support</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 via-purple-600 to-cyan-600 relative overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full -mr-48 -mt-48"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-white/10 rounded-full -ml-48 -mb-48"></div>

        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl sm:text-5xl font-bold text-white mb-6">
            Ready to Get Started?
          </h2>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Join thousands of users who trust DataHub for their data needs. Start accessing premium data packages today.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/signup">
              <Button size="lg" className="bg-white text-purple-600 hover:bg-gray-100 text-lg px-8 py-6 rounded-lg font-semibold">
                Create Your Account
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>
            <Link href="/become-agent">
              <Button size="lg" className="bg-white/20 text-white hover:bg-white/30 border border-white text-lg px-8 py-6 rounded-lg font-semibold">
                Become an Agent
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-300 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-12 mb-12">
            {/* Brand */}
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 relative">
                  <Image
                    src="/images/logo.png"
                    alt="DataHub Logo"
                    width={32}
                    height={32}
                    className="object-contain"
                  />
                </div>
                <span className="text-lg font-bold text-white">DataHub</span>
              </div>
              <p className="text-gray-400">
                Ghana's #1 data hub solution for instant delivery and secure transactions.
              </p>
            </div>

            {/* Product */}
            <div>
              <h4 className="text-white font-semibold mb-4">Product</h4>
              <ul className="space-y-2">
                <li><Link href="/browse-packages" className="text-gray-400 hover:text-white transition">Browse Packages</Link></li>
                <li><Link href="/become-agent" className="text-gray-400 hover:text-white transition">For Agents</Link></li>
                <li><Link href="#" className="text-gray-400 hover:text-white transition">Security</Link></li>
              </ul>
            </div>

            {/* Company */}
            <div>
              <h4 className="text-white font-semibold mb-4">Company</h4>
              <ul className="space-y-2">
                <li><Link href="#" className="text-gray-400 hover:text-white transition">About</Link></li>
                <li><Link href="#" className="text-gray-400 hover:text-white transition">Blog</Link></li>
                <li><Link href="#" className="text-gray-400 hover:text-white transition">Contact</Link></li>
              </ul>
            </div>

            {/* Support */}
            <div>
              <h4 className="text-white font-semibold mb-4">Support</h4>
              <ul className="space-y-2">
                <li><Link href="#" className="text-gray-400 hover:text-white transition">Help Center</Link></li>
                <li><Link href="#" className="text-gray-400 hover:text-white transition">Contact Us</Link></li>
                <li><Link href="#" className="text-gray-400 hover:text-white transition">WhatsApp</Link></li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-800 pt-8">
            <p className="text-center text-gray-400">
              © 2025 DataHub. All rights reserved. | Trusted by 50,000+ users across Ghana
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}
