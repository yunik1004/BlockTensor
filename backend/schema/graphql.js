const { gql } = require('apollo-server-express')
const GraphQLJSON = require('graphql-type-json')
const blockDB = require('./database/blockDB')
const stageDB = require('./database/stageDB')

// Construct a schema, using GraphQL schema language
const typeDefs = gql`
  scalar JSON

  type Block {
    blockID: Int!
    struct: JSON
    code: String
  }

  type Stage {
    stageID: Int!
    blocks: [Block]!
  }

  type Query {
    block (blockID: Int!): Block
    stage (stageID: Int!): Stage
  }
`

// Provide resolver functions for your schema fields
const resolvers = {
  JSON: GraphQLJSON,
  Query: {
    block: (root, { blockID }) => {
      const block = getDataByValue(blockDB, 'blockID', blockID)
      if (block === undefined) {
        return null
      }

      return block
    },
    stage: (root, { stageID }) => {
      const stage = getDataByValue(stageDB, 'stageID', stageID)
      if (stage === undefined) {
        return null
      }

      let blocks = []

      for (let i in stage.blocks) {
        let block = getDataByValue(blockDB, 'blockID', stage.blocks[i])
        if (block != undefined) {
          blocks.push(block)
        }
      }

      return {
        'blocks': blocks
      }
    }
  }
}

function getDataByValue (db, key, value) {
  return db.find(function (element) { return element[key] === value })
}

module.exports = { typeDefs, resolvers }
