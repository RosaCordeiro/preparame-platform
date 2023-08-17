<template>
  <div>
    <q-page>
      <div row>
        <q-select v-model="mentoring" :options="options" label="Standard" />


        <q-btn>

        </q-btn>

        <q-select>
        </q-select>
      </div>
    </q-page>
  </div>
</template>

<script>
export default {
  data() {
    return {
      mentoring: "",
      newMentoring: "",
      options: [
        'Google', 'Facebook', 'Twitter', 'Apple', 'Oracle'
      ]
    };
  },
  methods: {
    close() {
    },
    async set() {
    },
    async onSubmit() {
    },
  },
};
</script>

<style></style>
