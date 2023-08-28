<template>
  <div class="q-pa-lg">
    <div class="q-pa-lg container justify-center">
        <p>
          Escolha o serviço do seu pacote que gostaria de trocar.
        </p>
        <div class="container-row">
          <div class="container-column">
            <p>
              De:
            </p>
            <q-select v-model="mentoring" :options="optionsMentoring "
              input-debounce="0"
              option-label="name"
              emit-value
              map-options
              borderless
              class="select text-primary col-3"
              label-color="white"
              style="color:white"/>
          </div>

          <q-btn flat rounded color="grey" icon="double_arrow" @click="confirmation()" class="container-button">
            <q-tooltip>
              Clique aqui para trocar
           </q-tooltip>
          </q-btn>

          <div class="container-column">
            <p>
              Para:
            </p>
            <q-select v-model="newMentoring" :options="optionsNewMentoring "
              input-debounce="0"
              option-label="name"
              emit-value
              map-options
              borderless
              class="select"/>
          </div>
        </div>
      </div>

    <q-dialog v-model="exchange">
      <q-card style="min-width: 350px">
        <q-card-section>
          Podemos confirmar a troca de Mentoria?
        </q-card-section>

        <q-card-actions align="right" class="text-primary">
          <q-btn label="Cancelar" color="negative" v-close-popup />
          <q-btn
            label="Confirmar"
            color="primary"
            @click="onSubmit()"
            v-close-popup
          />
        </q-card-actions>
      </q-card>
    </q-dialog>

    <q-dialog v-model="sucess">
      <q-card style="min-width: 350px">
        <q-card-section class="row q-mt-sm crud-title">
          Troca Efetuada!
        </q-card-section>

        <q-card-actions align="right" class="text-primary">
          <q-btn flat label="Agendar" color="primary" @click="goUrl(`login`)" v-close-popup />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </div>
</template>

<script>
import { saveCrud } from 'src/components/general/crud/utils/saveCrud';
import { filterCrud } from '../../general/crud/utils/filterCrud';

export default {
  data() {
    return {
      mentoring: "",
      newMentoring: "",
      optionsMentoring: "",
      optionsNewMentoring: "",
      exchange: false,
      sucess: false,
    };
  },
  watch: {
    mentoring: function() {
      this.newMentoring = "";
      this.filter();
    }
  },
  methods: {
    goUrl: function (url) {
      this.$router.push({ path: `/${url}` });
      this.$emit("");
    },
    async confirmation() {
      if (this.mentoring === "") {
        this.$q.notify({
          color: "negative",
          message: "Seleciona a mentoria que deseja trocar",
        });
        return
      }
      if (this.newMentoring === "") {
        this.$q.notify({
          color: "negative",
          message: "Seleciona uma mentoria para fazer a troca",
        });
        return
      }
      this.exchange = true;
    },
    async onSubmit(){
      const data = {
        id: this.mentoring.id,
        productId: this.newMentoring.id
      }
      const response = await saveCrud(`users/products`,data, "PATCH");
      if (response.status === 201) {
        this.sucess = true;
        return
      }
      this.$q.notify({
          color: "negative",
          message: "Erro na troca de mentoria, tente novamente mais tarde",
        });
    },
    async filter(){
      const response = await filterCrud([], `products/price/${this.mentoring.productId}`);
      this.optionsNewMentoring = response;
    }
  },
  async created(){
    const response = await filterCrud([], `products/listProductByUser?userId=${localStorage.getItem(`userId`)}&onlyAvailables=true`);
    console.log(response);
    this.optionsMentoring = response;
  },
};
</script>

<style scoped>
.crud-title {
  font-family: "Manrope", sans-serif;
  font-weight: 700;
}

.container {
  border-radius: 15px;
  display: flex;
  background-color: white;
  justify-content: center;
  box-shadow: 5px 5px 15px -5px #667998;
  flex-direction: column;
}

.container-row {
  display: flex;
  justify-content: space-between;
  gap: 10px;
  align-items: flex-end;
}

.container-column {
  flex: 1;
}

.container-button {
  height: 56px;
}

.select {
  background: linear-gradient(90deg, #1a27b7 0%, #ff4690 100%);
  border: 1px solid #e8e8eb;
  border-radius: 4px;
  flex: 1;
  font-weight: 700;
  font-size: 1.25rem;
  font-family: "Nunito";
  font-style: normal;
  display: flex;
  align-items: center;
  color: white !important;
}

@media screen and (max-width: 800px){
  .container-row {
    flex-direction: column;
    align-items: center;
  }
  .container-column {
    flex-direction: column;
    width: 100%;
  }
}
</style>
