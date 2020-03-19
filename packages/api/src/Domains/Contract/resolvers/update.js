const { contracts } = require('../../../Mongoose')().models
const { ObjectId } = require('mongoose').Types
const FileManager = require('../../../File')()
const Crypt       = require('../../../Crypt')()

module.exports = async (_, { data }) => {
  const item = { ...data };

  const id = ObjectId(item.id)

  const contract = await contracts.findOne(id)

  Object.keys(item).forEach( key => contract[key] = item[key] )

  const result = await contracts.updateOne({ _id: id }, { $set :  { ...item }}).then(res => {
    return {
      ...item
    }
  })

  return result
}
