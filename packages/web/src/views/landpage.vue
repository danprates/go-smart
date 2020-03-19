<template>
  <div>
    <section class="landpage__hero">
      <div class="container h-100">
        <div class="row justify-content-center align-items-center h-100 text-white">
          <section class="col-12 text-center">
            <h1>Contratos inteligentes</h1>

            <p>
              Agilize os processos de validação sem burocracias
            </p>

            <router-link
              class="btn btn-light px-5"
              :to="{ name: 'auth.register' }">
              Começar
            </router-link>
          </section>
        </div>
      </div>
    </section>

    <section class="landpage__steps py-4 bg-light">
      <div class="container">
        <div class="row justify-content-center">
          <div class="col-12">
            <h2>
              Como funciona?
            </h2>

            <p class="text-secondary">
              Veja como é fácil usar a plataforma
            </p>
          </div>

          <section
            v-for="(step, index) in steps"
            :key="`article-${index}`"
            class="col-12 col-md-7">
            <article class="my-2 border p-2 rounded bg-white">
              <p class="m-0">
                <b>{{ index + 1 }}.</b>
                {{ step }}
              </p>
            </article>
          </section>

          <div class="col-12 col-md-7 mt-2">
            <router-link
              :to="{ name: 'auth.register' }"
              class="btn btn-primary btn-block">
              Começar
            </router-link>
          </div>

          <div class="col-12 col-md-7 mt-4">
            <router-link
              :to="{ name: 'knowMore'}"
              class="btn btn-link btn-block">
              Ficou com dúvida?
            </router-link>
          </div>
        </div>
      </div>
    </section>

    <footer class="landpage__footer border-top">
      <div class="container">
        <div class="row py-4">
          <div class="col-12">
            <p class="text-center m-0">
              Copyright 2019. All rights reserved
            </p>
          </div>
        </div>
      </div>
    </footer>
  </div>
</template>

<script>
export default {
  name: 'Landpage',
  data () {
    return {
      steps: [
        'Crie uma conta na plataforma',
        'Escolha um plano',
        'Faça upload do contrato em PDF',
        'Compartilhe o link gerado',
        'Pronto. agora é so esperar'
      ]
    }
  }
}
</script>

<style lang="scss">
.landpage__hero {
  height: 90vh;
  background: rgba(0, 0, 0, 0.2) url('/img/hero.jpeg') no-repeat center;
  background-size: cover;
}
</style>
