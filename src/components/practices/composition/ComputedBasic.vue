<script setup>
import { ref, computed } from 'vue'

const count = ref(0)
const dummy = ref(0) // computed와 무관한 변수

// 1. 일반 함수: 리렌더링될 때마다 무조건 재실행
const getMethodResult = () => {
  console.log('❌ 일반 함수 실행됨!')
  return count.value * 2
}

// 2. Computed: count가 바뀔 때만 재연산 (dummy가 바뀔 땐 캐시 재사용)
const doubleCount = computed(() => {
  console.log('✅ Computed 연산 실행됨!')
  return count.value * 2
})
</script>

<template>
  <div class="practice-section">
    <h2>computed() 캐싱 동작 비교</h2>

    <p>count: {{ count }} | dummy: {{ dummy }}</p>
    <button @click="count++">count 증가 (의존성 변경)</button>
    <button @click="dummy++">dummy 증가 (무관한 변경)</button>

    <p>일반 함수 결과: {{ getMethodResult() }}</p>
    <p>Computed 결과: {{ doubleCount }}</p>

    <div class="monitor">
      <p>
        👁️‍🗨️ F12 콘솔 확인: dummy 버튼을 누르면 일반 함수 로그만 찍히고 computed 로그는 찍히지
        않습니다.
      </p>
    </div>
  </div>
</template>
