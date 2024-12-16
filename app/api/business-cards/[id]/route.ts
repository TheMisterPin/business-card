import { NextRequest, NextResponse } from 'next/server'
import prisma from '@/lib/prisma'

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const id = params.id
    const businessCard = await prisma.businessCard.findUnique({
      where: { id },
    })

    if (!businessCard) {
      return NextResponse.json({ error: 'Business card not found' }, { status: 404 })
    }

    return NextResponse.json(businessCard)
  } catch (error) {
    console.error('Error fetching business card:', error)
    return NextResponse.json({ error: 'Error fetching business card' }, { status: 500 })
  }
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const id = params.id
    const body = await request.json()
    const updatedBusinessCard = await prisma.businessCard.update({
      where: { id },
      data: body,
    })

    return NextResponse.json(updatedBusinessCard)
  } catch (error) {
    console.error('Error updating business card:', error)
    return NextResponse.json({ error: 'Error updating business card' }, { status: 500 })
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const id = params.id
    await prisma.businessCard.delete({
      where: { id },
    })

    return NextResponse.json({ message: 'Business card deleted successfully' })
  } catch (error) {
    console.error('Error deleting business card:', error)
    return NextResponse.json({ error: 'Error deleting business card' }, { status: 500 })
  }
}

