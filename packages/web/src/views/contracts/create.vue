<template>
  <div class="container">
    <div class="row justify-content-center">
      <!-- title and description -->
      <header class="col-12">
        <h1 class="font-weight-bold">Novo documento</h1>

        <p>
          Para criar um novo contrato basta dar um nome e selecionar o arquivo no formato PDF.
        </p>
      </header>

      <!-- form -->
      <section class="col-12 col-md-6">
        <form @submit.prevent="sendFile">

          <div class="form-group">
            <label for="name">
              Nome do contrato
            </label>
            <input
              v-model="contractName"
              type="text"
              required
              class="form-control"
              id="name">
          </div>

          <div class="form-group">
            <label for="name">
              Nome do arquivo
            </label>
            <input
              v-model="fileName"
              type="text"
              required
              class="form-control"
              id="name">
          </div>

          <div class="custom-file">
            <input
              type="file"
              ref="myFiles"
              required
              class="custom-file-input"
              id="file"
              @change="loadFile">
            <label
              class="custom-file-label"
              for="file">
              {{ originalFileName || 'Escolha o arquivo' }}
            </label>
          </div>

          <button
            :disabled="loading"
            type="submit"
            class="btn btn-block btn-primary mt-4">
            Criar novo contrato
          </button>
        </form>
      </section>
    </div>
  </div>
</template>

<script>
export default {
  name: 'NewContract',
  data () {
    return {
      loading: false,
      fileName: '',
      file: null,
      contractName: null,
      originalFileName: 'Escolha o arquivo'
    }
  },
  methods: {
    async sendFile () {
      this.loading = true

      try {
        const formData = new FormData()
        formData.append('file', this.file)
        formData.append('name', this.fileName)

        const fileData = await this.$api.sendFile(formData, this.$store.getters.token)

        const { createContract } = await this.$api.createContract({ fileId: fileData._id, name: this.contractName }, this.$store.getters.token)

        this.$router.push({ name: 'contracts.view', params: { id: createContract.id } })
      } catch (error) {
        this.loading = false
      }
    },
    loadFile () {
      this.file = this.$refs.myFiles.files[0]
      this.originalFileName = this.file.name
    }
  }
}
</script>
