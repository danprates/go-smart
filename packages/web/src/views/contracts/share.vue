<template>
  <div class="container">
    <div class="row justify-content-center">
      <section class="col-12">
        <h1 class="font-weight-bold">Compartilhar</h1>

        <p>
          Para compartilhar o documento basta copiar o link abaixo e enviar.
          Caso queira ver como vai ficar é só clicar no link para ver
        </p>
      </section>

      <section
        class="col-auto border py-4"
        style="overflow: auto">
        <router-link
          class="mt-4"
          :to="{ name: 'contracts.sign', params: { id: $route.params.id } }">
          {{ link }}
        </router-link>
      </section>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Share',
  computed: {
    link () {
      return `${process.env.VUE_APP_API_URL}/contratos/${this.$route.params.id}/assinar`
    }
  }
}
</script>
