<template>
  <div class="specialist-crud">
    <CrudRegister
      :breadcrumbs="breadcrumbs"
      :title="title"
      :tables="tables"
      :registerType="registerType"
      :removeAction="true"
    />
  </div>
</template>

<script>
import { showError } from "src/global";
import CrudRegister from "../../general/crud/CrudRegister.vue";
import { openEditCrud } from "../../general/crud/utils/openEditCrud.js";
import { saveCrud } from "../../general/crud/utils/saveCrud.js";

export default {
  components: {
    CrudRegister,
  },
  data: () => {
    return {
      registerType: "parentChild",
      editUrl: "/mentoring",
      tables: {
        mainTable: {
          id: null,
          apiUrl: "/mentoring",
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
              row: 1,
              col: 1,
              model: "",
              type: "Input",
              visible: true,
            },
            mentorId: {
              label: "Mentor",
              name: "mentorId",
              size: "6",
              row: 1,
              col: 1,
              model: "",
              type: "DialogSelect",
              visible: true,
              options: {
                table: "specialists",
                value: "id",
                label: "name",
              },
            },
            date: {
              label: "Data",
              name: "date",
              size: "6",
              row: 1,
              col: 1,
              model: "",
              type: "DateTime",
              visible: true,
            },
            image: {
              label: "Imagem",
              name: "image",
              size: "12",
              row: 1,
              col: 1,
              model: "",
              type: "InputFile",
              visible: true,
            },
            linkMeet: {
              label: "Link Meet",
              name: "linkMeet",
              size: "4",
              row: 1,
              col: 1,
              model: "",
              type: "Input",
              visible: true,
              editable: false,
            },
            users: {
              label: "Usuários",
              name: "users",
              size: "4",
              row: 1,
              col: 1,
              model: "",
              type: "Input",
              visible: true,
              editable: false,
            },
            eventId: {
              label: "Id do Evento",
              name: "eventId",
              size: "4",
              row: 1,
              col: 1,
              model: "",
              type: "Input",
              visible: true,
              editable: false,
            },
          },
        },
        childTable: {
          content: "usersMentoring",
          apiUrl: "/mentoring",
          removeUrl: "",
          registerColumns: {},
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
              name: "name",
              label: "Nome",
              align: "left",
              field: "name",
              sortable: false,
              visible: true,
            },
          ],
          tableData: [],
        },
      },
      breadcrumbs: [
        {
          title: "Mentorias",
          to: "/mentoring",
        },
        {
          title: "Cadastro de Mentorias",
          to: "",
        },
      ],
      title: {
        mainTable: "Cadastro de Mentorias",
        childTable: "Usuários",
      },
    };
  },
  created() {
    this.id = this.$router.history.current.params.id;

    openEditCrud(this.id, this.editUrl, this.tables);
  },
  methods: {
    save: async function (data) {
      this.$q.loading.show();
      try {
        if (typeof data.mainTable.image === "string") {
          delete data.mainTable.image;
        }

        const formData = new FormData();

        Object.keys(data.mainTable).forEach((key) => {
          formData.append(key, data.mainTable[key]);
        });

        const mentoringCreated = await saveCrud(
          this.tables.mainTable.apiUrl,
          formData
        );
        this.$q.loading.hide();
        return mentoringCreated;
      } catch (err) {
        showError(err);

        return false;
      }
    },
  },
};
</script>

<style></style>
