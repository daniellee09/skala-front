<script setup>
// 도시별 상세 날씨 페이지
import { ref, computed, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useConfigStore } from '@/stores/configStore.js'
import { fetchWeatherByCity, fetchAirPollution, fetchForecast } from '@/services/weatherApi.js'

const route = useRoute()
const router = useRouter()
const configStore = useConfigStore()
const forecast = ref([])

const cityData = ref(null)
const airData = ref(null)

const isLoading = ref(false)
const errorMessage = ref('')

// cityData 가 처음엔 null 이라 가드 필수
const displayTemp = computed(() => {
  if (!cityData.value) return null
  const rawTemp = cityData.value.temp
  if (configStore.unit === 'fahrenheit') return Math.round((rawTemp * 9) / 5 + 32)
  return rawTemp
})

// AQI 는 1(좋음) ~ 5(최악). 숫자에 맞는 태그 색을 골라줌
const aqiTagType = computed(() => {
  const map = { 1: 'success', 2: 'primary', 3: 'warning', 4: 'danger', 5: 'danger' }
  return map[airData.value?.aqi] ?? 'info'
})

const loadDetail = async (cityId) => {
  isLoading.value = true
  // 이전 도시 데이터가 잠깐 남아 보이지 않게 비우고 시작
  errorMessage.value = ''
  cityData.value = null
  airData.value = null
  forecast.value = []

  try {
    const weather = await fetchWeatherByCity(cityId)
    cityData.value = weather

    // 둘은 서로 상관없으니 동시에 요청
    const [air, fc] = await Promise.all([
      fetchAirPollution(weather.lat, weather.lon),
      fetchForecast(weather.lat, weather.lon),
    ])
    airData.value = air
    forecast.value = fc
  } catch (err) {
    errorMessage.value = err.message
  } finally {
    isLoading.value = false
  }
}

// 같은 라우트에서 cityId 만 바뀌면 컴포넌트가 재사용돼 onMounted 가 다시 안 돈다.
// route 를 감시하면 최초 진입(immediate)과 도시 변경을 한 곳에서 처리할 수 있음
watch(() => route.params.cityId, loadDetail, { immediate: true })
</script>

<template>
  <div v-loading="isLoading" class="detail-container">
    <!-- el-page-header 가 뒤로가기 버튼과 제목 줄을 통째로 잡아줌 -->
    <el-page-header title="대시보드" @back="router.push('/')">
      <template #content>
        <span class="page-title">지역별 상세 기상 관측 정보</span>
      </template>
    </el-page-header>

    <el-alert
      v-if="errorMessage"
      :title="errorMessage"
      type="error"
      show-icon
      :closable="false"
      class="block"
    />

    <el-card v-if="cityData" shadow="never" class="block">
      <template #header>
        <span class="card-title">{{ cityData.name }}</span>
      </template>

      <el-descriptions :column="2" border>
        <el-descriptions-item label="실시간 기온">
          <el-text type="primary" tag="b" size="large">
            {{ displayTemp }}{{ configStore.unitSymbol }}
          </el-text>
        </el-descriptions-item>
        <el-descriptions-item label="기상 현황">{{ cityData.status }}</el-descriptions-item>
        <el-descriptions-item label="대기 습도">{{ cityData.humidity }}</el-descriptions-item>
        <el-descriptions-item label="현재 풍속">{{ cityData.wind }}</el-descriptions-item>
      </el-descriptions>
    </el-card>

    <el-empty
      v-else-if="!isLoading && !errorMessage"
      description="해당 지역의 상세 데이터가 없습니다."
    />

    <el-card v-if="airData" shadow="never" class="block">
      <template #header>
        <span class="card-label">대기질</span>
      </template>

      <el-descriptions :column="3" border>
        <el-descriptions-item label="통합지수">
          <el-tag :type="aqiTagType" effect="dark">{{ airData.aqiLabel }}</el-tag>
        </el-descriptions-item>
        <el-descriptions-item label="미세먼지 PM10">{{ airData.pm10 }} ㎍/㎥</el-descriptions-item>
        <el-descriptions-item label="초미세먼지 PM2.5">
          {{ airData.pm2_5 }} ㎍/㎥
        </el-descriptions-item>
      </el-descriptions>
    </el-card>

    <el-card v-if="forecast.length" shadow="never" class="block">
      <template #header>
        <span class="card-label">5일간의 일기예보</span>
        <el-text type="info" size="small"> Open-Meteo</el-text>
      </template>

      <el-table :data="forecast" stripe size="small">
        <el-table-column prop="date" label="날짜" />
        <el-table-column label="날씨">
          <template #default="{ row }">
            <span class="fc-icon">{{ row.icon }}</span>
            {{ row.status }}
          </template>
        </el-table-column>
        <el-table-column label="최고" width="90">
          <template #default="{ row }">
            <span class="fc-max">{{ row.max }}℃</span>
          </template>
        </el-table-column>
        <el-table-column label="최저" width="90">
          <template #default="{ row }">
            <span class="fc-min">{{ row.min }}℃</span>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
  </div>
</template>

<style scoped>
.detail-container {
  max-width: 640px;
  margin: 0 auto;
  min-height: 200px;
}
.page-title {
  /* 뒤로가기 줄에 붙는 안내 문구라 라벨 크기로 낮춤 */
  font-size: 12.5px;
  font-weight: 600;
  letter-spacing: 0.06em;
  color: var(--color-text-soft);
}

/* 도시명은 이 페이지의 주인공이라 제목 크기를 유지 */
.card-title {
  font-size: 18px;
  font-weight: 700;
  letter-spacing: -0.01em;
  color: var(--color-heading);
}

/* 대기질 · 일기예보는 묶음 이름이라 대시보드 섹션 제목과 같은 규격 */
.card-label {
  font-size: 12.5px;
  font-weight: 600;
  letter-spacing: 0.06em;
  color: var(--color-text-soft);
}
.block {
  margin-top: 16px;
}

/* 예보 표 — 🔺🔻 대신 색으로 최고·최저를 구분 */
.fc-icon {
  margin-right: 4px;
}
.fc-max {
  font-weight: 600;
  color: #c2410c;
}
.fc-min {
  font-weight: 600;
  color: #1d4ed8;
}
</style>
