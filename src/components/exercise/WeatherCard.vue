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
  background: #fff;
  border: 1px solid #dee2e6;
  padding: 12px;
  margin-bottom: 10px;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
}
.badge {
  display: inline-block;
  padding: 4px 8px;
  font-size: 12px;
  border-radius: 4px;
  color: #fff;
}
.hot {
  background-color: #ff7675;
}
.cool {
  background-color: #74b9ff;
}
.btn-detail {
  position: absolute;
  right: 12px;
  top: 15px;
  padding: 6px 10px;
  cursor: pointer;
}
</style>
