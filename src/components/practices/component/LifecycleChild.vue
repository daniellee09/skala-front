<script setup>
import { ref, onMounted, onUpdated, onUnmounted } from 'vue'

const count = ref(0)
let timerId = null

// Creation
console.log('1. [setup] 컴포넌트가 메모리에 생성되었습니다. (DOM 접근 불가능)')

// Mounting
onMounted(() => {
  console.log('2. [onMounted] 컴포넌트가 화면에 마운트 되었습니다. (API 호출 / DOM 접근 가능)')

  timerId = setInterval(() => {
    count.value++
  }, 3000)
})

// Updating
onUpdated(() => {
  console.log(`3. [onUpdated] 컴포넌트가 업데이트 되었습니다. (현재 count: ${count.value})`)
})

// Unmounting
onUnmounted(() => {
  clearInterval(timerId)
  console.log('4. [onUnmounted] 컴포넌트가 화면에서 제거되었습니다. (타이머 제거)')
})
</script>
<template>
  <h3>⏱️ 라이프사이클 훅 흐름 탐색기</h3>
  <div class="counter-display">
    <p>실시간 타이머 카운트: {{ count }}</p>
    <button @click="count++">수동으로 숫자 올리기</button>
  </div>
</template>

<style scoped>
.counter-display {
  background: #e3fafc;
  padding: 15px;
  border-radius: 8px;
  border: 1px solid #99e9f2;
  text-align: center;
}
</style>
