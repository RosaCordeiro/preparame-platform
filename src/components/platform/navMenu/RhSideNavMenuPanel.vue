<template>
  <q-scroll-area class="fit">
    <div class="rh-sidebar-header">
      <img
        src="../../../assets/rh/painel-demissao.png"
        alt="Painel Demissão Responsável"
      />
      <h2>Olá,<br />{{ userName }}!</h2>
    </div>

    <div class="rh-sidebar-label">Menu</div>

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
        @click="$emit('item-click', menuItem)"
      >
        <q-item-section avatar>
          <q-icon :name="menuItem.icon"></q-icon>
        </q-item-section>
        <q-item-section>
          <q-item-label>{{ menuItem.label }}</q-item-label>
        </q-item-section>
        <q-item-section v-if="menuItem.comingSoon" side>
          <span class="rh-badge-soon">em breve</span>
        </q-item-section>
      </q-item>
    </q-list>
  </q-scroll-area>
</template>

<script>
export default {
  props: {
    menuList: {
      type: Array,
      default: () => [],
    },
    userName: {
      type: String,
      default: "Usuário",
    },
  },
  watch: {
    "$route.path"() {
      this.$forceUpdate();
    },
  },
  methods: {
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
  },
};
</script>
