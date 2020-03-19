require('dotenv').config()

const {
  NODE_ENV            = 'development',
  APP_PORT            = 3000,
  DATABASE_HOST       = 'mongodb',
  DATABASE_PORT       = 27017,
  DATABASE_COLLECTION = 'smart-chain',
  CHAT_URL,
  CHAT_API_KEY,
  CHAT_ASSISTANT_ID,
  CHAT_VERSION
} = process.env

module.exports = {
  NODE_ENV,
  APP_PORT,
  DATABASE_HOST,
  DATABASE_PORT,
  DATABASE_COLLECTION,
  CHAT_URL,
  CHAT_API_KEY,
  CHAT_ASSISTANT_ID,
  CHAT_VERSION
}
