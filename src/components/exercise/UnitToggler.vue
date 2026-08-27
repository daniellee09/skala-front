<script setup>
import { computed } from 'vue'
import { useConfigStore } from '@/stores/configStore.js'

// 전역 저장소 인스턴스 확보 (어느 컴포넌트에서 불러도 동일한 객체!)
const configStore = useConfigStore()

// el-segmented 는 v-model 로 값을 주고받는데 스토어에는 토글 액션만 있어서
// getter/setter 를 붙여 현재 값과 다를 때만 토글을 부름
const unitModel = computed({
  get: () => configStore.unit,
  set: (next) => {
    if (next !== configStore.unit) configStore.toggleUnit()
  },
})

const options = [
  { label: '섭씨 ℃', value: 'celsius' },
  { label: '화씨 ℉', value: 'fahrenheit' },
]
</script>

<template>
  <div class="unit-toggler">
    <span class="unit-label">날씨단위</span>
    <el-segmented v-model="unitModel" :options="options" size="small" />
  </div>
</template>

<style scoped>
.unit-toggler {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  white-space: nowrap;
}
.unit-label {
  font-size: 13px;
  color: var(--color-text-soft);
}
</style>
