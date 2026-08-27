<script setup>
import { computed } from 'vue'
import { useConfigStore } from '@/stores/configStore.js'

// script 에서 props 쓰려면 변수로 받아야 함
const props = defineProps({
  cityItem: { type: Object, required: true },
})

const emit = defineEmits(['select-card', 'click-detail'])

const configStore = useConfigStore()

// 원본(섭씨)을 현재 단위에 맞춰 변환
const displayTemp = computed(() => {
  const rawTemp = props.cityItem.temp // 원본은 항상 섭씨
  if (configStore.unit === 'fahrenheit') {
    return Math.round((rawTemp * 9) / 5 + 32) // 화씨 변환
  }
  return rawTemp // 섭씨면 그대로
})

// 뱃지 판정은 변환 전 섭씨 기준이라 화씨로 바꿔도 결과가 안 흔들림
const isHot = computed(() => props.cityItem.temp >= 25)
</script>

<template>
  <el-card
    class="weather-card"
    shadow="hover"
    @click="emit('select-card', `${cityItem.name}이 선택되었습니다.`)"
  >
    <div class="card-row">
      <el-image
        v-if="cityItem.icon"
        :src="`https://openweathermap.org/img/wn/${cityItem.icon}@2x.png`"
        :alt="cityItem.status"
        class="weather-icon"
        fit="contain"
      />

      <div class="card-body">
        <div class="card-title">
          <el-text tag="b" size="large">{{ cityItem.name }}</el-text>
          <el-tag type="info" size="small" effect="plain">{{ cityItem.status }}</el-tag>
        </div>

        <el-text class="card-temp">
          현재 기온 <b>{{ displayTemp }}{{ configStore.unitSymbol }}</b>
        </el-text>
      </div>

      <div class="card-actions">
        <el-tag :type="isHot ? 'danger' : 'primary'" effect="dark" round>
          {{ isHot ? '🔥 더움' : '❄️ 선선함' }}
        </el-tag>

        <!-- .stop 안 걸면 카드 클릭까지 같이 발동함 -->
        <el-button
          size="small"
          plain
          @click.stop="emit('click-detail', cityItem.name, cityItem.status)"
        >
          상세보기
        </el-button>
      </div>
    </div>
  </el-card>
</template>

<style scoped>
.weather-card {
  margin-bottom: 10px;
  cursor: pointer;
  border-radius: var(--radius-sm);
}
.card-row {
  display: flex;
  align-items: center;
  gap: 14px;
}
.weather-icon {
  width: 52px;
  height: 52px;
  flex-shrink: 0;
}
.card-body {
  flex: 1;
  min-width: 0;
}
.card-title {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 2px;
}
.card-temp {
  display: block;
  color: var(--color-text-soft);
}
.card-actions {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 8px;
  flex-shrink: 0;
}

@media (max-width: 640px) {
  .card-row {
    flex-wrap: wrap;
  }
  .card-actions {
    flex-direction: row;
    width: 100%;
    justify-content: space-between;
  }
}
</style>
