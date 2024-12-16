'use client'

import { useState } from 'react'
import { Star, Github } from 'lucide-react'
import { Button } from '@/components/ui/button'
import CardFormDialog from './CardFormDialog'
import Link from 'next/link'
import { BusinessCard } from '@prisma/client'

interface LandingPageProps {
  onCreateCard: (card: BusinessCard) => void
}

export default function LandingPage({ onCreateCard }: LandingPageProps) {
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#f5f0e6] to-[#e6dfd3] flex flex-col">
      <div className="flex-grow flex flex-col items-center justify-center p-4">
        <h1 className="text-5xl font-bold mb-6 text-center bg-gradient-to-r from-[#2d4c3b] to-[#8b7355] text-transparent bg-clip-text">
          Business Card Generator
        </h1>
        <p className="text-xl mb-8 text-center max-w-2xl text-[#2d4c3b]">
          Create stunning, professional business cards in seconds. Customize your design and share instantly.
        </p>
        <Button 
          onClick={() => setIsDialogOpen(true)}
          className="bg-gradient-to-r from-[#2d4c3b] to-[#8b7355] text-white text-lg px-8 py-3 rounded-full hover:opacity-90 transition-opacity"
        >
          Create Your Card
        </Button>
        <div className="mt-12 flex items-center space-x-4">
          <a 
            href="https://github.com/TheMisterPin/business-card-generator" 
            target="_blank" 
            rel="noopener noreferrer"
            className="flex items-center space-x-2 text-[#2d4c3b] hover:underline"
          >
            <Github className="w-6 h-6" />
            <span>Star on GitHub</span>
          </a>
          <div className="flex items-center space-x-1 text-[#8b7355]">
            <Star className="w-5 h-5 fill-current" />
            <span className="font-bold">1.5k</span>
          </div>
        </div>
      </div>
      <div className="w-full py-4 text-center text-sm text-gray-600">
        Created by{' '}
        <Link href="https://github.com/TheMisterPin" className="text-[#2d4c3b] hover:underline">
          TheMisterPin
        </Link>
      </div>
      <CardFormDialog 
        isOpen={isDialogOpen} 
        onClose={() => setIsDialogOpen(false)}
        onSubmit={onCreateCard}
      />
    </div>
  )
}

