'use client'

import { useAppContext } from '../contexts/AppContext'
import { Button } from '@/components/ui/button'

export default function WelcomeScreen() {
  const { setStep } = useAppContext()

  return (
    <div className="h-screen w-full bg-gradient-to-br from-[#2d4c3b] to-[#8b7355] flex flex-col items-center justify-center text-white p-6">
      <h1 className="text-4xl font-bold mb-4">Business Card Generator</h1>
      <p className="text-xl mb-8 text-center">Create your personalized business card with just a few clicks!</p>
      <Button 
        onClick={() => setStep('form')}
        className="bg-white text-[#2d4c3b] hover:bg-[#f5f0e6] transition-colors"
      >
        Create Your Card
      </Button>
    </div>
  )
}

