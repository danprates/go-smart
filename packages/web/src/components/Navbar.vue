<template>
  <nav class="navbar navbar-expand-lg navbar-light">
    <div class="container">
      <router-link
        class="navbar-brand"
        :to="{ name: 'landpage' }">
        <img
          class="logo"
          src="/img/logo.svg"
          alt="Logo">
        GoSmart
      </router-link>

      <button
        class="navbar-toggler border-0"
        @click="showMenu = !showMenu">
        <span class="navbar-toggler-icon" />
      </button>

      <div
        :class="{ 'show': showMenu }"
        class="collapse navbar-collapse bg-secsondary">
        <ul class="navbar-nav ml-auto">
          <li class="nav-item p-1">
            <router-link
              class="btn btn-link text-dark"
              :to="{ name: 'knowMore' }">
              Tem dúvida?
            </router-link>
          </li>
        </ul>

        <ul
          v-if="isAuthenticated"
          class="navbar-nav">
          <li class="nav-item p-1">
            <router-link
              :to="{ name: 'contracts.list' }"
              class="btn btn-link text-dark"
              @click="logout">
              Contratos
            </router-link>
          </li>
          <li class="nav-item p-1">
            <button
              class="btn btn-link text-dark"
              @click="logout">
              Sair
            </button>
          </li>
        </ul>

        <ul
          v-else
          class="navbar-nav">
          <li class="nav-item p-1">
            <button
              class="btn btn-outline-primary"
              @click="onClick('auth.login')">
              Entrar
            </button>
          </li>
          <li class="nav-item p-1">
            <button
              class="btn btn-primary"
              @click="onClick('auth.register')">
              Criar conta
            </button>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  name: 'Navbar',
  data () {
    return {
      showMenu: false
    }
  },
  methods: {
    onClick (nextPage) {
      this.showMenu = false
      this.$router.push({ name: nextPage })
    },
    logout () {
      this.$store.dispatch('logout')
      this.$router.push({ name: 'landpage' })
    }
  },
  computed: {
    isAuthenticated () {
      return !!this.$store.getters.token
    }
  }
}
</script>

<style>
.logo {
  width: 40px;
}
</style>
