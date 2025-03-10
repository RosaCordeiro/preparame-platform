<template>
  <div v-if="isOpen" class="modal-overlay" @click.self="close">
    <div class="modal">
      <div class="modal-header">
        Entre em Contato
        <button class="modal-close" @click="close">×</button>
      </div>
      <div class="modal-content">
        <iframe
          title="Formex SOLICITOU CONTATO SITE - Formulário completo"
          name="iframe_formex_lahar"
          width="100%"
          height="500px"
          frameborder="0"
          allowtransparency="true"
          :src="formUrl"
        >
          Seu navegador não possui suporte para iframes.
        </iframe>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  props: {
    isOpen: Boolean,
  },
  data() {
    return {
      formUrl:
        "https://forms.lahar.com.br/formularios-externos/acessa/entraremcontatoformulariocompl-ij8plPWsW7HTIvvGXDL",
    };
  },
  methods: {
    close() {
      this.$emit("close");
    },
  },
};
</script>
