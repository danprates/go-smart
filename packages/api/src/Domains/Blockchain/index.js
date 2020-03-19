const { gql } = require('apollo-server')
const Blockchain = require('./resolvers')

const typeDefs = gql`
  type Block {
    index: Int
    previousHash: String
    timestamp: String
    data: Data
    difficulty: Int
    nonce: Int
    hash: String
  }

  type Data {
    sign: SignBlock,
    contract: ContractBlock
  }

  type SignBlock {
    name: String
    cpf: String
    reason: String
    uuid: String
  }

  type ContractBlock {
    name: String
    id: ID
  }

  extend type Query {
    blockchain: [Block]
    getLastBlock: Block
    isValid: Boolean!
  }
`

const resolvers = {
  Query: {
    blockchain: Blockchain.findAll,
    getLastBlock: Blockchain.getLastBlock,
    isValid: Blockchain.isValid
  }
}

module.exports = { typeDefs, resolvers }
