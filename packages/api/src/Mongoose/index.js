const Mongoose = require('mongoose');
const fs       = require('fs');
const path     = require('path');

const Crypt = require('../Crypt')()
const directoryPath = path.join(__dirname, 'models');

const { DATABASE_HOST, DATABASE_PORT, DATABASE_COLLECTION } = require('../config')

let connected = false
const models = {}

module.exports = () => {

  if (connected) {
    return {
      models,
      connection: Mongoose
    }
  }

  Mongoose.connect(`mongodb://${DATABASE_HOST}:${DATABASE_PORT}/${DATABASE_COLLECTION}`);

  const files = fs.readdirSync(directoryPath);

  files.forEach(file => {

    if (file[0] === '.') return

    const name   = file.split('.')[0]

    models[name] = Mongoose.model(name, require(path.join(directoryPath,file)))

  });

  connected = true

  usersSeed.forEach(user => {
    const {users} = models
    users.findOne({email: user.email}).then(_user => {

      if (_user) return

      user.password = Crypt.hash(user.password)

      users.create(user)
    })
  })

  console.log('\nMongoose models', Object.keys(models));

  return {
    models,
    connection: Mongoose
  }
};

const usersSeed = [
  {
    name: "Paulo Henrique Pereira dos Reis",
    password: "1234",
    nickname: "paulork",
    username: "prk07",
    cpf: "85962585698",
    email: "paulork07@gmail.com"
  }
]