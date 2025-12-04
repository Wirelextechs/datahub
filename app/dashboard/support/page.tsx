'use client'

import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Search, MessageSquare, Phone, Mail, Clock, CheckCircle2, AlertCircle, Send } from 'lucide-react'
import { useState } from 'react'

export default function SupportPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [message, setMessage] = useState('')

  const tickets = [
    {
      id: '#TKT-001',
      subject: 'Data not received after payment',
      status: 'Open',
      priority: 'High',
      date: '12/4/2025',
      lastUpdate: '12/4/2025 10:30 AM',
      description: 'I purchased a 5GB MTN bundle but did not receive the data',
    },
    {
      id: '#TKT-002',
      subject: 'Wallet top-up failed',
      status: 'In Progress',
      priority: 'High',
      date: '12/3/2025',
      lastUpdate: '12/3/2025 02:45 PM',
      description: 'My bank transfer for wallet top-up failed but amount was deducted',
    },
    {
      id: '#TKT-003',
      subject: 'How to become an agent?',
      status: 'Resolved',
      priority: 'Low',
      date: '12/2/2025',
      lastUpdate: '12/2/2025 11:20 AM',
      description: 'I want to know the requirements to become an agent',
    },
    {
      id: '#TKT-004',
      subject: 'Account verification issue',
      status: 'Resolved',
      priority: 'Medium',
      date: '12/1/2025',
      lastUpdate: '12/1/2025 03:30 PM',
      description: 'Unable to verify my account with the provided documents',
    },
  ]

  const faqs = [
    {
      question: 'How do I top up my wallet?',
      answer: 'You can top up your wallet using MTN Mobile Money, AirtelTigo Money, or Bank Transfer. Go to Wallet > Top Up and select your preferred payment method.',
    },
    {
      question: 'What is the minimum withdrawal amount?',
      answer: 'The minimum withdrawal amount is GHS 10.00. You can withdraw to your mobile money account or bank account.',
    },
    {
      question: 'How long does it take to receive data after purchase?',
      answer: 'Data is usually delivered instantly after payment confirmation. If you don\'t receive it within 5 minutes, please contact support.',
    },
    {
      question: 'Can I become an agent?',
      answer: 'Yes! You can apply to become an agent by going to Dashboard > Become Agent. You\'ll need to provide valid identification and meet our requirements.',
    },
  ]

  const contactInfo = [
    { icon: Phone, label: 'Phone', value: '+233 XXX XXX XXX', color: 'from-blue-500 to-blue-600' },
    { icon: Mail, label: 'Email', value: 'support@datahub.com', color: 'from-green-500 to-green-600' },
    { icon: MessageSquare, label: 'Live Chat', value: 'Available 24/7', color: 'from-purple-500 to-purple-600' },
    { icon: Clock, label: 'Response Time', value: 'Within 2 hours', color: 'from-orange-500 to-orange-600' },
  ]

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-4xl font-bold text-gray-900">Support Center</h1>
        <p className="text-gray-600 mt-2">Get help and manage your support tickets</p>
      </div>

      {/* Contact Info */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {contactInfo.map((info, idx) => {
          const Icon = info.icon
          return (
            <Card key={idx} className="p-6 border-0 shadow-md">
              <div className="flex items-start justify-between mb-4">
                <div className={`p-3 rounded-lg bg-gradient-to-br ${info.color} text-white`}>
                  <Icon size={24} />
                </div>
              </div>
              <p className="text-sm text-gray-600 mb-1">{info.label}</p>
              <p className="font-semibold text-gray-900">{info.value}</p>
            </Card>
          )
        })}
      </div>

      {/* Create New Ticket */}
      <Card className="p-6 border-0 shadow-md">
        <h3 className="text-lg font-bold text-gray-900 mb-4">Create a Support Ticket</h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Subject</label>
            <input
              type="text"
              placeholder="Describe your issue..."
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
            <select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
              <option>Select a category</option>
              <option>Data Issues</option>
              <option>Payment Issues</option>
              <option>Account Issues</option>
              <option>General Inquiry</option>
              <option>Other</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Priority</label>
            <select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
              <option>Low</option>
              <option>Medium</option>
              <option>High</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Message</label>
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Describe your issue in detail..."
              rows={5}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <Button className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white w-full">
            <Send className="w-4 h-4 mr-2" />
            Submit Ticket
          </Button>
        </div>
      </Card>

      {/* Search Tickets */}
      <Card className="p-6 border-0 shadow-md">
        <h3 className="text-lg font-bold text-gray-900 mb-4">My Support Tickets</h3>
        <div className="flex gap-4 mb-6">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search tickets..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <select className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
            <option>All Status</option>
            <option>Open</option>
            <option>In Progress</option>
            <option>Resolved</option>
          </select>
        </div>

        {/* Tickets List */}
        <div className="space-y-3">
          {tickets.map((ticket) => (
            <Card key={ticket.id} className="p-4 border-0 shadow-sm hover:shadow-md transition-all bg-gray-50">
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <p className="font-bold text-gray-900">{ticket.id}</p>
                    <span className={`px-2 py-1 rounded text-xs font-semibold ${
                      ticket.status === 'Open' ? 'bg-red-100 text-red-700' :
                      ticket.status === 'In Progress' ? 'bg-blue-100 text-blue-700' :
                      'bg-green-100 text-green-700'
                    }`}>
                      {ticket.status}
                    </span>
                    <span className={`px-2 py-1 rounded text-xs font-semibold ${
                      ticket.priority === 'High' ? 'bg-red-100 text-red-700' :
                      ticket.priority === 'Medium' ? 'bg-yellow-100 text-yellow-700' :
                      'bg-green-100 text-green-700'
                    }`}>
                      {ticket.priority}
                    </span>
                  </div>
                  <p className="font-semibold text-gray-900 mb-1">{ticket.subject}</p>
                  <p className="text-sm text-gray-600 mb-2">{ticket.description}</p>
                  <p className="text-xs text-gray-500">Created: {ticket.date} | Last Update: {ticket.lastUpdate}</p>
                </div>
                <Button size="sm" variant="outline" className="border-blue-200 text-blue-600 hover:bg-blue-50">
                  View
                </Button>
              </div>
            </Card>
          ))}
        </div>
      </Card>

      {/* FAQs */}
      <Card className="p-6 border-0 shadow-md">
        <h3 className="text-lg font-bold text-gray-900 mb-6">Frequently Asked Questions</h3>
        <div className="space-y-4">
          {faqs.map((faq, idx) => (
            <div key={idx} className="border-b border-gray-200 pb-4 last:border-b-0">
              <p className="font-semibold text-gray-900 mb-2">{faq.question}</p>
              <p className="text-gray-600 text-sm">{faq.answer}</p>
            </div>
          ))}
        </div>
      </Card>
    </div>
  )
}
