const router = require('express').Router();
const saveFileMiddleware = require('./saveFileMiddleware')
const multer  = require('multer');
const { uploads } = require('../Mongoose')().models
const fs = require('fs')
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'storage');
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + ' !@#$% ' + file.originalname);
  }
});

const upload = multer({ storage: storage });

const post = [upload.single('file'), saveFileMiddleware]
const get = async (req, res) => {  

  const fileId = req.params.id
  const upload = await uploads.findById(fileId)  

  const base64 = new Buffer(fs.readFileSync(upload.path)).toString('base64')
  
  return res.status(200).send({
    ...upload._doc,
    base64
  })
}

module.exports = {
  get,
  post
}