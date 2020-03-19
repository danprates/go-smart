<template>
  <div class="container">
    <div class="row justify-content-center">
      <!-- title and description -->
      <header class="col-12">
        <h1 class="font-weight-bold">Assinar documento</h1>

        <p>
          Você recebeu o link para assinatura de contrato,
          para saber mais sobre o contrato é só clicar em <b>Baixar documento</b>.
        </p>

        <p>
          Se você concorda com os termos do documento marque a caixa de seleção <b>Li e aceito</b>
          em seguida clique em <b>Assinar documento</b>.
        </p>

        <p>
          Caso não concorde é só clicar em <b>Não concordo</b>.
        </p>
      </header>

      <section class="col-12 col-md-4">
        <button
          @click="downloadFile"
          class="btn btn-block btn-link">
          Baixar documento
        </button>

        <div class="custom-control custom-checkbox my-2">
          <input
            v-model="accept"
            type="checkbox"
            class="custom-control-input"
            id="terms">
          <label
            class="custom-control-label"
            for="terms">
            Li e aceito
          </label>
        </div>

        <router-link
          class="btn btn-block btn-primary"
          :disabled="!accept"
          tag="button"
          :to="{ name: 'contracts.identification', params: { id: this.$route.params.id } }">
          Assinar documento
        </router-link>

        <router-link
          class="btn btn-block btn-link text-danger my-4"
          :to="{ name: 'contracts.decline', params: { id: this.$route.params.id } }">
          Não concordo
        </router-link>
      </section>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Sign',
  data () {
    return {
      accept: false,
      contract: null
    }
  },
  beforeCreate () {
    const { id } = this.$route.params

    this.$api.contract({ id })
      .then(({ contract }) => { this.contract = contract })
      .catch(err => { console.log({ err }) })
  },
  methods: {
    async downloadFile () {
      const file = await this.$api.getFile(this.contract.fileId)

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
