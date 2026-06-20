<template>
  <div id="q-app">
    <q-drawer
      v-if="hasMenu"
      v-model="drawerOpen"
      show-if-above
      :mini="isMiniMode"
      :mini-width="57"
      :width="280"
      :breakpoint="1024"
      bordered
      :overlay="isOverlayMode"
      content-class="rh-side-nav-menu side-nav-menu"
      @hide="onDrawerHide"
    >
      <q-scroll-area class="fit">
        <div v-if="!isMiniMode" class="rh-sidebar-header">
          <img
            src="../../../assets/rh/painel-demissao.png"
            alt="Painel Demissão Responsável"
          />
          <h2>Olá,<br />{{ userName }}!</h2>
        </div>

        <div v-if="!isMiniMode" class="rh-sidebar-label">Menu</div>

        <q-list>
          <q-item
            v-for="(menuItem, index) in menuList"
            :key="'item-' + index"
            clickable
            v-ripple="!menuItem.comingSoon"
            class="rh-side-nav-menu-item"
            :class="{
              'rh-side-nav-menu-item--active': isActive(menuItem),
              'rh-side-nav-menu-item--soon': menuItem.comingSoon,
            }"
            @click="onMenuClick(menuItem)"
          >
            <q-item-section avatar>
              <q-icon :name="menuItem.icon"></q-icon>
            </q-item-section>
            <q-item-section v-if="!isMiniMode">
              <q-item-label>{{ menuItem.label }}</q-item-label>
            </q-item-section>
            <q-item-section v-if="!isMiniMode && menuItem.comingSoon" side>
              <span class="rh-badge-soon">em breve</span>
            </q-item-section>
            <q-tooltip
              v-if="isMiniMode"
              anchor="center right"
              self="center left"
              :offset="[10, 0]"
            >
              {{ menuItem.label }}
              <span v-if="menuItem.comingSoon"> (em breve)</span>
            </q-tooltip>
          </q-item>
        </q-list>
      </q-scroll-area>
    </q-drawer>
  </div>
</template>

<script>
import { menuByUserType } from "./menuConfig.js";

export default {
  props: ["sideNavMenuComponent"],
  data() {
    const isMobileUA = window.mobileAndTabletCheck();

    return {
      menuList: [],
      menuGroups: [],
      isMobileUA,
      drawerOpen: true,
      mini: false,
      userName: localStorage.getItem("userName") || "Usuário",
    };
  },
  computed: {
    hasMenu() {
      return this.menuList.length > 0;
    },
    isOverlayMode() {
      const narrowViewport =
        this.$q && this.$q.screen && this.$q.screen.width < 1024;

      return this.isMobileUA || narrowViewport;
    },
    isMiniMode() {
      return !this.isOverlayMode && this.mini;
    },
  },
  watch: {
    isOverlayMode: {
      immediate: true,
      handler(isOverlay) {
        if (isOverlay) {
          this.drawerOpen = false;
          return;
        }

        this.drawerOpen = true;
        this.mini = false;
      },
    },
    "$route.path"() {
      this.$forceUpdate();
    },
  },
  methods: {
    onDrawerHide() {
      if (!this.isOverlayMode) {
        this.drawerOpen = true;
      }
    },
    isActive(menuItem) {
      if (menuItem.comingSoon || !menuItem.url) {
        return false;
      }

      const currentPath = this.$router.history.current.path;
      const targetPath = `/${menuItem.url}`;

      return (
        currentPath === targetPath ||
        currentPath.startsWith(`${targetPath}/`)
      );
    },
    onMenuClick(menuItem) {
      if (menuItem.comingSoon) {
        this.$q.notify({
          type: "info",
          message: "Em breve",
          timeout: 2000,
        });
        return;
      }

      this.goUrl(menuItem.url);
    },
    goUrl(url) {
      if (String(url).startsWith("http")) {
        this.goBlank(url);
        if (this.isOverlayMode) {
          this.drawerOpen = false;
        }
        return;
      }

      const targetPath = `/${url}`;
      if (this.$router.history.current.path !== targetPath) {
        this.$router.push({ path: targetPath }).catch((err) => {
          console.error("[RhSideNavMenu] Erro na navegação:", err);
        });
      }

      if (this.isOverlayMode) {
        this.drawerOpen = false;
      }
    },
    goBlank(url) {
      window.open(url, "_blank");
    },
    toogleMenu() {
      if (this.isOverlayMode) {
        this.drawerOpen = !this.drawerOpen;
        return;
      }

      this.mini = !this.mini;
    },
    loadMenu(userType) {
      const config = menuByUserType[userType];

      if (!config) {
        this.menuList = [];
        this.menuGroups = [];
        return;
      }

      this.menuList = config.items || [];
      this.menuGroups = [];
    },
  },
  mounted() {
    this.sideNavMenuComponent.$on("toogleMenu", this.toogleMenu);
  },
  created() {
    this.loadMenu(localStorage.getItem("userType"));
  },
};
</script>
