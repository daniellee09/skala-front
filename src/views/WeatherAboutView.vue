<script setup>
import { useRouter } from 'vue-router'

const router = useRouter()

const handleGoHome = () => {
  router.push('/')
}
</script>

<template>
  <div>
    <h3>ℹ️ 서비스 소개</h3>
    <hr />

    <div class="description-box">
      <p>
        본 앱은 <strong>Vue 3</strong> 및 <strong>Vue Router 4</strong> 기반 제작된 실습용 기상 관측
        대시보드 시스템입니다.
      </p>
      <ul>
        <li><code>components/exercise/</code> 폴더 내부의 독립 부품 연동</li>
        <li>클라이언트 사이드 라우팅을 통한 새로고침 없는 화면 전환</li>
        <li>URL 쿼리 스트링 매핑을 활용한 실시간 검색 상태 동기화</li>
      </ul>
    </div>

    <button @click="handleGoHome" class="home-btn">대시보드 홈으로 이동</button>
  </div>
</template>

<style scoped>
h3 {
  font-size: 16px;
  font-weight: 700;
  color: var(--color-heading);
  padding-bottom: 12px;
  border-bottom: 2px solid var(--color-brand);
}
hr {
  display: none;
}
.description-box {
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  padding: 18px;
  border-radius: var(--radius);
  line-height: 1.7;
  font-size: 14px;
  margin-top: 16px;
}
ul {
  padding-left: 20px;
  margin: 10px 0 0;
}
li {
  margin-bottom: 6px;
  color: var(--color-text-soft);
}
code {
  background-color: var(--color-surface-mute);
  padding: 2px 6px;
  border-radius: 4px;
  color: var(--color-brand-dark);
  font-size: 13px;
}
.home-btn {
  width: 100%;
  margin-top: 16px;
  padding: 11px;
  background-color: var(--color-brand);
  color: #fff;
  border: none;
  border-radius: var(--radius-sm);
  font-size: 14px;
  font-weight: 700;
  cursor: pointer;
  transition: opacity 0.15s ease;
}
.home-btn:hover {
  opacity: 0.88;
}
</style>
