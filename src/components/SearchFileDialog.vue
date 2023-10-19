<template>
  <div class="search-file-dialog-widget" id="search-file-dialog">
    <div class="search-file-dialog-container">
      <div class="search-file-dialog-container-text">
        <div class="row">
          {{ files }}

          <q-btn
            style="background: #FF0080; color=white"
            label="Selecione o arquivo"
            class="q-ma-sm"
            @click="() => {}"
          />
        </div>
      </div>

      <div class="button__cancel">
        <q-icon name="close" size="25px" color="grey" />
      </div>
    </div>
  </div>
</template>

<script>
import { filterCrud } from "./general/crud/utils/filterCrud";
export default {
  data() {
    return {
      id: null,
      files: [],
    };
  },
  mounted() {
    const cancelButton = document.querySelector(".button__cancel");

    cancelButton.addEventListener("click", () => {
      const confirmDialog = document.getElementById("search-file-dialog");

      confirmDialog.classList.remove("show");
      setTimeout(() => {
        confirmDialog.classList.remove("hide");
      }, 300);
    });
  },
  methods: {
    show(id) {
      this.id = id;
      const confirmDialog = document.getElementById("search-file-dialog");

      confirmDialog.classList.add("show");
      setTimeout(() => {
        confirmDialog.classList.add("hide");
      }, 300);

      const userType = localStorage.getItem("userType");

      filterCrud(
        [],
        `specialists/schedule/${id}/schedule-files?type=${userType}`
      ).then((response) => {
        this.files = response;
      });
    },
    confirm() {
      window.func();
      const confirmDialog = document.getElementById("search-file-dialog");

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
.search-file-dialog-widget {
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

.search-file-dialog-widget.show {
  opacity: 1;
}

.hide {
  visibility: visible;
}

.search-file-dialog-container {
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

.search-file-dialog-container b {
  font-weight: 700;
}

.search-file-dialog-container-text {
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

@media (max-width: 768px) {
  .search-file-dialog-container {
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

  .search-file-dialog-container-text {
    font-size: 15px;
    padding: 0px;
  }

  .row {
    flex-direction: column;
  }
}
</style>
