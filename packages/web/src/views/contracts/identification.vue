<template>
  <div class="container">
    <div class="row justify-content-center">
      <!-- title and description -->
      <header class="col-12">
        <h1 class="font-weight-bold">Identificação</h1>

        <p>
          Para prosseguir com a assinatura do contrato precisamos apenas do seu nome completo e CPF,
          para ficar registrado quem assinou o documento.
        </p>
      </header>

      <!-- form -->
      <section class="col-12 col-md-6">
        <form @submit.prevent="onSubmit">
          <div class="form-group">
            <label for="name">
              Nome completo
            </label>
            <input
              v-model.trim="form.name"
              type="text"
              required
              class="form-control"
              id="name">
          </div>

          <div class="form-group">
            <label for="doc">
              CPF
            </label>
            <input
              v-model.trim="form.cpf"
              type="text"
              required
              class="form-control"
              id="doc">
          </div>

          <button
            type="submit"
            class="btn btn-block btn-primary">
            Assinar
          </button>
        </form>
      </section>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Identification',
  data () {
    return {
      form: {
        name: '',
        cpf: null
      }
    }
  },
  methods: {
    onSubmit () {
      this.$api.signContract({ ...this.form, contractId: this.$route.params.id, status: 'accepted' })
        .then(() => this.$router.push({ name: 'contracts.signed', params: { id: this.$route.params.id } }))
        .catch(e => console.log({ ...e }))
    }
  }
}
</script>
