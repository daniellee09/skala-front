<script setup>
import { ref, computed, watch, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { ElMessage } from 'element-plus'
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

// 새로고침 버튼은 결과를 토스트로 알려줌
const handleRefresh = async () => {
  await loadWeather()
  if (errorMessage.value) ElMessage.error(errorMessage.value)
  else ElMessage.success('최신 날씨로 갱신했습니다.')
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
      <div class="section-head">
        <h3>지역별 날씨 현황</h3>
        <el-button type="primary" plain :loading="isLoading" @click="handleRefresh">
          새로고침
        </el-button>
      </div>

      <!-- 로딩 중엔 회색 유령 레이아웃을 깔아서 화면이 덜컹거리지 않게 함 -->
      <el-skeleton v-if="isLoading" :rows="4" animated />

      <el-alert
        v-else-if="errorMessage"
        :title="errorMessage"
        type="error"
        show-icon
        :closable="false"
      />

      <template v-else>
        <WeatherCard
          v-for="item in filteredWeatherList"
          :key="item.id"
          :city-item="item"
          @select-card="(msg) => (selectedCityInfo = msg)"
          @click-detail="handleDetailJump"
        />

        <el-empty v-if="filteredWeatherList.length === 0" description="검색 결과가 없습니다." />
      </template>
    </BaseDashboardCard>

    <el-alert :title="selectedCityInfo" type="success" :closable="false" show-icon />
  </div>
</template>

<style scoped>
.section-head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
  margin-bottom: 12px;
}
.section-head h3 {
  font-size: 12.5px;
  font-weight: 600;
  letter-spacing: 0.06em;
  color: var(--color-text-soft);
}
</style>
