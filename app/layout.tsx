import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: {
    default: 'DataHub - Your Premium Data Solution',
    template: '%s | DataHub',
  },
  description: 'Access premium data packages from multiple networks. Instant delivery, 24/7 support, and secure transactions. Join thousands of users who trust DataHub.',
  keywords: ['data packages', 'data hub', 'instant delivery', 'secure data'],
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://datahub.example.com',
    siteName: 'DataHub',
    title: 'DataHub - Your Premium Data Solution',
    description: 'Access premium data packages from multiple networks with instant delivery and 24/7 support.',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'DataHub Preview',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'DataHub - Your Premium Data Solution',
    description: 'Access premium data packages from multiple networks with instant delivery and 24/7 support.',
    images: ['/og-image.png'],
  },
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: '/favicon.ico',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        {children}
      </body>
    </html>
  )
}
