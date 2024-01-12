import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient({
  log: ["warn", "error", "query"],
})

export default prisma
