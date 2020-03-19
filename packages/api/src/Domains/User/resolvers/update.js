const { users } = require('../../../Mongoose')().models
const { ObjectId } = require('mongoose').Types
const moment = require('moment')

module.exports = async (_, { id, data }) => {
  const item = { ...data };
  
  const _id = ObjectId(id)
  
  const user = await users.findOne(_id)
  
  Object.keys(item).forEach( key => user[key] = item[key] )
    
  item.updated_at = new Date(moment.utc().toISOString())

  delete item._id 

  await user.save();

  return user

}
