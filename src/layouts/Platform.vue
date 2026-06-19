<template>
  <div class="platform">
    <q-layout
      view="hHh Lpr lff"
      container
      style="height: 100vh"
      class="shadow-2 rounded-borders"
    >
      <Toolbar class="platform-toolbar" />
      <SideNavMenu
        class="platform-side-nav-menu"
        :sideNavMenuComponent="sideNavMenuComponent"
      />
      <q-page-container>
        <router-view name="content" class="platform-content" />
      </q-page-container>
    </q-layout>
  </div>
</template>

<script>
import SideNavMenu from "../components/platform/navMenu/SideNavMenu.vue";
import Vue from "vue";

export default {
  data() {
    return {
      sideNavMenuComponent: new Vue(),
    };
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
    Toolbar: () => {
      const component = window.mobileAndTabletCheck()
        ? import("../components/platform/toolbar/ToolbarMobile.vue")
        : import("../components/platform/toolbar/Toolbar.vue");
      return component;
    },
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
