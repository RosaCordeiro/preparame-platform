<template>
  <div class="crud-register">
    <q-page>
      <Breadcrumbs :breadcrumbs="breadcrumbs" />
      <div class="crud-register-content">
        <CrudRegisterTitle :title="title.mainTable || title" />

        <CrudRegisterForm ref="mainTable" :table="forms.mainTable" />

        <CrudRegisterFormRow
          v-if="registerType === 'parentChild'"
          ref="childTable"
          :data="forms.childTable"
          :removeAction="hasAction"
          :title="title.childTable"
        />
        <CrudRegisterButtons />
        <slot></slot>
      </div>
    </q-page>
  </div>
</template>

<script>
import CrudRegisterTitle from "./CrudRegisterTitle.vue";
import CrudRegisterForm from "./CrudRegisterForm.vue";
import CrudRegisterFormRow from "./CrudRegisterFormRow.vue";
import CrudRegisterButtons from "./CrudRegisterButtons.vue";
import Breadcrumbs from "../../general/Breacrumbs.vue";

import { adjustColumnsAndRowsRegister } from "./../../general/crud/utils/adjustColumnsAndRowsRegister.js";

export default {
  components: {
    CrudRegisterTitle,
    CrudRegisterForm,
    CrudRegisterFormRow,
    CrudRegisterButtons,
    Breadcrumbs,
  },
  props: ["title", "breadcrumbs", "registerType", "tables", "removeAction"],
  data() {
    return {
      forms: {},
      hasAction: this.removeAction ?? false,
    };
  },
  created() {
    this.forms.mainTable = {
      registerColumns: [],
    };

    adjustColumnsAndRowsRegister(
      this.tables["mainTable"],
      this.forms.mainTable.registerColumns
    );

    if (this.registerType === "parentChild") {
      this.forms.childTable = {
        registerColumns: [],
      };

      adjustColumnsAndRowsRegister(
        this.tables["childTable"],
        this.forms.childTable.registerColumns
      );

      this.forms.childTable.tableColumns =
        this.tables["childTable"]?.tableColumns ?? [];
      this.forms.childTable.tableData =
        this.tables["childTable"]?.tableData ?? [];
    }
  },
};
</script>

<style>
.crud-register-content {
  padding: 20px 50px;
}
</style>
