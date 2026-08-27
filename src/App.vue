<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import UnitToggler from './components/exercise/UnitToggler.vue'

const route = useRoute()

// el-menu 는 index 값으로 현재 항목을 판단해서, 주소를 그대로 넘겨줌
// /weather/seoul 처럼 하위 경로일 때도 대시보드 탭이 켜져 있어야 해서 앞부분만 잘라 씀
const activeMenu = computed(() => {
  if (route.path.startsWith('/weather')) return '/'
  return route.path
})
</script>

<template>
  <el-container class="app-shell" direction="vertical">
    <el-header class="app-header" height="auto">
      <h1 class="app-title">⛅ SKALA Weather</h1>

      <div class="nav-row">
        <!-- router 속성을 켜면 index 가 곧 이동할 주소가 됨 -->
        <el-menu
          :default-active="activeMenu"
          mode="horizontal"
          router
          :ellipsis="false"
          class="nav-menu"
        >
          <el-menu-item index="/">날씨 대시보드</el-menu-item>
          <el-menu-item index="/about">서비스 소개</el-menu-item>
          <el-menu-item index="/steps">과제 단계</el-menu-item>
          <el-menu-item index="/practice">실습 모음</el-menu-item>
        </el-menu>

        <UnitToggler />
      </div>
    </el-header>

    <el-main class="app-main">
      <!-- 주소 바뀌면 여기 내용만 갈아끼워짐 -->
      <RouterView />
    </el-main>
  </el-container>
</template>

<style>
/* 공통 스타일. scoped 아니라 전역으로 깔림 */
@import '@/assets/exercise.css';
@import '@/assets/practice.css';
</style>

<style scoped>
.app-shell {
  padding: 0;
}

.app-header {
  padding: 0;
  margin-bottom: 20px;
}

.app-title {
  font-size: 20px;
  font-weight: 800;
  color: var(--color-heading);
  letter-spacing: -0.01em;
  margin-bottom: 10px;
}

.nav-row {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 10px;
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: var(--radius);
  padding: 0 12px 0 4px;
  box-shadow: var(--shadow-sm);
}

/* el-menu 가 기본으로 깔고 오는 테두리와 배경을 카드 안에 맞춰 정리 */
.nav-menu {
  flex: 1;
  min-width: 260px;
  border-bottom: none;
  background: transparent;
}

.app-main {
  padding: 0;
  min-height: 60vh;
}

@media (max-width: 640px) {
  .nav-row {
    padding: 0 8px;
  }
}
</style>
