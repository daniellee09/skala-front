<script setup>
import { useRouter } from 'vue-router'

const router = useRouter()

const goHome = () => {
  router.push({ name: 'WeatherHome' })
}
</script>

<template>
  <!-- 가운데 정렬용 래퍼 -->
  <div class="not-found-container">
    <div class="not-found-content">
      <div class="error-icon">☀️❓</div>

      <h2>페이지를 찾을 수 없습니다.</h2>
      <p>요청하신 주소가 존재하지 않거나,<br />아직 개발되지 않았습니다.</p>

      <button class="home-button" @click="goHome">날씨 메인으로 이동</button>
    </div>
  </div>
</template>

<style scoped>
.not-found-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 60vh;
}

.not-found-content {
  text-align: center;
  background-color: var(--color-surface);
  padding: 48px 44px;
  border-radius: var(--radius);
  border: 1px solid var(--color-border);
  box-shadow: var(--shadow-md);
}

.error-icon {
  font-size: 4rem;
  margin-bottom: 16px;
}

h2 {
  font-size: 1.5rem;
  font-weight: 800;
  color: var(--color-heading);
  margin-bottom: 12px;
  letter-spacing: -0.02em;
}

p {
  font-size: 0.95rem;
  color: var(--color-text-soft);
  line-height: 1.7;
  margin-bottom: 28px;
}

.home-button {
  background-color: var(--color-brand);
  color: #fff;
  border: none;
  padding: 11px 28px;
  font-size: 0.95rem;
  font-weight: 700;
  border-radius: 999px;
  cursor: pointer;
  transition:
    background-color 0.15s ease,
    transform 0.1s ease;
}

.home-button:hover {
  background-color: var(--color-brand-dark);
}

.home-button:active {
  transform: scale(0.98);
}
</style>
