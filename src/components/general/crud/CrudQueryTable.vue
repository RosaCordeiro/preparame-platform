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
      <div class="row">
        <slot> </slot>
        <q-input
          borderless
          dense
          debounce="300"
          v-model="filter"
          placeholder="Search"
        >
          <q-icon slot="append" name="search"></q-icon>
        </q-input>
      </div>
    </template>

    <template v-slot:body-cell-accepted="props">
      <q-td auto-width :props="props">
        <div v-if="props.row.accepted">ACOLHIDO</div>
        <q-btn
          v-else
          color="positive"
          label="Acolher"
          @click="accept(props.row)"
          :disable="blockRemove"
        ></q-btn>
      </q-td>
    </template>

    <template v-slot:body-cell-link="props">
      <q-td :props="props">
        <div v-if="!props.row.link">N/A</div>
        <a
          v-else
          :href="props.row.link"
          target="_blank"
          style="color: blue; text-decoration: underline"
          >Ir até a página</a
        >
      </q-td>
    </template>

    <template v-slot:body-cell-image_url="props">
      <q-td :props="props">
        <div v-if="!props.row.image_url">N/A</div>
        <q-btn
          v-else
          color="positive"
          label="VISUALIZAR"
          :href="props.row.image_url"
          target="_blank"
          :disable="blockRemove"
        ></q-btn>
      </q-td>
    </template>

    <template v-slot:body-cell-realocate="props">
      <q-td auto-width :props="props">
        <div v-if="props.row.realocate">REALOCADO</div>
        <q-btn
          v-else
          color="positive"
          label="Realocar"
          @click="realocate(props.row)"
          :disable="blockRemove"
        ></q-btn>
      </q-td>
    </template>

    <template v-slot:body-cell-clickable="props">
      <q-td auto-width :props="props">
        <a
          :href="`#/MateriaisGratuitos/${props.row.slug}`"
          style="color: blue; text-decoration: underline"
          target="_blank"
          >Ir até página</a
        >
      </q-td>
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
          <q-btn
            v-if="isSpecialistPage"
            color="primary"
            icon="mdi-calendar-multiple"
            @click="openSpecialistArea(props.row)"
            title="Agenda e Disponibilizar Horários"
          ></q-btn>
        </q-btn-group>
      </q-td>
    </template>
  </q-table>
</template>

<script>
import { saveCrud } from "./utils/saveCrud";

export default {
  props: ["result", "blockRemove"],
  data() {
    return {
      selecteds: [],
      filter: "",
      visibleColumns: [],
    };
  },
  computed: {
    isSpecialistPage() {
      return this.$router.history.current.path.includes("/specialists");
    },
  },
  created() {
    this.definesVisibleColumns();

    console.log(this.result);
  },
  methods: {
    realocate(row) {
      this.$q
        .dialog({
          title: "Realocar",
          message: "Digite o nome da nova empresa:",
          prompt: {
            model: "",
            label: "Nome da empresa",
            isValid: (val) => val && val.length > 0,
          },
          cancel: true,
          persistent: true,
        })
        .onOk((manualCompany) => {
          if (manualCompany && manualCompany.trim()) {
            saveCrud(
              `companies/employees/${row.id}/realocate`,
              { manualCompany: manualCompany.trim() },
              "put"
            ).then(() => {
              this.$q.notify({
                color: "positive",
                message: "Realocado com sucesso!",
              });

              row.realocate = true;
            });
          }
        });
    },
    accept(row) {
      this.$q
        .dialog({
          title: "Acolher",
          message: "Deseja acolher o usuário selecionado?",
          cancel: true,
          persistent: true,
        })
        .onOk(() => {
          saveCrud(`companies/employees/${row.id}/accept`, {}, "put").then(
            () => {
              this.$q.notify({
                color: "positive",
                message: "Acolhido com sucesso!",
              });

              row.accepted = true;
            }
          );
        });
    },
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

    openSpecialistArea: function (specialist) {
      console.log(
        "[CrudQueryTable] Emitindo evento openSpecialistArea:",
        specialist
      );
      // Emite evento para o componente pai
      this.$emit("openSpecialistArea", specialist);
      // Também tenta chamar o método do componente pai como fallback
      if (this.$parent.$parent && this.$parent.$parent.openSpecialistArea) {
        this.$parent.$parent.openSpecialistArea(specialist);
      }
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
