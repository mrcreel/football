import { createYoga } from "graphql-yoga"
import SchemeBuilder from "@pothos/core"
import PrismaPlugin from "@pothos/plugin-prisma"

import PrismaTypes from "@pothos/plugin-prisma/generated"

import prisma from "@/app/lib/prisma"

const builder = new SchemeBuilder<{
  PrismaTypes: PrismaTypes
}>({
  plugins: [PrismaPlugin],
  prisma: {
    client: prisma,
  },
})

builder.queryType({})
builder.mutationType({})

builder.prismaObject("Division", {
  fields: (t) => ({
    id: t.exposeID("id"),
    name: t.exposeString("name"),
    conferences: t.relation("conferences"),
  }),
})
