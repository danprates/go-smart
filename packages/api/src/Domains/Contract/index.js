const { gql } = require('apollo-server')
const Contract = require('./resolvers')

const typeDefs = gql`
  type Contract {
    id: ID!
    name: String!
    fileId: String
    privateKey: String!
    chain: [String]
    userId: ID!
    user: User
    status: String,
    signatures: [Signature]
    created_at: DATETIME!
    updated_at: DATETIME
  }

  type Signature {
    userId: String
    name: String!
    status: String!
    uuid: String!
    reason: String
    cpf: String
  }

  extend type Mutation {
    createContract(data: CreateContractInput!): Contract
    deleteContract(id: ID!): Contract
    updateContract(data: UpdateContractInput!) : Contract
    signContract(contractId: String!, name: String!, status: String!, reason: String, cpf: String): Contract
  }

  input CreateContractInput {
    name: String!
    fileId: String
  }

  input UpdateContractInput {
    id: ID!
    name: String
    fileId: String
  }

  extend type Query {
    contracts(
      limit: Int = 10
      offset: Int = Contract
      orderBy: String = "id"
      reverse: Boolean = false
      status: String = "active"
    ): ResultContractList
    contract(id: ID!): Contract
  }

  type ResultContractList {
    total: Int
    limit: Int
    offset: Int
    data: [Contract]
  }
`

const resolvers = {
  Query: {
    contracts: Contract.findAll,
    contract: Contract.findOne
  },
  Mutation: {
    createContract: Contract.create,
    deleteContract: Contract.remove,
    updateContract: Contract.update,
    signContract: Contract.sign
  },
  Contract: {
  }
}

module.exports = { typeDefs, resolvers }
