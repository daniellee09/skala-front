<script setup>
import { useRouter } from 'vue-router'

const router = useRouter()

const handleGoHome = () => {
  router.push('/')
}

// 과제를 쌓아 올린 순서. el-timeline 이 세로선으로 정렬해 줌
const steps = [
  { title: '과제 1 · 날씨 목업', desc: 'v-for / v-if 로 카드 목록과 온도 뱃지 구성' },
  { title: '과제 2 · Composition API', desc: 'computed 검색 필터와 watch 로 상태 추적' },
  { title: '과제 3 · 컴포넌트 분리', desc: 'props 와 emit 으로 4개 부품으로 분리' },
  { title: '과제 4 · Vue Router', desc: '동적 경로, 404, 검색어 쿼리스트링 동기화' },
  { title: '과제 5 · Pinia', desc: '섭씨 ↔ 화씨 단위를 전역 스토어로 관리' },
  { title: '과제 6 · Axios', desc: 'OpenWeatherMap 실 API 연동과 대기질 · 5일 예보 확장' },
  { title: '과제 7 · Element Plus', desc: '외부 UI 라이브러리로 화면 전반 교체' },
]

const stack = [
  { name: 'Vue 3', version: '3.5.41', role: 'Composition API 기반 UI 구성' },
  { name: 'Vue Router', version: '5.2.0', role: '라우팅과 404 처리' },
  { name: 'Pinia', version: '3.0.4', role: '온도 단위 전역 상태' },
  { name: 'Axios', version: '1.20.0', role: 'OpenWeatherMap · Open-Meteo 통신' },
  { name: 'Element Plus', version: '2.14.5', role: 'UI 컴포넌트' },
]
</script>

<template>
  <div class="about-view">
    <el-page-header title="대시보드" @back="handleGoHome">
      <template #content>
        <span class="page-title">ℹ️ 서비스 소개</span>
      </template>
    </el-page-header>

    <el-card shadow="never" class="block">
      <el-text>
        SK AX Full-Stack Engineering 과정에서 만든 실습용 기상 대시보드입니다. 목업 화면 하나에서
        시작해 라우터와 전역 상태, 실제 API, UI 라이브러리를 차례로 얹어 나갔습니다.
      </el-text>
    </el-card>

    <el-card shadow="never" class="block">
      <template #header><strong>🧱 사용 스택</strong></template>
      <el-table :data="stack" size="small" stripe>
        <el-table-column prop="name" label="기술" width="130" />
        <el-table-column prop="version" label="버전" width="100" />
        <el-table-column prop="role" label="역할" />
      </el-table>
    </el-card>

    <el-card shadow="never" class="block">
      <template #header><strong>🗂️ 과제 진행 순서</strong></template>
      <el-timeline>
        <el-timeline-item
          v-for="step in steps"
          :key="step.title"
          :timestamp="step.title"
          placement="top"
        >
          <el-text type="info">{{ step.desc }}</el-text>
        </el-timeline-item>
      </el-timeline>
    </el-card>

    <el-button type="primary" class="block home-btn" @click="handleGoHome">
      대시보드 홈으로 이동
    </el-button>
  </div>
</template>

<style scoped>
.about-view {
  max-width: 640px;
  margin: 0 auto;
}
.page-title {
  font-size: 15px;
  font-weight: 700;
  color: var(--color-heading);
}
.block {
  margin-top: 16px;
}
.home-btn {
  width: 100%;
}
</style>
