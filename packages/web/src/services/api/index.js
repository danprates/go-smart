import axios from 'axios'
import schemas from './schemas'

const http = axios.create({
  baseURL: process.env.VUE_APP_API_URL
})

const makeRequest = async (payload, token, endPoint = '/graphql') => {
  const options = { headers: { Authorization: token } }

  const { data, errors } = (await http.post(endPoint, payload, options)).data

  if (errors) {
    throw new Error(errors[0].message)
  }

  return data
}

export default {
  login: (credentials) => makeRequest({ query: schemas.login, variables: credentials }),
  register: (userData) => makeRequest({ query: schemas.register, variables: userData }),
  changePlan: ({ id, plan }, token) => makeRequest({ query: schemas.changePlan, variables: { id, plan } }, token),
  Chat: {
    createSession: () => http.post('/chat/sessions'),
    sendMessage: (sessionId, text) => http.post('/chat/messages', { sessionId, text })
  },
  contracts: ({ limit, offset }, token) => makeRequest({ query: schemas.contracts, variables: { limit, offset } }, token),
  contract: ({ id }, token) => makeRequest({ query: schemas.contract, variables: { id } }, token),
  createContract: ({ fileId, name }, token) => makeRequest({ query: schemas.createContract, variables: { fileId, name } }, token),
  signContract: data => makeRequest({ query: schemas.signContract, variables: data }),
  sendFile,
  getFile
}

async function sendFile (formData, token) {
  const options = {
    headers: {
      Authorization: token,
      'Content-Type': 'multipart/form-data',
      'Access-Control-Allow-Origin': '*'
    }
  }

  const { errors, data } = await http.post('/file-manager', formData, options)

  if (errors) {
    throw new Error(errors[0].message)
  }

  return data
}
async function getFile (id, token) {
  const options = {
    headers: {
      Authorization: token,
      'Access-Control-Allow-Origin': '*'
    }
  }

  const { errors, data } = await http.post('/file-manager/' + id, options)

  if (errors) {
    throw new Error(errors[0].message)
  }

  return data
}
