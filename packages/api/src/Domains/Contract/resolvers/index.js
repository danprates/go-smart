const mongo = require('../../../Mongoose')().models.contracts;
const users = require('../../../Mongoose')().models.users
const create = require('./create')
const update = require('./update')
const sign   = require('./sign')
const { ObjectId } = require('mongoose').Types

module.exports = {
  async findOne(_, { id }) {
    const contract = await mongo.findById(id)

    contract.user = await users.findById(contract.userId)

    return contract
  },

  sign,

  async findAll(_, query, { user }) {
    const _query = findQuery(query)

    const total = await mongo.count({ ..._query, userId: user._id })

    return mongo.find({ ..._query, userId: user._id })
      .limit(query.limit)
      .skip(query.offset)
      .then(data => ({ ...query, total, data }))
  },

  create,
  update,
  async remove(_, {id}){
    const contract = await mongo.findOne({_id: id})
    contract.status = 'deleted'
    return contract.save()
  },

};

function findQuery (query = {}) {

  const template = { limit: 1, offset: 0, orderBy: 'id', reverse: false }

  const _query = {}
  const keys = Object.keys(template)
  Object.keys(query).forEach(i => keys.includes(i) ? null : _query[i] = query[i])
  return _query
}
