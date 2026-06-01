<template>
  <div class="view-file-dialog-widget" :id="`view-file-dialog-${identifier}`">
    <div class="view-file-dialog-container">
      <div class="view-file-dialog-container-text">
        <div v-if="files.length === 0" class="not-found">
          <p>Nenhum arquivo encontrado</p>
        </div>
        <div class="file-container" v-for="(file, index) in files" :key="index">
          <p @click="openUrl(file.fileLink)">
            {{ file.fileName }}
          </p>
          <span v-if="userTypeStorage === 'ALL'">
            {{ file.fileType === "USER" ? "Usuário" : "Especialista" }}
          </span>
        </div>
      </div>

      <div @click="close" class="button__cancel">
        <q-icon name="close" size="25px" color="grey" />
      </div>
    </div>
  </div>
</template>

<script>
import { filterCrud } from "./general/crud/utils/filterCrud";

export default {
  props: {
    identifier: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      id: null,
      files: [],
      userTypeStorage: "",
    };
  },
  methods: {
    close() {
      const confirmDialog = document.getElementById(`view-file-dialog-${this.identifier}`);

      confirmDialog.classList.remove("show");
      setTimeout(() => {
        confirmDialog.classList.remove("hide");
      }, 300);

      this.$parent.viewDialog = false;
    },
    openUrl(url) {
      window.open(url, "_blank");
    },
    async show(id, userTypeStorage) {
      this.id = id;
      this.userTypeStorage = userTypeStorage;
      const confirmDialog = document.getElementById(`view-file-dialog-${this.identifier}`);

      confirmDialog.classList.add("show");
      setTimeout(() => {
        confirmDialog.classList.add("hide");
      }, 300);

      let userType = "";

      if (userTypeStorage === "USER" || userTypeStorage === "SPECIALIST") {
        userType = "?type=" + userTypeStorage;
      }

      const response = await filterCrud(
        [],
        `specialists/schedule/${id}/schedule-files${userType}`
      );
      this.files = JSON.parse(JSON.stringify(response));
    },
  },
};
</script>

<style scoped>
.view-file-dialog-widget {
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

.view-file-dialog-widget.show {
  opacity: 1;
}

.hide {
  visibility: visible;
}

.view-file-dialog-container {
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
  position: relative;
}

.search-file-title {
  text-align: center;
  border-radius: 15px;
  background-color: yellow;
  font-size: 22px;
  padding: 7px 10px;
  font-weight: 700;
  color: #000000;
}

.view-file-dialog-container b {
  font-weight: 700;
}

.view-file-dialog-container-text {
  display: flex;
  align-items: center;
  flex-direction: column;
  gap: 10px;
  width: 100%;
  padding: 0 40px;
  margin-top: 30px;
  margin-bottom: 30px;
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
  border: none;
  cursor: pointer;
  position: absolute;
  top: 10px;
  right: 10px;
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

.file-container {
  background-color: grey;
  padding: 10px;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.file-container p {
  color: white;

  font-weight: 700;
  margin: 0;
  cursor: pointer;
}

@media (max-width: 768px) {
  .view-file-dialog-container {
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

  .search-file-title {
    font-size: 15px;
  }

  .view-file-dialog-container-text {
    font-size: 15px;
    padding: 0px;
  }

  .row {
    flex-direction: column;
  }
}

input[type="file"] {
  width: 150px !important;
}

input[type="file"]::file-selector-button {
  border: none;
  background: rgba(255, 70, 144, 1);
  padding: 10px 20px;
  border-radius: 10px;
  color: #fff;
  cursor: pointer;
  transition: background 0.2s ease-in-out;
  width: 150px !important;
}

.not-found p {
  font-size: 20px;
  font-weight: 700;
  text-align: center;
  color: #000000;
}
</style>
