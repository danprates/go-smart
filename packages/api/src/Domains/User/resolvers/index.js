const mongo = require('../../../Mongoose')().models.users;
const login = require('./login')
const update = require('./update')
const moment = require('moment')
const Crypt = require('../../../Crypt')()

module.exports = {
  login,
  update,
  findOne(_, { id }) {
    return mongo.findById(id);
  },

  async findAll(_, query, {user}) {  
    const _query = findQuery(query)
        
    const total = await mongo.count()

    return mongo.find(_query)
      .limit(query.limit)
      .skip(query.offset)
      .then(res => {
        return { ...query, total, data: res };
      })
  },

  async create(_, { data }) {
    const item = { ...data };
    
    item.created_at = new Date(moment.utc().toISOString())
    item.password = Crypt.hash(item.password)
    
    const user = await mongo.create({ ...item })
    
    const { token } = await login(null, { email: item.email, internal: true })
    
    return { user, token };
  },

  remove(_, {id}){
    return mongo.findOneAndRemove(id).then(i => true)
  },

};

function findQuery (query = {}) {

  const template = { limit: 1, offset: 0, orderBy: 'id', reverse: false }

  const _query = {}
  const keys = Object.keys(template)
  Object.keys(query).forEach(i => keys.includes(i) ? null : _query[i] = query[i])
  return _query
}
