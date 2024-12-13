<template>
    <q-card class="q-ma-md">
        <q-card-section>
            <div class="column no-wrap">
                <div class="col q-ml-md q-mt-md text-h5">
                    Perguntas da empresa
                </div>
            </div>
        </q-card-section>
        <q-separator />
        <q-card-section class="column">
            <div v-for="(question, questionIndex) in companyQuestions" :key="questionIndex">
                {{ question.questionText }}
                <input 
                type="text" 
                placeholder="Resposta" 
                class="input-nps-company-questions"
                v-model="localCompanyQuestionsAnswered[questionIndex].answer" 
                @input="updateAnswers"/>
            </div>
            <q-space></q-space>
            <div class="row self-center">
                <q-btn label="Voltar" color="primary" class="self-center" size="20px" @click="goNPSSurvey()"></q-btn>
                <q-btn label="Finalizar" color="secondary" class="self-center q-ml-md" size="20px"
                    @click="finishSurvey()"></q-btn>
            </div>
        </q-card-section>
    </q-card>
</template>

<script>

export default {
    props: ["companyQuestions", "companyQuestionsAnswered"],
    methods: {
        goNPSSurvey: function () {
            this.$parent.$parent.goNPSSurvey();
        },
        finishSurvey: function () {
            this.$parent.$parent.finishSurvey();
        },
        updateAnswers: function () {
            this.$emit('update:companyQuestionsAnswered', this.localCompanyQuestionsAnswered);
        },
    },
    data() {
        return {
            localCompanyQuestionsAnswered: this.companyQuestions.map((question) => {
                return {
                    questionId: question.id,
                    questionText: question.questionText,
                    answer: "",
                };
            }),
        };
    },
};
</script>

<style>
.input-nps-company-questions {
    width: 100%;
    padding: 10px;
    margin: 10px 0;
    border: 1px solid #ccc;
    border-radius: 4px;
    box-sizing: border-box;
}
</style>