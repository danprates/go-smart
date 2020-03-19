<template>
  <section class="chat">
    <ul
      v-if="messages.length > 0"
      class="chat__messages">
      <li
        v-for="(m, i) in messages"
        :key="i"
        :class="`chat__message message--${m.type}`">
        {{ m.text }}
      </li>
    </ul>

    <div class="chat-form bg-light">
      <div class="container">
        <form
          class="form-row"
          @submit.prevent="onSubmit">
          <div class="col">
            <input
              v-model="message"
              class="form-control"
              type="text">
          </div>

          <div class="col-auto">
            <button
              class="btn btn-primary"
              type="submit">
              Enviar
            </button>
          </div>
        </form>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: 'ChatBot',
  props: {
    messages: {
      type: Array,
      required: true
    }
  },
  data () {
    return {
      message: ''
    }
  },
  methods: {
    onSubmit () {
      this.$emit('onSubmit', this.message)
      this.message = ''
    }
  }
}
</script>

<style>
.chat {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
}

.chat__message {
  background-color: #F9F9F9;
  margin: 10px 0px;
  padding: 10px;
  border-radius: 5px;
}

.chat__messages {
  list-style: none;
  padding: 0;
  margin-bottom: 70px;
}

.chat-form {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 15px 0;
  background-color: #FFF;
  border-top: 1px solid #F1F1F1;
}

.message--user {
  text-align: right;
  border-right: 3px solid black;
  padding-right: 10px;
}

.message--robot {
  text-align: left;
  border-left: 3px solid blue;
  padding-left: 10px;
}
</style>
