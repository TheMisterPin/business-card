import { NextRequest, NextResponse } from 'next/server'
import prisma from '@/lib/prisma'
import { nanoid } from 'nanoid'

export async function POST(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const id = params.id
    const shareId = nanoid(10) // Generate a short, unique ID

    const updatedCard = await prisma.businessCard.update({
      where: { id },
      data: { shareId },
    })

    const shareUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/share/${shareId}`

    return NextResponse.json({ shareUrl })
  } catch (error) {
    console.error('Error generating share link:', error)
    return NextResponse.json({ error: 'Error generating share link' }, { status: 500 })
  }
}

