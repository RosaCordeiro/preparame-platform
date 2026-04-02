<template>
  <div id="q-app" class="schedule">
    <q-page class="q-pa-lg">
      <div class="row row-cards">
        <q-card class="my-card col-lg-2 col-md-auto">
          <q-card-section class="row justify-center title-card">
            <b>Relatório</b></q-card-section
          >
          <q-card-section class="row justify-center" style="gap: 10px">
            <q-input
              outlined
              dense
              label="Data Inicial"
              type="date"
              v-model="initialDate"
              placeholder="Pesquisar"
              class="col-12 date"
            />
            <q-input
              outlined
              dense
              label="Data Final"
              type="date"
              v-model="finalDate"
              placeholder="Pesquisar"
              class="col-12 date q-mt-sm"
            />
            <q-btn
              label="Gerar"
              color="blue"
              class="col-12 q-mt-sm btn"
              @click="generateReport"
            />
          </q-card-section>
        </q-card>
        <q-card
          class="my-card col-lg-2 col-md-auto card-clicks"
          v-for="click in clicks"
          :key="click.cn_name"
        >
          <q-card-section class="row justify-center q-mb-lg title-card">
            {{ click.cn_name }}
          </q-card-section>

          <div class="text-card">{{ click.count }} Cliques</div>
        </q-card>
      </div>
      <div class="row-cards">
        <div class="filtro">
          <div style="display: flex; flex-direction: column; gap: 10px">
            <q-btn
              style="background: #667997; color: black"
              label="Baixar respostas em excel"
              class="column btn"
              @click="downloadAnswers"
            />

            <q-btn
              style="background: #1a27b7; color: white"
              label="Importar Respostas"
              class="column btn"
              @click="showImportModal"
              :loading="importLoading"
            />

            <q-btn
              style="background: #667997; color: black"
              label="Relatório visão de únicos"
              class="column btn"
              @click="downloadUsersReport"
            />

            <q-btn
              style="background: #667997; color: black"
              label="Recolocados"
              class="column btn"
              @click="goToReplacementsPage"
            />
          </div>
          <div class="text">Filtro</div>
          <div class="column">
            <label>
              <input type="radio" v-model="selectedCompany" :value="'TUDO'" />
              Tudo
            </label>
            <label>
              <input type="radio" v-model="selectedCompany" :value="'B2B'" />
              B2B
            </label>
            <label>
              <input type="radio" v-model="selectedCompany" :value="'B2C'" />
              B2C
            </label>
            <label v-for="(option, index) in companies" :key="index">
              <input
                type="radio"
                v-model="selectedCompany"
                :value="option.id"
              />
              {{ option.name }}
            </label>
          </div>
        </div>
        <section class="dashboard">
          <DashBoardAnswers
            :companyId="selectedCompany"
            :key="dashboardKey"
            ref="dashboard"
          />
        </section>
      </div>

      <ConfirmScheduleDialog ref="confirmScheduleDialog" />

      <!-- Modal de Importação -->
      <q-dialog v-model="showImportDialog" persistent>
        <q-card style="min-width: 500px">
          <q-card-section class="row items-center q-pb-none">
            <div class="text-h6">Importar Respostas</div>
            <q-space />
            <q-btn icon="close" flat round dense v-close-popup />
          </q-card-section>

          <q-card-section>
            <div class="text-body1 q-mb-lg">
              Escolha uma das opções abaixo para importar respostas:
            </div>

            <div class="row q-gutter-md">
              <q-btn
                color="positive"
                icon="mdi-download"
                label="Baixar Modelo"
                class="col"
                @click="downloadTemplate"
                :loading="downloadTemplateLoading"
                no-caps
              >
                <q-tooltip
                  >Baixa um arquivo Excel vazio com as colunas
                  corretas</q-tooltip
                >
              </q-btn>

              <q-btn
                color="primary"
                icon="mdi-upload"
                label="Importar Existente"
                class="col"
                @click="importExistingFile"
                :loading="importLoading"
                no-caps
              >
                <q-tooltip>Importa um arquivo Excel já preenchido</q-tooltip>
              </q-btn>
            </div>

            <q-separator class="q-my-md" />

            <div class="text-subtitle2 q-mb-sm">Regras Importantes:</div>
            <ul class="import-rules">
              <li>Pode exportar, editar e reimportar o mesmo arquivo</li>
              <li>
                Pode criar um novo arquivo desde que as colunas sejam idênticas
              </li>
              <li>Sentimentos aceitam "Sim" ou "Não"</li>
              <li>NPS e perguntas de risco aceitam valores de 0 a 10</li>
              <li>
                "Os cálculos da rescisão estão corretos?" aceita "Sim" ou "Não"
              </li>
              <li>
                A dashboard atualiza automaticamente após importação
                bem-sucedida
              </li>
            </ul>
          </q-card-section>

          <q-card-actions align="right">
            <q-btn flat label="Fechar" color="grey" v-close-popup />
          </q-card-actions>
        </q-card>
      </q-dialog>
    </q-page>
  </div>
</template>

<script>
import axios from "axios";
import { baseApiUrl, showDeuCerto, showError } from "../../../global";
import { downloadFile } from "src/utils/downloadFile";
import DashBoardAnswers from "./templates/DashBoardAnswers.vue";
import ConfirmScheduleDialog from "src/components/ConfirmScheduleDialog.vue";

export default {
  components: {
    DashBoardAnswers,
    ConfirmScheduleDialog,
  },
  data() {
    return {
      clicks: [],
      initialDate: "",
      finalDate: "",
      companies: [],
      selectedCompany: "TUDO",
      importLoading: false,
      showImportDialog: false,
      downloadTemplateLoading: false,
      dashboardKey: 0,
    };
  },
  methods: {
    goToReplacementsPage() {
      this.$router.push({ name: "replacementsReport" });
    },
    showDeuCerto,
    async generateReport() {
      const params = {};

      if (this.initialDate && this.finalDate) {
        params.initialDate = this.initialDate;
        params.finalDate = this.finalDate;
      }

      let config = {
        method: "GET",
        headers: { authorization: `Bearer ${localStorage.getItem("token")}` },
        url: `${baseApiUrl}/reports/schedules`,
        responseType: "blob",
        params,
      };

      this.$q.loading.show();

      try {
        const data = await axios(config);
        downloadFile(data.data, "relatorio.xlsx");
      } catch (error) {
        showError(error);
      }

      this.$q.loading.hide();
    },
    async downloadAnswers() {
      let config = {
        method: "GET",
        headers: { authorization: `Bearer ${localStorage.getItem("token")}` },
        url: `${baseApiUrl}/reports/responses`,
        responseType: "blob",
      };
      this.$q.loading.show();

      try {
        const data = await axios(config);
        downloadFile(data.data, "respostas.xlsx");
      } catch (error) {
        showError(error);
      }

      this.$q.loading.hide();
    },
    async downloadUsersReport() {
      let config = {
        method: "GET",
        headers: { authorization: `Bearer ${localStorage.getItem("token")}` },
        url: `${baseApiUrl}/reports/users`,
        responseType: "blob",
      };
      this.$q.loading.show();

      try {
        const data = await axios(config);
        downloadFile(data.data, "usuarios.xlsx");
      } catch (error) {
        showError(error);
      }

      this.$q.loading.hide();
    },
    listClicks() {
      let config = {
        method: "GET",
        headers: { authorization: `Bearer ${localStorage.getItem("token")}` },
        url: `${baseApiUrl}/clicks`,
      };

      axios(config)
        .then(async (clicks) => {
          this.clicks = clicks.data;

          console.log(this.clicks);
        })
        .catch((err) => {
          console.log(err);
          showError(err);
        });
    },
    async importExcel() {
      const input = document.createElement("input");
      input.type = "file";
      input.accept = ".xlsx";

      input.onchange = async (event) => {
        const file = event.target.files[0];
        if (!file) return;

        this.$q
          .dialog({
            title: "Confirmar Importação",
            message: `
            <div style="text-align: left;">
              <p><strong>Arquivo:</strong> ${file.name}</p>

              <p>Deseja continuar com a importação?</p>
            </div>
          `,
            html: true,
            cancel: true,
            persistent: true,
          })
          .onOk(async () => {
            await this.processImport(file);
          });
      };

      input.click();
    },
    async processImport(file) {
      this.importLoading = true;

      try {
        const formData = new FormData();
        formData.append("file", file);

        const response = await fetch(
          `${baseApiUrl}/reports/npsSurveyAnswers/import`,
          {
            method: "POST",
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
            body: formData,
          }
        );

        const result = await response.json();

        if (!response.ok) {
          throw new Error(result.message || "Erro na importação");
        }

        // Mostrar resumo da importação
        let message = `<div style="text-align: left;">`;
        message += `<p><strong>${result.success} registros importados com sucesso</strong></p>`;

        if (result.errors && result.errors.length > 0) {
          message += `<p><strong>${result.errors.length} erros encontrados:</strong></p>`;
          message += `<ul>`;
          result.errors.forEach((error) => {
            message += `<li>Linha ${error.row}: ${error.reason}</li>`;
          });
          message += `</ul>`;
        }
        message += `</div>`;

        this.$q.dialog({
          title: "Resultado da Importação",
          message: message,
          html: true,
          ok: "Fechar",
        });

        // Notificar sucesso
        this.$q.notify({
          type: "positive",
          message: `Importação concluída! ${result.success} registros processados.`,
        });

        // Notificar que o dashboard está sendo atualizado
        this.$q.notify({
          type: "info",
          message: "Atualizando dashboard...",
          timeout: 2000,
        });

        // Forçar atualização do dashboard
        this.refreshDashboard();
      } catch (error) {
        console.error("Erro na importação:", error);
        this.$q.notify({
          type: "negative",
          message: error.message || "Erro ao importar o arquivo",
        });
      } finally {
        this.importLoading = false;
      }
    },
    showImportModal() {
      this.showImportDialog = true;
    },
    async downloadTemplate() {
      this.downloadTemplateLoading = true;

      try {
        const response = await fetch(
          `${baseApiUrl}/reports/npsSurveyAnswers/import/template`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );

        if (!response.ok) {
          throw new Error("Erro ao baixar o modelo");
        }

        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.download = "modelo-respostas.xlsx";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        window.URL.revokeObjectURL(url);

        this.$q.notify({
          type: "positive",
          message: "Modelo baixado com sucesso!",
        });

        this.showImportDialog = false;
      } catch (error) {
        console.error("Erro ao baixar modelo:", error);
        this.$q.notify({
          type: "negative",
          message: "Erro ao baixar o modelo Excel",
        });
      } finally {
        this.downloadTemplateLoading = false;
      }
    },
    importExistingFile() {
      this.showImportDialog = false;
      this.importExcel();
    },
    refreshDashboard() {
      // Método 1: Força o re-render do componente DashBoardAnswers
      this.dashboardKey += 1;

      // Método 2: Aguarda um tick e chama o método de reload diretamente
      this.$nextTick(() => {
        if (this.$refs.dashboard && this.$refs.dashboard.loadNpsSurveyAnswers) {
          this.$refs.dashboard.loadNpsSurveyAnswers();
        }
      });

      // Método 3: Força o watch do companyId (fallback)
      setTimeout(() => {
        const currentCompany = this.selectedCompany;
        this.selectedCompany = null;
        this.$nextTick(() => {
          this.selectedCompany = currentCompany;
        });
      }, 100);
    },
  },
  mounted() {
    this.listClicks();
    let config = {
      method: "GET",
      headers: { authorization: `Bearer ${localStorage.getItem("token")}` },
      url: `${baseApiUrl}/companies`,
    };

    axios(config)
      .then(async (company) => {
        this.companies = company.data;

        console.log(this.companies);
      })
      .catch((err) => {
        console.log(err);
        showError(err);
      });
  },
};
</script>

<style>
.btn {
  border-radius: 25px;
  width: 275px;
  height: 60px;
  text-align: center;
  font-weight: 600;
  font-size: 0.8rem;
  font-weight: bold;
  box-sizing: border-box;
  padding: 6px;
  background-color: rgba(26, 39, 183, 1) !important;
  color: white !important;
  border-radius: 5px;
  font-family: "Montserrat", sans-serif;
}

.text {
  font-size: 1rem;
  font-weight: bold;
  padding-top: 15px;
}
.schedule {
  height: 100%;
}

.my-card {
  min-height: 180px;
  width: 180px;
  background-color: #fff;
  border-radius: 10px;
  flex: 1;
  border-radius: 5px;
  box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
  position: relative;
}

.text-card {
  position: absolute;
  font-weight: bold;
  padding-top: 15px;
  top: 50%;
  padding: 0;
  width: 100%;
  text-align: center;
  font-family: "Montserrat", sans-serif;
  color: rgba(91, 91, 91, 1);
  font-size: 20px;
  line-height: 20px;
}

.date .q-field__label.no-pointer-events.absolute.ellipsis {
  max-width: 133%;
  transform: translateY(-40%) scale(0.75);
  transition: transform 0.36s cubic-bezier(0.4, 0, 0.2, 1),
    max-width 0.396s cubic-bezier(0.4, 0, 0.2, 1);
}

.card-clicks {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.dashboard {
  flex: 1;
}

.filtro {
  padding: 20px 0;
}

.filtro .text {
  font-size: 1rem;
  font-weight: bold;
  font-family: "Montserrat", sans-serif;
}

.filtro label {
  font-family: "Montserrat", sans-serif;
}

.title-card {
  font-family: "Montserrat", sans-serif;
  font-weight: 700;
  font-size: 20px;
  line-height: 20px;
  color: rgba(26, 39, 183, 1);
}

.row-cards {
  display: flex;
  justify-content: space-between;
  gap: 20px;
}

.import-rules {
  font-size: 14px;
  line-height: 1.5;
  margin: 0;
  padding-left: 20px;
}

.import-rules li {
  margin-bottom: 4px;
}

.flow-steps {
  background: #f5f5f5;
  padding: 12px;
  border-radius: 8px;
  text-align: center;
  font-size: 14px;
}

.step {
  background: #1a27b7;
  color: white;
  padding: 4px 8px;
  border-radius: 4px;
  font-weight: 600;
}
</style>
