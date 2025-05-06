<template>
  <header class="header">
    <div class="header__content wrapper">
      <router-link to="/" class="header__logo">
        <figure class="logo">
          <img src="../../assets/img/PNG/preparame-logo.png" alt="Prepara.me" />
        </figure>
      </router-link>
      <nav class="header__nav">
        <ul class="menu">
          <li class="menu-item">
            <router-link to="/">demissão responsável</router-link>
          </li>
          <li class="menu-item">
            <router-link to="/treinamento">treinamento</router-link>
          </li>
          <li class="menu-item">
            <router-link to="/clientes">clientes</router-link>
          </li>
          <li class="menu-item">
            <router-link to="/MateriaisGratuitos">materiais gratuitos</router-link>
          </li>
        </ul>
        <div class="menu-mobile">
          <ul class="menu-mobile__items">
            <li class="mobile-item">
              <router-link to="/">demissão responsável</router-link>
            </li>
            <li class="mobile-item">
              <router-link to="/treinamento">treinamento</router-link>
            </li>
            <li class="mobile-item">
              <router-link to="/clientes">clientes</router-link>
            </li>
            <li class="mobile-item">
              <router-link to="/MateriaisGratuitos">materiais gratuitos</router-link>
            </li>
          </ul>
        </div>
      </nav>
      <div class="header__interact">
        <!-- <router-link to="/login" class="login btn">
          <span>Entrar</span>
        </router-link> -->
        <a @click="toLogin" class="login btn">
          <span>Entrar</span>
        </a>
        <button class="btn toggle-menu">
          <span class="btn-hamb"> </span>
        </button>
      </div>
    </div>
  </header>
</template>

<script>
export default {
  methods: {
    toLogin() {
      this.$router.push("/login");
    },
  },
};
</script>

<style></style>
