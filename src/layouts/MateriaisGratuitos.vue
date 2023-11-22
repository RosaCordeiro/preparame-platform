<template>
  <section>
    <div
      class="loading"
      :class="{
        active: loading,
      }"
    >
      <q-spinner-gears color="white" size="100px" />
    </div>

    <main
      class="materiaisGratuitos"
      :class="{
        active: !loading,
      }"
      :style="{
        backgroundColor: config.backgroundColor,
      }"
    >
      <section class="left">
        <h1 class="title-materiais">{{ config.title }}</h1>

        <input
          type="text"
          placeholder="Nome"
          name="name"
          v-model="name"
          class="input"
        />

        <input
          type="text"
          placeholder="E-mail principal"
          name="email"
          v-model="email"
          class="input"
        />

        <q-input
          dense
          borderless
          type="text"
          placeholder="Telefone"
          name="phone"
          v-model="phone"
          mask="(##) #####-####"
          class="input-phone"
          style="
            padding: 5px 10px;
            border-radius: 10px;
            border: none;
            margin: 5px 0;
            font-size: 1rem;
            font-weight: 700;
            background-color: #fff;
          "
        />

        <input
          type="text"
          placeholder="Empresa (se estiver trabalhando)"
          name="company"
          class="input"
        />

        <input
          type="text"
          placeholder="Cargo (se estiver trabalhando)"
          name="role"
          class="input"
        />

        <div class="container-materials">
          <q-checkbox v-model="accept" />
          <div
            class="text-materials"
            style="text-align: start"
            @click="accept = !accept"
          >
            Aceito que o Prepara.me me envie outros conteúdos relacionados a
            Demissão Responsável e outros temas de Gestão de Pessoas
          </div>
        </div>

        <button @click="download" :disabled="!accept">BAIXAR GRÁTIS</button>
      </section>

      <section class="right">
        <img src="../assets/imgs/MateriasGratuitosFundo.png" alt="" />
      </section>
    </main>
  </section>
</template>

<script>
import { filterCrud } from "src/components/general/crud/utils/filterCrud";

import { downloadFileFromUrl } from "src/utils/downloadFile";
import { showError } from "src/global";
import { saveCrud } from "src/components/general/crud/utils/saveCrud";
export default {
  data() {
    return {
      loading: false,
      accept: false,
      config: {},
      name: "",
      email: "",
      phone: "",
      company: "",
      role: "",
    };
  },
  methods: {
    download() {
      if (this.accept) {
        if (this.name === "") {
          showError("É necessário preencher o campo nome.");
          return;
        }

        if (this.email === "") {
          showError("É necessário preencher o campo e-mail.");
          return;
        }

        if (this.phone === "") {
          showError("É necessário preencher o campo telefone.");
          return;
        }

        saveCrud(
          "materials/" + this.config.id + "/download",
          {
            name: this.name,
            email: this.email,
            phone: this.phone,
            company: this.company,
            role: this.role,
          },
          "POST"
        );
      }

      //downloadFileFromUrl(this.config.file_url, this.config.file);
    },
  },
  async mounted() {
    this.loading = true;

    const res = await filterCrud(
      [],
      "materials/" + this.$route.params.materialName + "/slug"
    );

    this.loading = false;

    if (!res) {
      this.$router.push("/404");
      return;
    }

    this.config = res;
  },
};
</script>

<style>
@import url("https://fonts.googleapis.com/css2?family=Francois+One&family=Inter&display=swap");

.container-materials {
  display: flex;
  align-items: center;
  margin: 20px 0;
  max-width: 400px;
}

.materiaisGratuitos {
  display: flex;
  justify-content: space-between;
  align-items: center;
  min-height: 100vh;
  padding: 25px;
  opacity: 0;
}

.materiaisGratuitos.active {
  opacity: 1;
  visibility: visible;
}

.materiaisGratuitos .left {
  flex: 3;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.materiaisGratuitos .right {
  flex: 5;
}

.materiaisGratuitos .right img {
  width: 100%;
  height: 100%;
  object-fit: contain;
}

.left .title-materiais {
  font-family: "Francois One", sans-serif;
  font-size: 5rem;
  margin-bottom: 50px;
  text-align: center;
}

.left .input {
  min-width: 400px;
  padding: 10px;
  border-radius: 10px;
  border: none;
  margin: 10px 0;
  font-size: 1rem;
  font-weight: 700;
  min-height: 50px;
}

.left button {
  background-color: #f54690;
  color: #000;
  border-radius: 10px;
  border: none;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 20px;
  min-width: 400px;
  font-size: 1.5rem;
  font-weight: 700;
  cursor: pointer;
  margin-top: 10px;
}

.input-phone {
  min-width: 400px;
}

@media (max-width: 800px) {
  .materiaisGratuitos .right {
    display: none;
  }

  .materiaisGratuitos .left {
    position: relative;
  }

  .left .input {
    width: 100%;
    min-width: 300px;
  }

  .left button {
    width: 100%;
    min-width: 300px;
  }

  .left .title-materiais {
    font-size: 3rem;
  }

  .left .input-phone {
    width: 100%;
    min-width: 300px;
  }
}

.loading {
  position: absolute;
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
  transition: all 0.5s ease-in-out;
  visibility: hidden;
}

.loading.active {
  opacity: 1;
  visibility: visible;
}
</style>
