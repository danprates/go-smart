<template>
  <div class="container">
    <div class="auth">
      <h1 class="font-weight-bold">Login</h1>

      <!-- error message -->
      <p
        v-if="errorMsg"
        class="text-danger">
        {{ errorMsg }}
      </p>

      <!-- form -->
      <form
        class="auth__form"
        @submit.prevent="onSubmit">
        <div class="form-group">
          <label for="email">
            Email
          </label>
          <input
            v-model="form.email"
            type="email"
            required
            class="form-control"
            id="email">
        </div>

        <div class="form-group">
          <label for="password">
            Senha
          </label>
          <input
            v-model="form.password"
            type="password"
            required
            class="form-control"
            id="password">
        </div>

        <button
          class="btn btn-primary btn-block"
          type="submit">
          Entrar
        </button>
      </form>

      <!-- route to register -->
      <router-link
        class="mt-4"
        :to="{ name: 'auth.register' }">
        Não tem conta?
      </router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Login',
  data () {
    return {
      errorMsg: null,
      form: {
        email: '',
        password: ''
      }
    }
  },
  methods: {
    onSubmit () {
      this.$store.dispatch('login', { ...this.form })
        .then(() => this.$router.push({ name: 'contracts.list' }))
        .catch(({ message }) => { this.errorMsg = message })
    }
  }
}
</script>
