const { gql } = require('apollo-server-express')
const GraphQLJSON = require('graphql-type-json')

// Construct a schema, using GraphQL schema language
const typeDefs = gql`
  scalar JSON
  type Address {
    street: String
    city: String
    zipcode: Int
    abc: JSON
  }
  type Query {
    hello: String
    nice: Address
  }
`

// Provide resolver functions for your schema fields
const resolvers = {
  JSON: GraphQLJSON,
  Query: {
    hello: () => 'hello world!',
    nice: () => {
      return {
        'street': 'Baker street',
        'city': 'Seoul',
        'zipcode': 123,
        'abc': { 'aaa': 'bbb' }
      }
    }
  }
}

module.exports = { typeDefs, resolvers }
