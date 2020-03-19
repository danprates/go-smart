const split = require('./splitFile')
const SaveFileMiddleware = require('./saveFileMiddleware')
const FileRouter = require('./router')

module.exports = () => {
  
  return {
    split,
    FileRouter
  }

}