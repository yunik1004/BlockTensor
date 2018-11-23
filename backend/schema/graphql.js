const { gql } = require('apollo-server-express')
const GraphQLJSON = require('graphql-type-json')
const JSONfn = require('json-fn')

const BlockDB = require('./database/BlockDB')
const StageDB = require('./database/StageDB')

// Construct a schema, using GraphQL schema language
const typeDefs = gql`
  scalar JSON

  type Block {
    blockName: String!
    struct: JSON
    code: String
  }

  type Stage {
    stageName: String!
    blocks: [Block]!
    trainData: [Int]!
    trainLabels: [Int]!
  }

  type Query {
    block (blockName: String!): Block
    stage (stageName: String!): Stage
  }
`

// Provide resolver functions for your schema fields
const resolvers = {
  JSON: GraphQLJSON,
  Query: {
    block: (root, { blockName }) => {
      return JSONBlock(blockName)
    },
    stage: (root, { stageName }) => {
      const stage = StageDB[stageName]
      if (stage === undefined) {
        return null
      }

      let blocks = []

      let blockList = stage['blocks']
      for (let i in blockList) {
        let block = JSONBlock(blockList[i])
        if (block !== null) {
          blocks.push(block)
        }
      }

      let trainData = stage['trainData']
      let trainLabels = stage['trainLabels']

      return {
        'blocks': blocks,
        'trainData': trainData,
        'trainLabels': trainLabels
      }
    }
  }
}

function JSONBlock (blockName) {
  const block = BlockDB[blockName]
  if (block === undefined) {
    return null
  }

  let blockJSON = {
    'blockName': blockName,
    'struct': block['struct'],
    'code': JSONfn.stringify(block['code'])
  }

  return blockJSON
}

module.exports = { typeDefs, resolvers }
