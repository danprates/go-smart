const { uploads } = require('../Mongoose')().models

module.exports = async (req, res, next) => {
    
  const file = await uploads.create({ ...req.file, name: req.body.name })
  
  res.status(201).send(file)
}