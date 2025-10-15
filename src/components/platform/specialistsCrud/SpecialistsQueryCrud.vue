<template>
  <div class="specialist-crud">
    <CrudQuery
      :title="title"
      :breadcrumbs="breadcrumbs"
      :filters="filters"
      :columns="columns"
      :url="url"
      ref="crudQuery"
      @openSpecialistArea="openSpecialistArea"
    />

    <q-dialog v-model="showSpecialistOptionsDialog">
      <q-card style="min-width: 400px">
        <q-card-section class="row items-center q-pb-none">
          <div class="text-h6">{{ selectedSpecialist.name }} - Opções</div>
          <q-space />
          <q-btn icon="close" flat round dense v-close-popup />
        </q-card-section>

        <q-card-section>
          <div class="column q-gutter-md">
            <q-btn
              color="primary"
              icon="mdi-calendar-clock"
              label="Visualizar Agenda"
              @click="viewSpecialistSchedule"
              class="full-width"
            />
            <q-btn
              color="secondary"
              icon="mdi-calendar-plus"
              label="Disponibilizar Horários"
              @click="openProvidesTimetables"
              class="full-width"
            />
          </div>
        </q-card-section>
      </q-card>
    </q-dialog>

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

    <q-dialog v-model="showProvidesTimetablesDialog" maximized>
      <q-card>
        <q-card-section class="row items-center q-pb-none">
          <div class="text-h6">
            Disponibilizar Horários: {{ selectedSpecialist.name }}
          </div>
          <q-space />
          <q-btn icon="close" flat round dense v-close-popup />
        </q-card-section>

        <q-card-section>
          <SpecialistProvidesTimetables :selectedSpecialist="selectedSpecialist" />
        </q-card-section>
      </q-card>
    </q-dialog>
  </div>
</template>

<script>
import CrudQuery from "./../../general/crud/CrudQuery.vue";
import ViewSpecialistSchedule from "../specialistSchedule/ViewSpecialistSchedule.vue";
import SpecialistProvidesTimetables from "../specialistProvidesTimetables/SpecialistProvidesTimetables.vue";

export default {
  components: {
    CrudQuery,
    ViewSpecialistSchedule,
    SpecialistProvidesTimetables,
  },
  methods: {
    openSpecialistArea(specialist) {
      console.log(
        "[SpecialistsQueryCrud] Abrindo opções do especialista:",
        specialist
      );
      this.selectedSpecialist = specialist;
      this.showSpecialistOptionsDialog = true;
    },
    viewSpecialistSchedule() {
      this.showSpecialistOptionsDialog = false;
      this.showScheduleDialog = true;
    },
    openProvidesTimetables() {
      this.showSpecialistOptionsDialog = false;
      this.showProvidesTimetablesDialog = true;
    },
  },
  data() {
    return {
      title: "Especialistas",
      url: "specialists",
      selectedSpecialist: {},
      showSpecialistOptionsDialog: false,
      showScheduleDialog: false,
      showProvidesTimetablesDialog: false,
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
