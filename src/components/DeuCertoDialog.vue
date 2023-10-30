<template>
  <div class="deu-certo-widget" id="deu-certo">
    <div class="deu-certo-container">
      <div class="deu-certo-container-text">
        <div class="row">
          <span class="confirm-text"> DEU CERTO! </span>
          <img
            src="../assets/icons/deu certo.png"
            alt=""
            width="80"
            height="50"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    show() {
      const confirmDialog = document.getElementById("deu-certo");

      confirmDialog.classList.add("show");
      setTimeout(() => {
        confirmDialog.classList.add("hide");
      }, 300);

      setTimeout(() => {
        const confirmDialog = document.getElementById("deu-certo");

        confirmDialog.classList.remove("show");
        setTimeout(() => {
          confirmDialog.classList.remove("hide");
        }, 300);
      }, 3000);
    },
  },
};
</script>

<style scoped>
.deu-certo-widget {
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

.deu-certo-widget.show {
  opacity: 1;
}

.hide {
  visibility: visible;
}

.deu-certo-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-direction: column;
  width: 400px;
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

.deu-certo-container b {
  font-weight: 700;
}

.deu-certo-container-text {
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
  display: flex;
  justify-content: center;
  align-items: center;
}

@media (max-width: 768px) {
  .deu-certo-container {
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

  .deu-certo-container-text {
    font-size: 15px;
    padding: 0px;
  }

  .row {
    flex-direction: column;
  }
}

.deu-certo-container-text > img {
  object-fit: contain;
}
</style>
