import { createMocks } from 'node-mocks-http'
import { GET, PATCH, DELETE } from '../../app/api/business-cards/[id]/route'
import { prisma } from '../setup'

describe('Business Card ID API', () => {
  let cardId: string

  beforeAll(async () => {
    const card = await prisma.businessCard.create({
      data: {
        name: 'Test User',
        role: 'Tester',
        phone: '1234567890',
        email: 'test@example.com',
        website: 'https://test.com',
        gradient: 'bg-gradient-to-br from-[#2d4c3b] to-[#8b7355]',
      },
    })
    cardId = card.id
  })

  afterAll(async () => {
    await prisma.businessCard.deleteMany()
  })

  it('should get a business card', async () => {
    const { req, res } = createMocks({
      method: 'GET',
    })

    await GET(req as any, { params: { id: cardId } })

    expect(res._getStatusCode()).toBe(200)
    const data = JSON.parse(res._getData())
    expect(data.name).toBe('Test User')
    expect(data.role).toBe('Tester')
  })

  it('should update a business card', async () => {
    const { req, res } = createMocks({
      method: 'PATCH',
      body: { name: 'Updated User' },
    })

    await PATCH(req as any, { params: { id: cardId } })

    expect(res._getStatusCode()).toBe(200)
    const data = JSON.parse(res._getData())
    expect(data.name).toBe('Updated User')
  })

  it('should delete a business card', async () => {
    const { req, res } = createMocks({
      method: 'DELETE',
    })

    await DELETE(req as any, { params: { id: cardId } })

    expect(res._getStatusCode()).toBe(200)
    const data = JSON.parse(res._getData())
    expect(data.message).toBe('Business card deleted successfully')

    // Verify deletion
    const deletedCard = await prisma.businessCard.findUnique({ where: { id: cardId } })
    expect(deletedCard).toBeNull()
  })
})

