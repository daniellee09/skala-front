<script setup>
import { ref, computed } from 'vue'

const count = ref(0)
const dummy = ref(0) // computed와 무관한 변수

// 일반 함수 - 리렌더링될 때마다 무조건 다시 실행됨
const getMethodResult = () => {
  console.log('❌ 일반 함수 실행됨!')
  return count.value * 2
}

// computed - count 바뀔 때만 재계산. dummy 바뀌면 캐시 씀
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
