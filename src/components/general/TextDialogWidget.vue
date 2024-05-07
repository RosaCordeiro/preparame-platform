<template>
  <div
    class="text-dialog-widget"
    id="text-dialog"
    :class="{
      show: show,
      hide: show,
    }"
  >
    <div class="text-dialog-container">
      <div class="text-dialog-container-text">
        <div>
          <span>Atenção</span>

          <p>Não há dados suficientes para este filtro.</p>
        </div>
      </div>

      <img
        src="~assets/icons/close.svg"
        alt=""
        width="20"
        height="20"
        @click="close"
      />
    </div>
  </div>
</template>

<script>
export default {
  name: "TextDialogWidget",
  data() {
    return {
      id: "",
      show: false,
    };
  },
  methods: {
    getText(id) {
      return this.infos.find((info) => info.id === id)?.text || "";
    },
    open() {
      this.show = true;
    },
    close() {
      this.show = false;
    },
  },
  mounted() {
    window.confirmDialog = this;
  },
};
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Inter:wght@100..900&display=swap");

.text-dialog-widget {
  position: fixed;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999;
  background-color: rgb(217 217 217 / 40%);
  backdrop-filter: blur(2px);
  opacity: 0;
  transition: opacity 0.2s ease-in-out;
  visibility: hidden;
}

.text-dialog-widget.show {
  opacity: 1;
}

.hide {
  visibility: visible;
}

.text-dialog-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-direction: column;
  gap: 40px;
  width: 95%;
  max-width: 500px;
  border-radius: 5px;
  padding: 10px;
  box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
  background: #ffffff;
  position: relative;
}

.text-dialog-container img {
  position: absolute;
  top: 10px;
  right: 10px;
  cursor: pointer;
}

.text-dialog-container span {
  font-size: 20px;
  font-weight: 700;
  line-height: 20.29px;
  text-align: left;
  color: rgba(182, 61, 158, 1);
  font-family: "Inter", sans-serif;
  margin-bottom: 20px;
  display: block;
}

.text-dialog-container-text {
  display: flex;
  align-items: flex-start;
  flex-direction: column;
  gap: 20px;
  width: 100%;
  padding: 10px 20px;
}

.row {
  display: flex;
  justify-content: flex-end;
  gap: 10px;
  width: 100%;
  padding: 10px 20px;
}

ul {
  list-style-type: none; /* Remove a numeração */
  padding: 0; /* Remove o padding padrão */
  margin: 0; /* Remove a margem padrão */
}

li:before {
  content: "•"; /* Adiciona um círculo antes de cada item */
  color: #000; /* Cor do círculo */
  font-weight: bold; /* Deixa o círculo em negrito */
  display: inline-block; /* Faz o círculo ficar na mesma linha do texto */
  width: 1em; /* Define a largura do círculo */
}
</style>
