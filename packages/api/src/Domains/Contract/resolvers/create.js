const { contracts, uploads } = require('../../../Mongoose')().models
const { ObjectId } = require('mongoose').Types
const FileManager = require('../../../File')()
const Crypt       = require('../../../Crypt')()
const fs = require('fs')
const moment = require('moment')

const uuid = require('uuid/v1')

module.exports = async (_, { data }, { user }) => {
  const item = { ...data };

  const { fileId } = item

  if (fileId) {
    const file = await uploads.findOne(ObjectId(fileId))

    const chain = FileManager.split(fs.readFileSync(file.path))

    item.chain = chain
  }

  item.privateKey = uuid()

  item.status = 'active'
  item.created_at = new Date(moment.utc().toISOString())
    
  item.userId = user.id
  return contracts.create({ ...item })
}