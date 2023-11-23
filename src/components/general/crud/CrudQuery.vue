<template>
  <div class="crud-query">
    <q-page>
      <Breadcrumbs :breadcrumbs="breadcrumbs" />
      <div class="crud-filter-content">
        <CrudQueryTitle
          :title="title"
          :blockCreateNew="blockCreateNew"
          :blockRemove="blockRemove"
        />
        <CrudQueryFilter :rows="rows" v-if="filters.length > 0" />
        <CrudQueryTable
          ref="table"
          :result="{ columns, data }"
          :blockRemove="blockRemove"
        >
          <slot> </slot>
        </CrudQueryTable>
      </div>
    </q-page>
  </div>
</template>

<script>
import CrudQueryFilter from "./CrudQueryFilter.vue";
import CrudQueryTable from "./CrudQueryTable.vue";
import CrudQueryTitle from "./CrudQueryTitle.vue";
import Breadcrumbs from "../../general/Breacrumbs.vue";

import { filterCrud } from "./../../general/crud/utils/filterCrud.js";
import { removeCrud } from "./../../general/crud/utils/removeCrud.js";

import { adjustColumnsAndRowsRegister } from "./../crud/utils/adjustColumnsAndRowsRegister";

export default {
  components: {
    CrudQueryFilter,
    CrudQueryTable,
    CrudQueryTitle,
    Breadcrumbs,
  },
  props: [
    "title",
    "filters",
    "breadcrumbs",
    "columns",
    "url",
    "blockCreateNew",
    "blockRemove",
  ],
  data() {
    return {
      rows: [],
      data: [],
    };
  },
  methods: {
    removeSelected: async function (row) {
      if (!this.$refs.table.selecteds.length > 0 && !row.id) {
        this.$q.notify({
          type: "error",
          message: "Nenhum registro selecionado para ser excluído.",
        });

        return false;
      } else {
        const selecteds = this.$refs.table.selecteds;

        if (row) {
          selecteds.push({ id: row.id });
        }

        let resultsRemove = await Promise.all(
          selecteds.map(async (selected) => {
            const resultsRemove = await removeCrud(selected, this.url);

            if (resultsRemove) {
              this.data = this.data.filter((data) => {
                return data.id !== selected.id;
              });
            }

            return resultsRemove;
          })
        );

        resultsRemove = resultsRemove.find((result) => {
          return result.status == 200;
        });

        if (resultsRemove.status == 200) {
          this.$q.notify({
            type: "success",
            message: "Removido com sucesso.",
          });
        }

        return true;
      }
    },
    filter: async function (filters) {
      const response = await filterCrud(filters, this.url, this.columns);

      if (response.data) {
        this.data = response.data;
        console.log(this.data);
        return;
      }

      this.data = response;
    },
  },
  created() {
    this.filter();

    adjustColumnsAndRowsRegister(this.filters, this.rows);
  },
};
</script>

<style lang="scss">
.crud-filter-content {
  padding: 20px 50px;
}
</style>
