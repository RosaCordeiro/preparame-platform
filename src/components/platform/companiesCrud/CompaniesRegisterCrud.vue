<template>
  <div class="company-crud">
    <CrudRegister :breadcrumbs="breadcrumbs" :title="title" :tables="tables">
      <template #belowTable>
        <q-card class="crud-register-form q-mt-md">
          <q-card-section>
            <div class="row q-pa-md">
              <p>Página Patrocínio</p>
            </div>

            <CrudRegisterForm
              ref="mainTable"
              :table="formPage"
              :hasCard="true"
            />

            <div class="row q-pa-md justify-end q-mr-md">
              <p>Inscritos: {{ subscribers }}</p>
            </div>

            <div class="row q-pa-md justify-end">
              <q-btn
                label="Salvar"
                @click="onSubmit"
                color="primary"
                class="q-ma-sm"
              />
            </div>
          </q-card-section>
        </q-card>
      </template>
    </CrudRegister>
  </div>
</template>

<script>
import CrudRegister from "./../../general/crud/CrudRegister.vue";
import { openEditCrud } from "./../../general/crud/utils/openEditCrud.js";
import { saveCrud } from "./../../general/crud/utils/saveCrud.js";
import { showError } from "./../../../global.js";
import CrudRegisterForm from "src/components/general/crud/CrudRegisterForm.vue";
import { adjustColumnsAndRowsRegisterWithReturn } from "src/components/general/crud/utils/adjustColumnsAndRowsRegister";
import { filterCrud } from "src/components/general/crud/utils/filterCrud";

export default {
  components: {
    CrudRegister,
    CrudRegisterForm,
  },
  data: () => {
    return {
      subscribers: null,
      /* registerType: "parentChild", */
      editUrl: "/companies",
      tables: {
        mainTable: {
          id: null,
          apiUrl: "/companies",
          registerColumns: {
            id: {
              label: "Id",
              name: "id",
              size: "12",
              row: 1,
              col: 1,
              model: "",
              type: "Input",
              visible: false,
            },
            name: {
              label: "Nome",
              name: "name",
              size: "12",
              row: 1,
              col: 1,
              model: "",
              type: "Input",
              visible: true,
            },
            segmentId: {
              label: "Segmento",
              name: "segmentId",
              size: "6",
              row: 2,
              col: 1,
              model: "",
              type: "DialogSelect",
              visible: true,
              options: {
                table: "segments",
                value: "id",
                label: "name",
                editFieldLabel: "segment",
                editFieldValue: "segmentId",
              },
            },
            subsegmentId: {
              label: "Subsegmento",
              name: "subsegmentId",
              size: "6",
              row: 2,
              col: 2,
              model: "",
              type: "DialogSelect",
              visible: true,
              options: {
                table: "subsegments",
                value: "id",
                label: "name",
                editFieldLabel: "subsegment",
                editFieldValue: "subsegmentId",
              },
            },
          },
        },
        secondTable: {
          id: null,
          apiUrl: "/companies/page",
          registerColumns: {
            id: {
              label: "Id",
              name: "id",
              size: "12",
              row: 1,
              col: 1,
              model: "",
              type: "Input",
              visible: false,
            },
            name: {
              label: "Nome",
              name: "name",
              size: "6",
              row: 1,
              col: 1,
              model: "",
              type: "Input",
              visible: true,
            },
            vacancies: {
              label: "Vagas",
              name: "vacancies",
              size: "6",
              row: 1,
              col: 1,
              model: "",
              type: "Input",
              visible: true,
            },
            expirationDate: {
              label: "Data de Expiração",
              name: "expirationDate",
              size: "12",
              row: 1,
              col: 1,
              model: "",
              type: "Date",
              visible: true,
            },
            logo: {
              label: "Logo",
              name: "logo",
              size: "12",
              row: 1,
              col: 1,
              model: "",
              type: "InputFile",
              visible: true,
            },
            logoInternal: {
              label: "Logo Interno",
              name: "logoInternal",
              size: "12",
              row: 1,
              col: 1,
              model: "",
              type: "InputFile",
              visible: true,
            },
            text: {
              label: "Texto",
              name: "text",
              size: "12",
              row: 1,
              col: 1,
              model: "",
              type: "TextArea",
              visible: true,
            },
            backgroundColor: {
              label: "Cor de Fundo",
              name: "backgroundColor",
              size: "3",
              row: 1,
              col: 1,
              model: "",
              type: "Color",
              visible: true,
            },
            containerColor: {
              label: "Cor do Container",
              name: "containerColor",
              size: "3",
              row: 1,
              col: 1,
              model: "",
              type: "Color",
              visible: true,
            },
            clockColor: {
              label: "Cor do Relógio",
              name: "clockColor",
              size: "3",
              row: 1,
              col: 1,
              model: "",
              type: "Color",
              visible: true,
            },
            textColor: {
              label: "Cor do Texto",
              name: "textColor",
              size: "3",
              row: 1,
              col: 1,
              model: "",
              type: "Color",
              visible: true,
            },
            active: {
              label: "Ativo",
              name: "active",
              size: "12",
              row: 1,
              col: 1,
              model: "",
              type: "Boolean",
              visible: true,
            },
            companyId: {
              label: "Id da Empresa",
              name: "companyId",
              size: "12",
              row: 1,
              col: 1,
              model: "",
              type: "Input",
              visible: false,
            },
          },
        },

        /* childTable: {
          content: "companySubscriptionPlan",
          apiUrl: "/companies/:id/subscriptionPlans",
          removeUrl: "companies/subscriptionPlans",
          registerColumns: {
            id: {
              label: "Id",
              name: "id",
              size: "12",
              col: 1,
              row: 1,
              model: "",
              type: "Input",
              visible: false,
            },
            ref: {
              label: "Ref",
              name: "ref",
              size: "12",
              col: 1,
              row: 1,
              model: "",
              type: "Input",
              visible: false,
            },
            subscriptionPlanId: {
              label: "Plano de Assinatura",
              name: "subscriptionPlanId",
              size: "4",
              col: 1,
              row: 1,
              model: "",
              type: "DialogSelect",
              visible: true,
              options: {
                table: "subscriptionPlans",
                value: "id",
                label: "name",
                editFieldLabel: "subscriptionPlan",
                editFieldValue: "subscriptionPlanId",
              },
            },
            startDate: {
              label: "Data de Início",
              name: "startDate",
              size: "2",
              col: 2,
              row: 1,
              model: "",
              type: "Date",
              visible: true,
            },
            endDate: {
              label: "Data de Fim",
              name: "endDate",
              size: "2",
              col: 3,
              row: 1,
              model: "",
              type: "Date",
              visible: true,
            },
            subscribeToken: {
              label: "Token",
              name: "subscribeToken",
              size: "4",
              col: 4,
              row: 1,
              model: "",
              type: "Input",
              visible: true,
            },
          },
          tableColumns: [
            {
              name: "id",
              label: "Id",
              align: "left",
              field: "id",
              sortable: false,
              visible: false,
            },
            {
              name: "subscriptionPlanName",
              label: "Plano de Assinatura",
              align: "left",
              field: "subscriptionPlan.name",
              sortable: false,
              visible: true,
            },
            {
              name: "subscriptionPlanId",
              label: "Plano de Assinatura Id",
              align: "left",
              field: "subscriptionPlanId",
              type: "DialogSelect",
              labelColumn: "subscriptionPlanName",
              sortable: false,
              visible: false,
            },
            {
              name: "startDate",
              label: "Data de Início",
              align: "left",
              field: "startDate",
              sortable: false,
              visible: true,
              type: "date",
            },
            {
              name: "endDate",
              label: "Data de Fim",
              align: "left",
              field: "endDate",
              sortable: false,
              visible: true,
              type: "date",
            },
            {
              name: "subscribeToken",
              label: "Token",
              align: "left",
              field: "subscribeToken",
              sortable: false,
              visible: true,
            },
          ],
          tableData: [],
        }, */
      },
      breadcrumbs: [
        {
          title: "Empresas",
          to: "/companies",
        },
        {
          title: "Cadastro de Empresas",
          to: "",
        },
      ],
      title: "Cadastro de Empresas",
      formPage: {},
    };
  },
  created() {
    this.id = this.$router.history.current.params.id;

    openEditCrud(this.id, this.editUrl, this.tables);
    this.formPage = adjustColumnsAndRowsRegisterWithReturn(
      this.tables["secondTable"],
      this.formPage
    );

    this.initPageCompany();
  },
  methods: {
    initPageCompany: async function () {
      if (!this.id) return;

      filterCrud([], `companies/pageById/${this.id}`)
        .then((res) => {
          for (const key in res) {
            const index = this.formPage.registerColumns[0].cols.findIndex(
              (col) => col.name === key
            );

            if (index !== -1) {
              this.formPage.registerColumns[0].cols[index].model = res[key];
            }
          }

          this.subscribers = res.vacancies - res.remainingVacancies;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    onSubmit: async function () {
      this.$q.loading.show();

      const data = this.$refs.mainTable.table.registerColumns[0].cols.map(
        (col) => {
          if (col.name === "companyId") {
            if (this.$router.history.current.params.id === undefined || this.$router.history.current.params.id === null) {
              this.$q.notify({
                color: "red-6",
                textColor: "white",
                icon: "cloud_done",
                message: "Cadastre a empresa antes de salvar a página!",
              });
              this.$q.loading.hide();
              return
            }
          }
          return {
            key: col.name,
            value: col.name === "companyId" ? this.id : col.model,
          };
        }
      );

      const formData = new FormData();
      data.forEach((value) => {
        if (value.key === "expirationDate") {
          value.value = value.value.split("/").reverse().join("-");
        }

        formData.append(value.key, value.value);
      });
      
      const response = await saveCrud("companies/page", formData);
      if (response.status === 201) {
        this.$q.notify({
          color: "green-4",
          textColor: "white",
          icon: "cloud_done",
          message: "Página salva com sucesso!",
        });

        await this.initPageCompany();
      } else {
        this.$q.notify({
          color: "red-4",
          textColor: "white",
          icon: "cloud_done",
          message: "Erro ao salvar página!",
        });
      }

      this.$q.loading.hide();
    },
    save: async function (data) {
      try {
        const companyCreated = await saveCrud(
          this.tables.mainTable.apiUrl,
          data.mainTable
        );

        return companyCreated;
      } catch (err) {
        console.log(err);

        showError(err);

        return false;
      }
    },
  },
};
</script>

<style></style>
