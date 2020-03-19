<template>
  <section
    class="plan border rounded-sm shadow-sm p-2 my-2 bg-white"
    @click="$emit('onClick')">
    <section class="plan__description">
      <h2 class="h6 font-weight-bold">
        {{ title }}
      </h2>

      <p class="m-0">{{ text }}</p>
    </section>

    <section class="plan__price bg-primary text-light rounded-sm">
      {{ price }}
    </section>
  </section>
</template>

<script>
export default {
  name: 'Plan',
  props: {
    title: {
      type: String,
      required: true
    },
    text: {
      type: String,
      required: true
    },
    price: {
      type: String,
      required: true
    }
  }
}
</script>

<style lang="scss">
.plan {
  display: flex;
  align-items: center;
  cursor: pointer;

  .plan__description {
    flex-grow: 1;
  }

  .plan__price {
    flex-grow: 0;
    border: 1px solid black;
    padding: 10px;
    width: 70px;
    text-align: center;
    font-weight: bold;
  }
}
</style>
