const CryptoJS = require('crypto-js')

module.exports = (entry, hash) => {

  const decrypted = CryptoJS.AES.decrypt(hash, $password);
  
  return decrypted.toString(CryptoJS.enc.Utf8) == entry
}