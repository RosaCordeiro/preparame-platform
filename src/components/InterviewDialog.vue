<template>
  <div class="interview-dialog-widget" id="interview-dialog">
    <div class="interview-dialog-container">
      <div class="interview-dialog-container-text">
        <div class="row">
          <span style="text-align: center">
            Liberado na versão pró para 100% das perguntas</span
          >
          <span style="font-size: 50px">
            <b>R$ 29,90</b>
          </span>
        </div>
      </div>

      <div class="row">
        <button class="button__buy" @click="buy">COMPRAR APOIO</button>
        <button class="button__cancel">CONTINUAR SEM APOIO</button>
      </div>
    </div>
  </div>
</template>

<script>
import { requestPagarMe } from "src/tools/requestPagarMeKitPro";
import { showError } from "src/global";

export default {
  mounted() {
    const cancelButton = document.querySelector(".button__cancel");

    cancelButton.addEventListener("click", () => {
      const confirmDialog = document.getElementById("interview-dialog");

      confirmDialog.classList.remove("show");
      setTimeout(() => {
        confirmDialog.classList.remove("hide");
      }, 300);
    });
  },

  methods: {
    async buy() {
      try {
        const response = await requestPagarMe();

        if (response) {
          this.$router.push({ path: `/${"orders"}` });
        } else {
          showError("Não foi possível identificar o usuário registrado.");
        }
      } catch (error) {
        console.log(error);
        showError("Erro ao processar pagamento.");
      }
    },
    show() {
      const confirmDialog = document.getElementById("interview-dialog");

      confirmDialog.classList.add("show");
      setTimeout(() => {
        confirmDialog.classList.add("hide");
      }, 300);
    },
  },
};
</script>

<style scoped>
.interview-dialog-widget {
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

.interview-dialog-widget.show {
  opacity: 1;
}

.hide {
  visibility: visible;
}

.interview-dialog-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-direction: column;
  gap: 40px;
  width: 600px;
  margin: 50px;
  border-radius: 10px;
  padding: 10px;
  box-shadow: 0px 0px 4px 1px rgba(217, 217, 217, 0.3);
  background: #ffffff;
  border: 15px solid #1a27b7;
}

.interview-dialog-container span {
  font-size: 25px;
  font-weight: 400;
  color: #000000;
}

.interview-dialog-container b {
  font-weight: 700;
}

.interview-dialog-container-text {
  display: flex;
  align-items: center;
  flex-direction: column;
  gap: 20px;
  width: 100%;
  padding: 10px 20px;
}

.row {
  display: flex;
  justify-content: center;
  gap: 10px;
  width: 100%;
  padding: 10px 20px;
}

.button__cancel,
.button__buy {
  background-color: #d2c7db;
  border-radius: 10px;
  border: none;
  padding: 10px 20px;
  font-size: 30px;
  font-weight: 700;
  cursor: pointer;
  width: 85%;
}

.button__buy {
  background-color: #35a97d;
}
</style>
