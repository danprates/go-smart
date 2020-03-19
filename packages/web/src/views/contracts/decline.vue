<template>
  <div class="container">
    <div class="row justify-content-center">
      <!-- title and description -->
      <header class="col-12">
        <h1 class="font-weight-bold">Recusar contrato</h1>

        <p>
          Já que você não está de acordo com o documento,
          por favor nos informe o seu nome completo e o motivo por não assinar o contrato.
        </p>
      </header>

      <!-- form -->
      <section class="col-12 mb-4">
        <form @submit.prevent="onSubmit">
          <div class="form-group">
            <label for="name">Nome completo</label>
            <input
              v-model.trim="form.name"
              type="text"
              required
              class="form-control"
              id="name" />
          </div>

          <div class="form-group">
            <label for="reason">Decreva o motivo</label>
            <textarea
              v-model.trim="form.reason"
              class="form-control"
              required
              id="reason"
              rows="10" />
          </div>

          <button
            type="submit"
            class="btn btn-primary">
            Enviar
          </button>
        </form>
      </section>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Decline',
  data () {
    return {
      form: {
        name: '',
        reason: ''
      }
    }
  },
  methods: {
    onSubmit () {
      this.$api.signContract({ ...this.form, contractId: this.$route.params.id, status: 'declined' })
        .then((res) => this.$router.push({ name: 'contracts.refused', params: { id: this.$route.params.id } }))
        .catch(err => console.log({ ...err }))
    }
  }
}
</script>
