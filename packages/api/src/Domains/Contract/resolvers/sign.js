const { contracts, uploads } = require('../../../Mongoose')().models
const moment = require('moment')

const uuid = require('uuid/v1')

module.exports = async (_, { contractId, status, reason, cpf, name }, { user, blockchain }) => {
  const contract = await contracts.findOne({ _id: contractId })

  if (!contract) throw new Error('Contract not found')

  if (!['accepted', 'declined'].includes(status)) throw new Error('Must provide a "accepted" or "declined" status')

  console.log('contract', contract)

  const file = await uploads.findOne({_id: contract.fileId});
  
  const sign = {
    name,
    cpf,
    status,
    reason,
    uuid: uuid()
  }

  const block = {
    contract: {
      id: contract._id,
      name: contract.name,
      file
    },
    sign
  }

  blockchain.addBlock(block)
  console.log('blockchain', blockchain.getLastBlock().data)

  contract.signatures.push(sign)

  contract.updated_at = new Date(moment.utc().toISOString())

  return contract.save()
}
