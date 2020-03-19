export default {
  login: `
    mutation Login($email: String!, $password: String!){
      login(email: $email, password: $password){
        token
        user{
          id
          name
          email
        }
      }
    }
  `,
  createContract: `
    mutation CreateContract($name: String!, $fileId: String!){
      createContract (data : {
        name: $name
        fileId: $fileId
      }) {
        id
        name
        signatures {
          uuid
          name
          status
        }
        fileId
        userId
      }
    }
  `,
  register: `
    mutation CreateUser($name: String!, $email: String!, $password: String!){
      createUser(data: { name: $name, email: $email, password: $password }){
        token
        user{
          id
          name
          email
        }
      }
    }
  `,
  changePlan: `
    mutation UpdateUser ($id: ID!, $plan: String!){
      updateUser(id: $id, data: { plan_type: $plan }){
        plan_type
      }
    }
  `,
  contracts: `
    query Contracts ($limit: Int, $offset: Int){
      contracts(limit: $limit, offset: $offset){
        total
        data{
          id
          name
          created_at
        }
      }
    }
  `,
  contract: `
    query Contract ($id: ID!){
      contract(id: $id){
        id
        name
        user {
          name
        }
        signatures {
          uuid
          name
          status
          reason
        }
        fileId
        created_at
        updated_at
      }
    }
  `,
  signContract: `
    mutation SignContract(
      $contractId: String!,
      $name: String!,
      $cpf: String,
      $status: String!,
      $reason: String
    ){
      signContract(
        contractId: $contractId,
        name: $name,
        cpf: $cpf,
        status: $status,
        reason: $reason
      ){
        id
        name
        status
        signatures{
          name
          status
          uuid
          reason
          cpf
        }
      }
    }
  `
}
