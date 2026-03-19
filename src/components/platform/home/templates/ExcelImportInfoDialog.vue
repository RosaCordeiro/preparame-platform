<template>
  <q-dialog v-model="showDialog" persistent>
    <q-card style="min-width: 600px; max-width: 800px;">
      <q-card-section class="row items-center q-pb-none">
        <div class="text-h6">Informações sobre Importação de Excel</div>
        <q-space />
        <q-btn icon="close" flat round dense v-close-popup />
      </q-card-section>

      <q-card-section>
        <div class="text-subtitle2 q-mb-md">Colunas do Excel:</div>
        
        <q-table
          :rows="columns"
          :columns="tableColumns"
          row-key="column"
          flat
          bordered
          dense
          hide-pagination
          :rows-per-page-options="[0]"
        />

        <div class="text-subtitle2 q-mt-lg q-mb-md">Regras Importantes:</div>
        <ul class="q-pl-md">
          <li>CPF deve ser enviado sem pontos e traços (ex: 71528224094)</li>
          <li>Ao menos CPF ou Email deve estar preenchido por linha</li>
          <li>Valores numéricos (NPS, riscos) devem estar entre 0 e 10</li>
          <li>Campos JSON devem ser JSON válido ou deixados em branco</li>
          <li>Tipo de Demissão aceita apenas: voluntary ou involuntary</li>
          <li>Alerta aceita apenas: ALERT ou NORMAL</li>
          <li>Realocado aceita apenas: REALOCATED ou NOT_REALOCATED</li>
          <li>A dashboard atualiza automaticamente após a importação</li>
        </ul>
      </q-card-section>

      <q-card-actions align="right">
        <q-btn flat label="Fechar" color="primary" v-close-popup />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script>
export default {
  name: 'ExcelImportInfoDialog',
  data() {
    return {
      showDialog: false,
      tableColumns: [
        {
          name: 'column',
          label: 'Coluna',
          align: 'left',
          field: 'column',
          sortable: false
        },
        {
          name: 'name',
          label: 'Nome',
          align: 'left',
          field: 'name',
          sortable: false
        },
        {
          name: 'required',
          label: 'Obrigatório',
          align: 'center',
          field: 'required',
          sortable: false
        }
      ],
      columns: [
        { column: 1, name: 'CPF', required: 'Um dos dois' },
        { column: 2, name: 'Email', required: 'Um dos dois' },
        { column: 3, name: 'NPS (0-10)', required: 'Não' },
        { column: 4, name: 'Risco Trabalhista (0-10)', required: 'Não' },
        { column: 5, name: 'Risco de Marca (0-10)', required: 'Não' },
        { column: 6, name: 'Survey Respondido (Sim/Não)', required: 'Não' },
        { column: 7, name: 'Alerta Risco Trabalhista (ALERT/NORMAL)', required: 'Não' },
        { column: 8, name: 'Realocado (REALOCATED/NOT_REALOCATED)', required: 'Não' },
        { column: 9, name: 'Labor Risk JSON', required: 'Não' },
        { column: 10, name: 'Feelings Map JSON', required: 'Não' },
        { column: 11, name: 'Brand Risk JSON', required: 'Não' },
        { column: 12, name: 'Survey Question JSON', required: 'Não' },
        { column: 13, name: 'Departamento', required: 'Não' },
        { column: 14, name: 'Cargo', required: 'Não' },
        { column: 15, name: 'Unidade', required: 'Não' },
        { column: 16, name: 'Tipo de Demissão (voluntary/involuntary)', required: 'Não' },
        { column: 17, name: 'Gênero', required: 'Não' },
        { column: 18, name: 'Etnia', required: 'Não' },
        { column: 19, name: 'PCD (Sim/Não)', required: 'Não' },
        { column: 20, name: 'Cidade', required: 'Não' },
        { column: 21, name: 'Estado', required: 'Não' }
      ]
    }
  },
  methods: {
    show() {
      this.showDialog = true;
    },
    hide() {
      this.showDialog = false;
    }
  }
}
</script>

<style scoped>
.q-table th {
  font-weight: 600;
}
</style>