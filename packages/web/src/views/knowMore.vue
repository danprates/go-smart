<template>
  <div class="container">
    <div class="row">
      <div class="col-12">
        <h1 class="font-weight-bold">Saiba mais</h1>

        <p>
          Bem-vindo ao FAQ da GoSmart! Nossa assistente virtual Arya
          ajudará você com qualquer dúvida que possa ter em relação
          à nossa plataforma. Digite no campo de texto abaixo sua dúvida
          e clique em enviar que ela detalhará nossos processos de uma forma simples e intuitiva!
        </p>
      </div>

      <div class="col-12">
        <chat-bot
          :messages="messages"
          @onSubmit="onSubmit" />
      </div>
    </div>
  </div>
</template>

<script>
import ChatBot from '@/components/ChatBot'

export default {
  name: 'knowMore',
  components: {
    ChatBot
  },
  async mounted () {
    try {
      this.sessionId = (await this.$api.Chat.createSession()).data.session_id

      const { data } = await this.$api.Chat.sendMessage(this.sessionId, null)

      this.setMessages(data.output.generic)
    } catch (err) {
      console.log({ ...err })
    }
  },
  data () {
    return {
      sessionId: null,
      messages: []
    }
  },
  methods: {
    async onSubmit (text) {
      this.messages.push({ text, type: 'user' })
      const { data } = await this.$api.Chat.sendMessage(this.sessionId, text)
      this.setMessages(data.output.generic)
    },
    setMessages (messages) {
      messages.forEach(message => {
        this.messages.push({ text: message.text, type: 'robot' })
      })
    }
  }
}
</script>
