<script setup>
// 지역별 상세 기상관측 정보를 보여주는 페이지
import { ref, computed, onMounted } from 'vue'
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

// displayTemp 는 기존 그대로 — 이미 null 가드가 있어서 손댈 필요 없음
const displayTemp = computed(() => {
  if (!cityData.value) return null
  const rawTemp = cityData.value.temp
  if (configStore.unit === 'fahrenheit') return Math.round((rawTemp * 9) / 5 + 32)
  return rawTemp
})

onMounted(async () => {
  isLoading.value = true
  try {
    const weather = await fetchWeatherByCity(route.params.cityId)
    cityData.value = weather

    // 대기오염과 예보는 서로 독립 → 병렬로 동시 발사
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
})
</script>

<template>
  <div class="detail-container">
    <h3>📊 지역별 상세 기상 관측 정보</h3>
    <hr />

    <div v-if="cityData" class="info-card">
      <h4>📍 지정 지역: {{ cityData.name }}</h4>
      <p>
        실시간 기온: <strong>{{ displayTemp }}{{ configStore.unitSymbol }}</strong>
      </p>
      <p>기상 현황: {{ cityData.status }}</p>
      <p>대기 습도: {{ cityData.humidity }}</p>
      <p>현재 풍속: {{ cityData.wind }}</p>
    </div>
    <div v-else>
      <p>해당 지역의 상세 데이터 장부가 존재하지 않습니다.</p>
    </div>
    <div v-if="airData" class="info-card">
      <h4>🌫️ 대기질</h4>
      <p>
        통합지수: <strong>{{ airData.aqiLabel }}</strong>
      </p>
      <p>미세먼지(PM10): {{ airData.pm10 }} ㎍/㎥</p>
      <p>초미세먼지(PM2.5): {{ airData.pm2_5 }} ㎍/㎥</p>
    </div>
    <div v-if="forecast.length" class="info-card">
      <h4>📅 5일 예보 <small>(Open-Meteo)</small></h4>
      <div class="forecast-row">
        <div v-for="day in forecast" :key="day.date" class="forecast-item">
          <div class="date">{{ day.date.slice(5) }}</div>
          <div class="max">🔺 {{ day.max }}℃</div>
          <div class="min">🔻 {{ day.min }}℃</div>
        </div>
      </div>
    </div>

    <button @click="router.push('/')" class="back-btn">← 메인 대시보드로 돌아가기</button>
  </div>
</template>

<style scoped>
.detail-container {
  margin: 0 auto;
  background: white;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
}
.info-card {
  background: #f1f2f6;
  padding: 15px;
  border-radius: 6px;
  margin: 15px 0;
}
.forecast-row {
  display: flex;
  gap: 8px;
}
.forecast-item {
  flex: 1;
  text-align: center;
  padding: 8px 4px;
  background: #fff;
  border-radius: 6px;
  font-size: 13px;
}
.forecast-item .date {
  font-weight: bold;
  margin-bottom: 4px;
}
.back-btn {
  padding: 8px 12px;
  background: #2c3e50;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}
</style>
