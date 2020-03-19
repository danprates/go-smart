<template>
  <div class="container">
    <div class="row justify-content-center">
      <section class="col-12">
        <h1 class="font-weight-bold">Documento assinado</h1>

        <p>
          Pronto! O Documento foi assinado. Agora iremos avisar as pessoas envolvidas.
        </p>
      </section>

      <section class="col-12 col-md-4">
        <router-link
          class="btn btn-block btn-link"
          :to="{ name: 'landpage' }">
          Finalizar
        </router-link>
      </section>
    </div>
  </div>
</template>

<script>
export default {
  name: 'SignedContract'
}
</script>
