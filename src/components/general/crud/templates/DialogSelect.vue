<template>
  <q-select
    filled
    v-model="model"
    use-input
    input-debounce="0"
    :label="col.label"
    color="secondary"
    dense
    hide-dropdown-icon
    map-options
    @filter="filterFn"
    :class="`col-${col.size} q-mb-sm q-mr-sm dialog-select`"
  >
    <template v-slot:append>
      <q-btn
        round
        dense
        flat
        icon="mdi-magnify"
        @click="openDialogFunc()"
      ></q-btn>

      <q-dialog v-model="openDialog">
        <q-layout view="Lhh lpR fff" container class="bg-white">
          <q-header class="bg-secondary">
            <q-toolbar>
              <q-toolbar-title>
                <q-icon name="mdi-magnify"></q-icon>
                Selecione os dados para o campo:
                {{ col.label }}</q-toolbar-title
              >
              <q-btn flat v-close-popup round dense icon="close"></q-btn>
            </q-toolbar>
          </q-header>
          <q-page-container>
            <q-page>
              <q-list separator>
                <q-item
                  clickable
                  v-ripple
                  v-for="option in filteredOptions"
                  :key="option[col.options.value]"
                  @click="selectValue(option)"
                >
                  <q-item-section>{{
                    option[col.options.label]
                  }}</q-item-section>
                </q-item>
              </q-list>
            </q-page>
          </q-page-container>
        </q-layout>
      </q-dialog>
    </template>
  </q-select>
</template>

<script>
import { filterCrud } from "./../../../general/crud/utils/filterCrud.js";

export default {
  props: ["col", "oldValue"],
  data() {
    return {
      model: "",
      altered: false,
      filteredOptions: [],
      options: [],
      openDialog: false,
    };
  },
  async created() {
    this.model = this.oldValue;

    this.options = await filterCrud("", this.col.options.table);
    this.filteredOptions = this.options;
  },
  watch: {
    col: {
      handler(val) {
        this.altered = true;
        this.model = val.model;
        this.altered = false;
      },
      deep: true,
    },
    model: {
      handler(val) {
        if (!this.altered) {
          if (val) {
            this.$parent.alterData(this.col.name, val);
          }
        }
      },
      deep: true,
    },
  },
  methods: {
    openDialogFunc() {
      this.openDialog = true;
    },
    filterFn: function (val, update) {
      console.log(this.col.name);

      if (this.col.name !== "userId") return;

      if (val === "") {
        this.filteredOptions = this.options;
        return;
      }

      try {
        const needle = val.toLowerCase();
        this.filteredOptions = this.options.filter((v) =>
          v[this.col.options.label].toLowerCase().includes(needle)
        );
      } catch (error) {
        this.filteredOptions = this.options;
      }
    },
    selectValue: function (selected) {
      this.model = {
        value: selected[this.col.options.value],
        label: selected[this.col.options.label],
      };

      this.openDialog = false;
    },
  },
};
</script>

<style lang="scss"></style>
