import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

// config는 이 스토어의 고유 ID (Devtools에서 구분하기 위해 필요)
export const useConfigStore = defineStore('config', () => {
  // state : 단위를 저장하는 변수 (초기값 celsius)
  const unit = ref('celsius')

  // getters : 현재 단위 상태에 맞는 기호 (℃, ℉)를 반환하는 계산된 속성
  const unitSymbol = computed(() => {
    return unit.value === 'celsius' ? '℃' : '℉'
  })

  // actions : 단위를 변경하는 함수
  function toggleUnit() {
    unit.value = unit.value === 'celsius' ? 'fahrenheit' : 'celsius'
  }

  return { unit, unitSymbol, toggleUnit }
})
