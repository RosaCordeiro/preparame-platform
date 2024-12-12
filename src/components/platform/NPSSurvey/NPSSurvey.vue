<template>
  <div class="nps-survey">
    <q-page>
      <Breadcrumbs :breadcrumbs="breadcrumbs" />
      <div v-if="surveyAnswered" class="nps-survey-answered q-ma-md text-white">
        <q-card>
          <q-card-section class="bg-negative">
            Pesquisa já respondida. Não é possível responde-la novamente.
          </q-card-section>
        </q-card>
      </div>
      <NPSQuestionsContainer v-else-if="page === 1" :questions="questions" />
      <NPSFeelingsMap v-else-if="page === 2" :feelings="feelings" :hasCompanyQuestions="hasCompanyQuestions"/>
      <NPSCompanyQuestions v-else-if="page === 3" :companyQuestions="companyQuestions" />
      <q-dialog v-model="showConfirmEndSurvey" persistent>
        <q-card>
          <q-card-section class="row items-center">
            <span class="q-ml-sm"
              >Ao confirmar a finalização da pesquisa, não poderá mais
              repeti-la. <br /><br />
              Deseja mesmo continuar?</span
            >
          </q-card-section>

          <q-card-actions align="right">
            <q-btn flat label="Voltar" color="negative" v-close-popup />
            <q-btn
              label="Finalizar"
              color="primary"
              v-close-popup
              @click="saveSurvey()"
            />
          </q-card-actions>
        </q-card>
      </q-dialog>
      <SurveyViewDialog ref="surveyViewDialog" />
    </q-page>
  </div>
</template>

<script>
import { saveCrud } from "./../../general/crud/utils/saveCrud.js";
import Breadcrumbs from "../../general/Breacrumbs.vue";
import NPSQuestionsContainer from "./NPSQuestionsContainer.vue";
import NPSFeelingsMap from "./NPSFeelingsMap.vue";
import SurveyViewDialog from "src/components/SurveyViewDialog.vue";
import NPSCompanyQuestions from "./NPSCompanyQuestions.vue";
import { filterCrud } from "src/components/general/crud/utils/filterCrud.js";

export default {
  components: {
    Breadcrumbs,
    NPSQuestionsContainer,
    NPSFeelingsMap,
    SurveyViewDialog,
    NPSCompanyQuestions,
  },
  methods: {
    goNPSSurvey: function () {
      this.page--;

      window.scrollTo(0, 0);
    },
    goFeelingsMap: function () {
      const questionsNotAnswered = this.questions.filter((question) => {
        return question.answer === -1;
      });

      if (questionsNotAnswered.length > 0) {
        this.$q.notify({
          type: "error",
          message: "É necessário responder a todas as perguntas.",
        });
      } else {
        this.page++;
      }

      window.scrollTo(0, 0);
    },
    goCompanyQuestions: function () {
      this.page++;

      window.scrollTo(0, 0);
    },
    saveSurvey: async function () {
      const userUpdate = {
        laborRisk: this.laborRisk,
        surveyAnswered: true,
        NPSSurvey: this.questions[0].answer,
        feelingsMapJSON: JSON.stringify(this.feelingsSelected),
        brandRisk: this.brandRisk,
        brandRiskJSON: this.brandRiskJSON,
        laborRiskJSON: this.laborRiskJSON,
      };

      const userUpdated = await saveCrud(
        "users/updateSurveyFields",
        userUpdate,
        "put"
      );

      if (userUpdated.status == 204) {
        localStorage.setItem("surveyAnswered", "true");

        this.$refs.surveyViewDialog.show();
      }
    },
    finishSurvey: function () {
      this.feelingsSelected = this.feelings.filter((feeling) => {
        return feeling.checked;
      });

      if (this.feelingsSelected.length == 0) {
        this.$q.notify({
          type: "error",
          message: "É necessário selecionar ao menos um sentimento.",
        });
      } else {
        var totalLaborRiskQuestion = 0;
        var totalBrandRiskQuestion = 0;

        let laborRiskQuestions = this.questions.filter((question) => {
          return question.category === "laborRisk";
        });

        // this.feelings.forEach((feeling) => {
        //   if (feeling.laborRiskCheck && feeling.checked) {
        //     laborRiskQuestions.push({
        //       question: feeling.feeling,
        //       answer: 0,
        //       brandRisk: true,
        //       category: "laborRisk",
        //     });
        //   } else if (feeling.laborRiskCheck && !feeling.checked) {
        //     laborRiskQuestions.push({
        //       question: feeling.feeling,
        //       answer: 10,
        //       brandRisk: true,
        //       category: "laborRisk",
        //     });
        //   }
        // });

        this.laborRiskJSON = JSON.stringify(
          laborRiskQuestions
            .filter((laborRiskQuestion) => {
              return laborRiskQuestion.category === "laborRisk";
            })
            .map((laborRiskQuestion) => {
              if (laborRiskQuestion.answer == "Sim") {
                laborRiskQuestion.answer = 10;
              }

              if (laborRiskQuestion.answer == "Não") {
                laborRiskQuestion.answer = 0;
              }

              return {
                question: laborRiskQuestion.question,
                index: laborRiskQuestion.index,
                answer: laborRiskQuestion.answer,
              };
            })
        );

        laborRiskQuestions.forEach((question) => {
          if (question.answer >= 0) {
            if (question.type == "YesNo") {
              if (question.answer == 10) {
                totalLaborRiskQuestion += 10;
              } else {
                totalLaborRiskQuestion += 0;
              }
            } else {
              totalLaborRiskQuestion += question.answer;
            }

            if (question.brandRisk) {
              totalBrandRiskQuestion += question.answer;
            }
          }
        });

        this.brandRiskJSON = JSON.stringify(
          laborRiskQuestions
            .filter((laborRiskQuestion) => {
              return laborRiskQuestion.brandRisk;
            })
            .map((laborRiskQuestion) => {
              return {
                question: laborRiskQuestion.question,
                index: laborRiskQuestion.index,
                answer: laborRiskQuestion.answer,
              };
            })
        );

        this.laborRisk = totalLaborRiskQuestion / 8;
        this.brandRisk = totalBrandRiskQuestion / 4;

        this.showConfirmEndSurvey = true;
      }
    },
    searchCompanyQuestions: async function () {
      const companyId = localStorage.getItem("companyId");
      
      if (!companyId) {
        return;
      }
      const companyQuestions = await filterCrud(
        [{
          name: "companyId",
          model: companyId,
        }],
       "companies/surveyquestions");
      this.companyQuestions = companyQuestions;
      this.hasCompanyQuestions = companyQuestions.length > 0;
    },
  },
  data() {
    return {
      page: 1,
      surveyAnswered: false,
      focusedQuestion: 1,
      feelingsSelected: [],
      hasCompanyQuestions: false,
      breadcrumbs: [
        {
          title: "Pesquisa",
          to: "",
        },
      ],
      showConfirmEndSurvey: false,
      brandRisk: 0,
      brandRiskJSON: "",
      laborRisk: 0,
      laborRiskJSON: "",
      feelings: [
        {
          feeling: "Alíviado(a). Já queria sair da empresa.",
          checked: false,
          laborRiskCheck: false,
        },
        {
          feeling: "Surpreso(a). Não esperava pela demissão.",
          checked: false,
          laborRiskCheck: false,
        },
        {
          feeling: "Injustiçado(a). Minha demissão foi injusta.",
          checked: false,
          laborRiskCheck: true,
        },
        {
          feeling: "Bravo(a). Não concordo em como a demissão aconteceu.",
          checked: false,
          laborRiskCheck: true,
        },
        {
          feeling: "Desesperado(a). Preciso me recolocar urgente.",
          checked: false,
          laborRiskCheck: false,
        },
        {
          feeling:
            "Inseguro(a). Estou com a autoestima abalada com a demissão.",
          checked: false,
          laborRiskCheck: false,
        },
        {
          feeling: "Inseguro(a). Não sei quais os passos para me recolocar.",
          checked: false,
          laborRiskCheck: false,
        },
        {
          feeling: "Triste. Gostava muito do meu trabalho.",
          checked: false,
          laborRiskCheck: false,
        },
        {
          feeling: "Triste. Gostava muito da empresa.",
          checked: false,
          laborRiskCheck: false,
        },
        {
          feeling: "Triste. Gostava muito da minha equipe de trabalho.",
          checked: false,
          laborRiskCheck: false,
        },
        {
          feeling: "Indiferente. Nem feliz e nem triste.",
          checked: false,
          laborRiskCheck: false,
        },
        {
          feeling: "Indiferente. Ainda tentando entender tudo que aconteceu.",
          checked: false,
          laborRiskCheck: false,
        },
      ],
      questions: [
        /*  {
          index: 1,
          question: "Foi você que pediu demissão? Sim ou Não",
          answer: -1,
          options: ["Não", "Sim"],
          type: "YesNo",
          type: "YesNo",
          laborRiskJSON: true,
          brandRisk: false,
          category: "laborRisk",
        }, */
        {
          index: 1,
          question:
            "O quanto você recomenda a empresa para seus amigos e familiares trabalharem?",
          answer: -1,
          options: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
          type: "grade",
          brandRisk: false,
          category: "NPS",
        },
        {
          index: 2,
          question:
            "O quanto você se sentia respeitado na empresa, de forma geral?",
          answer: -1,
          options: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
          type: "grade",
          laborRiskJSON: true,
          brandRisk: true,
          category: "laborRisk",
        },
        {
          index: 3,
          question: "O quanto você se sentia respeitado pelos seus líderes?",
          answer: -1,
          options: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
          type: "grade",
          laborRiskJSON: true,
          brandRisk: true,
          category: "laborRisk",
        },
        {
          index: 4,
          question:
            "O quanto você gostaria de voltar a trabalhar nesta empresa no futuro?",
          answer: -1,
          options: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
          type: "grade",
          laborRiskJSON: true,
          brandRisk: true,
          category: "laborRisk",
        },
        {
          index: 5,
          question:
            "O quanto você achou que seu processo de demissão foi respeitoso?",
          answer: -1,
          options: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
          type: "grade",
          laborRiskJSON: true,
          brandRisk: true,
          category: "laborRisk",
        },
        {
          index: 6,
          question: "O quanto você se sentia seguro fisicamente na empresa?",
          answer: -1,
          options: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
          type: "grade",
          laborRiskJSON: true,
          brandRisk: false,
          category: "laborRisk",
        },
        {
          index: 7,
          question: "O quanto você se sentia seguro emocionalmente na empresa?",
          answer: -1,
          options: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
          type: "grade",
          laborRiskJSON: true,
          brandRisk: false,
          category: "laborRisk",
        },
        {
          index: 8,
          question:
            "O quanto você gostava do pacote de benefícios e remuneração da empresa?",
          answer: -1,
          options: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
          type: "grade",
          laborRiskJSON: true,
          brandRisk: false,
          category: "laborRisk",
        },
        {
          index: 9,
          question: "Os cálculos da rescisão estão corretos?",
          answer: -1,
          options: ["Não", "Sim"],
          type: "YesNo",
          laborRiskJSON: true,
          brandRisk: false,
          category: "laborRisk",
        },
      ],
      companyQuestions: []
    };
  },
  async mounted() {
    this.surveyAnswered =
      localStorage.getItem("surveyAnswered") == "true" ? true : false;
    await this.searchCompanyQuestions();
  },

};
</script>

<style lang="scss">
.nps-survey {
  height: 100%;
}
</style>
