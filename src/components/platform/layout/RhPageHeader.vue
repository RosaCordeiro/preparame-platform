<template>
  <div class="rh-page-header-block">
    <div>
      <h1 class="rh-page-title">{{ title }}</h1>
      <p v-if="subtitle" class="rh-page-subtitle">{{ subtitle }}</p>
    </div>
    <slot />
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      required: true,
    },
    subtitle: {
      type: String,
      default: "",
    },
  },
};
</script>

<style lang="scss" scoped>
.rh-page-header-block {
  display: flex;
  flex-direction: column;
  gap: 16px;
  margin-bottom: 24px;

  @media (min-width: 640px) {
    flex-direction: row;
    align-items: flex-end;
    justify-content: space-between;
  }
}
</style>
