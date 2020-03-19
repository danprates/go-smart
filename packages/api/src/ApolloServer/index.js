const { FileRouter } = require('../File')()

const {
  APP_PORT,
  CHAT_URL,
  CHAT_API_KEY,
  CHAT_ASSISTANT_ID,
  CHAT_VERSION
} = require('../config')

const {
  ApolloServer
} = require('apollo-server-express');

const GraphQL = require('../GraphQL')
const Session = require('../Session')
const express = require('express')
const MongoDB = require('../Mongoose')().models.users;
const bodyParser = require('body-parser')

const Blockchain = require('../Blockchain')
const blockchain = new Blockchain()

const AssistantV2 = require('ibm-watson/assistant/v2');

const assistant = new AssistantV2({
  version: CHAT_VERSION,
  iam_apikey: CHAT_API_KEY,
  url: CHAT_URL
});

const app = express();

app.use(require('cors')())
app.use(bodyParser.json())

const captalize = string => string.charAt(0).toUpperCase() + string.slice(1)

module.exports = async ({models}) => {

  const server = new ApolloServer({ ...GraphQL, context, cors: true });

  server.applyMiddleware({ app, path: '/graphql', cors: false })


  app.post('/file-manager', ...FileRouter.post)
  app.post('/file-manager/:id', FileRouter.get)

  app.post('/chat/sessions', (req, res) => assistant
    .createSession({ assistant_id: CHAT_ASSISTANT_ID })
    .then(({ session_id }) => res.json({ session_id }))
  )

  app.post('/chat/messages', ({ body }, res) => assistant
    .message({
      assistant_id: CHAT_ASSISTANT_ID,
      session_id: body.sessionId,
      input: {
        'message_type': 'text',
        text: body.text
      }
    })
    .then(response => res.json(response))
  )

  app.listen({port: APP_PORT}, () => {
    console.log(`🚀  Server ready at ${APP_PORT}`);
  })
}

async function context ({req}) {

  const token = req.headers.authorization || req.headers.Authorization;

  let user = await Session.getItem(token);

  if (user) {
    user = await MongoDB.findOne({_id:user.id})
  }

  return { user, blockchain };
}

function openOperation(req){

  const mutations = ['login', 'CreateUser']
  let available = req.body.operationName == 'IntrospectionQuery'

  if (!available) {
    const mutation = (req.body.query || '')
    available = mutation.indexOf('mutation') !== -1 && mutations.filter(i => mutation.indexOf(i)).length > 0
  }

  return available
}
