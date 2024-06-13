<template>
  <div
    id="q-app"
    class="home-company"
    :style="{
      padding: this.userType === 'ADMIN' ? '0' : '20px',
    }"
  >
    <q-page>
      <div class="box__button-actions">
        <q-tooltip
          anchor="top middle"
          self="bottom middle"
          v-if="disableFilters"
        >
          <div class="tooltip-text">
            <p>Selecione uma empresa para habilitar os filtros.</p>
          </div>
        </q-tooltip>

        <q-btn-dropdown
          class="box__button-actions-item"
          label="Período"
          text-color="white"
          no-caps
          :disable="disableFilters"
        >
          <div class="row no-wrap q-pa-md">
            <div class="column" v-if="parameters.period">
              <q-checkbox
                color="primary"
                v-for="(r, index) in parameters.period"
                :key="index"
                :label="r"
                :val="r"
                v-model="period"
              />
            </div>
          </div>
        </q-btn-dropdown>

        <q-btn-dropdown
          class="box__button-actions-item"
          label="Unidade"
          text-color="white"
          no-caps
          :disable="disableFilters"
        >
          <div class="row no-wrap q-pa-md">
            <div class="column" v-if="parameters.unity">
              <q-checkbox
                color="primary"
                v-for="(r, index) in parameters.unity"
                :key="index"
                :label="r"
                :val="r"
                v-model="unity"
              />
            </div>
          </div>
        </q-btn-dropdown>

        <q-btn-dropdown
          class="box__button-actions-item"
          label="Área"
          text-color="white"
          no-caps
          :disable="disableFilters"
        >
          <div class="row no-wrap q-pa-md">
            <div class="column" v-if="parameters.area">
              <q-checkbox
                color="primary"
                v-for="(r, index) in parameters.area"
                :key="index"
                :label="r"
                :val="r"
                v-model="area"
              />
            </div>
          </div>
        </q-btn-dropdown>

        <q-btn-dropdown
          class="box__button-actions-item"
          label="Cargo"
          text-color="white"
          no-caps
          :disable="disableFilters"
        >
          <div class="row no-wrap q-pa-md">
            <div class="column" v-if="parameters.role">
              <q-checkbox
                color="primary"
                v-for="(r, index) in parameters.role"
                :key="index"
                :label="r"
                :val="r"
                v-model="role"
              />
            </div>
          </div>
        </q-btn-dropdown>

        <!-- subarea -->
        <q-btn-dropdown
          class="box__button-actions-item"
          label="Subárea"
          text-color="white"
          no-caps
          :disable="disableFilters"
        >
          <div class="row no-wrap q-pa-md">
            <div class="column" v-if="parameters.subarea">
              <q-checkbox
                color="primary"
                v-for="(r, index) in parameters.subarea"
                :key="index"
                :label="r"
                :val="r"
                v-model="subarea"
              />
            </div>
          </div>
        </q-btn-dropdown>

        <!-- level -->
        <q-btn-dropdown
          class="box__button-actions-item"
          label="Nível"
          text-color="white"
          no-caps
          :disable="disableFilters"
        >
          <div class="row no-wrap q-pa-md">
            <div class="column" v-if="parameters.level">
              <q-checkbox
                color="primary"
                v-for="(r, index) in parameters.level"
                :key="index"
                :label="r"
                :val="r"
                v-model="level"
              />
            </div>
          </div>
        </q-btn-dropdown>

        <!--  <div
          class="box__button-actions-item box__button-actions-download"
          @click="gerarPDF()"
        >
          <p>Baixar</p>
        </div> -->
      </div>

      <div class="box__filters">
        <div class="box__filters-title">Filtros selecionados</div>

        <div class="box__filters-wrap" v-if="selectedFilters.length > 0">
          <div
            class="box__filters-wrap-item"
            v-for="(i, index) in selectedFilters"
            :key="index"
          >
            {{ i }}
          </div>
        </div>
        <div v-else class="nofilter">Nenhum filtro selecionado</div>
      </div>

      <div class="box__three-columns">
        <div class="box__three-columns-item">
          <IconInfo label="e-NPS" />

          <RowChart
            :title="'Sua Empresa'"
            :minValue="-100"
            :maxValue="100"
            :data="removePercent(this.nps)"
            :intersectionValue="0"
            :lessThanFive="lessThanFive"
          />
          <RowChart
            :title="'Média Geral'"
            :minValue="-100"
            :maxValue="100"
            :data="removePercent(this.npsGeneral)"
            :intersectionValue="0"
          />
        </div>

        <div class="box__three-columns-item">
          <IconInfo label="Risco Trabalhista" />

          <RowChart
            :title="'Sua Empresa'"
            :data="removePercent(laborRisk)"
            :minValue="0"
            :maxValue="10"
            :intersectionValue="4"
            :invertedColors="true"
            :invertedIcons="true"
            :lessThanFive="lessThanFive"
          />
          <RowChart
            :title="'Média Geral'"
            :data="removePercent(laborRiskGeneral)"
            :minValue="0"
            :maxValue="10"
            :intersectionValue="4"
            :invertedColors="true"
            :invertedIcons="true"
          />
        </div>

        <div class="box__three-columns-item">
          <IconInfo label="Marca" />
          <RowChart
            :title="'Sua Empresa'"
            :data="removePercent(brandRisk)"
            :minValue="0"
            :maxValue="10"
            :intersectionValue="4"
            :invertedColors="true"
            :invertedIcons="true"
            :lessThanFive="lessThanFive"
          />
          <RowChart
            :title="'Média Geral'"
            :data="removePercent(brandRiskGeneral)"
            :minValue="0"
            :maxValue="10"
            :intersectionValue="4"
            :invertedColors="true"
            :invertedIcons="true"
          />
        </div>
      </div>

      <div class="box__two-columns">
        <div class="box__two-columns-item">
          <IconInfo label="Realocados" />

          <RowChartOneEmojiWithoutIntersection
            :title="'Sua Empresa'"
            :data="removePercent(realocateds)"
            :lessThanFive="lessThanFive"
          />
        </div>

        <div class="box__two-columns-item">
          <IconInfo label="Acolhidos" />

          <RowChartNoEmojiString
            :title="'Sua Empresa'"
            :data="welcomed"
            :lessThanFive="lessThanFive"
          />
        </div>
      </div>

      <div class="box__two-columns">
        <div class="box__two-columns-item">
          <IconInfo label="Cálculos da rescisão estão corretos?" />

          <RowChartOneEmojiExpanded
            :title="'Sua Empresa'"
            :data="removePercent(termination)"
            :lessThanFive="lessThanFive"
          />
          <RowChartOneEmojiExpanded
            :title="'Média Geral'"
            :data="removePercent(terminationGeneral)"
          />
        </div>

        <div class="box__two-columns-item">
          <IconInfo label="Pendências trabalhistas" />

          <RowChartOneEmojiExpanded
            :title="'Sua Empresa'"
            :data="removePercent(laborIssues)"
            :intersectionValue="3"
            :invertedColors="true"
            :lessThanFive="lessThanFive"
          />
          <RowChartOneEmojiExpanded
            :title="'Média Geral'"
            :data="removePercent(laborIssuesGeneral)"
            :intersectionValue="3"
            :invertedColors="true"
          />
        </div>
      </div>

      <div class="box__two-columns">
        <div class="box__two-columns-item" v-if="shutDown.length > 0">
          <IconInfo label="Avaliação pós demissão" />

          <div class="row">
            <h3 class="your-company">Sua empresa</h3>

            <p class="score-description">notas de 1 a 10</p>
          </div>

          <div v-for="(i, number) in shutDown" :key="number">
            <RowChartOneEmoji
              :minValue="1"
              :maxValue="10"
              :title="i.question"
              :data="removePercent(i.count)"
              :intersectionValue="7"
              :textBold="false"
            />
          </div>
        </div>

        <div class="box__two-columns-item">
          <IconInfo label="Avaliação pós demissão" />

          <div class="row">
            <h3 class="your-company">Geral</h3>

            <p class="score-description">notas de 1 a 10</p>
          </div>

          <div v-for="(i, number) in shutDownGeneral" :key="number">
            <RowChartOneEmoji
              :minValue="1"
              :maxValue="10"
              :title="i.question"
              :data="removePercent(i.count)"
              :intersectionValue="7"
              :textBold="false"
            />
          </div>
        </div>
      </div>

      <div class="card mapa" v-if="feelingMap.length > 0">
        <div class="card-top">
          <IconInfo label="Mapa de sentimentos" />

          <div class="tag">Sua empresa</div>
        </div>

        <apexchart
          type="polarArea"
          height="400px"
          style="width: 100%; height: 100%"
          :options="chartOptions"
          :series="feelingMap.map((c) => c.count)"
        />
      </div>

      <div class="card">
        <h2>Comparativo mapa de sentimentos</h2>

        <div class="row">
          <div class="card-col" v-if="feelingMap.length > 0">
            <div class="row">
              <h3 class="your-company">Sua empresa</h3>

              <p class="score-description">notas de 1 a 100</p>
            </div>

            <div v-for="(i, number) in feelingMap" :key="number">
              <RowChartOneEmoji
                :minValue="1"
                :maxValue="100"
                :title="i.feeling"
                :width="'100%'"
                :data="removePercent(i.count)"
                :icon="formatFeeling(i.feeling)"
                :textBold="false"
              />
            </div>
          </div>

          <div class="card-col">
            <div class="row">
              <h3 class="your-company">Geral</h3>

              <p class="score-description">notas de 1 a 100</p>
            </div>

            <div v-for="(i, number) in feelingMapGeneral" :key="number">
              <RowChartOneEmoji
                :minValue="1"
                :maxValue="100"
                :title="i.feeling"
                :width="'100%'"
                :data="removePercent(i.count)"
                :icon="formatFeeling(i.feeling)"
                :textBold="false"
              />
            </div>
          </div>
        </div>
      </div>
    </q-page>

    <TextDialogWidget ref="infoWidget" />
  </div>
</template>

<script>
import { filterCrud } from "../../../general/crud/utils/filterCrud";
import RowChart from "../company/RowChart.vue";
import RowChartNoEmojiString from "../company/RowChartNoEmojiString.vue";
import RowChartOneEmoji from "../company/RowChartOneEmoji.vue";
import RowChartOneEmojiExpanded from "../company/RowChartOneEmojiExpanded.vue";
import IconInfo from "src/components/general/IconInfo.vue";
import RowChartOneEmojiWithoutIntersection from "../company/RowChartOneEmojiWithoutIntersection.vue";
import TextDialogWidget from "src/components/general/TextDialogWidget.vue";

export default {
  components: {
    RowChart,
    TextDialogWidget,
    RowChartOneEmoji,
    IconInfo,
    RowChartNoEmojiString,
    RowChartOneEmojiExpanded,
    RowChartOneEmojiWithoutIntersection,
  },
  data() {
    return {
      nps: "",
      npsGeneral: "",
      brandRisk: "",
      brandRiskGeneral: "",
      laborRisk: "",
      laborRiskGeneral: "",
      realocateds: "",
      realocatedsGeneral: "",
      welcomed: "",
      welcomedGeneral: "",
      termination: "",
      terminationGeneral: "",
      laborIssues: "",
      laborIssuesGeneral: "",
      shutDown: [],
      shutDownGeneral: [],
      feelingMap: [],
      feelingMapGeneral: [],
      dashboardsLoaded: false,
      mobile: false,
      chartOptions: {},
      parameters: {},
      period: [],
      area: [],
      role: [],
      unity: [],
      subarea: [],
      level: [],
      userType: localStorage.getItem("userType"),
      lessThanFive: false,
    };
  },
  props: ["companyId"],
  computed: {
    disableFilters() {
      return (
        this.companyId === "TUDO" ||
        this.companyId === "B2B" ||
        this.companyId === "B2C"
      );
    },
    selectedFilters() {
      return [
        ...this.period,
        ...this.area,
        ...this.role,
        ...this.unity,
        ...this.subarea,
        ...this.level,
      ];
    },
  },
  watch: {
    companyId() {
      this.period = [];
      this.area = [];
      this.role = [];
      this.unity = [];
      this.subarea = [];
      this.level = [];

      this.loadNpsSurveyAnswers();
    },
    feelingMap() {
      this.setChartOptions();
    },
    area(f) {
      this.loadNpsSurveyAnswers();
    },
    role(f) {
      this.loadNpsSurveyAnswers();
    },
    period(f) {
      this.loadNpsSurveyAnswers();
    },
    unity(f) {
      this.loadNpsSurveyAnswers();
    },
    subarea(f) {
      this.loadNpsSurveyAnswers();
    },
    level(f) {
      this.loadNpsSurveyAnswers();
    },
  },

  methods: {
    gerarPDF() {
      const doc = new jsPDF({
        orientation: "landscape",
        format: "letter",
        compress: true,
      });

      doc.html(document.getElementById("q-app"), {
        x: 10,
        y: 10,
        autoPaging: true,
        html2canvas: {
          scale: 0.5,
        },
        windowWidth: document.getElementById("q-app").offsetWidth,
        windowHeight: document.getElementById("q-app").offsetHeight,
        callback: function (doc) {
          doc.save("arquivo.pdf");
        },
      });

      const element = document.getElementById("q-app"); // ou qualquer outro seletor para o elemento que você quer converter
      doc.html(element, {
        callback: function (doc) {
          doc.save("arquivo.pdf");
        },
      });
    },
    /* gerarPDF() {
      const element = document.getElementById("q-app");

      let options = {
        margin: 1,
        filename: "meu-documento.pdf",
        image: { type: "jpeg", quality: 0.98 },
        html2canvas: { scale: 1 },
        jsPDF: { unit: "in", format: "letter", orientation: "portrait" },
      };

      // Usar html2pdf() passando o elemento e as opções
      html2pdf().set(options).from(element).save();
    }, */
    formatFeeling(feeling) {
      /* remove diacritics */
      feeling = feeling.normalize("NFD").replace(/[\u0300-\u036f]/g, "");

      return feeling.toString().split(".")[0].toLowerCase().split("(")[0];
    },
    setChartOptions() {
      this.chartOptions = {
        chart: {
          type: "polarArea",
        },
        labels: this.feelingMap.map((c) => c.feeling.toString()),
        stroke: {
          colors: ["#fff"],
        },
        fill: {
          type: "gradient",
          gradient: {
            shade: "dark",
            type: "horizontal",
            shadeIntensity: 0.5,
            gradientToColors: ["#f54890", "#35a97d", "#1a27b7", "#f54890"],
            inverseColors: false,
            opacityFrom: 1,
            opacityTo: 1,
            stops: [0, 70, 100],
            colorStops: [],
          },
        },
        yaxis: {
          show: false,
        },
        legend: {
          position: "right",
        },
        responsive: [
          {
            breakpoint: 480,
            options: {
              legend: {
                position: "bottom",
              },
            },
          },
        ],
        tooltip: {
          y: {
            formatter: function (val) {
              return val + "%";
            },
          },
        },
      };

      setTimeout(() => {
        document.querySelectorAll(".apexcharts-legend-text").forEach((el) => {
          el.parentElement.classList.add(this.formatFeeling(el.innerHTML));

          //console.log(el.parentElement);
          /* get pattern and first childreh */

          /* el.parentElement.parentElement.firstChild.classList.add(
            this.formatFeeling(el.innerHTML)
          ); */
        });
      }, 500);
    },
    removePercent(value) {
      return value.toString().replace("%", "") * 1;
    },
    loadParameters: async function () {
      let filters = [];

      if (this.period.length > 0) {
        filters.push({
          name: "period",
          model: JSON.stringify(this.period),
        });
      }

      if (this.unity.length > 0) {
        filters.push({
          name: "unity",
          model: JSON.stringify(this.unity),
        });
      }

      if (this.area.length > 0) {
        filters.push({
          name: "area",
          model: JSON.stringify(this.area),
        });
      }

      if (this.subarea.length > 0) {
        filters.push({
          name: "subarea",
          model: JSON.stringify(this.subarea),
        });
      }

      if (this.level.length > 0) {
        filters.push({
          name: "level",
          model: JSON.stringify(this.level),
        });
      }

      const data = await filterCrud(
        filters,
        `companies/config/${this.companyId}`
      );

      this.parameters = data;

      for (let i = 0; i < this.role.length; i++) {
        if (!this.parameters.role.includes(this.role[i])) {
          this.role = this.role.filter((role) => role !== this.role[i]);
        }
      }
    },
    loadNpsSurveyAnswers: async function () {
      this.loadParameters();

      if (this.companyId === "null") {
        this.$q.notify({
          type: "error",
          message: "Nenhuma empresa selecionada para o usuário.",
        });

        return;
      }

      const filters = [
        {
          name: "companyId",
          model: this.companyId,
        },
      ];

      if (this.area.length > 0) {
        filters.push({
          name: "area",
          model: JSON.stringify(this.area),
        });
      }

      if (this.role.length > 0) {
        filters.push({
          name: "role",
          model: JSON.stringify(this.role),
        });
      }

      if (this.period.length > 0) {
        filters.push({
          name: "period",
          model: JSON.stringify(this.period),
        });
      }

      if (this.unity.length > 0) {
        filters.push({
          name: "unity",
          model: JSON.stringify(this.unity),
        });
      }

      if (this.subarea.length > 0) {
        filters.push({
          name: "subarea",
          model: JSON.stringify(this.subarea),
        });
      }

      if (this.level.length > 0) {
        filters.push({
          name: "level",
          model: JSON.stringify(this.level),
        });
      }

      this.$q.loading.show();

      const npsSurveyReport = await filterCrud(
        filters,
        "reports/NPSSurveyAnswers"
      );

      this.$q.loading.hide();

      this.nps = npsSurveyReport.nps;
      this.brandRisk = npsSurveyReport.brandRisk;
      this.laborRisk = npsSurveyReport.laborRisk;
      this.realocateds = npsSurveyReport.realocateds;
      this.welcomed = npsSurveyReport.welcomed;
      this.termination = npsSurveyReport.termination;
      this.laborIssues = npsSurveyReport.laborIssues;
      this.shutDown = npsSurveyReport.shutDown;
      this.feelingMap = npsSurveyReport.feelingMap;

      if (npsSurveyReport.lessThanFive) {
        this.nps = "Sem informações";
      }

      this.npsGeneral = npsSurveyReport.general.nps;
      this.brandRiskGeneral = npsSurveyReport.general.brandRisk;
      this.laborRiskGeneral = npsSurveyReport.general.laborRisk;
      this.realocatedsGeneral = npsSurveyReport.general.realocateds;
      this.welcomedGeneral = npsSurveyReport.general.welcomed;
      this.terminationGeneral = npsSurveyReport.general.termination;
      this.laborIssuesGeneral = npsSurveyReport.general.laborIssues;
      this.shutDownGeneral = npsSurveyReport.general.shutDown;
      this.feelingMapGeneral = npsSurveyReport.general.feelingMap;

      this.lessThanFive = npsSurveyReport.lessThanFive;

      function compareFeelings(a, b) {
        if (a.feeling < b.feeling) {
          return -1;
        }
        if (a.feeling > b.feeling) {
          return 1;
        }
        return 0;
      }

      this.feelingMap.sort(compareFeelings);
      this.feelingMapGeneral.sort(compareFeelings);

      this.dashboardsLoaded = true;

      this.$refs.infoWidget.close();
      if (npsSurveyReport.lessThanFive) this.$refs.infoWidget.open();
    },
  },
  async mounted() {
    this.mobile = window.mobileAndTabletCheck();

    if (this.userType !== "ADMIN") {
      this.loadParameters();
    }
    this.loadNpsSurveyAnswers();
  },
};
</script>

<style>
@import url("https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,100..900;1,100..900&display=swap");

.home-company {
  width: 100vw;
  height: 100%;
  overflow: auto;
}

.box__button-actions {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between; /* Ajuste conforme sua necessidade */
  gap: 20px; /* Ajuste conforme sua necessidade */
  margin: 20px 0px;
}

.box__button-actions-item {
  flex: 1 0 100px; /* Ajuste conforme sua necessidade */
  box-sizing: border-box;
  padding: 10px;
  background: rgba(21, 170, 124, 1);
  border-radius: 5px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.box__button-actions-item p {
  color: #fff;
  font-size: 1.2rem;
  text-align: center;
  margin: 0;
  font-family: "Montserrat", sans-serif;
  font-weight: 700;
}

.box__three-columns {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between; /* Ajuste conforme sua necessidade */
  gap: 20px; /* Ajuste conforme sua necessidade */
  margin: 20px 0px;
}

.box__three-columns-item {
  flex: 1 0 425px; /* Ajuste conforme sua necessidade */
  box-sizing: border-box;
  padding: 20px;
  background: white;
  border-radius: 5px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
  gap: 20px;
}

.box__filters {
  background: white;
  border-radius: 5px;
  padding: 20px;
  box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
}

.box__filters-title {
  font-family: "Montserrat", sans-serif;
  font-size: 14px;
  font-weight: 700;
  line-height: 29.26px;
  color: black;
  margin: 0;
  margin-bottom: 20px;
}

.box__filters-wrap {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
}

.box__filters-wrap-item {
  font-family: "Montserrat", sans-serif;
  font-size: 14px;
  font-weight: 400;
  line-height: 29.26px;
  border-radius: 5px;
}

.nofilter {
  font-size: 14px;
  font-weight: 400;
  line-height: 29.26px;
  text-align: center;
}

.box__filters-wrap-item::before {
  content: "";
  display: inline-block;
  width: 10px;
  height: 10px;
  -moz-border-radius: 7.5px;
  -webkit-border-radius: 7.5px;
  border-radius: 7.5px;
  background-color: rgba(21, 170, 124, 1);
}

.box__three-columns-item h2,
.box__two-columns-item h2,
.card h2 {
  color: rgba(26, 39, 183, 1);
  font-size: 32px;
  line-height: 39px;
  margin: 0;
  font-family: "Montserrat", sans-serif;
  font-weight: 700;
  margin-bottom: 20px;
}

.card h2 {
  text-align: center;
}

.box__two-columns {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between; /* Ajuste conforme sua necessidade */
  gap: 20px; /* Ajuste conforme sua necessidade */
  margin: 20px 0px;
}

.box__two-columns-item {
  flex: 1 0 400px; /* Ajuste conforme sua necessidade */
  box-sizing: border-box;
  padding: 20px;
  background: white;
  border-radius: 5px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
  gap: 20px;
}

.your-company,
.general {
  font-family: "Montserrat", sans-serif;
  font-size: 24px;
  font-weight: 700;
  line-height: 29.26px;
  position: relative;
  display: flex;
}

.your-company {
  color: rgba(182, 61, 158, 1);
}

.general {
  color: rgba(248, 95, 0, 1);
}

.score-description {
  content: "notas de 1 a 10";
  font-size: 12px;
  font-weight: 700;
  line-height: 14.63px;
  text-align: center;
  color: rgba(91, 91, 91, 1);
  margin: 0;
  display: flex;
  align-items: center;
  margin-left: 10px;
}

.card {
  flex: 1;
  box-sizing: border-box;
  padding: 20px;
  background: white;
  border-radius: 5px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
  margin: 20px 0px;
}

.card-col {
  flex: 1 0 50%;
  padding: 0 5%;

  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 15px;
  margin-bottom: 20px;
}

.card-top {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 20px;
  margin-bottom: 20px;
}

.card-top h2 {
  margin: 0;
}

.card-top .tag {
  font-family: "Montserrat", sans-serif;
  font-size: 18px;
  background: linear-gradient(180deg, #5c31ac 0%, #b73d9d 100%);
  border-radius: 10px;
  color: white;
  font-weight: 700;
  padding: 5px 20px;
}

@media (max-width: 768px) {
  .box__three-columns-item,
  .box__two-columns-item,
  .card {
    flex: 1 0 100%;
  }

  .card .row {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }
}

.box__button-actions-download {
  background: rgba(26, 39, 183, 1);
  cursor: pointer;
}

.tooltip-text {
  font-family: "Montserrat", sans-serif;
  font-size: 14px;
}
</style>
