import { createMocks } from 'node-mocks-http'
import { POST } from '../../app/api/business-cards/route'
import { prisma } from '../setup'

describe('POST /api/business-cards', () => {
  it('should create a new business card', async () => {
    const { req, res } = createMocks({
      method: 'POST',
      body: {
        name: 'John Doe',
        role: 'Developer',
        phone: '1234567890',
        email: 'john@example.com',
        website: 'https://johndoe.com',
        gradient: 'bg-gradient-to-br from-[#2d4c3b] to-[#8b7355]',
      },
    })

    await POST(req as any)

    expect(res._getStatusCode()).toBe(201)
    const data = JSON.parse(res._getData())
    expect(data).toHaveProperty('id')
    expect(data.name).toBe('John Doe')
    expect(data.role).toBe('Developer')

    // Clean up
    await prisma.businessCard.delete({ where: { id: data.id } })
  })
})

