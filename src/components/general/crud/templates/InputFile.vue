<template>
  <div class="row" :class="`col-${col.size} q-mb-sm q-mr-sm q-mt-sm`">
    <img
      :src="model"
      style="width: 100%; height: 200px; object-fit: contain"
      v-if="model !== null && model !== '' && type !== 'application/pdf'"
    />

    <q-file
      filled
      color="secondary"
      v-model="file"
      :label="col.label"
      dense
      class="col-12 q-mt-md"
    >
      <template v-slot:prepend>
        <q-icon name="attach_file" />
      </template>
    </q-file>

    <q-input
      v-if="verifyLink"
      filled
      color="secondary"
      v-model="model"
      :label="col.label"
      :rules="col.rules"
      dense
      readonly
      :class="`col-12 q-mt-md`"
    >
    </q-input>
  </div>
</template>

<script>
export default {
  props: ["col", "oldValue"],
  data() {
    return {
      model: "",
      file: null,
      type: "",
    };
  },
  created() {
    this.model = this.oldValue;
  },
  computed: {
    verifyLink() {
      if (typeof this.model === "file") return false;
      if (typeof this.model === "string")
        if (this.model.includes("http") || this.model.includes("https")) {
          return true;
        }

      return false;
    },
  },
  methods: {
    fileToBase64() {
      if (this.file === null) return;

      const reader = new FileReader();
      reader.readAsDataURL(this.file);
      reader.onload = () => {
        this.model = reader.result;
      };
    },
  },
  watch: {
    col: {
      handler(val) {
        this.model = val.model;
      },
      deep: true,
    },
    file(newQuestion, oldQuestion) {
      if (newQuestion === null) return;

      this.type = newQuestion.type;

      if (newQuestion.type !== "application/pdf") {
        this.fileToBase64();
      }

      this.$parent.alterData(this.col.name, newQuestion);
    },
  },
};
</script>

<style></style>
