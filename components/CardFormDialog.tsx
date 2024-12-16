'use client'

import { useState, useRef, useEffect } from 'react'
import { useForm, SubmitHandler } from 'react-hook-form'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Checkbox } from '@/components/ui/checkbox'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import CardPreview from './CardPreview'
import { BusinessCard } from '@prisma/client'
import toast from 'react-hot-toast'
import axios from 'axios'

interface CardFormDialogProps {
  isOpen: boolean
  onClose: () => void
  onSubmit: (card: BusinessCard) => void
  initialData?: Partial<BusinessCard>
}

const gradientOptions = [
  { value: 'bg-gradient-to-br from-[#2d4c3b] to-[#8b7355]', label: 'Forest Green' },
  { value: 'bg-gradient-to-br from-[#1a237e] to-[#4a148c]', label: 'Deep Purple' },
  { value: 'bg-gradient-to-br from-[#b71c1c] to-[#880e4f]', label: 'Ruby Red' },
  { value: 'bg-gradient-to-br from-[#004d40] to-[#00796b]', label: 'Teal' },
  { value: 'bg-gradient-to-br from-[#ff6f00] to-[#ffab00]', label: 'Amber Sunset' },
  { value: 'bg-gradient-to-br from-[#0277bd] to-[#00bcd4]', label: 'Ocean Blue' },
  { value: 'bg-gradient-to-br from-[#ad1457] to-[#e91e63]', label: 'Pink Blossom' },
  { value: 'bg-gradient-to-br from-[#1b5e20] to-[#4caf50]', label: 'Emerald Green' },
]

type FormData = {
  name: string
  role: string
  phone: string
  email: string
  website: string
  whatsapp: string
  github: string
  linkedin: string
  gradient: string
  logo: FileList | null
}

const IMGBB_API_KEY = process.env.NEXT_PUBLIC_IMGBB_API_KEY

export const uploadImage = async (file: File): Promise<string> => {
  const formData = new FormData()

  formData.append('image', file)
  formData.append('key', IMGBB_API_KEY || '')

  const response = await axios.post(
    `https://api.imgbb.com/1/upload?expiration=15552000&key=${IMGBB_API_KEY}`,
    formData
  )

  if (response.data.status !== 200) {
    throw new Error('Failed to upload image to ImgBB')
  }
  const imageUrl = response.data.data.url

  return imageUrl
}

export default function CardFormDialog({ isOpen, onClose, onSubmit, initialData }: CardFormDialogProps) {
  const [step, setStep] = useState(1)
  const [addSocials, setAddSocials] = useState(false)
  const { register, handleSubmit, watch, setValue, reset } = useForm<FormData>({
    defaultValues: {
      name: '',
      role: '',
      phone: '',
      email: '',
      website: '',
      whatsapp: '',
      github: '',
      linkedin: '',
      gradient: gradientOptions[0].value,
      logo: null,
    }
  })
  const fileInputRef = useRef<HTMLInputElement>(null)

  const watchedFields = watch()

  useEffect(() => {
    if (initialData) {
      Object.entries(initialData).forEach(([key, value]) => {
        if (key !== 'logo') {
          setValue(key as keyof FormData, value as string)
        }
      })
      setAddSocials(!!initialData.github || !!initialData.linkedin)
    }
  }, [initialData, setValue])

  const onFormSubmit: SubmitHandler<FormData> = async (data) => {
    if (step === 1 && addSocials) {
      setStep(2)
    } else if (step === 1 || step === 2) {
      setStep(3)
    } else {
      try {
        let logoUrl = ''
        if (data.logo && data.logo[0]) {
          logoUrl = await uploadImage(data.logo[0])
        }

        const whatsappLink = data.phone ? `https://wa.me/${data.phone.replace(/\D/g, '')}` : ''
        const cardData = { ...data, whatsapp: whatsappLink, logo: logoUrl }
        
        const response = await fetch('/api/business-cards', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(cardData),
        })

        if (response.ok) {
          const newCard = await response.json()
          onSubmit(newCard)
          onClose()
          setStep(1)
          setAddSocials(false)
          reset()
          toast.success('Business card created successfully!')
        } else {
          const errorData = await response.json()
          throw new Error(errorData.error || 'Failed to create business card')
        }
      } catch (error) {
        console.error('Error creating business card:', error)
        toast.error('Failed to create business card. Please try again.')
      }
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px] max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{initialData ? 'Edit' : 'Create'} Your Business Card</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit(onFormSubmit)} className="space-y-4">
          {step === 1 && (
            <>
              <div>
                <Label htmlFor="name">Name</Label>
                <Input id="name" {...register('name', { required: true })} autoComplete="name" />
              </div>
              <div>
                <Label htmlFor="role">Role</Label>
                <Input id="role" {...register('role', { required: true })} autoComplete="organization-title" />
              </div>
              <div>
                <Label htmlFor="phone">Phone</Label>
                <Input id="phone" type="tel" {...register('phone', { required: true })} autoComplete="tel" />
              </div>
              <div>
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" {...register('email', { required: true })} autoComplete="email" />
              </div>
              <div>
                <Label htmlFor="website">Website</Label>
                <Input id="website" type="url" {...register('website', { required: true })} autoComplete="url" />
              </div>
              <div>
                <Label htmlFor="logo">Logo</Label>
                <Input id="logo" type="file" accept="image/*" {...register('logo')} ref={fileInputRef} />
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="addSocials" checked={addSocials} onCheckedChange={(checked) => setAddSocials(checked as boolean)} />
                <Label htmlFor="addSocials">Add social media links</Label>
              </div>
            </>
          )}
          {step === 2 && (
            <>
              <div>
                <Label htmlFor="github">GitHub</Label>
                <Input id="github" type="url" {...register('github')} autoComplete="url" />
              </div>
              <div>
                <Label htmlFor="linkedin">LinkedIn</Label>
                <Input id="linkedin" type="url" {...register('linkedin')} autoComplete="url" />
              </div>
            </>
          )}
          {step === 3 && (
            <>
              <Label>Choose a style</Label>
              <RadioGroup
                value={watchedFields.gradient}
                onValueChange={(value) => setValue('gradient', value)}
                className="grid grid-cols-2 gap-4"
              >
                {gradientOptions.map((option) => (
                  <div key={option.value} className="flex items-center space-x-2">
                    <RadioGroupItem value={option.value} id={option.value} />
                    <Label htmlFor={option.value}>{option.label}</Label>
                  </div>
                ))}
              </RadioGroup>
              <div className="mt-4">
                <Label>Preview</Label>
                <div className="mt-2 flex justify-center">
                  <CardPreview 
                    name={watchedFields.name} 
                    role={watchedFields.role} 
                    gradient={watchedFields.gradient} 
                    logo={watchedFields.logo && watchedFields.logo[0] ? URL.createObjectURL(watchedFields.logo[0]) : ''} 
                  />
                </div>
              </div>
            </>
          )}
          <Button type="submit" className="w-full">
            {step === 3 ? (initialData ? 'Update' : 'Create') : 'Next'}
          </Button>
          {step > 1 && (
            <Button type="button" onClick={() => setStep(step - 1)} className="w-full mt-2">
              Back
            </Button>
          )}
        </form>
      </DialogContent>
    </Dialog>
  )
}

