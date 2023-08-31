<template>
  <section>
    <div
      class="loading"
      :class="{
        active: loading,
      }"
    >
      <q-spinner-gears color="white" size="100px" />
    </div>
    <div
      class="homePageCompany"
      :style="{
        backgroundColor: backgroundColor,
      }"
      :class="{
        active: !loading,
      }"
    >
      <div class="header wrapper">
        <div class="row__home-company">
          <div class="row__home-company">
            <p
              class="header__text"
              :style="{
                color: textColor,
              }"
            >
              Patrocínio
            </p>
            <img :src="logoUrl" alt="" />
          </div>
          <div class="row__home-company">
            <p
              class="header__text"
              :style="{
                color: textColor,
              }"
            >
              Realização
            </p>
            <img id="minha-imagem" src="~assets/imgs/10.png" alt="" />
            <canvas id="canvas" style="display: none"></canvas>
          </div>
        </div>
      </div>

      <div class="wrapper">
        <div class="content__main">
          <aside class="left">
            <div
              class="container__message"
              :style="{
                backgroundColor: containerColor,
              }"
            >
              <p
                :style="{
                  color: textColor,
                }"
              >
                Recado da {{ companyName }} pra você:
              </p>
            </div>

            <div class="container__text">
              <p
                :style="{
                  color: textColor,
                }"
                v-for="(t, index) in text.split('\n')"
                :key="index"
              >
                {{ t }}
              </p>
            </div>

            <ul
              class="list"
              :style="{
                color: textColor,
              }"
            >
              <li>Mentoria Coletiva</li>
              <li>Modelo de Currículo</li>
              <li>Capas de Linkedln</li>
              <li>e-Books e mais</li>
            </ul>
          </aside>

          <aside class="right">
            <LoadingWidget v-if="loading" />
            <FormWidget v-if="remainingVacancies > 0 && !loading" />
            <TimerWidget v-else-if="!loading" class="timer__card" />
          </aside>
        </div>
      </div>

      <div class="footer">
        <p
          :style="{
            color: textColor,
          }"
        >
          {{ companyName }} + Prepara.me em:
          <span
            :style="{
              color: backgroundColor,
            }"
            >orientação de carreira é pra todo mundo!</span
          >
        </p>
      </div>
    </div>
  </section>
</template>

<script>
import TimerWidget from "src/components/site/homePageCompany/timer/TimerWidget.vue";
import FormWidget from "src/components/site/homePageCompany/form/FormWidget.vue";
import { filterCrud } from "src/components/general/crud/utils/filterCrud";
import LoadingWidget from "src/components/site/homePageCompany/loading/LoadingWidget.vue";

export default {
  components: {
    TimerWidget,
    FormWidget,
    LoadingWidget,
  },
  data() {
    return {
      loading: false,
      vacancies: 0,
      remainingVacancies: 0,
      companyName: "",
      text: "",
      backgroundColor: "#1a27b7",
      containerColor: "#35aa7c",
      textColor: "#FFF",
      clockColor: "#f54690",
      logoUrl: "",
    };
  },
  methods: {
    isCorClara(cor) {
      cor = cor.toLowerCase();
      if (cor.startsWith("rgb")) {
        const partes = cor.match(/(\d+)/g);

        if (partes) {
          const r = parseInt(partes[0]);
          const g = parseInt(partes[1]);
          const b = parseInt(partes[2]);

          const luminosidade = 0.299 * r + 0.587 * g + 0.114 * b;
          const limiteLuminosidade = 128; // Você pode ajustar esse valor conforme necessário
          if (luminosidade === 0) {
            return true;
          }

          return luminosidade >= limiteLuminosidade;
        }
      }
      return false; // Se não for possível determinar a luminosidade, assuma que a cor não é clara
    },
    async init() {
      this.loading = true;

      const res = await filterCrud(
        [],
        "companies/page/" + this.$route.params.companyName
      );

      if (!res) {
        this.loading = false;

        this.$router.push("/404");

        return;
      }

      if (res.expired || !res.active) {
        this.loading = false;

        this.$router.push("/404");

        return;
      }

      this.companyName = res.company.name;
      this.vacancies = res.vacancies;
      this.remainingVacancies = res.remainingVacancies;
      this.text =
        res.text ??
        `Nós sabemos que procurar por trabalho é uma tarefa muito cansativa.

            Por isto, todo mês oferecemos
            <b>${vacancies} bolsas de mentorias coletivas no Prepara.me</b>
            para quem busca por trabalho nas nossas páginas de Carreira.
            Então, aproveite!`;
      this.backgroundColor = res.backgroundColor;
      this.containerColor = res.containerColor;
      this.textColor = res.textColor;
      this.clockColor = res.clockColor;
      this.logoUrl = res.logoUrl;

      var imagem = document.getElementById("minha-imagem");

      await new Promise((resolve) => setTimeout(resolve, 100));

      const corDeFundo =
        document.querySelector(".homePageCompany").style.backgroundColor;

      if (this.isCorClara(corDeFundo)) {
        imagem.style.filter = "invert(1)";
        document.querySelectorAll("li").forEach((li) => {
          li.classList.add("invert");
        });
      }

      await new Promise((resolve) => setTimeout(resolve, 500));

      this.loading = false;
    },
  },
  beforeMount() {
    this.init();
  },
};
</script>

<style>
@keyframes slide {
  to {
    transform: translateX(0px);
  }
}

.input__text input::placeholder {
  color: white !important;
  opacity: 1 !important; /* Firefox */
  font-weight: 700;
  font-size: 1rem;
}

::-webkit-scrollbar {
  width: 10px;
}

::-webkit-scrollbar-thumb {
  background: #aaa;
  border-radius: 10px;
}

::-webkit-scrollbar-thumb:hover {
  background: #888;
}

.wrapper {
  width: 90%;
  max-width: 1200px;
  margin: 0 auto;
}

.form {
  width: 80%;
  display: flex;
  flex-direction: column;
}

.homePageCompany {
  min-height: 100vh;
  width: 100%;
  background-image: url("~src/assets/imgs/7.png");
  background-repeat: no-repeat;
  background-size: contain;
  background-position: right;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  opacity: 0;
  transition: all 0.5s ease-in-out;
  visibility: hidden;
}

.homePageCompany.active {
  opacity: 1;
  visibility: visible;
}

.header__text {
  font-size: 1rem;
  color: #fff;
  margin: 0;
  font-weight: 700;
}

.header {
  display: flex;
  align-items: center;
}

.header img {
  max-height: 100px;
  object-fit: contain;
}

.content__main {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 100%;
  margin: 50px 0;
}

.left,
.right {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.right {
  align-items: end;
}

@media (max-width: 800px) {
  .content__main {
    flex-direction: column;
    gap: 25px;
  }

  .homePageCompany {
    background-position: 0 calc(100% - 110px);
  }

  .right {
    align-items: center;
  }
}

.container__message {
  background-color: #35aa7c;
  border-radius: 25px;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 25px;
  width: fit-content;
}

.container__message p {
  margin: 0;
  font-size: 2rem;
  color: #fff;
  font-weight: 700;
}

.container__text p {
  font-size: 1.5rem;
  color: #fff;
  margin: 0;
  font-weight: 700;
  margin: 1rem;
  height: max-content;
}

.list {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 10px;
  font-size: 1.5rem;
  color: #fff;
  margin: 0;
  font-weight: 700;
  margin: 1rem;
  height: max-content;
}

li::before {
  content: "";
  transform: translate(0px, 5px);
  display: inline-block;
  height: 25px;
  width: 25px;
  margin-top: 0px;
  background-size: contain;
  background-image: url("~src/assets/imgs/11.png");
  background-repeat: no-repeat;
  margin-right: 10px;
}

li.invert {
  filter: invert(1);
  color: #fff;
}

.list li::marker {
  font-size: 1.5rem; /* You can use px, but I think rem is more respecful */
}

.footer {
  width: 100%;
  background-color: #35aa7c;
  bottom: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 25px 25px 0 0;
}

.row__home-company {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
}

.footer p {
  font-size: 2rem;
  color: #fff;
  margin: 0;
  font-weight: 700;
  margin: 1rem;
  height: max-content;
  text-align: center;
}

.footer p span {
  color: #1a27b7;
  font-weight: 700;
}

.loading {
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999;
  background-color: rgb(217 217 217 / 40%);
  backdrop-filter: blur(2px);
  opacity: 0;
  transition: all 0.5s ease-in-out;
  visibility: hidden;
}

.loading.active {
  opacity: 1;
  visibility: visible;
}
</style>
