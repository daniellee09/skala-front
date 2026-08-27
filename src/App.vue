<script setup>
import UnitToggler from './components/exercise/UnitToggler.vue'
</script>

<template>
  <div class="app-shell">
    <header class="app-header">
      <h1 class="app-title">⛅ SKALA Weather</h1>

      <nav class="navigation-bar">
        <RouterLink to="/" class="nav-item">날씨 대시보드</RouterLink>
        <RouterLink to="/about" class="nav-item">서비스 소개</RouterLink>
        <RouterLink to="/steps" class="nav-item">과제 단계</RouterLink>
        <RouterLink to="/practice" class="nav-item">실습 모음</RouterLink>
        <UnitToggler />
      </nav>
    </header>

    <main class="app-main">
      <!-- 주소 바뀌면 여기 내용만 갈아끼워짐 -->
      <RouterView />
    </main>
  </div>
</template>

<style>
/* 공통 스타일. scoped 아니라 전역으로 깔림 */
@import '@/assets/exercise.css';
@import '@/assets/practice.css';
</style>

<style scoped>
.app-header {
  margin-bottom: 24px;
}

.app-title {
  font-size: 20px;
  font-weight: 800;
  color: var(--color-heading);
  letter-spacing: -0.01em;
  margin-bottom: 14px;
}

.navigation-bar {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 4px;
  padding: 6px;
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: 999px;
  box-shadow: var(--shadow-sm);
}

.nav-item {
  padding: 7px 15px;
  border-radius: 999px;
  font-size: 14px;
  font-weight: 600;
  color: var(--color-text-soft);
  text-decoration: none;
  white-space: nowrap;
  transition:
    background 0.15s ease,
    color 0.15s ease;
}

.nav-item:hover {
  background: var(--color-surface-mute);
  color: var(--color-text);
}

/* 라우터가 현재 페이지 링크에 자동으로 붙여주는 클래스 */
.nav-item.router-link-exact-active {
  background: var(--color-brand);
  color: #fff;
}

.app-main {
  min-height: 60vh;
}

@media (max-width: 640px) {
  .navigation-bar {
    border-radius: var(--radius);
  }
  .nav-item {
    padding: 6px 11px;
    font-size: 13px;
  }
}
</style>
