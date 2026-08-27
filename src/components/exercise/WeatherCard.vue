<script setup>
import { computed } from 'vue'
import { useConfigStore } from '@/stores/configStore.js'

// ⚠️ props 를 script 안에서 쓰려면 반드시 변수에 "받아야" 합니다
const props = defineProps({
  cityItem: { type: Object, required: true },
})

const emit = defineEmits(['select-card', 'click-detail'])

const configStore = useConfigStore()

// 원본 섭씨 데이터를 현재 단위 설정에 맞게 변환해서 뱉는 파생 값
const displayTemp = computed(() => {
  const rawTemp = props.cityItem.temp // 기본 원본 데이터는 섭씨 숫자
  if (configStore.unit === 'fahrenheit') {
    return Math.round((rawTemp * 9) / 5 + 32) // 화씨 변환 연산
  }
  return rawTemp // 'celsius' 일 때는 원본 그대로 반환
})
</script>

<template>
  <div class="weather-card" @click="emit('select-card', `${cityItem.name}이 선택되었습니다.`)">
    <h4>{{ cityItem.name }} ({{ cityItem.status }})</h4>
    <p>현재 기온: {{ displayTemp }}{{ configStore.unitSymbol }}</p>

    <span v-if="cityItem.temp >= 25" class="badge hot">🔥 더움</span>
    <span v-else class="badge cool">❄️ 선선함</span>
    <img
      v-if="cityItem.icon"
      :src="`https://openweathermap.org/img/wn/${cityItem.icon}@2x.png`"
      :alt="cityItem.status"
      width="50"
    />

    <button class="btn-detail" @click.stop="emit('click-detail', cityItem.name, cityItem.status)">
      상세보기
    </button>
  </div>
</template>

<style scoped>
.weather-card {
  background: var(--color-surface);
  border: 1px solid var(--color-border-strong);
  padding: 14px 16px;
  margin-bottom: 10px;
  border-radius: var(--radius-sm);
  cursor: pointer;
  position: relative;
  transition:
    border-color 0.15s ease,
    box-shadow 0.15s ease,
    transform 0.15s ease;
}
.weather-card:hover {
  border-color: var(--color-brand);
  box-shadow: var(--shadow-sm);
  transform: translateY(-1px);
}
.weather-card h4 {
  font-size: 15px;
  font-weight: 700;
  color: var(--color-heading);
  margin-bottom: 4px;
}
.weather-card p {
  font-size: 14px;
  margin-bottom: 8px;
}
.badge {
  display: inline-block;
  padding: 3px 9px;
  font-size: 12px;
  font-weight: 700;
  border-radius: 999px;
  color: #fff;
  vertical-align: middle;
}
.hot {
  background-color: var(--color-hot);
}
.cool {
  background-color: var(--color-cool);
}
.btn-detail {
  position: absolute;
  right: 14px;
  top: 14px;
  padding: 6px 12px;
  font-size: 13px;
  border: 1px solid var(--color-border-strong);
  border-radius: var(--radius-sm);
  background: var(--color-surface-soft);
  color: var(--color-text);
  cursor: pointer;
  transition:
    background 0.15s ease,
    border-color 0.15s ease;
}
.btn-detail:hover {
  background: var(--color-brand);
  border-color: var(--color-brand);
  color: #fff;
}
</style>
