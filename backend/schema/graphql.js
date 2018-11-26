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
    category: String!
    struct: JSON!
    code: String!
  }

  type BlockList {
    category: String!
    blocks: [Block!]!
  }

  type Stage {
    stageName: String!
    blockLists: [BlockList]!
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

      let blockListsWithCategory = {}

      let blockList = stage['blocks'].map(function (bn) {
        return JSONBlock(bn)
      }).filter(function (b) {
        return b != null
      })

      // Initialize lists
      for (let i in blockList) {
        let categoryName = blockList[i]['category']
        blockListsWithCategory[categoryName] = []
      }

      // Append to lists
      for (let i in blockList) {
        let block = blockList[i]
        if (block !== null) {
          let categoryName = block['category']
          blockListsWithCategory[categoryName].push(block)
        }
      }

      // Convert array into list
      let blockLists = []
      for (let cat in blockListsWithCategory) {
        blockLists.push({
          'category': cat,
          'blocks': blockListsWithCategory[cat]
        })
      }

      let trainData = stage['trainData']
      let trainLabels = stage['trainLabels']

      return {
        'stageName': stageName,
        'blockLists': blockLists,
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
    'category': block['category'],
    'struct': block['struct'],
    'code': JSONfn.stringify(block['code'])
  }

  return blockJSON
}

module.exports = { typeDefs, resolvers }
