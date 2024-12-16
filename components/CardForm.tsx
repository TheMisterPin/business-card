'use client'

import { useAppContext } from '../contexts/AppContext'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

export default function CardForm() {
  const { setCardDetails, setStep } = useAppContext()

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    const details = Object.fromEntries(formData.entries()) as any
    setCardDetails(details)
    setStep('card')
  }

  return (
    <div className="min-h-screen w-full bg-[#f5f0e6] flex flex-col items-center justify-center p-6">
      <h2 className="text-3xl font-bold mb-6 text-[#2d4c3b]">Create Your Business Card</h2>
      <form onSubmit={handleSubmit} className="w-full max-w-md space-y-4">
        <div>
          <Label htmlFor="name">Name</Label>
          <Input id="name" name="name" required />
        </div>
        <div>
          <Label htmlFor="role">Role</Label>
          <Input id="role" name="role" required />
        </div>
        <div>
          <Label htmlFor="phone">Phone</Label>
          <Input id="phone" name="phone" type="tel" required />
        </div>
        <div>
          <Label htmlFor="email">Email</Label>
          <Input id="email" name="email" type="email" required />
        </div>
        <div>
          <Label htmlFor="website">Website</Label>
          <Input id="website" name="website" type="url" required />
        </div>
        <div>
          <Label htmlFor="whatsapp">WhatsApp</Label>
          <Input id="whatsapp" name="whatsapp" type="url" placeholder="https://wa.me/your-number" required />
        </div>
        <div>
          <Label htmlFor="github">GitHub</Label>
          <Input id="github" name="github" type="url" required />
        </div>
        <div>
          <Label htmlFor="linkedin">LinkedIn</Label>
          <Input id="linkedin" name="linkedin" type="url" required />
        </div>
        <Button type="submit" className="w-full bg-[#2d4c3b] text-white hover:bg-[#3a6149]">
          Generate Card
        </Button>
      </form>
    </div>
  )
}

