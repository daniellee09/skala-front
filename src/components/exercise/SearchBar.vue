<script setup>
// 부모한테 검색어 올려보낼 이벤트 등록
defineEmits(['update-query'])

// 현재 검색어는 부모한테 받아옴 (한글 입력 안 깨지게)
defineProps({
  currentQuery: {
    type: String,
    default: '',
  },
})
</script>

<template>
  <div class="search-inner">
    <h3>도시 검색</h3>

    <!-- el-input 은 v-model 대신 :model-value + @input 으로도 쓸 수 있음.
         값의 주인은 여전히 부모라서 이 형태를 유지함 -->
    <el-input
      :model-value="currentQuery"
      placeholder="검색할 도시 이름 입력"
      clearable
      size="large"
      @input="(val) => $emit('update-query', val)"
      @clear="$emit('update-query', '')"
    />

    <p class="search-status">
      검색 중인 도시:
      <el-text v-if="currentQuery" type="primary" tag="strong">{{ currentQuery }}</el-text>
      <el-text v-else type="info">전체</el-text>
    </p>
  </div>
</template>

<style scoped>
.search-inner h3 {
  /* 카드 안 라벨 역할이라 크게 쓰지 않고, 자간을 벌려 정돈된 느낌만 준다 */
  font-size: 12.5px;
  font-weight: 600;
  letter-spacing: 0.06em;
  color: var(--color-text-soft);
  margin-bottom: 10px;
}
.search-status {
  margin-top: 8px;
  font-size: 13px;
  color: var(--color-text-soft);
}
</style>
