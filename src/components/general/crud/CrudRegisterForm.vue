<template>
  <q-card
    class="crud-register-form"
    :class="{
      removeCard: hasCard,
    }"
  >
    <q-card-section>
      <q-form class="col crud-register q-pa-md">
        <div
          v-for="fields in table.registerColumns"
          :key="fields.row"
          class="row"
        >
          <FieldCrudDynamicTemplate
            v-for="col in fields.cols"
            :key="col.name"
            :col="col"
          />
        </div>
      </q-form>
    </q-card-section>
  </q-card>
</template>

<script>
import FieldCrudDynamicTemplate from "./templates/FieldCrudDynamicTemplate.vue";

export default {
  components: {
    FieldCrudDynamicTemplate,
  },
  props: {
    table: {
      type: Object,
      required: true,
    },
    hasCard: {
      type: Boolean,
      required: false,
      default: false,
    },
  },
  methods: {
    alterData: function (name, data) {
      this.table.registerColumns.forEach((fields) => {
        fields.cols.forEach((col) => {
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
.crud-register-form .q-card__section--vert {
  padding: unset;
}

.crud-register-form {
  background-color: $white;
  border-radius: 5px;
}

.removeCard {
  border: unset;
  box-shadow: unset;
}
</style>
