const { gql } = require('apollo-server')
const User = require('./resolvers')

const typeDefs = gql`
  type User {
    id: ID!
    name: String!
    password: String
    nickname: String
    username: String
    cpf: String
    email: String
    plan_type: String
    created_at: DATETIME
    updated_at: DATETIME
  }

  extend type Mutation {
    createUser(data: CreateUserInput!): LoginType
    deleteUser(id: ID!): Boolean
    updateUser(id: ID!, data: UpdateUserInput!): User
    login(email: String!, password: String!): LoginType
  }

  input CreateUserInput {
    name: String!
    email: String!
    password: String!
    plan_type: String
    cpf: String
    username: String
    nickname: String
  }

  input UpdateUserInput {
    name: String
    email: String
    plan_type: String
    password: String
    username: String
    cpf: String
    nickname: String
  }

  extend type Query {
    users(
      limit: Int = 10
      offset: Int = 0
      orderBy: String = "id"
      reverse: Boolean = false
    ): ResultUserList 
    user(id: ID!): User
  }

  type ResultUserList {
    total: Int
    limit: Int
    offset: Int
    data: [User]
  }

  type LoginType {
    user: User!,
    token: String!
  }
`

const resolvers = {
  Query: {
    users: User.findAll,
    user: User.findOne
  },
  Mutation: {
    createUser: User.create,
    deleteUser: User.remove,
    updateUser: User.update,
    login: User.login
  },
  User: {
  }
}

module.exports = { typeDefs, resolvers }
