<template>
  <main>
    <section class="h-banner">
      <div class="h-banner__content wrapper">
        <div class="h-banner__text">
          <h2>
            Apoie ex-colaboradores a continuarem suas carreiras após a demissão.
          </h2>
          <a href="#" class="btn btn--form"><span>quero orçamento</span></a>
        </div>
        <figure class="h-banner__img">
          <img src="../../assets/img/PNG/h-banner.png" alt="Banner Cover" />
        </figure>
      </div>
    </section>
    <section class="h-collab">
      <div class="h-collab__content wrapper">
        <h2>
          <span>ex-colaboradores</span>
          <span>empresas</span>
        </h2>
        <div class="h-collab__sides">
          <div class="left">
            <ul class="list">
              <li class="title">ex-colaboradores</li>
              <li>acolhimento pós demissão</li>
              <li>apoio na recolocação</li>
              <li>orientação de carreira e tira-dúvidas</li>
              <li>outplacement</li>
            </ul>
          </div>
          <figure class="center">
            <img src="../../assets/img/PNG/h-collab.png" alt="" />
          </figure>
          <div class="right">
            <ul class="list">
              <li class="title">empresas</li>
              <li>indicadores de riscos trabalhistas e marca empregadora</li>
              <li>dashboard do RH e pendências trabalhistas</li>
              <li>treinamentos</li>
            </ul>
          </div>
        </div>
        <a href="#" class="btn btn--form"><span>quero ver a plataforma</span></a>
      </div>
    </section>
    <section class="h-percent">
      <div class="h-percent__content wrapper">
        <h2>Empresas que demitem sem Prepara.me, têm:</h2>
        <div class="h-percent__items">
          <div class="item">
            <h3>e-NPS</h3>
            <p>74%<span>pior</span></p>
          </div>
          <div class="item">
            <h3>risco de marca</h3>
            <p>36%<span>maior</span></p>
          </div>
          <div class="item">
            <h3>risco trabalhista</h3>
            <p>49%<span>maior</span></p>
          </div>
        </div>
        <div class="h-percent__bottom">
          <p>
            Fonte: Pesquisa de Demissão Prepara.me 2023, realizada com pessoas
            que foram demitidas e receberam apoio Prepara.me, comparado com
            pessoas que foram demitidas e não receberam nenhum apoio.
          </p>
          <a href="#" class="btn btn--form"><span>quero saber mais</span></a>
        </div>
      </div>
    </section>
    <section class="h-placement">
      <div class="h-placement__content wrapper">
        <div class="h-placement__text">
          <div class="desc">
            <p>Pra quem demite a demissão acaba em 10 minutos.</p>
            <p>Pra pessoa demitida só acaba quando ela se recoloca.</p>
          </div>
          <a href="#" class="btn btn--form"><span>quero saber mais</span></a>
        </div>
        <figure class="h-placement__img">
          <img
            src="../../assets/img/PNG/h-placement.png"
            alt="Prepara.me Recolocação Profissional"
          />
        </figure>
      </div>
    </section>

    <section class="h-solutions wrapper">
      <h2>soluções para a pessoa demitida</h2>
      <div class="h-solutions__items">
        <div class="item">
          <span>Acolhimento e acompanhamento pós-demissão</span>
        </div>
        <div class="item">
          <span>Conversas com especialistas de RH e psicólogos</span>
        </div>
        <div class="item">
          <span>Cursos com certificados em diversas áreas</span>
        </div>
        <div class="item">
          <span>Outplacement</span>
        </div>
      </div>
      <a href="#" class="btn btn--form"><span>conhecer pacotes</span></a>
    </section>

    <section class="h-solutions h-solutions--blue wrapper">
      <h2>soluções para o RH e a empresa</h2>
      <div class="h-solutions__items">
        <div class="item">
          <span>Pesquisa qualitativa e quantitativa pós-demissão</span>
        </div>
        <div class="item">
          <span>Indicadores de riscos trabalhistas e de marca empregadora</span>
        </div>
        <div class="item">
          <span>Dashboard e reuniões de acompanhamento com RH</span>
        </div>
        <div class="item">
          <span>Treinamentos e cursos sobre demissão</span>
        </div>
      </div>
      <a href="#" class="btn btn--form"><span>conhecer pacotes</span></a>
    </section>

    <FormModal :isOpen="showModal" @close="showModal = false" />
  </main>
</template>

<script>

import FormModal from "./FormModal.vue";

export default {
  components: {
    FormModal,
  },
  
  data() {
    return {
      showModal: false,
    };
  },
  mounted() {

    const buttons = document.querySelectorAll(".btn--form");

    if (buttons.length > 0) {
      buttons.forEach((btn) => {
        btn.addEventListener("click", this.openModal);
      });
}
  },
  beforeDestroy() {

    const buttons = document.querySelectorAll(".btn--form");
    buttons.forEach((btn) => {
      btn.removeEventListener("click", this.openModal);
    });

  },
  methods: {
    openModal(event) {
      event.preventDefault();
      this.showModal = true;
    },
  },
};
</script>
