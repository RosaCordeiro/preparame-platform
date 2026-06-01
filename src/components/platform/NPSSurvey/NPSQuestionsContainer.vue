<template>
  <q-card class="q-ma-md">
    <q-card-section>
      <div class="column no-wrap">
        <div class="col q-ml-md q-mt-md text-h5">Pesquisa de Demissão</div>
        <div class="col q-ml-md q-mt-md text-h6 wrap">
          Selecione um valor para cada pergunta.
        </div>
      </div>
    </q-card-section>
    <q-separator />
    <q-card-section class="column">
      <div
        v-for="(question, questionIndex) in questions"
        :key="questionIndex"
        class="nps-survey-question-container column"
        :id="question.index"
      >
        <NPSQuestion :question="question" :focusedQuestion="focusedQuestion" />
        <q-separator></q-separator>
      </div>
      <br />
      <q-btn
        label="Continuar"
        color="primary"
        class="self-center"
        size="20px"
        @click="goFeelingsMap()"
      ></q-btn>
    </q-card-section>

    <AnonymousDialog />
  </q-card>
</template>

<script>
import AnonymousDialog from "src/components/AnonymousDialog.vue";
import NPSQuestion from "./NPSQuestion.vue";

export default {
  components: {
    NPSQuestion,
    AnonymousDialog,
  },
  props: ["questions"],
  data() {
    return {
      focusedQuestion: 1,
    };
  },
  methods: {
    goFeelingsMap: function () {
      this.$parent.$parent.goFeelingsMap();
    },
    selectAnswer: function (question, optionIndex) {
      if (question.answer === -1) {
        this.focusedQuestion = question.index + 1;
      }

      question.answer = question.options[optionIndex];
      question.answerIndex = optionIndex;

      const element = document.getElementById(`${question.index + 1}`);

      if (element) {
        element.scrollIntoView({
          behavior: "smooth",
          block: "center",
          inline: "center",
        });
      }
    },
  },
};
</script>

<style>
.nps-survey-question-container {
  justify-content: center;
  align-content: center;
  width: 80%;
  margin: 0 auto;
}
</style>
