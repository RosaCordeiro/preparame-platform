<template>
  <div class="platform" :class="{ 'platform--rh': isCompanyAdmin }">
    <q-layout
      view="hHh Lpr lff"
      container
      style="height: 100vh"
      class="shadow-2 rounded-borders"
    >
      <component
        :is="toolbarComponent"
        class="platform-toolbar"
      />
      <component
        :is="sideNavComponent"
        class="platform-side-nav-menu"
        :sideNavMenuComponent="sideNavMenuComponent"
      />
      <q-page-container :class="{ 'rh-page-container': isCompanyAdmin }">
        <router-view
          name="content"
          :class="[
            'platform-content',
            { 'rh-page-content': isCompanyAdmin },
          ]"
        />
      </q-page-container>
    </q-layout>
  </div>
</template>

<script>
import SideNavMenu from "../components/platform/navMenu/SideNavMenu.vue";
import RhSideNavMenu from "../components/platform/navMenu/RhSideNavMenu.vue";
import RhToolbar from "../components/platform/toolbar/RhToolbar.vue";
import Vue from "vue";

export default {
  data() {
    return {
      sideNavMenuComponent: new Vue(),
    };
  },
  computed: {
    isCompanyAdmin() {
      return localStorage.getItem("userType") === "COMPANY_ADMIN";
    },
    toolbarComponent() {
      if (this.isCompanyAdmin) {
        return RhToolbar;
      }

      return window.mobileAndTabletCheck()
        ? () => import("../components/platform/toolbar/ToolbarMobile.vue")
        : () => import("../components/platform/toolbar/Toolbar.vue");
    },
    sideNavComponent() {
      return this.isCompanyAdmin ? RhSideNavMenu : SideNavMenu;
    },
  },
  async beforeCreate() {
    try {
      const loggedUser = await refreshToken().then((token) => {
        return token && token.status === 200;
      });

      if (!loggedUser) {
        this.$router.push({ path: "/login" });
      }
    } catch (err) {}
  },
  methods: {
    toogleMenu: function () {
      this.sideNavMenuComponent.$emit("toogleMenu");
    },
  },
  components: {
    SideNavMenu,
    RhSideNavMenu,
    RhToolbar,
  },
};
</script>

<style lang="scss">
.platform-content {
  background-color: #f5f6fa;
  font-family: "Nunito";
  font-style: normal;
}
</style>
