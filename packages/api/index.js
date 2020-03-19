
global.$password = 'senha forte'

process.env.JWT_SECRET = 'secret'

const Mongoose = require('./src/Mongoose')();

const server = require('./src/ApolloServer/')

server({models : Mongoose.models})

