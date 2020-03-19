const mongo = require('../../../Mongoose')().models.contracts;
const moment = require('moment')

module.exports = {
  findOne(_, { id }) {
    return mongo.findById(id);
  },

  async findAll(_, query) {  
    const _query = findQuery(query)
    
    const total = await mongo.count()

    return mongo.find(_query)
      .limit(query.limit)
      .skip(query.offset)
      .then(res => {
        return { ...query, total, data: res };
      })
  },

  create(_, { data }) {
    const item = { ...data };

    item.created_at = new Date(moment.utc().toISOString())

    return mongo.create({ ...item });
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