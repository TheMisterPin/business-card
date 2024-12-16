import { createMocks } from 'node-mocks-http'
import { POST } from '../../app/api/business-cards/[id]/share/route'
import { prisma } from '../setup'

jest.mock('nanoid', () => ({
  nanoid: jest.fn(() => 'mockedShareId'),
}))

describe('POST /api/business-cards/[id]/share', () => {
  let cardId: string

  beforeAll(async () => {
    const card = await prisma.businessCard.create({
      data: {
        name: 'Share Test User',
        role: 'Sharer',
        phone: '1234567890',
        email: 'share@example.com',
        website: 'https://share.com',
        gradient: 'bg-gradient-to-br from-[#2d4c3b] to-[#8b7355]',
      },
    })
    cardId = card.id
  })

  afterAll(async () => {
    await prisma.businessCard.deleteMany()
  })

  it('should generate a share link', async () => {
    const { req, res } = createMocks({
      method: 'POST',
    })

    process.env.NEXT_PUBLIC_BASE_URL = 'http://localhost:3000'

    await POST(req as any, { params: { id: cardId } })

    expect(res._getStatusCode()).toBe(200)
    const data = JSON.parse(res._getData())
    expect(data.shareUrl).toBe('http://localhost:3000/share/mockedShareId')

    // Verify shareId was set
    const updatedCard = await prisma.businessCard.findUnique({ where: { id: cardId } })
    expect(updatedCard?.shareId).toBe('mockedShareId')
  })
})

