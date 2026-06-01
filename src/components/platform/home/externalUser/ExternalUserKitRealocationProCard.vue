<template>
  <div class="row external-user-kit-realocation-pro-card justify-around">
    <q-card
      class="row col-12 external-user-kit-realocation-pro-card-container q-pa-sm"
    >
      <q-card-section
        class="col-12 row external-user-kit-realocation-pro-card-header"
      >
        <div
          class="row external-user-kit-realocation-pro-card-info space-around col-12"
        >
          <div class="external-user-kit-realocation-pro-card-title col-12">
            KIT DE RECOLOCAÇÃO PRÓ
          </div>
          <div
            :class="{
              row: !mobile,
              column: mobile,
              'external-user-kit-realocation-pro-card-products-container': true,
              'col-12': true,
              'justify-around': true,
              'q-mt-md': true,
            }"
          >
            <div
              class="external-user-kit-realocation-pro-card-product col-5 justify-around q-mb-lg"
            >
              <img
                class="external-user-kit-realocation-pro-card-img"
                src="./../../../../assets/imgs/homeSimulador.png"
              />
              <p class="external-user-kit-realocation-pro-card-text">
                <b>Simulador de Entrevistas disponível a toda hora</b>
              </p>
              <div
                class="row external-user-kit-realocation-pro-card-btn-container justify-around"
              >
                <q-btn
                  class="external-user-kit-realocation-pro-card-btn-know-more"
                  outline
                  rounded
                  color="secondary"
                  label="ILIMITADO"
                />
              </div>
            </div>
            <div
              class="external-user-kit-realocation-pro-card-product col-5 justify-around q-mb-lg"
            >
              <img
                class="external-user-kit-realocation-pro-card-img"
                src="./../../../../assets/imgs/homeApoioRespostas.png"
              />
              <p class="external-user-kit-realocation-pro-card-text">
                <b
                  >Apoio de resposta em cada pergunta, para você treinar e dar
                  respostas mais assertivas.</b
                >
              </p>
              <div
                class="row external-user-kit-realocation-pro-card-btn-container justify-around"
              >
                <q-btn
                  class="external-user-kit-realocation-pro-card-btn-know-more"
                  outline
                  rounded
                  color="secondary"
                  label="APOIO DE RESPOSTAS"
                />
              </div>
            </div>
          </div>
          <div
            :class="{
              row: true,
              'external-user-kit-realocation-pro-card-footer': true,
              'col-12': true,
              'q-mt-md': !mobile,
              'q-mt-lg': mobile,
              'q-px-xl': !mobile,
            }"
          >
            <div
              :class="{
                'external-user-kit-realocation-pro-card-footer-info': true,
                'col-7': !mobile,
                'col-12': mobile,
                row: mobile,
              }"
            >
              <p>
                Um pagamento único de R$29,90 dará
                <b>acesso ilimitado por 3 meses</b> a essas vantagens!
              </p>
            </div>
            <q-space></q-space>
            <div
              :class="{
                'external-user-kit-realocation-pro-card-footer-info': true,
                'col-4': !mobile,
                'col-12': mobile,
                row: true,
                'justify-around': true,
              }"
            >
              <q-btn
                color="secondary"
                label="COMPRAR MEU KIT PRÓ"
                @click="requestPagarMe()"
              />
            </div>
          </div>
        </div>
      </q-card-section>
    </q-card>
  </div>
</template>

<script>
import axios from "axios";
import { baseApiUrl, showError } from "../../../../global";

export default {
  data() {
    return {
      mobile: false,
      paymentOrderCreated: null,
    };
  },
  mounted() {
    this.mobile = window.mobileAndTabletCheck();
  },
  methods: {
    goURL: function (url) {
      window.open(url, "_blank").focus();
    },
    getOrderStatus: async function () {
      const config = {
        method: "GET",
        headers: { authorization: `Bearer ${localStorage.getItem("token")}` },
        url: `${baseApiUrl}/orders/pagarme?paymentLinkId=${this.paymentOrderCreated.data.pagarMeOrderId}`,
      };

      await axios(config)
        .then((orders) => {
          if (orders.data.length > 0 && orders.data[0].status === "created") {
            clearInterval(this.idInterval);
          }

          return orders;
        })
        .then((orders) => {
          if (orders.data && orders.data.length == 0) {
            throw new Error("Not completed yet");
          }

          return axios
            .get(`${baseApiUrl}/users/${localStorage.getItem("userId")}`)
            .then((user) => {
              return user;
            });
        })
        .then((user) => {
          user = user.data[0];

          let date = new Date(user.expiresDate);

          date.setDate(date.getDate() + 90);

          user.expiresDate = date.format("yyyy-mm-dd");

          return axios.post(`${baseApiUrl}/users`, user).then((user) => {
            this.$q.notify({
              type: "success",
              message: "Sucesso",
            });

            return user;
          });
        });
    },
    requestPagarMe: async function () {
      "";
      const data = {
        items: [
          {
            id: "9e6d5252-35ff-4f14-891f-6b1ab16dde5b", //homologação
            // id: "5fca32d9-2abd-42a1-9043-2920ef156530", //Produção
            title: "Kit Realocação Pró",
            unit_price: "2990",
            tangible: false,
            quantity: 1,
          },
        ],
        amount: "2990",
      };

      const token = localStorage.getItem("token");

      if (token) {
        let config = {
          method: "POST",
          headers: { authorization: `Bearer ${localStorage.getItem("token")}` },
          data: data,
          url: `${baseApiUrl}${"/orders/pagarme"}`,
        };

        this.paymentOrderCreated = await axios(config)
          .then((created) => {
            return created;
          })
          .catch((err) => {
            return showError(err);
          });

        this.paymentOrderCreated.data.userId = localStorage.getItem("userId");
        this.paymentOrderCreated.data.pagarMeOrderId =
          this.paymentOrderCreated.data.id;
        this.paymentOrderCreated.data.status = "CREATED";
        this.paymentOrderCreated.data.dateCreated = new Date();
        this.paymentOrderCreated.data.expiresAt = new Date(
          this.paymentOrderCreated.data.expires_at
        );

        delete this.paymentOrderCreated.data.id;

        config = {
          method: "POST",
          headers: { authorization: `Bearer ${localStorage.getItem("token")}` },
          data: this.paymentOrderCreated.data,
          url: `${baseApiUrl}${"/orders"}`,
        };

        await axios(config)
          .then((created) => {
            this.paymentOrderCreated.data.orderId = created.data.id;

            return created;
          })
          .catch((err) => {
            return showError(err);
          });

        const newOrderItem = {
          orderId: this.paymentOrderCreated.data.orderId,
          productId: "9e6d5252-35ff-4f14-891f-6b1ab16dde5b", //homologação
          // productId: "5fca32d9-2abd-42a1-9043-2920ef156530", //Produção
          amount: "2990",
          quantity: "1",
        };

        config = {
          method: "POST",
          headers: {
            authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          data: newOrderItem,
          url: `${baseApiUrl}${"/orders/item"}`,
        };

        await axios(config).catch((err) => showError(err));

        this.$router.push({ path: `/${"orders"}` });
      } else {
        showError("Não foi possível identificar o usuário registrado.");
      }
    },
  },
};
</script>

<style>
.external-user-kit-realocation-pro-card-container {
  border-radius: 15px;
}

.external-user-kit-realocation-pro-card-title {
  font-weight: 700;
  font-size: 1.5rem;
  font-family: "Nunito";
  font-style: normal;
  background: linear-gradient(90deg, #1a27b7 0%, #ff4690 40%);
  opacity: 1;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.external-user-kit-realocation-pro-card-product {
  display: flex;
  flex-direction: column;
}

.external-user-kit-realocation-pro-card-img {
  height: 100px;
  margin: 0 auto;
}

.external-user-kit-realocation-pro-card-text {
  text-align: center;
}

.external-user-kit-realocation-pro-card-btn-container {
  width: 100%;
  position: relative;
}

.external-user-kit-realocation-pro-card-btn-know-more {
  height: 40px;
  margin: 10px auto;
}

.external-user-kit-realocation-pro-card-footer-info > p {
  text-align: justify;
}
</style>
