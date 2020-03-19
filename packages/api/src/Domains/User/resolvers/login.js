const mongo = require('../../../Mongoose')().models.users;
const Crypt = require('../../../Crypt')()
const Session = require('../../../Session')
const jwt = require('jsonwebtoken');

module.exports = async (_, { email, password, internal }) => {

  const user = await mongo.findOne({email})
  
  if (!user) {
    throw new Error('User not found')
  }

  if (!internal && !Crypt.compare(password, user.password)) {
    throw new Error('Invalid password')
  }

  delete user.password

  const _token = {id: user._id.toString(), name: user.name}
  
  const token = jwt.sign(_token, $password);
  
  Session.setItem(token, _token)

  return {
    user,
    token
  }
  
}
