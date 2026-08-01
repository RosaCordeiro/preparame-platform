<template>
  <q-page padding>
    <div class="q-mb-md">
      <div class="text-h5">Backup do banco (Postgres)</div>
      <p class="text-body2 text-grey-8">
        Gere e baixe dumps de segurança. Disponível apenas para ADMIN. Em
        produção exige
        <code>ENABLE_DB_BACKUP_API=true</code> no servidor da API.
      </p>
    </div>

    <div class="row q-gutter-md q-mb-lg items-end">
      <q-input
        v-model="backupToken"
        outlined
        dense
        class="col-12 col-md-4"
        label="Token de backup (opcional)"
        hint="Só se DB_BACKUP_API_TOKEN estiver setado na API"
        type="password"
        clearable
      />
      <q-btn
        color="primary"
        icon="mdi-database-export"
        label="Gerar backup agora"
        :loading="creating"
        no-caps
        @click="createBackup"
      />
      <q-btn
        flat
        color="primary"
        icon="refresh"
        label="Atualizar lista"
        :loading="loading"
        no-caps
        @click="loadList"
      />
    </div>

    <q-banner v-if="errorMessage" class="bg-red-1 text-negative q-mb-md" rounded>
      {{ errorMessage }}
    </q-banner>

    <q-table
      flat
      bordered
      title="Backups no servidor"
      :data="items"
      :columns="columns"
      row-key="fileName"
      :loading="loading"
      no-data-label="Nenhum backup encontrado"
    >
      <template v-slot:body-cell-sizeBytes="props">
        <q-td :props="props">{{ formatBytes(props.row.sizeBytes) }}</q-td>
      </template>
      <template v-slot:body-cell-createdAt="props">
        <q-td :props="props">{{ formatDate(props.row.createdAt) }}</q-td>
      </template>
      <template v-slot:body-cell-actions="props">
        <q-td :props="props">
          <q-btn
            dense
            flat
            color="primary"
            icon="download"
            label="Baixar"
            no-caps
            :loading="downloading === props.row.fileName"
            @click="downloadBackup(props.row.fileName)"
          />
        </q-td>
      </template>
    </q-table>
  </q-page>
</template>

<script>
import axios from "axios";
import { baseApiUrl, showError, showSuccess } from "src/global";

export default {
  name: "AdminDbBackup",
  data() {
    return {
      loading: false,
      creating: false,
      downloading: null,
      errorMessage: "",
      backupToken: sessionStorage.getItem("db_backup_token") || "",
      items: [],
      columns: [
        {
          name: "fileName",
          label: "Arquivo",
          field: "fileName",
          align: "left",
          sortable: true,
        },
        {
          name: "sizeBytes",
          label: "Tamanho",
          field: "sizeBytes",
          align: "right",
        },
        {
          name: "createdAt",
          label: "Criado em",
          field: "createdAt",
          align: "left",
          sortable: true,
        },
        {
          name: "actions",
          label: "Ações",
          field: "actions",
          align: "center",
        },
      ],
    };
  },
  created() {
    this.loadList();
  },
  methods: {
    authHeaders() {
      const headers = {
        authorization: `Bearer ${localStorage.getItem("token")}`,
      };
      if (this.backupToken) {
        headers["X-Backup-Token"] = this.backupToken;
        sessionStorage.setItem("db_backup_token", this.backupToken);
      } else {
        sessionStorage.removeItem("db_backup_token");
      }
      return headers;
    },
    formatBytes(bytes) {
      if (!bytes && bytes !== 0) return "-";
      const mb = bytes / (1024 * 1024);
      if (mb >= 1) return `${mb.toFixed(1)} MB`;
      return `${Math.round(bytes / 1024)} KB`;
    },
    formatDate(iso) {
      if (!iso) return "-";
      try {
        return new Date(iso).toLocaleString("pt-BR");
      } catch (e) {
        return iso;
      }
    },
    async loadList() {
      this.loading = true;
      this.errorMessage = "";
      try {
        const { data } = await axios.get(`${baseApiUrl}/admin/backups`, {
          headers: this.authHeaders(),
        });
        this.items = data.items || [];
      } catch (error) {
        this.items = [];
        this.errorMessage =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          "Não foi possível listar backups.";
        showError(error);
      } finally {
        this.loading = false;
      }
    },
    async createBackup() {
      this.creating = true;
      this.errorMessage = "";
      try {
        await axios.post(
          `${baseApiUrl}/admin/backups`,
          {},
          { headers: this.authHeaders(), timeout: 10 * 60 * 1000 }
        );
        showSuccess("Backup gerado com sucesso.");
        await this.loadList();
      } catch (error) {
        showError(error);
      } finally {
        this.creating = false;
      }
    },
    async downloadBackup(fileName) {
      this.downloading = fileName;
      try {
        const { data } = await axios.get(
          `${baseApiUrl}/admin/backups/${encodeURIComponent(fileName)}`,
          {
            headers: this.authHeaders(),
            responseType: "blob",
            timeout: 10 * 60 * 1000,
          }
        );
        const url = window.URL.createObjectURL(new Blob([data]));
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", fileName);
        document.body.appendChild(link);
        link.click();
        link.remove();
        window.URL.revokeObjectURL(url);
      } catch (error) {
        showError(error);
      } finally {
        this.downloading = null;
      }
    },
  },
};
</script>
