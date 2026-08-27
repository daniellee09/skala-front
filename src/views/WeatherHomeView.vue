<script setup>
import { ref, computed, watch, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { fetchAllWeather } from '@/services/weatherApi.js'

import BaseDashboardCard from '../components/exercise/BaseDashboardCard.vue'
import SearchBar from '../components/exercise/SearchBar.vue'
import WeatherCard from '../components/exercise/WeatherCard.vue'

const router = useRouter()
const route = useRoute()

const weatherList = ref([]) // 빈 배열로 시작 ㄱㄱ
const isLoading = ref(false)
const errorMessage = ref('')

const searchQuery = ref('')
const selectedCityInfo = ref('카드를 클릭하거나 검색해 보세요.')

const loadWeather = async () => {
  isLoading.value = true
  errorMessage.value = ''
  try {
    weatherList.value = await fetchAllWeather()
  } catch (err) {
    // 실패 원인별 안내
    if (err.response?.status === 401) {
      errorMessage.value = 'API 키가 유효하지 않습니다.'
    } else if (err.code === 'ECONNABORTED') {
      errorMessage.value = '요청 시간이 초과되었습니다.'
    } else {
      errorMessage.value = `날씨 정보를 불러오지 못했습니다: ${err.message}`
    }
    console.error(err)
  } finally {
    isLoading.value = false // 성공이든 실패든 로딩은 무조건 끝남
  }
}

// 초기 마운트 시 주소창의 쿼리 스트링 읽어서 상태 복원
onMounted(() => {
  if (route.query.search) searchQuery.value = route.query.search
  loadWeather()
})

// 검색어 변경 시 주소창 쿼리 스트링 업데이트
watch(searchQuery, (newQuery) => {
  router.push({
    path: route.path,
    query: { search: newQuery || undefined }, // 빈 문자열이면 쿼리 제거
  })
})
const filteredWeatherList = computed(() => {
  const query = searchQuery.value.trim()
  if (!query) return weatherList.value
  return weatherList.value.filter((item) => item.name.includes(query))
})

// 자식 카드 컴포넌트의 상세보기 신호를 받으면 해당 ID 주소로 라우터 점프 실행
const handleDetailJump = (id) => {
  router.push(`/weather/${id}`)
}
</script>

<template>
  <div class="dashboard-wrapper">
    <BaseDashboardCard>
      <SearchBar :current-query="searchQuery" @update-query="(val) => (searchQuery = val)" />
    </BaseDashboardCard>

    <BaseDashboardCard>
      <h3>🏙️ 지역별 날씨 현황</h3>

      <p v-if="isLoading">⏳ 실시간 날씨 정보를 불러오는 중...</p>
      <p v-else-if="errorMessage" class="error-box">⚠️ {{ errorMessage }}</p>

      <template v-else>
        <WeatherCard
          v-for="item in filteredWeatherList"
          :key="item.id"
          :city-item="item"
          @select-card="(msg) => (selectedCityInfo = msg)"
          @click-detail="handleDetailJump(item.id)"
        />
        <p v-if="filteredWeatherList.length === 0">😭 검색 결과가 없습니다.</p>
      </template>

      <button @click="loadWeather" :disabled="isLoading">🔄 새로고침</button>
    </BaseDashboardCard>

    <div class="status-bar">{{ selectedCityInfo }}</div>
  </div>
</template>

<style scoped>
.status-bar {
  background: #e8f5e9;
  padding: 11px;
  text-align: center;
  color: #2e7d32;
  font-weight: 700;
  font-size: 14px;
  border-radius: var(--radius-sm);
}
.error-box {
  background: #fdecea;
  color: var(--color-danger);
  padding: 11px 13px;
  border-radius: var(--radius-sm);
  font-size: 14px;
}
</style>
