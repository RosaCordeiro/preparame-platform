<template>
  <div class="anonymous-dialog-widget show hide" id="anonymous-dialog">
    <div class="anonymous-dialog-container">
      <div class="anonymous-dialog-container-text">
        <span> Garantimos o <b>anonimato</b> desta pesquisa. </span>
      </div>

      <div class="row">
        <button class="button__cancel">RESPONDER</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  mounted() {
    const cancelButton = document.querySelector(".button__cancel");

    cancelButton.addEventListener("click", () => {
      const confirmDialog = document.getElementById("anonymous-dialog");

      confirmDialog.classList.remove("show");
      setTimeout(() => {
        confirmDialog.classList.remove("hide");
      }, 300);
    });
  },
};
</script>

<style scoped>
.anonymous-dialog-widget {
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

.anonymous-dialog-widget.show {
  opacity: 1;
}

.hide {
  visibility: visible;
}

.anonymous-dialog-container {
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

.anonymous-dialog-container span {
  font-size: 25px;
  font-weight: 400;
  color: #000000;
}

.anonymous-dialog-container b {
  font-weight: 700;
}

.anonymous-dialog-container-text {
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

.button__cancel {
  background-color: #35a97d;
  border-radius: 10px;
  border: none;
  padding: 10px 20px;
  font-size: 30px;
  font-weight: 700;
  cursor: pointer;
}
</style>
