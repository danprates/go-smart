<template>
  <div class="container">
    <div class="row">
      <section class="col-12">
        <h1>Planos</h1>

        <p>
          Escolha um dos planos para prosseguir
        </p>
      </section>

      <section
        v-for="plan in plans"
        :key="`plan-${plan.id}`"
        class="col-12 col-md-4">
        <Plan
          :title="plan.title"
          :text="plan.text"
          :price="plan.price"
          @onClick="onClick(plan.id)" />
      </section>
    </div>
  </div>
</template>

<script>
import Plan from '@/components/Plan'

export default {
  name: 'Plans',
  components: { Plan },
  data () {
    return {
      plans: [
        { id: 'bronze', title: '1 documento', text: 'Ideal para experimentar o produto', price: 'R$ 4,99' },
        { id: 'silver', title: '10 documentos', text: 'Útil para quem irá usar algumas vezes', price: 'R$ 9,99' },
        { id: 'gold', title: '100 documentos', text: 'Perfeito para quem quer realmente desburocratizar', price: 'R$ 19,99' }
      ]
    }
  },
  methods: {
    onClick (plan) {
      const { id } = this.$store.getters.user
      const token = this.$store.getters.token

      this.$api.changePlan({ plan, id }, token)
        .then(() => this.$router.push({ name: 'contracts.create' }))
        .catch(err => { console.log(err) })
    }
  }
}
</script>
