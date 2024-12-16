import { notFound } from 'next/navigation'
import prisma from '@/lib/prisma'
import SharedBusinessCard from '@/components/SharedBusinessCard'
import Footer from '@/components/Footer'

export default async function SharedCardPage({ params }: { params: { shareId: string } }) {
  const card = await prisma.businessCard.findUnique({
    where: { shareId: params.shareId },
  })

  if (!card) {
    notFound()
  }

  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-grow flex items-center justify-center bg-gradient-to-b from-[#f5f0e6] to-[#e6dfd3]">
        <SharedBusinessCard card={card} />
      </main>
      <Footer />
    </div>
  )
}

