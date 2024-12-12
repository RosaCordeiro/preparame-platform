<template>
    <div class="survey-questions-crud">
        <CrudRegister :breadcrumbs="breadcrumbs" :title="title" :tables="tables" :registerType="registerType" />
    </div>
</template>

<script>
import { openEditCrud } from "./../../general/crud/utils/openEditCrud";
import CrudRegister from "./../../general/crud/CrudRegister.vue";
import { saveCrud } from "src/components/general/crud/utils/saveCrud";
import { showError } from "src/global";
export default {
    components: {
        CrudRegister,
    },
    data: () => {
        return {
            registerType: "unique",
            editUrl: "/companies/surveyquestions",
            title: "Cadastro de Perguntas Qualitativas",
            tables: {
                mainTable: {
                    id: null,
                    apiUrl: "/companies/surveyquestions",
                    registerColumns: {
                        id: {
                            label: "Id",
                            name: "id",
                            size: "1",
                            row: 1,
                            col: 1,
                            model: "",
                            type: "Input",
                            visible: false,
                        },
                        companyId: {
                            label: "companyId",
                            name: "companyId",
                            size: "1",
                            row: 1,
                            col: 1,
                            model: "",
                            type: "Input",
                            visible: false,
                        },
                        questionText: {
                            label: "Texto da Pergunta",
                            name: "questionText",
                            size: "12",
                            row: 1,
                            col: 1,
                            model: "",
                            type: "Input",
                            visible: true,
                        }
                    }
                }
            },
            breadcrumbs: [
                {
                    title: "Perguntas Qualitativas",
                    to: "/surveyQuestions",
                },
                {
                    title: "Cadastro de Perguntas Qualitativas",
                    to: "",
                }
            ]
        }
    },
    mounted() {
        this.id = this.$router.history.current.params.id;
        this.tables.mainTable.registerColumns.companyId.model = localStorage.getItem("companyId");
        openEditCrud(this.id, this.editUrl, this.tables);
    },
    methods: {
        async save(data) {
            try {
                if (data.mainTable.questionText == "" || !data.mainTable.questionText) {
                    showError("Preencha o campo de texto da pergunta");
                    return;
                }
                const dataCreate = {
                    companyId: this.tables.mainTable.registerColumns.companyId.model,
                    questionText: this.tables.mainTable.registerColumns.questionText.model
                }
                let surveyQuestionCreated
                if (this.id) {
                    this.editUrl = `${this.editUrl}/${this.id}`;
                    surveyQuestionCreated = await saveCrud(this.editUrl, dataCreate, 'put');
                    return surveyQuestionCreated;
                }
                surveyQuestionCreated = await saveCrud(this.editUrl, dataCreate);

                return surveyQuestionCreated;
            } catch (error) {
                console.log(error);
                showError("Erro ao salvar");
            }

        }
    }

}
</script>