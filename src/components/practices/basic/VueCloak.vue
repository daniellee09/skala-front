<script setup>
import { ref } from 'vue'

const message = ref('느린 네트워크에서도 안전하게 출력되는 메시지!')
</script>

<template>
  <div v-cloak class="practice-section">
    <h2>v-cloak 디렉티브 학습</h2>
    <p>{{ message }}</p>
  </div>
</template>

<style scoped>
/* 이 CSS 없으면 v-cloak 혼자서는 아무 일도 안 함 */
[v-cloak] {
  display: none !important;
}
</style>
