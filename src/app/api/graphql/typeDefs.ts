export const typeDefs = `#graphql
type Division {
    id: ID!
    name: String!
    createdAt: String!
    updatedAt: String!
}

type Query {
    divisions: [Division!]!
    division(id: ID!): Division!
}

type Mutation {
    createDivision(name: String!): Division!
    updateDivision(id: ID!, name: String!): Division!
    deleteDivision(id: ID!): Division!
}
`
