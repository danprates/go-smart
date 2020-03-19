<template>
  <div class="container">
    <!-- title and description -->
    <header class="row justify-content-center">
      <section class="col-12">
        <h1 class="font-weight-bold">Detalhe do documento</h1>

        <p>
          Veja mais informações sobre o documento como: data de criação, data das assinaturas.
          E também é possível compartilhar ou baixar o documento.
        </p>
      </section>
    </header>

    <!-- contract detail -->
    <div class="row justify-content-center">
      <section class="col-12 col-md-7">
        <h2 class="h2 font-weight-bold">
          {{ contract.name }}
        </h2>
        <p class="text-muted">Criado em {{ contract.created_at }}</p>

        <button
          @click="downloadFile"
          class="btn btn-link">
          Baixar
        </button>

        <router-link
          v-if="contract.id"
          :to="{ name: 'contracts.share', params: { id: contract.id } }"
          class="btn btn-primary">
          Compartilhar
        </router-link>
      </section>
    </div>

    <hr>

    <!-- list of signatures -->
    <div
      v-if="contract.signatures && contract.signatures.length > 0"
      class="row justify-content-center my-4">
      <div class="col-12 col-md-7">
        <h3>Assinaturas</h3>
      </div>

      <section
        v-for="sign in contract.signatures"
        :key="sign.id"
        class="col-12 col-md-7 pt-2">
        <section
          class="border shadow-sm p-2 rounded-sm"
          :class="{ 'border-danger': sign.status === 'declined' }">
          <p class="m-0">
            {{ sign.name }}
            {{ sign.status === 'accepted' ? 'aceitou' : 'recusou' }}
            os termos
          </p>

          <p
            v-if="sign.status === 'declined'"
            class="m-0">
            <span>Motivo:</span>
            {{ sign.reason }}
          </p>
        </section>
      </section>
    </div>
  </div>
</template>

<script>
import moment from 'moment'

export default {
  name: 'Contract',
  data () {
    return {
      contract: {}
    }
  },
  beforeCreate () {
    const token = this.$store.getters.token
    const { id } = this.$route.params

    this.$api.contract({ id }, token)
      .then(({ contract }) => {
        contract.created_at = moment(contract.created_at).format('DD/MM/YYYY')
        this.contract = contract
      })
      .catch(err => { console.log({ err }) })
  },
  methods: {
    async downloadFile () {
      const fileId = this.contract.fileId

      const file = await this.$api.getFile(fileId)

      const ContentType = file.mimetype
      const fileData = file.base64
      const filename = file.originalname
      const bufferType = 'base64'

      const buffer = Buffer.from(fileData, bufferType)
      const blob = new Blob([buffer], { type: ContentType })
      const hiddenElement = document.createElement('a')

      hiddenElement.href = window.URL.createObjectURL(blob)
      hiddenElement.download = filename
      hiddenElement.style.display = 'none'
      document.body.appendChild(hiddenElement)
      hiddenElement.click()
    }
  }
}
</script>
