'use client'

import { useAppContext } from '../contexts/AppContext'
import { Button } from '@/components/ui/button'

export default function FrontPage() {
  const { setStep } = useAppContext()

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-[#2d4c3b] to-[#8b7355] flex flex-col items-center justify-center text-white p-6">
      <div className="w-64 h-64 rounded-full bg-gradient-to-br from-[#f5f0e6] to-[#d1c7b7] mb-8 shadow-lg" />
      <h1 className="text-5xl font-bold mb-4 text-center">Business Card Generator</h1>
      <p className="text-xl mb-8 text-center max-w-md">Create and customize your professional business card with just a few clicks.</p>
      <Button 
        onClick={() => setStep('welcome')}
        className="bg-white text-[#2d4c3b] hover:bg-[#f5f0e6] transition-colors text-lg px-8 py-3"
      >
        Get Started
      </Button>
    </div>
  )
}

