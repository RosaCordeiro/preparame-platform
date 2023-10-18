<template>
  <div class="survey-view-dialog-widget" id="survey-view-dialog">
    <div class="survey-view-dialog-container">
      <section class="main">
        <div class="survey-view-dialog-container-text">
          <span>
            Obrigada por contribuir com a sua resposta. Quer ver nosso estudo
            sobre demissão deste ano?
          </span>
        </div>
      </section>

      <section class="buttons">
        <div class="button-image" @click="cancel()">
          <img src="../assets/icons/botao não.png" alt="" />
          <span> NÃO </span>
        </div>
        <div class="button-image" @click="ok()">
          <img src="../assets/icons/botao sim.png" alt="" />
          <span> SIM </span>
        </div>
      </section>

      <div class="icon-top">
        <img src="../assets/logos/logo_reduzida.png" />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    cancel() {
      const confirmDialog = document.getElementById("survey-view-dialog");

      confirmDialog.classList.remove("show");
      setTimeout(() => {
        confirmDialog.classList.remove("hide");
      }, 300);
      this.$router.push("/platform");
    },
    ok() {
      window.open(
        "https://23217846.fs1.hubspotusercontent-na1.net/hubfs/23217846/Estudo%20Pesquisa%20de%20Demiss%C3%A3o%20-%20Prepara.me%20-%201a%20ed.%20-%202023.pdf",
        "_blank"
      );

      setTimeout(() => {
        this.cancel();
      }, 1000);
    },
    show() {
      const confirmDialog = document.getElementById("survey-view-dialog");

      confirmDialog.classList.add("show");
      setTimeout(() => {
        confirmDialog.classList.add("hide");
      }, 300);
    },
  },
};
</script>

<style scoped>
.survey-view-dialog-widget {
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

.survey-view-dialog-widget.show {
  opacity: 1;
}

.hide {
  visibility: visible;
}

.survey-view-dialog-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-direction: column;
  gap: 10px;
  width: 400px;
  margin: 50px;
  border-radius: 10px;
  box-shadow: 0px 0px 4px 1px rgba(217, 217, 217, 0.3);
  background: #35aa7c;
  position: relative;
  padding-top: 50px;
}

.survey-view-dialog-container span {
  font-size: 25px;
  font-weight: 400;
  color: #000000;
}

.survey-view-dialog-container b {
  font-weight: 700;
}

.survey-view-dialog-container-text {
  display: flex;
  align-items: center;
  flex-direction: column;
  gap: 20px;
  width: 100%;
  padding: 10px 20px;
  text-align: center;
}

.row {
  display: flex;
  justify-content: center;
  gap: 10px;
  width: 100%;
  padding: 10px 20px;
}

.button__cancel {
  background-color: #35a97d;
  border-radius: 10px;
  border: none;
  padding: 10px 20px;
  font-size: 30px;
  font-weight: 700;
  cursor: pointer;
}

.section {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 20px;
}

.buttons {
  display: flex;
  justify-content: space-between;
  height: 50px;
  width: 100%;
}

.button-image {
  background-color: #f54690;
  flex: 1;
  height: 100%;
  border-top: 1px solid black;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 5px;
  cursor: pointer;
}

.button-image img {
  height: 40px;
  width: 50px;
  object-fit: cover;
}

.button-image span {
  font-size: 20px;
  font-weight: 700;
  color: #000000;
}

.button-image:first-child {
  border-radius: 0 0 0 10px;
  border-right: 1px solid black;
}

.button-image:last-child {
  border-radius: 0 0 10px 0;
}

.icon-top {
  position: absolute;
  top: -35px;
  background-color: #35aa7c;
  border-radius: 50px;
  height: 80px;
  padding-top: 10px;
}

.icon-top img {
  height: 80px;
  width: 80px;
  filter: brightness(0);
}
</style>
