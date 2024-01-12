import { ApolloServer } from "@apollo/server"
import { NextRequest } from "next/server"
import { startServerAndCreateNextHandler } from "@as-integrations/next"

import { typeDefs } from "./typeDefs"
import { resolvers } from "./resolvers"

const apolloServer = new ApolloServer({ typeDefs, resolvers })

const handler = startServerAndCreateNextHandler<NextRequest>(apolloServer)

export const GET = async (request: NextRequest) => {
  return handler(request)
}
export const POST = async (request: NextRequest) => {
  return handler(request)
}
