<template>
  <div class="specialist-crud">
    <CrudRegister
      :breadcrumbs="breadcrumbs"
      :title="title"
      :tables="tables"
      :registerType="registerType"
    />
  </div>
</template>

<script>
import CrudRegister from "./../../general/crud/CrudRegister.vue";
import { openEditCrud } from "./../../general/crud/utils/openEditCrud.js";
import { saveCrud } from "./../../general/crud/utils/saveCrud.js";

export default {
  components: {
    CrudRegister,
  },
  data: () => {
    return {
      registerType: "parentChild",
      editUrl: "/specialists",
      tables: {
        mainTable: {
          id: null,
          apiUrl: "/specialists",
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
            name: {
              label: "Nome",
              name: "name",
              size: "6",
              row: 1,
              col: 1,
              model: "",
              type: "Input",
              visible: true,
            },
            bio: {
              label: "Bio",
              name: "bio",
              size: "12",
              row: 2,
              col: 1,
              model: "",
              type: "Input",
              visible: true,
            },
            status: {
              label: "Situação",
              name: "status",
              size: "6",
              row: 2,
              col: 2,
              model: "",
              type: "Select",
              visible: true,
              options: [
                {
                  label: "Ativo",
                  value: "ACTIVE",
                },
                {
                  label: "Inativo",
                  value: "INACTIVE",
                },
              ],
            },
            linkedinUrl: {
              label: "LinkedIn",
              name: "linkedinUrl",
              size: "6",
              row: 1,
              col: 2,
              model: "",
              type: "Input",
              visible: true,
            },
            user: {
              label: "Usuário",
              name: "userId",
              size: "6",
              row: 2,
              col: 1,
              model: "",
              type: "DialogSelect",
              visible: true,
              options: {
                table: "users",
                value: "id",
                label: "name",
              },
            },
            image: {
              label: "Imagem",
              name: "image",
              size: "12",
              row: 3,
              col: 1,
              model: "",
              type: "InputFile",
              visible: true,
            },
          },
        },
        childTable: {
          content: "productSpecialist",
          apiUrl: "/specialists/:id/products",
          removeUrl: "specialists/products",
          registerColumns: {
            id: {
              label: "Id",
              name: "id",
              size: "12",
              col: 1,
              row: 1,
              model: "",
              type: "Input",
              visible: false,
            },
            ref: {
              label: "Ref",
              name: "ref",
              size: "12",
              col: 1,
              row: 1,
              model: "",
              type: "Input",
              visible: false,
            },
            productId: {
              label: "Produto",
              name: "productId",
              size: "12",
              col: 1,
              row: 1,
              model: "",
              type: "DialogSelect",
              visible: true,
              options: {
                table: "products",
                value: "id",
                label: "name",
                editFieldLabel: "product",
                editFieldValue: "productId",
              },
            },
          },
          tableColumns: [
            {
              name: "id",
              label: "Id",
              align: "left",
              field: "id",
              sortable: false,
              visible: false,
            },
            {
              name: "productName",
              label: "Produto",
              align: "left",
              field: "product.name",
              sortable: false,
              visible: true,
            },
            {
              name: "productId",
              label: "Produto Id",
              align: "left",
              field: "productId",
              type: "DialogSelect",
              labelColumn: "productName",
              sortable: false,
              visible: false,
            },
          ],
          tableData: [],
        },
      },
      breadcrumbs: [
        {
          title: "Especialistas",
          to: "/specialists",
        },
        {
          title: "Cadastro de Especialistas",
          to: "",
        },
      ],
      title: "Cadastro de Especialistas",
    };
  },
  created() {
    this.id = this.$router.history.current.params.id;

    openEditCrud(this.id, this.editUrl, this.tables);
  },
  methods: {
    save: async function (data) {
      if (typeof data.mainTable.image === "string") {
        delete data.mainTable.image;
      }

      const formData = new FormData();

      Object.keys(data.mainTable).forEach((key) => {
        formData.append(key, data.mainTable[key]);
      });

      try {
        const specialistCreated = await saveCrud(
          this.tables.mainTable.apiUrl,
          formData
        );

        if (specialistCreated.status === 201) {
          this.tables.childTable.apiUrl = this.tables.childTable.apiUrl.replace(
            ":id",
            specialistCreated.data.id
          );

          data.childTable.forEach(async (values) => {
            await saveCrud(this.tables.childTable.apiUrl, values);
          });
        }

        return specialistCreated;
      } catch (err) {
        showError(err);

        return false;
      }
    },
  },
};
</script>

<style></style>
