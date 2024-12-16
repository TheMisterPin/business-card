import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { Toaster } from 'react-hot-toast'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Business Card Generator',
  description: 'Create stunning, professional business cards in seconds.',
  keywords: ['business card', 'generator', 'digital', 'professional'],
  authors: [{ name: 'TheMisterPin', url: 'https://github.com/TheMisterPin' }],
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://business-card-generator.vercel.app',
    title: 'Business Card Generator',
    description: 'Create stunning, professional business cards in seconds.',
    siteName: 'Business Card Generator',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Business Card Generator',
    description: 'Create stunning, professional business cards in seconds.',
    creator: '@TheMisterPin',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {children}
        <Toaster />
      </body>
    </html>
  )
}

