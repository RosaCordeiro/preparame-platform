<template>
  <div v-if="tableData.length > 0">
    <CrudRegisterTitle :title="title" />

    <q-card class="crud-register-form q-pa-md">
      <q-card-section>
        <q-form class="col crud-register">
          <div
            v-for="fields in data.registerColumns"
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

        <div
          class="row crud-filter-buttons-row"
          v-if="data.registerColumns.length > 0"
        >
          <q-space></q-space>
          <q-btn
            label="Adicionar"
            @click="addNewRowData()"
            color="primary"
            class="q-ma-sm"
          />
          <q-btn
            label="Limpar"
            @click="clearData()"
            color="negative"
            flat
            class="q-ma-sm"
          />
        </div>

        <CrudRegisterChildTable
          :result="{ columns: data.tableColumns, data: tableData }"
        />
      </q-card-section>
    </q-card>
  </div>
</template>

<script>
import FieldCrudDynamicTemplate from "./templates/FieldCrudDynamicTemplate.vue";
import CrudRegisterChildTable from "./CrudRegisterChildTable.vue";
import CrudRegisterTitle from "./CrudRegisterTitle.vue";

import { removeCrud } from "./utils/removeCrud.js";

import { v4 as uuidV4 } from "uuid";

export default {
  components: {
    FieldCrudDynamicTemplate,
    CrudRegisterChildTable,
    CrudRegisterTitle,
  },
  props: ["data", "removeAction", "title"],
  data: () => {
    return {
      tableData: [],
      tableColumns: [],
    };
  },
  created() {
    this.tableData = this.data.tableData;
    this.tableColumns = this.data.tableColumns;

    this.tableColumns.push({
      name: "ref",
      label: "Ref",
      align: "left",
      field: "ref",
      sortable: false,
      visible: false,
    });

    console.log(this.removeAction);

    if (!this.removeAction) {
      this.tableColumns.push({
        name: "actions",
        label: "Ações",
        align: "center",
        field: "actions",
        sortable: false,
        style: "width: 10px;",
        visible: true,
      });
    }
  },
  methods: {
    addNewRowData: function () {
      Object.values(this.data.registerColumns).forEach((table) => {
        const values = [];

        table.cols.forEach((field) => {
          if (field.type === "DialogSelect") {
            values.push({
              name: field.options.editFieldLabel,
              model: field.model.label,
              type: field.type,
            });
            values.push({
              name: field.name,
              model: field.model.value,
              type: field.type,
            });
          } else {
            values.push({
              name: field.name,
              model: field.model,
              type: field.type,
            });
          }
        });

        const indexRef = values.findIndex((value) => {
          return value.name === "ref";
        });

        if (indexRef === -1 || !values[indexRef].model) {
          values.splice(indexRef, 1);

          values.push({
            name: "ref",
            model: uuidV4(),
            type: "input",
          });
        }

        values.map((value) => {
          if (
            (value.type === "Select" || value.type === "DialogSelect") &&
            value.model &&
            value.model.value
          ) {
            value.model = value.model.value;
          }
        });

        const newRegister = values.reduce(
          (array, value) => ({ ...array, [value.name]: value.model }),
          {}
        );

        const indexRow = this.tableData.findIndex((data) => {
          return (
            (newRegister.id && data.id === newRegister.id) ||
            (newRegister.ref && data.ref === newRegister.ref)
          );
        });

        if (indexRow > -1) {
          this.tableData.splice(indexRow, 1);
        }

        this.tableData.push(newRegister);

        this.clearData();
      });
    },
    clearData: function () {
      this.data.registerColumns.forEach((fields) => {
        fields.cols.forEach((col) => {
          col.model = null;
        });
      });

      this.alteringCol = false;
    },
    removeRow: async function (row) {
      if (row.id) {
        const removeUrl =
          this.$parent.$parent.$parent.tables.childTable.removeUrl;

        var resultRemove = await removeCrud({ id: row.id }, removeUrl);

        if ((resultRemove.status = 200)) {
          this.$q.notify({
            type: "success",
            message: "Removido com sucesso",
          });
        }
      }

      const indexRow = this.tableData.findIndex((data) => {
        return (
          (row.id && data.id === row.id) || (row.ref && data.ref === row.ref)
        );
      });

      if (indexRow > -1) {
        this.tableData.splice(indexRow, 1);
      }

      this.tableData = this.tableData.filter((data) => {
        return (
          (row.id && data.id != row.id) || (row.ref && data.ref != row.ref)
        );
      });
    },
    editRow: async function (row) {
      this.data.registerColumns.forEach((field) => {
        field.cols.forEach((col) => {
          if (col.type === "DialogSelect") {
            col.model = {
              label: row[col.options.editFieldLabel],
              value: row[col.options.editFieldValue],
            };
          } else {
            col.model = row[col.name];
          }
        });
      });
    },
    alterData: function (name, data) {
      this.alteringCol = true;

      this.data.registerColumns.forEach((fields) => {
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
</style>
