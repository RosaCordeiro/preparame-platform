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
      <template v-for="(menuItem, index) in menuList">
        <q-expansion-item
          v-if="menuItem.children && menuItem.children.length"
          :key="'exp-' + index"
          :icon="menuItem.icon"
          :label="menuItem.label"
          :default-opened="isParentActive(menuItem)"
          class="rh-side-nav-menu-item rh-side-nav-menu-item--expansion"
          :class="{
            'rh-side-nav-menu-item--active': isParentActive(menuItem),
          }"
          expand-separator
        >
          <q-item
            v-for="(child, childIndex) in menuItem.children"
            :key="'child-' + index + '-' + childIndex"
            clickable
            v-ripple
            class="rh-side-nav-menu-item rh-side-nav-menu-item--child"
            :class="{
              'rh-side-nav-menu-item--active': isActive(child),
            }"
            @click="$emit('item-click', child)"
          >
            <q-item-section avatar>
              <q-icon :name="child.icon || 'mdi-circle-small'"></q-icon>
            </q-item-section>
            <q-item-section>
              <q-item-label>{{ child.label }}</q-item-label>
            </q-item-section>
          </q-item>
        </q-expansion-item>

        <q-item
          v-else
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
      </template>
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
  computed: {
    currentPath() {
      return this.$route.path;
    },
  },
  methods: {
    isActive(menuItem) {
      if (menuItem.comingSoon || !menuItem.url) {
        return false;
      }

      const targetPath = `/${menuItem.url}`;

      return (
        this.currentPath === targetPath ||
        this.currentPath.startsWith(`${targetPath}/`)
      );
    },
    isParentActive(menuItem) {
      if (!menuItem.children) {
        return false;
      }

      return menuItem.children.some((child) => this.isActive(child));
    },
  },
};
</script>
