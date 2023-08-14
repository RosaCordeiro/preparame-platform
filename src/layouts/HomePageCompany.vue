<template>
  <section class="homePageCompany">
    <div class="header wrapper">
      <div class="row__home-company">
        <div class="row__home-company">
          <p class="header__text">Patrocínio</p>
          <img src="~assets/imgs/9.png" alt="" />
        </div>
        <div class="row__home-company">
          <p class="header__text">Realização</p>
          <img src="~assets/imgs/10.png" alt="" />
        </div>
      </div>
    </div>

    <div class="wrapper">
      <div class="content__main">
        <aside class="left">
          <div class="container__message">
            <p>Recado da Apsen pra você:</p>
          </div>

          <div class="container__text">
            <p>
              Nós sabemos que procurar por trabalho é uma tarefa muito
              cansativa.
            </p>
            <p>
              Por isto, todo mês oferecemos
              <b>60 bolsas de mentorias coletivas no Prepara.me</b> para quem
              busca por trabalho nas nossas páginas de Carreira. Então,
              aproveite!
            </p>
          </div>

          <ul class="list">
            <li>Mentoria Coletiva</li>
            <li>Modelo de Currículo</li>
            <li>Capas de Linkedln</li>
            <li>e-Books e mais</li>
          </ul>
        </aside>

        <aside class="right">
          <TimerWidget v-if="false" class="timer__card" />
          <FormWidget v-if="true" />
        </aside>
      </div>
    </div>

    <div class="footer">
      <p>
        Apsen + Prepara.me em:
        <span>orientação de carreira é pra todo mundo!</span>
      </p>
    </div>
  </section>
</template>

<script>
import TimerWidget from "src/components/site/homePageCompany/timer/TimerWidget.vue";
import FormWidget from "src/components/site/homePageCompany/form/FormWidget.vue";

export default {
  components: {
    TimerWidget,
    FormWidget,
  },
  mounted() {
    console.log(this.$route.params.companyName);

    if (this.$route.params.companyName !== "apsen")
      this.$router.push({ path: `/` });
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
  background-color: #1a27b7;
  background-image: url("~src/assets/imgs/7.png");
  background-repeat: no-repeat;
  background-size: contain;
  background-position: right;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
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
</style>
