<template>
  <div class="specialist-crud">
    <CrudQuery
      :title="title"
      :breadcrumbs="breadcrumbs"
      :filters="filters"
      :columns="columns"
      :url="url"
      ref="crudQuery"
      @viewSpecialistSchedule="viewSpecialistSchedule"
    />

    <q-dialog v-model="showScheduleDialog" maximized>
      <q-card>
        <q-card-section class="row items-center q-pb-none">
          <div class="text-h6">
            Agenda do Especialista: {{ selectedSpecialist.name }}
          </div>
          <q-space />
          <q-btn icon="close" flat round dense v-close-popup />
        </q-card-section>

        <q-card-section>
          <ViewSpecialistSchedule :specialist="selectedSpecialist" />
        </q-card-section>
      </q-card>
    </q-dialog>
  </div>
</template>

<script>
import CrudQuery from "./../../general/crud/CrudQuery.vue";
import ViewSpecialistSchedule from "../specialistSchedule/ViewSpecialistSchedule.vue";

export default {
  components: {
    CrudQuery,
    ViewSpecialistSchedule,
  },
  methods: {
    viewSpecialistSchedule(specialist) {
      console.log(
        "[SpecialistsQueryCrud] Visualizando agenda do especialista:",
        specialist
      );
      this.selectedSpecialist = specialist;
      this.showScheduleDialog = true;
    },
  },
  data() {
    return {
      title: "Especialistas",
      url: "specialists",
      selectedSpecialist: {},
      showScheduleDialog: false,
      breadcrumbs: [
        {
          title: "Especialistas",
          to: "",
        },
      ],
      filters: {
        name: {
          label: "Nome",
          name: "name",
          size: "5",
          row: 1,
          col: 1,
          model: "",
          type: "Input",
          visible: true,
        },
        userId: {
          label: "Usuário",
          name: "userId",
          size: "5",
          row: 1,
          col: 3,
          model: "",
          type: "DialogSelect",
          visible: true,
          options: {
            table: "users",
            value: "id",
            label: "name",
          },
        },
        status: {
          label: "Situação",
          name: "status",
          size: "2",
          row: 1,
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
            {
              label: "Todos",
              value: "",
            },
          ],
        },
      },
      columns: [
        {
          name: "name",
          label: "Nome",
          align: "left",
          field: "name",
          sortable: true,
          visible: true,
        },
        {
          name: "status",
          align: "left",
          label: "Situação",
          field: "status.label",
          sortable: true,
          visible: true,
        },
        {
          name: "userName",
          align: "left",
          label: "Usuário",
          field: "user.name",
          sortable: true,
          visible: true,
        },
        {
          name: "actions",
          label: "Ações",
          align: "center",
          field: "actions",
          sortable: false,
          style: "width: 10px;",
          visible: true,
        },
      ],
    };
  },
};
</script>

<style></style>
