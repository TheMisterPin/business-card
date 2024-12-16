import { PrismaClient } from '@prisma/client'
import { MongoMemoryServer } from 'mongodb-memory-server'

let mongod: MongoMemoryServer | null = null
const prisma = new PrismaClient()

jest.setTimeout(30000) // Increase timeout to 30 seconds

beforeAll(async () => {
  mongod = await MongoMemoryServer.create()
  const uri = mongod.getUri()
  process.env.DATABASE_URL = uri
  await prisma.$connect()
})

afterAll(async () => {
  await prisma.$disconnect()
  if (mongod) {
    await mongod.stop()
  }
})

export { prisma }

