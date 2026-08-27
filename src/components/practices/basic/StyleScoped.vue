<script setup>
// 스타일만 보는 예제라 스크립트는 비워둠
</script>

<template>
  <div class="practice-section">
    <h2>Scoped 스타일 및 외부 CSS 활용</h2>
    <p class="title">이 글자는 이 컴포넌트 내부에서만 빨간색이 됩니다.</p>
    <button class="btn-external">외부 CSS에서 불러온 버튼 스타일</button>
  </div>
</template>

<style scoped>
/* scoped 라 이 컴포넌트 안에서만 먹음 */
.title {
  color: #ff7675;
  font-weight: bold;
  font-size: 18px;
}
</style>

<style>
/* scoped 안 붙였으니 여기서 import 하면 전역으로 퍼짐 */
@import '@/assets/practice.css';
</style>
