const express = require('express');
const express_graphql = require('express-graphql');
const { APP_PORT } = require('../config')

const {schemas} = require('../GraphQL')()

const { FileRouter } = require('../File')()

module.exports = ({models}) => {

  const GraphQLMiddlewares = []

  Object.keys(schemas).forEach(schema => {

    const item = schemas[schema]({provider : models[schema]})

    console.log(
      'item.resolvers', item.resolvers
    );

    GraphQLMiddlewares.push(express_graphql({
      schema: item.schema,
      rootValue: item.resolvers,
      graphiql: true
    }))

  })

  const app = express();

  app.use('/file-manager', FileRouter)
  app.use('/graphql', GraphQLMiddlewares);

  app.listen(APP_PORT, () => console.log(`Express GraphQL Server Now Running On localhost:${APP_PORT}/graphql`));
}
