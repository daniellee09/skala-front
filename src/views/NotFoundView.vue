<script setup>
import { useRouter } from 'vue-router'

const router = useRouter()

const goHome = () => {
  router.push({ name: 'WeatherHome' })
}
</script>

<template>
  <!-- el-result 가 아이콘 + 제목 + 설명 + 버튼 배치를 통째로 잡아줌 -->
  <el-result
    icon="warning"
    title="페이지를 찾을 수 없습니다."
    sub-title="요청하신 주소가 존재하지 않거나, 아직 개발되지 않았습니다."
    class="not-found"
  >
    <template #extra>
      <el-button type="primary" round @click="goHome">날씨 메인으로 이동</el-button>
    </template>
  </el-result>
</template>

<style scoped>
.not-found {
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: var(--radius);
  box-shadow: var(--shadow-md);
  padding: 40px 20px;
}
</style>
