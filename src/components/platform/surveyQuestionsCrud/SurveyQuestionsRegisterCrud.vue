<template>
  <div class="survey-questions-crud">
    <CrudRegister
      :breadcrumbs="breadcrumbs"
      :title="title"
      :tables="tables"
      :registerType="registerType"
    />
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
              label: "Empresa",
              name: "companyId",
              size: "6",
              row: 1,
              col: 1,
              model: "",
              type: "DialogSelect",
              visible: true,
              options: {
                table: "companies",
                value: "id",
                label: "name",
              },
            },
            questionText: {
              label: "Texto da Pergunta",
              name: "questionText",
              size: "12",
              row: 2,
              col: 1,
              model: "",
              type: "Input",
              visible: true,
            },
          },
        },
      },
      breadcrumbs: [
        {
          title: "Perguntas Qualitativas",
          to: "/surveyQuestions",
        },
        {
          title: "Cadastro de Perguntas Qualitativas",
          to: "",
        },
      ],
    };
  },
  mounted() {
    this.id = this.$router.history.current.params.id;
    openEditCrud(this.id, this.editUrl, this.tables);
  },
  methods: {
    async save(data) {
      try {
        if (!data.mainTable.companyId) {
          showError("Selecione a empresa");
          return;
        }
        if (!data.mainTable.questionText) {
          showError("Preencha o campo de texto da pergunta");
          return;
        }
        const dataCreate = {
          companyId: data.mainTable.companyId,
          questionText: data.mainTable.questionText,
        };
        let surveyQuestionCreated;
        if (this.id) {
          this.editUrl = `${this.editUrl}/${this.id}`;
          surveyQuestionCreated = await saveCrud(
            this.editUrl,
            dataCreate,
            "put"
          );
          return surveyQuestionCreated;
        }
        surveyQuestionCreated = await saveCrud(this.editUrl, dataCreate);

        return surveyQuestionCreated;
      } catch (error) {
        console.log(error);
        showError("Erro ao salvar");
      }
    },
  },
};
</script>
