<template>
  <div class="row crud-title-container q-mb-sm">
    <div class="text-h6 crud-title">{{ title }}</div>
    <q-space></q-space>
    <q-btn
      v-if="!blockRemove"
      color="negative"
      flat
      label="Excluir Selecionados"
      icon="mdi-minus-circle"
      class="crud-new-button q-mr-sm"
      no-caps
      @click="removeSelected()"
    ></q-btn>
    <q-btn
      v-if="!blockCreateNew"
      color="primary"
      label="Novo"
      icon="mdi-plus-circle"
      class="crud-new-button"
      no-caps
      @click="createNew()"
    ></q-btn>
  </div>
</template>

<script>
export default {
  props: ["title", "blockCreateNew", "blockRemove"],
  methods: {
    createNew: function () {
      const actualUrl = this.$router.history.current.path

      this.$router.push({ path: `${actualUrl}/new` });
    },
    removeSelected: function() {
      this.$parent.$parent.removeSelected()
    }
  }
};
</script>

<style lang="scss">
.crud-title {
  font-weight: 700;
}

.crud-new-button {
  font-family: "Manrope", sans-serif;
}
</style>
