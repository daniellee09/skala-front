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
  margin-left: auto;
  font-size: 13px;
  color: #555;
}
.toggle-btn {
  margin-left: 6px;
  padding: 4px 10px;
  font-size: 12px;
  background: #5b7cfa;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}
</style>
