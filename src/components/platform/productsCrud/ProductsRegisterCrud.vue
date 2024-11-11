<template>
  <div class="product-crud">
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
import { showError } from "../../../global.js";

export default {
  components: {
    CrudRegister,
  },
  data: () => {
    return {
      registerType: "parentChild",
      editUrl: "/products",
      tables: {
        mainTable: {
          id: null,
          apiUrl: "/products",
          registerColumns: {
            id: {
              label: "Id",
              name: "id",
              size: "1",
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

            shortName: {
              label: "Nome Resumido",
              name: "shortName",
              size: "6",
              row: 1,
              col: 2,
              model: "",
              type: "Input",
              visible: true,
            },
            status: {
              label: "Situação",
              name: "status",
              size: "3",
              row: 2,
              col: 1,
              model: "",
              type: "Select",
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
              visible: true,
            },
            type: {
              label: "Tipo",
              name: "type",
              size: "3",
              row: 2,
              col: 2,
              model: "",
              type: "Select",
              options: [
                {
                  label: "Agendado",
                  value: "SCHEDULED",
                },
                {
                  label: "Não Agendado",
                  value: "NON_SCHEDULED",
                },
              ],
              visible: true,
            },
            bestSeller: {
              label: "Mais Vendido",
              name: "bestSeller",
              size: "3",
              row: 2,
              col: 3,
              model: "",
              type: "Select",
              options: [
                {
                  label: "Mais Vendido",
                  value: "BEST_SELLER",
                },
                {
                  label: "Normal",
                  value: "NORMAL",
                },
              ],
              visible: true,
            },
            price: {
              label: "Preço",
              name: "price",
              size: "3",
              row: 2,
              col: 4,
              model: "",
              type: "Decimal",
              visible: true,
            },
            duration: {
              label: "Duração",
              name: "duration",
              size: "3",
              row: 3,
              col: 1,
              model: "",
              type: "Select",
              options: [
                {
                  label: "30 minutos",
                  value: "30",
                },
                {
                  label: "1 hora",
                  value: "60",
                },
              ],
              visible: true,
            },
            slug: {
              label: "Slug",
              name: "slug",
              size: "12",
              row: 1,
              col: 1,
              model: "",
              type: "Input",
              visible: true,
            },
            onlyAdmin: {
              label: "Apenas administrador",
              name: "onlyAdmin",
              size: "3",
              row: 3,
              col: 2,
              model: "",
              type: "Select",
              options: [
                {
                  label: "Não",
                  value: "false",
                },
                {
                  label: "Sim",
                  value: "true",
                },
              ],
              visible: true,
            },
          },
        },
        childTable: {
          content: "productContent",
          apiUrl: "/products/:id/productContents",
          removeUrl: "products/productContents",
          registerColumns: {
            content: {
              label: "Conteudo",
              name: "content",
              size: "12",
              col: 1,
              row: 1,
              model: "",
              type: "Input",
              visible: true,
            },
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
          },
          tableColumns: [
            {
              name: "content",
              label: "Conteúdo",
              align: "left",
              field: "content",
              sortable: false,
              visible: true,
            },
            {
              name: "id",
              label: "Id",
              align: "left",
              field: "id",
              sortable: false,
              visible: false,
            },
          ],
          tableData: [],
        },
      },
      breadcrumbs: [
        {
          title: "Produtos",
          to: "/products",
        },
        {
          title: "Cadastro de Produtos",
          to: "",
        },
      ],
      title: {
        mainTable: "Cadastro de Produtos",
        childTable: "Conteúdos",
      },
    };
  },
  created() {
    this.id = this.$router.history.current.params.id;

    openEditCrud(this.id, this.editUrl, this.tables);
  },
  methods: {
    save: async function (data) {
      try {
        const productCreated = await saveCrud(
          this.tables.mainTable.apiUrl,
          data.mainTable
        );

        if (productCreated) {
          this.tables.childTable.apiUrl = this.tables.childTable.apiUrl.replace(
            ":id",
            productCreated.data.id
          );

          data.childTable.forEach(async (values) => {
            await saveCrud(this.tables.childTable.apiUrl, values);
          });
        }

        return productCreated;
      } catch (err) {
        showError(err);

        return false;
      }
    },
  },
};
</script>

<style></style>
