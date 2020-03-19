const CryptoJS = require('crypto-js')

module.exports = (string, key = $password) => {

  const encrypted = CryptoJS.AES.encrypt(string, key).toString();

  return encrypted
}