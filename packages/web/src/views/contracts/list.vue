<template>
  <div class="container mb-2">
    <!-- title -->
    <header class="row">
      <section class="col-12">
        <h1 class="font-weight-bold m-0">Contratos</h1>
      </section>
    </header>

    <!-- search and new button -->
    <div class="row justify-content-between mt-2">
      <section class="col col-md">
        <div class="form-group">
          <input
            v-model.trim="search"
            type="text"
            class="form-control"
            placeholder="pesquisar">
        </div>
      </section>

      <section class="col-auto">
        <router-link
          :to="{ name: 'contracts.create' }"
          class="btn btn-primary">
          Novo
        </router-link>
      </section>
    </div>

    <hr>

    <!-- list of contracts -->
    <div
      v-if="filteredList"
      class="row">
      <section
        v-for="c in filteredList"
        :key="`contract-${c.id}`"
        class="col-12 col-md-6 col-lg-4">
        <router-link
          class="border p-2 my-1 shadow-sm rounded d-block text-dark"
          :to="{ name: 'contracts.view', params: { id: c.id } }">
          <div class="row">
            <div class="col-12 mb-1">
              <b>{{ c.name }}</b>
            </div>

            <div class="col">
              <span class="text-muted">
                Criado {{ c.created_at | formatDate }}
              </span>
            </div>
          </div>
        </router-link>
      </section>
    </div>

    <!-- pagination -->
    <footer
      v-if="total > limit"
      class="row justify-content-center align-items-center mt-2">
      <section class="col-auto col-sm-auto">
        <button
          class="btn btn-outline-primary"
          :disabled="offset < 1"
          @click="onPaginate(-1)">
          Voltar
        </button>
      </section>

      <section class="col col-sm-auto text-center">
        {{ offset + 1 }}
      </section>

      <section class="col-auto col-sm-auto">
        <button
          class="btn btn-outline-primary"
          :disabled="offset + limit >= total"
          @click="onPaginate(1)">
          Próximo
        </button>
      </section>
    </footer>
  </div>
</template>

<script>
import moment from 'moment'

export default {
  name: 'Contracts',
  filters: {
    formatDate (date, format = 'DD/MM/YYYY') {
      return moment(date).format(format)
    }
  },
  data () {
    return {
      contracts: null,
      total: null,
      offset: 0,
      limit: 10,
      search: ''
    }
  },
  mounted () {
    this.loadItems()
  },
  computed: {
    filteredList () {
      return this.contracts && this.contracts.filter(c => c.name.toLowerCase().includes(this.search.toLowerCase()))
    }
  },
  methods: {
    loadItems (offset = 0) {
      const token = this.$store.getters.token

      this.$api.contracts({ limit: this.limit, offset }, token)
        .then(({ contracts }) => {
          this.contracts = contracts.data
          this.total = contracts.total
        })
        .catch(err => { console.log({ ...err }) })
    },
    onPaginate (value) {
      this.offset += value

      this.loadItems(this.limit * this.offset)
    }
  }
}
</script>
