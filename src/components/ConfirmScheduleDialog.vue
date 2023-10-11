<template>
  <div class="confirm-schedule-dialog-widget" id="confirm-schedule-dialog">
    <div class="confirm-schedule-dialog-container">
      <div class="confirm-schedule-dialog-container-text">
        <div class="row">
          <span class="confirm-schedule-title">
            Regras para cancelamentos e remarcações</span
          >
          <p>
            Cancele ou remarque sua mentoria na plataforma
            <b>até 12 horas antes do horário marcado.</b>
          </p>
          <p>
            Nós nos preparamos com muito carinho e atenção para atender você,
            por isto, contamos com você para que esteja livre no horário
          </p>

          <span class="confirm-text">
            Este horário realmente é o melhor para você?
          </span>
        </div>
      </div>

      <div class="row">
        <button class="button__cancel">NÃO, QUERO MUDAR</button>
        <button class="button__confirm" @click="confirm()">
          SIM, QUERO AGENDAR
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  mounted() {
    const cancelButton = document.querySelector(".button__cancel");

    cancelButton.addEventListener("click", () => {
      const confirmDialog = document.getElementById("confirm-schedule-dialog");

      confirmDialog.classList.remove("show");
      setTimeout(() => {
        confirmDialog.classList.remove("hide");
      }, 300);
    });
  },
  methods: {
    show(f) {
      window.func = f;
      const confirmDialog = document.getElementById("confirm-schedule-dialog");

      confirmDialog.classList.add("show");
      setTimeout(() => {
        confirmDialog.classList.add("hide");
      }, 300);
    },
    confirm() {
      window.func();
      const confirmDialog = document.getElementById("confirm-schedule-dialog");

      confirmDialog.classList.remove("show");
      setTimeout(() => {
        confirmDialog.classList.remove("hide");
        this.func = null;
      }, 300);
    },
  },
};
</script>

<style scoped>
.confirm-schedule-dialog-widget {
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

.confirm-schedule-dialog-widget.show {
  opacity: 1;
}

.hide {
  visibility: visible;
}

.confirm-schedule-dialog-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-direction: column;
  width: 600px;
  margin: 50px;
  border-radius: 10px;
  padding: 10px;
  box-shadow: 0px 0px 4px 1px rgba(217, 217, 217, 0.3);
  background: #ffffff;
  border: 15px solid #1a27b7;
}

.confirm-schedule-title {
  text-align: center;
  border-radius: 15px;
  background-color: yellow;
  font-size: 22px;
  padding: 7px 10px;
  font-weight: 700;
  color: #000000;
}

.confirm-schedule-dialog-container b {
  font-weight: 700;
}

.confirm-schedule-dialog-container-text {
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
.button__confirm {
  background-color: #f54690;
  border-radius: 10px;
  border: none;
  padding: 10px 20px;
  font-size: 30px;
  font-weight: 700;
  cursor: pointer;
  flex: 1 0 200px;
}

.button__confirm {
  background-color: #35a97d;
}

.confirm-text {
  font-size: 30px;
  font-weight: 700;
  text-align: center;
  color: #000000;
}

@media (max-width: 768px) {
  .confirm-schedule-dialog-container {
    width: 90%;
    margin: 0;
  }

  .button__cancel,
  .button__confirm {
    font-size: 20px;
    flex: 1;
    padding: 10px;
  }

  .confirm-text {
    font-size: 15px;
  }

  .confirm-schedule-title {
    font-size: 15px;
  }

  .confirm-schedule-dialog-container-text {
    font-size: 15px;
    padding: 0px;
  }

  .row {
    flex-direction: column;
  }
}
</style>
