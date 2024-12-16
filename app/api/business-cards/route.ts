import { NextRequest, NextResponse } from 'next/server'
import prisma from '@/lib/prisma'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const businessCard = await prisma.businessCard.create({
      data: {
        name: body.name,
        role: body.role,
        phone: body.phone,
        email: body.email,
        website: body.website,
        whatsapp: body.whatsapp,
        github: body.github,
        linkedin: body.linkedin,
        gradient: body.gradient,
        logo: body.logo,
      },
    })
    return NextResponse.json(businessCard, { status: 201 })
  } catch (error) {
    console.error('Error creating business card:', error)
    return NextResponse.json({ error: 'Error creating business card' }, { status: 500 })
  }
}

export async function GET() {
  try {
    const businessCards = await prisma.businessCard.findMany()
    return NextResponse.json(businessCards)
  } catch (error) {
    console.error('Error fetching business cards:', error)
    return NextResponse.json({ error: 'Error fetching business cards' }, { status: 500 })
  }
}

