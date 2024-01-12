import prisma from "@/app/lib/prisma"

export const resolvers = {
  Query: {
    division: async (_: never, args: { id: string }) => {
      const division = await prisma.division.findUnique({
        where: { id: args.id },
      })
      return division
    },
    divisions: async () => prisma.division.findMany(),
  },
  Mutation: {
    createDivision: async (_: never, args: { name: string }) => {
      const newDivision = await prisma.division.create({
        data: {
          name: args.name,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      })
      return newDivision
    },
    updateDivision: async (_: never, args: { id: string; name: string }) => {
      const updatedDivision = await prisma.division.update({
        where: { id: args.id },
        data: { name: args.name, updatedAt: new Date() },
      })
      return updatedDivision
    },
    deleteDivision: async (_: never, args: { id: string }) => {
      const deletedDivision = await prisma.division.delete({
        where: { id: args.id },
      })
      return deletedDivision
    },
  },
}
