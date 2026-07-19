<template>
  <div class="rh-section-card">
    <div class="rh-section-card__header">
      <div class="rh-section-card__heading">
        <h3 class="rh-section-card__title" :title="title">{{ title }}</h3>
        <p v-if="subtitle" class="rh-section-card__subtitle" :title="subtitle">
          {{ subtitle }}
        </p>
      </div>
      <div class="rh-section-card__actions">
        <span v-if="badge" class="rh-section-card__badge">{{ badge }}</span>
        <q-btn
          v-if="infoLabel"
          flat
          round
          dense
          icon="mdi-information-outline"
          color="grey-6"
          @click="$emit('info', infoLabel)"
        />
      </div>
    </div>
    <div class="rh-section-card__body">
      <slot />
    </div>
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
    badge: {
      type: String,
      default: "",
    },
    infoLabel: {
      type: String,
      default: "",
    },
  },
};
</script>

<style lang="scss" scoped>
.rh-section-card {
  background: #fff;
  border: 1px solid #e6e6e6;
  border-radius: 14px;
  padding: 18px 20px;
  box-shadow: 0 2px 8px rgba(26, 39, 68, 0.05);
  margin-bottom: 20px;
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
}

.rh-section-card__header {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 16px;
  margin-bottom: 14px;
  flex-shrink: 0;
  min-height: 52px;
}

.rh-section-card__heading {
  min-width: 0;
  flex: 1;
}

.rh-section-card__title {
  margin: 0;
  font-family: "Nunito", sans-serif;
  font-size: 0.9375rem;
  font-weight: 800;
  line-height: 1.25;
  color: #1a2744;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  overflow: hidden;
  word-break: break-word;
}

.rh-section-card__subtitle {
  margin: 4px 0 0;
  font-family: "Nunito", sans-serif;
  font-size: 0.75rem;
  line-height: 1.3;
  color: #667998;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  overflow: hidden;
  word-break: break-word;
}

.rh-section-card__actions {
  display: flex;
  align-items: center;
  gap: 8px;
  flex-shrink: 0;
}

.rh-section-card__badge {
  display: inline-flex;
  align-items: center;
  padding: 4px 10px;
  border-radius: 999px;
  background: #edf9f4;
  color: #128564;
  font-family: "Nunito", sans-serif;
  font-size: 0.6875rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.03em;
}

.rh-section-card__body {
  display: flex;
  flex-direction: column;
  gap: 16px;
  flex: 1 1 auto;
  min-height: 0;
  height: 100%;
}
</style>
