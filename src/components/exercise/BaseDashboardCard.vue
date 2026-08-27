<template>
  <div class="base-dashboard-card">
    <slot></slot>
  </div>
</template>

<style scoped>
.base-dashboard-card {
  background: var(--color-surface-soft);
  padding: 16px;
  border-radius: var(--radius);
  margin-bottom: 16px;
  border: 1px solid var(--color-border);
}
</style>
