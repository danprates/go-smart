const $ = string => require(`../Domains/${string}`)

const { gql } =  require('apollo-server')

const modules = [
  $('User'),
  $('Contract'),
  $('FileManager'),
  $('Blockchain')
]

const root = createRoot()
const typeDefs  = [root.typeDefs]
const resolvers = [root.resolvers]

modules.forEach(i => typeDefs.push(i['typeDefs']) && resolvers.push(i['resolvers']))

module.exports = {
  typeDefs,
  resolvers
}

function createRoot() {
  return {
    resolvers : {},
    typeDefs  : gql`

      scalar DATETIME

      type Query {
        _: String
      }

      type Mutation {
        _: String
      }

      type Subscription {
        _: String
      }
    `
  }
}
