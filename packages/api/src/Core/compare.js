const Crypt       = require('../Crypt')()
const FileManager = require('../File')()

module.exports = (stored, file) => {

  const toCompare = FileManager.split(file)

  return toCompare.map((block, index)=> {

    const _retrivedBlock = stored.blocks.find(i => i.data.index == index)  
  
    if (!_retrivedBlock) return false
    
    return Crypt.compare(block, _retrivedBlock.data.value)
    
  }).filter(i => i).length == toCompare.length

}