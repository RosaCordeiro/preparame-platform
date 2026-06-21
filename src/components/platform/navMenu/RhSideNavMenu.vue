<template>
  <div id="q-app" class="rh-side-nav-root">
    <!-- Desktop: barra fixa só com ícones -->
    <q-drawer
      v-if="hasMenu && !isOverlayMode"
      v-model="railOpen"
      show-if-above
      :width="57"
      :breakpoint="1024"
      bordered
      content-class="rh-side-nav-menu rh-side-nav-menu--rail"
    >
      <q-scroll-area class="fit">
        <q-list class="rh-side-nav-menu-rail-list">
          <q-item
            v-for="(menuItem, index) in menuList"
            :key="'rail-' + index"
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
            <q-tooltip
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

    <!-- Mobile: drawer overlay com menu completo -->
    <q-drawer
      v-if="hasMenu && isOverlayMode"
      v-model="drawerOpen"
      show-if-above
      :width="280"
      :breakpoint="1024"
      bordered
      overlay
      content-class="rh-side-nav-menu"
      @hide="onDrawerHide"
    >
      <rh-side-nav-menu-panel
        :menu-list="menuList"
        :user-name="userName"
        @item-click="onMenuClick"
      />
    </q-drawer>

    <!-- Desktop: menu completo em overlay -->
    <transition name="rh-nav-panel">
      <div
        v-if="hasMenu && !isOverlayMode && expanded"
        class="rh-nav-overlay"
      >
        <div
          class="rh-nav-overlay__backdrop"
          @click="expanded = false"
        ></div>
        <aside class="rh-nav-overlay__panel rh-side-nav-menu">
          <rh-side-nav-menu-panel
            :menu-list="menuList"
            :user-name="userName"
            @item-click="onMenuClick"
          />
        </aside>
      </div>
    </transition>
  </div>
</template>

<script>
import { menuByUserType } from "./menuConfig.js";
import RhSideNavMenuPanel from "./RhSideNavMenuPanel.vue";

export default {
  components: {
    RhSideNavMenuPanel,
  },
  props: ["sideNavMenuComponent"],
  data() {
    const isMobileUA = window.mobileAndTabletCheck();

    return {
      menuList: [],
      isMobileUA,
      railOpen: true,
      drawerOpen: false,
      expanded: false,
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
  },
  watch: {
    isOverlayMode: {
      immediate: true,
      handler(isOverlay) {
        if (isOverlay) {
          this.drawerOpen = false;
          this.expanded = false;
          return;
        }

        this.railOpen = true;
        this.expanded = false;
      },
    },
    "$route.path"() {
      this.$forceUpdate();
    },
  },
  methods: {
    onDrawerHide() {
      if (this.isOverlayMode) {
        this.drawerOpen = false;
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
      } else {
        this.expanded = false;
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

      this.expanded = !this.expanded;
    },
    loadMenu(userType) {
      const config = menuByUserType[userType];

      if (!config) {
        this.menuList = [];
        return;
      }

      this.menuList = config.items || [];
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
