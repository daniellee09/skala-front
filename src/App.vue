<script setup>
import UnitToggler from './components/exercise/UnitToggler.vue'
</script>

<template>
  <div class="app-shell">
    <header class="app-header">
      <h1>⛅ SKALA Weather Dashboard</h1>
      <nav class="navigation-bar">
        <RouterLink to="/" class="nav-item">🌦️ 날씨 대시보드</RouterLink>
        <span class="divider">|</span>
        <RouterLink to="/about" class="nav-item">ℹ️ 서비스 소개</RouterLink>
        <span class="divider">|</span>
        <RouterLink to="/steps" class="nav-item">📚 과제 단계</RouterLink>
        <span class="divider">|</span>
        <RouterLink to="/practice" class="nav-item">🧪 실습 모음</RouterLink>
        <UnitToggler />
      </nav>
    </header>

    <main class="app-main">
      <!-- 주소창 변경에 따라 실제 화면이 갈아 끼워지는 구역 -->
      <RouterView />
    </main>
  </div>
</template>

<style>
/* 프로젝트 공통 스타일 (전역) */
@import '@/assets/exercise.css';
@import '@/assets/practice.css';
</style>

<style scoped>
.app-shell {
  max-width: 900px;
  margin: 0 auto;
}

.app-header {
  margin-bottom: 20px;
}

.app-header h1 {
  font-size: 22px;
  font-weight: bold;
  margin-bottom: 12px;
}

.navigation-bar {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 10px 0;
  border-bottom: 2px solid #dee2e6;
  font-size: 14px;
}

.navigation-bar .router-link-exact-active {
  font-weight: bold;
  color: #42b883;
}
</style>
