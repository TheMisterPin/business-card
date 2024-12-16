'use client'

import { useState } from 'react'
import LandingPage from '../components/LandingPage'
import BusinessCard from '../components/BusinessCard'
import { BusinessCard as BusinessCardType } from '@prisma/client'

export default function Home() {
  const [businessCard, setBusinessCard] = useState<BusinessCardType | null>(null)

  return (
    <>
      {businessCard ? (
        <BusinessCard card={businessCard} onBack={() => setBusinessCard(null)} />
      ) : (
        <LandingPage onCreateCard={setBusinessCard} />
      )}
    </>
  )
}

