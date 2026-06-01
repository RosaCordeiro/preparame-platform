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
            title: {
              label: "Título",
              name: "title",
              size: "12",
              row: 2,
              col: 1,
              model: "",
              type: "Input",
              visible: true,
            },
            slug: {
              label: "Slug",
              name: "slug",
              size: "12",
              row: 2,
              col: 2,
              model: "",
              type: "Input",
              visible: true,
            },
            link: {
              label: "Link",
              name: "link",
              size: "12",
              row: 3,
              col: 1,
              model: "",
              type: "Input",
              visible: true,
            },
            image_url: {
              label: "Imagem",
              name: "image_url",
              size: "12",
              row: 3,
              col: 2,
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

            if (key === "file_url" && data.mainTable.file_url) {
              formData.append("file", data.mainTable.file_url);
            } else if (key === "image_url" && data.mainTable.image_url) {
              formData.append("image", data.mainTable.image_url);
            } else {
              formData.append(key, data.mainTable[key]);
            }
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
