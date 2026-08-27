<script setup>
import { useConfigStore } from '@/stores/configStore.js'

// 전역 저장소 인스턴스 확보 (어느 컴포넌트에서 불러도 동일한 객체!)
const configStore = useConfigStore()
</script>

<template>
  <span class="unit-toggler">
    날씨단위: {{ configStore.unit === 'celsius' ? '섭씨' : '화씨' }}({{ configStore.unitSymbol }})
    <button @click="configStore.toggleUnit" class="toggle-btn">단위변경</button>
  </span>
</template>

<style scoped>
.unit-toggler {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  margin-left: auto;
  padding-right: 10px;
  font-size: 13px;
  color: var(--color-text-soft);
  white-space: nowrap;
}
.toggle-btn {
  padding: 5px 11px;
  font-size: 12px;
  font-weight: 700;
  background: var(--color-surface-mute);
  color: var(--color-text);
  border: 1px solid var(--color-border-strong);
  border-radius: 999px;
  cursor: pointer;
  transition:
    background 0.15s ease,
    color 0.15s ease;
}
.toggle-btn:hover {
  background: var(--color-brand);
  border-color: var(--color-brand);
  color: #fff;
}
</style>
