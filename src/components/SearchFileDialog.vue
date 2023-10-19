<template>
  <div class="file-widget">
    <div class="file-container">
      <div class="file-container-text">
        <div class="column">
          <q-icon name="upload" size="4.4em"></q-icon>
          <span class="confirm-text"> Arraste ou solte os arquivos aqui </span>
          <q-btn style="background: #FF0080; color=white" label="Selecione um arquivo" class="q-ma-sm" @click="
                () => {
                }
              "/>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
  },
};
</script>

<style>
.file-widget {
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

.file-widget.show {
  opacity: 1;
}

.hide {
  visibility: visible;
}

.file-container {
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

.file-container b {
  font-weight: 700;
}

.file-container-text {
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
  .file-container {
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

  .file-container-text {
    font-size: 15px;
    padding: 0px;
  }

  .row {
    flex-direction: column;
  }
}

.file-container-text > img {
  object-fit: contain;
}
</style>
