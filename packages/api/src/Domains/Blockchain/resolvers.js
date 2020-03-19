module.exports = {
  findAll: (_, params, { blockchain }) => {
    console.log(blockchain.blocks)
    return blockchain.blocks
  },

  getLastBlock: (_, params, { blockchain }) => blockchain.getLastBlock(),

  isValid: (_, params, { blockchain }) => blockchain.isValid()
}
