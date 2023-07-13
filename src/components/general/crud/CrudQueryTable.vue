<template>
  <q-table
    class="q-mt-md bg-secondary crud-table"
    :data="result.data"
    :columns="result.columns"
    row-key="id"
    table-class="bg-background"
    table-header-class="text-white bg-secondary"
    no-data-label="Sem dados para mostrar."
    no-results-label="Não foi encontrado nenhum dado a partir de sua pesquisa."
    :filter="filter"
    selection="multiple"
    dense
    title="Resultado(s) Pesquisa"
    title-class="text-white bg-secondary crud-query-title"
    :selected.sync="selecteds"
    :selected-rows-label="getSelectedString"
    rows-per-page-label="Linhas por página: "
    :visible-columns="visibleColumns"
  >
    <template v-slot:top-right>
      <q-input
        borderless
        dense
        debounce="300"
        v-model="filter"
        placeholder="Search"
      >
        <q-icon slot="append" name="search"></q-icon>
      </q-input>
    </template>

    <template v-slot:body-cell-actions="props">
      <q-td auto-width :props="props">
        <q-btn-group>
          <q-btn
            color="negative"
            icon="mdi-delete"
            @click="removeSelected({ id: props.row.id })"
            :disable="blockRemove"
          ></q-btn>
          <q-btn
            color="grey-8"
            icon="mdi-pencil"
            @click="editSelected({ id: props.row.id })"
          ></q-btn>
        </q-btn-group>
      </q-td>
    </template>
  </q-table>
</template>

<script>
export default {
  props: ["result", "blockRemove"],
  data() {
    return {
      selecteds: [],
      filter: "",
      visibleColumns: [],
    };
  },
  created() {
    this.definesVisibleColumns();

    console.log(this.result);
  },
  methods: {
    definesVisibleColumns: function () {
      this.visibleColumns = this.result.columns
        .filter((column) => {
          return column.visible;
        })
        .map((column) => {
          return column.name;
        });
    },
    getSelectedString() {
      return "";
    },
    removeSelected: function (id) {
      console.log(id);

      this.$q
        .dialog({
          title: "Remover",
          message: "Deseja remover o registro selecionado?",
          cancel: true,
          persistent: true,
        })
        .onOk(() => {
          this.$parent.$parent.removeSelected(id);
        });
    },
    editSelected: function (id) {
      const actualUrl = this.$router.history.current.path;

      this.$router.push({ path: `${actualUrl}/${id.id}` });
    },
  },
  mounted() {
    const searchField = document.getElementsByClassName(
      "q-field__native q-placeholder"
    );

    if ((searchField[0].placeholder = "Search")) {
      searchField[0].placeholder = "Pesquisar";
    }
  },
};
</script>

<style lang="scss">
.crud-table {
  .q-table__bottom-item {
    color: $text-white;
  }

  .q-field__native {
    color: $text-white;
  }

  .q-select__dropdown-icon {
    color: $text-white;
  }

  .q-btn__content {
    color: $text-white;
  }

  .q-table__bottom {
    color: $text-white;
  }

  .q-icon {
    color: $text-white;
  }
}

.crud-query-title {
  font-size: 1rem;
}
</style>
