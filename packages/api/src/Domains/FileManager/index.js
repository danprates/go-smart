const { gql } = require('apollo-server')
const File = require('./resolvers')

const typeDefs = gql`
  type File {
    id: ID!
    originalname: String
    encoding: String
    mimetype: String
    destination: String
    filename: String
    path: String
    size: String
    userId: ID
  }

  extend type Mutation {
    createFile(id: ID!): [String]
    deleteFile(id: ID!): Boolean
  }

  extend type Query {
    files(
      limit: Int = 10
      offset: Int = 0
      orderBy: String = "id"
      reverse: Boolean = false
    ): ResultFileList
    file(id: ID!): File
  }

  type ResultFileList {
    total: Int
    limit: Int
    offset: Int
    data: [File]
  }
`

const resolvers = {
  Query: {
    files: File.findAll,
    file: File.findOne
  },
  Mutation: {
    createFile: File.create,
    deleteFile: File.remove
  },
  Contract: {
  }
}

module.exports = { typeDefs, resolvers }
