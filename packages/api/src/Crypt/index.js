const hash = require('./hash')
const compare = require('./compare')
module.exports = () => {

  return {
    hash,
    compare
  }

}