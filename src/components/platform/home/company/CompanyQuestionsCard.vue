<template>
    <div class="company-questions-card">
        <div v-for="(companyQuestion, index) in companyQuestions" :key="index">
            <p class="company-questions-card__title">
                {{ companyQuestion.questionText }}
            </p>
            <div class="company-questions-card__answers" >
                <div v-for="(answer, index) in companyQuestion.answers" :key="index" class="company-questions-card__answer">
                    {{answer}}
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props: ['companyQuestions'],
    data() {
        return {}
    },
    mounted() {},
}
</script>

<style lang="scss">
.company-questions-card {
    display: flex;
    flex-direction: column;
    gap: 20px;

    &__title {
        font-family: "Montserrat", sans-serif;
        font-size: 20px;
        line-height: 20px;
        color: rgba(91, 91, 91, 1);
        font-weight: 400;
    }

    &__answers {
        display: flex;
        flex-direction: column;
        border: 1px solid #ccc;
        border-radius: 4px;
        min-height: 40px;
        max-height: 200px;
        overflow-y: auto;
    }
    
    &__answer {
        border-bottom: 1px solid #ccc;
        padding: 10px;
        &:last-child {
            border-bottom: none;
        }
    }
}
</style>