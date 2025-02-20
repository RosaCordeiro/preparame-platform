<template>
  <div class="site">
    <HeaderVue />
    <q-layout view="hhh LpR lFr">
      <q-page-container>
        <router-view name="content" />
      </q-page-container>
    </q-layout>
    <FooterVue />
  </div>
</template>

<script>
import HeaderVue from "./Header.vue";
import FooterVue from "./Footer.vue";
import SmoothScroll from "smooth-scroll";

export default {
  components: {
    HeaderVue,
    FooterVue,
  },
  data() {
    return {
      header: null,
      menuToggle: null,
      menuMobile: null,
      scrollClass: "scrolled",
      smoothScroll: null,
      quasarStyles: [],
    };
  },
  mounted() {
    this.quasarStyles = Array.from(
      document.querySelectorAll("style, link")
    ).filter((el) => el.innerText.includes("q-app") || el.href?.includes("quasar"));

    this.quasarStyles.forEach((style) => style.remove());

    this.header = document.querySelector("header");
    this.menuToggle = document.querySelector(".header__interact .toggle-menu");
    this.menuMobile = document.querySelector(".header__nav .menu-mobile");

    window.addEventListener("scroll", this.handleScroll);

    this.smoothScroll = new SmoothScroll('a[href^="#"]', {
      speed: 800,
      offset: 0,
      easing: "easeInOutCubic",
    });

    this.menuToggle?.addEventListener("click", this.toggleMenu);
    document
      .querySelectorAll(".menu-mobile__items .mobile-item")
      .forEach((item) => {
        item.addEventListener("click", this.toggleMenu);
      });
  },
  beforeDestroy() {
    window.removeEventListener("scroll", this.handleScroll);
    this.menuToggle?.removeEventListener("click", this.toggleMenu);
    document
      .querySelectorAll(".menu-mobile__items .mobile-item")
      .forEach((item) => {
        item.removeEventListener("click", this.toggleMenu);
      });
  },
  methods: {
    handleScroll() {
      if (window.scrollY > 50) {
        this.header?.classList.add(this.scrollClass);
      } else {
        this.header?.classList.remove(this.scrollClass);
      }

      if (this.menuMobile?.classList.contains("active")) {
        this.menuMobile.classList.remove("active");
        this.menuToggle?.classList.remove("active");
      }
    },
    toggleMenu() {
      const isActive = this.menuMobile?.classList.contains("active");
      this.menuMobile?.classList.toggle("active", !isActive);
      this.menuToggle?.classList.toggle("active", !isActive);
    },
  },
};
</script>

<style lang="scss">

@import "../../css/new.scss";

@keyframes slide {
  to {
    transform: translateX(0px);
  }
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
</style>
