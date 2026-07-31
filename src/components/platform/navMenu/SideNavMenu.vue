<template>
  <div id="q-app">
    <q-drawer
      v-if="hasMenu"
      v-model="drawerOpen"
      show-if-above
      :mini="isMiniMode"
      :mini-width="57"
      :width="300"
      :breakpoint="1024"
      bordered
      :overlay="isOverlayMode"
      content-class="side-nav-menu"
      @hide="onDrawerHide"
    >
      <q-scroll-area class="fit">
        <q-list>
          <template v-if="menuGroups.length > 0">
            <template v-if="isMiniMode">
              <q-item
                v-for="(group, groupIndex) in menuGroups"
                :key="'mini-group-' + groupIndex"
                clickable
                v-ripple
                class="side-nav-menu-item side-nav-menu-group"
              >
                <q-item-section avatar>
                  <q-icon :name="group.icon"></q-icon>
                </q-item-section>
                <q-tooltip
                  anchor="center right"
                  self="center left"
                  :offset="[10, 0]"
                >
                  {{ group.label }}
                </q-tooltip>
                <q-menu anchor="top right" self="top left" auto-close>
                  <q-list style="min-width: 220px">
                    <q-item
                      v-for="(menuItem, itemIndex) in group.items"
                      :key="'mini-group-' + groupIndex + '-item-' + itemIndex"
                      clickable
                      v-ripple
                      class="side-nav-menu-item side-nav-menu-subitem"
                      @click="goUrl(menuItem.url)"
                    >
                      <q-item-section avatar>
                        <q-icon :name="menuItem.icon"></q-icon>
                      </q-item-section>
                      <q-item-section>
                        {{ menuItem.label }}
                      </q-item-section>
                    </q-item>
                  </q-list>
                </q-menu>
              </q-item>
            </template>

            <template v-else>
              <q-expansion-item
                v-for="(group, groupIndex) in menuGroups"
                :key="'group-' + groupIndex"
                :icon="group.icon"
                :label="group.label"
                expand-separator
                header-class="side-nav-menu-item side-nav-menu-group"
              >
                <q-item
                  v-for="(menuItem, itemIndex) in group.items"
                  :key="'group-' + groupIndex + '-item-' + itemIndex"
                  clickable
                  v-ripple
                  class="side-nav-menu-item side-nav-menu-subitem"
                  @click="goUrl(menuItem.url)"
                >
                  <q-item-section avatar>
                    <q-icon :name="menuItem.icon"></q-icon>
                  </q-item-section>
                  <q-item-section>
                    {{ menuItem.label }}
                  </q-item-section>
                </q-item>
              </q-expansion-item>
            </template>
          </template>

          <q-item
            v-for="(menuItem, index) in menuList"
            :key="'item-' + index"
            clickable
            v-ripple
            class="side-nav-menu-item"
            @click="goUrl(menuItem.url)"
          >
            <q-item-section avatar>
              <q-icon :name="menuItem.icon"></q-icon>
            </q-item-section>
            <q-item-section>
              {{ menuItem.label }}
            </q-item-section>
            <q-tooltip
              v-if="isMiniMode"
              anchor="center right"
              self="center left"
              :offset="[10, 0]"
            >
              {{ menuItem.label }}
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
      mini: true,
    };
  },
  computed: {
    hasMenu() {
      return this.menuList.length > 0 || this.menuGroups.length > 0;
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
        this.mini = true;
      },
    },
  },
  methods: {
    onDrawerHide() {
      if (!this.isOverlayMode) {
        this.drawerOpen = true;
      }
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
          console.error("[SideNavMenu] Erro na navegação:", err);
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
        console.error("[SideNavMenu] Tipo de usuário não encontrado:", userType);
        this.menuList = [];
        this.menuGroups = [];
        return;
      }

      if (config.groups) {
        this.menuGroups = config.groups;
        this.menuList = [];
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

<style lang="scss">
.side-nav-menu {
  height: 100%;
  background-color: #fff;
}

.side-nav-menu-list {
  font-family: "Nunito";
  font-style: normal;
  height: 100%;
}

.side-nav-menu-item {
  font-family: "Nunito";
  font-weight: 700;
  background-color: #fff;
  color: #454545;
  transition: all 0.1s ease;
  border-right: 10px solid transparent;
}

.side-nav-menu-subitem {
  padding-left: 8px;
}

.side-nav-menu-item:hover {
  background: rgb(210, 212, 234);
  background: linear-gradient(
    90deg,
    rgba(210, 212, 234, 1) 0%,
    rgba(217, 219, 241, 1) 100%
  );
  border-right: 10px solid #c1c3d6;
}

.side-nav-menu-item:hover > .q-item__section > .q-icon,
.side-nav-menu-item:hover .q-item__section--avatar .q-icon {
  background: #1a27b7;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.side-nav-menu-item:hover > .q-item__section,
.side-nav-menu-item:hover .q-item__section--main {
  background: linear-gradient(90deg, #1a27b7 0%, #ff4690 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.q-mini-drawer .side-nav-menu-group {
  justify-content: center;
}

.q-mini-drawer .side-nav-menu-subitem {
  min-width: 200px;
}
</style>
