<template>
  <div class="user-crud">
    <CrudRegister
      :breadcrumbs="breadcrumbs"
      :title="title"
      :tables="tables"
      :registerType="registerType"
    />
  </div>
</template>

<script>
import CrudRegister from "../../general/crud/CrudRegister.vue";
import { openEditCrud } from "../../general/crud/utils/openEditCrud.js";
import { saveCrud } from "../../general/crud/utils/saveCrud.js";
import { showError } from "../../../global.js";

export default {
  components: {
    CrudRegister,
  },
  data: () => {
    return {
      registerType: "unique",
      editUrl: "/materials",
      tables: {
        mainTable: {
          id: null,
          apiUrl: "/materials",
          registerColumns: {
            id: {
              label: "Id",
              name: "id",
              size: "12",
              row: 1,
              col: 1,
              model: "",
              type: "Input",
              visible: false,
            },
            /*
               "title": "Baixe essa imagem 2",
    "backgroundColor": "#598677",
    "file": "a4cf4dc972edb93664b48509eb850b43-download.png",
    "slug": "teste2",
    "id": "22629f97-2729-4027-afb2-2876483009b5",
    "created_at": "2023-11-22T11:29:39.834Z"
            */
            title: {
              label: "Título",
              name: "title",
              size: "6",
              row: 1,
              col: 1,
              model: "",
              type: "Input",
              visible: true,
            },
            slug: {
              label: "Slug",
              name: "slug",
              size: "6",
              row: 1,
              col: 2,
              model: "",
              type: "Input",
              visible: true,
            },
            backgroundColor: {
              label: "Cor de Fundo",
              name: "backgroundColor",
              size: "6",
              row: 2,
              col: 1,
              model: "",
              type: "Color",
              visible: true,
            },
            buttonColor: {
              label: "Cor do Botão",
              name: "buttonColor",
              size: "6",
              row: 2,
              col: 1,
              model: "",
              type: "Color",
              visible: true,
            },
            file_url: {
              label: "Arquivo",
              name: "file_url",
              size: "12",
              row: 3,
              col: 1,
              model: "",
              type: "InputFile",
              visible: true,
            },
            created_at: {
              label: "Data de Criação",
              name: "created_at",
              size: "6",
              row: 3,
              col: 1,
              model: "",
              type: "Input",
              visible: false,
            },
          },
        },
      },
      breadcrumbs: [
        {
          title: "Materiais Gratuitos",
          to: "/materials",
        },
        {
          title: "Cadastro de Materiais Gratuitos",
          to: "",
        },
      ],
      title: "Cadastro de Materiais Gratuitos",
    };
  },
  created() {
    this.id = this.$router.history.current.params.id;

    openEditCrud(this.id, this.editUrl, this.tables);
  },
  methods: {
    save: async function (data) {
      console.log(data);
      try {
        if (typeof data.mainTable.file_url === "string") {
          delete data.mainTable.file_url;
        }

        const formData = new FormData();

        Object.keys(data.mainTable).forEach((key) => {
          if (
            data.mainTable[key] !== null &&
            data.mainTable[key] !== undefined &&
            data.mainTable[key] !== ""
          ) {
            console.log(data.mainTable[key]);

            formData.append(
              key === "file_url" ? "file" : key,
              data.mainTable[key]
            );
          }
        });

        const materialCreated = await saveCrud(
          this.tables.mainTable.apiUrl,
          formData
        );

        return materialCreated;
      } catch (err) {
        showError(err);

        return false;
      }
    },
  },
};
</script>

<style></style>
