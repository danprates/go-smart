const Datastore = require('nedb')

const db = new Datastore({ filename: '../../storage/session.db', autoload: true })

module.exports = {
  setItem, getItem
}

function getItem (key) {
  return new Promise((resolve, reject) => {
    db.findOne({key}, (err, found) => {
      err ? reject(err) : resolve((found || {}).value)
    })
  })
}

async function setItem(key, value) {

  return new Promise((resolve, reject) => {
    db.insert({key, value}, (err, newDoc) => {
      err ? reject(err) : resolve(newDoc)
    })
  })
}
