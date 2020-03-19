<template>
  <div class="container">
    <div class="auth">
      <h1 class="font-weight-bold">Cadastro</h1>

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
          <label for="name">
            Nome
          </label>
          <input
            v-model="form.name"
            type="text"
            class="form-control"
            required
            id="name">
        </div>

        <div class="form-group">
          <label for="email">
            Email
          </label>
          <input
            v-model="form.email"
            type="email"
            class="form-control"
            required
            id="email">
        </div>

        <div class="form-group">
          <label for="password">
            Senha
          </label>
          <input
            v-model="form.password"
            type="password"
            class="form-control"
            required
            id="password">
        </div>

        <button
          type="submit"
          class="btn btn-block btn-primary">
          Criar conta
        </button>
      </form>

      <!-- route to login -->
      <router-link
        :to="{ name: 'auth.login' }"
        class="mt-4">
        Já tem conta?
      </router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Register',
  data () {
    return {
      errorMsg: null,
      form: {
        name: '',
        email: '',
        password: ''
      }
    }
  },
  methods: {
    onSubmit () {
      this.$store.dispatch('register', { ...this.form })
        .then(() => this.$router.push({ name: 'user.plans' }))
        .catch(({ message }) => { this.errorMsg = message })
    }
  }
}
</script>
