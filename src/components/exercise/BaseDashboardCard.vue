<template>
  <!-- 직접 그리던 테두리·여백을 el-card 로 넘김. 슬롯 구조는 그대로라 쓰는 쪽은 변경 없음 -->
  <el-card class="base-dashboard-card" shadow="never">
    <slot></slot>
  </el-card>
</template>

<style scoped>
.base-dashboard-card {
  margin-bottom: 16px;
  border-radius: var(--radius);
}
</style>
