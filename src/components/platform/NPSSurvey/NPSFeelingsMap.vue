<template>
  <q-card class="q-ma-md">
    <q-card-section>
      <div class="column no-wrap">
        <div class="col q-ml-md q-mt-md text-h5">
          Mapa de Sentimentos | Como você se sente?
        </div>
        <div class="col q-ml-md q-mt-md text-h6">
          Selecione um ou mais itens para representar a forma como você se sente
          atualmente referente a sua última empresa.
        </div>
      </div>
    </q-card-section>
    <q-separator />
    <q-card-section class="column">
      <div
        v-for="(feeling, feelingIndex) in feelings"
        :key="feelingIndex"
        class="nps-survey-map-feelings-container col-12 row"
      >
        <q-checkbox v-model="feeling.checked" :label="feeling.feeling" />
      </div>
      <br />
      <div class="row">
        <q-space></q-space>
        <q-btn
          label="Voltar"
          color="primary"
          class="self-center"
          size="20px"
          @click="goNPSSurvey()"
        ></q-btn>
        <q-btn v-if="hasCompanyQuestions"
          label="Próximo"
          color="secondary"
          class="self-center"
          size="20px"
          @click="goCompanyQuestions()"
        ></q-btn>
        <q-btn v-else
          label="Finalizar"
          color="secondary"
          class="self-center"
          size="20px"
          @click="finishSurvey()"
        ></q-btn>
        <q-space></q-space>
      </div>
    </q-card-section>
  </q-card>
</template>

<script>
export default {
  props: ["feelings", "hasCompanyQuestions"],
  methods: {
    goNPSSurvey: function () {
      this.$parent.$parent.goNPSSurvey();
    },
    finishSurvey: function () {
      this.$parent.$parent.finishSurvey();
    },
    goCompanyQuestions: function () {
      this.$parent.$parent.goCompanyQuestions();
    },
  },
};
</script>

<style></style>
