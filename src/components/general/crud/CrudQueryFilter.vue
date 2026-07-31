<template>
  <q-expansion-item
    class="shadow-1 overflow-hidden"
    style="border-radius: 5px"
    icon="mdi-filter"
    label="Filtro"
    header-class="bg-secondary text-white"
    expand-icon-class="text-white"
  >
    <q-card class="crud-filter">
      <q-card-section>
        <q-form @submit="onSubmit" @reset="onReset" class="col crud-filter">
          <div v-for="row in rows" :key="row.row" class="row">
            <FieldCrudDynamicTemplate
              v-for="col in row.cols"
              :key="col.name"
              :col="col"
            />
          </div>

          <div class="row crud-filter-buttons-row">
            <q-space></q-space>
            <q-btn
              label="Filtrar"
              type="submit"
              color="primary"
              class="q-ma-sm"
            />
            <q-btn
              label="Limpar"
              type="reset"
              color="negative"
              flat
              class="q-ma-sm"
            />
          </div>
        </q-form>
      </q-card-section>
    </q-card>
  </q-expansion-item>
</template>

<script>
import FieldCrudDynamicTemplate from "./templates/FieldCrudDynamicTemplate.vue";

export default {
  props: ["rows"],
  components: {
    FieldCrudDynamicTemplate,
  },
  methods: {
    onSubmit: function () {
      const filters = [];

      this.rows.forEach((row) => {
        row.cols.forEach((col) => {
          filters.push({
            name: col.name,
            type: col.type,
            model: col.model,
          });
        });
      });

      filters.map((filter) => {
        if (filter.type === "select" && filter.model) {
          if (filter.model.value) {
            filter.model = filter.model.value;
          } else {
            filter.model = null;
          }
        }
      });

      this.$parent.$parent.filter(filters);
    },
    onReset: function () {
      this.rows.forEach((row) => {
        row.cols.forEach((col) => {
          if (col.locked) {
            return;
          }

          col.model = null;
        });
      });
    },
    alterData: function (name, data) {
      this.rows.forEach((row) => {
        row.cols.forEach((col) => {
          if (col.name === name) {
            col.model = data;
          }
        });
      });
    },
  },
};
</script>

<style lang="scss">
.crud-filter {
  background-color: $white;
  border-radius: 5px;
}
</style>
