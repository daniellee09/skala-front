<script setup>
import WeatherMockup from '@/components/exercise/WeatherMockup.vue'
import WeatherComposition from '@/components/exercise/WeatherComposition.vue'
import WeatherParent from '@/components/exercise/WeatherParent.vue'
</script>

<template>
  <div class="steps-view">
    <h2>📚 과제 진행 단계별 스냅샷</h2>
    <p class="desc">
      같은 날씨 대시보드를 단계별로 발전시킨 기록입니다. 최종 결과물은
      <strong>날씨 대시보드</strong> 메뉴에 있습니다.
    </p>

    <section>
      <h3>과제 1 · 날씨 목업 (v-for / v-if / 이벤트 수식어)</h3>
      <WeatherMockup />
    </section>

    <section>
      <h3>과제 2 · Composition API 적용 (computed 검색 + watch 감시)</h3>
      <WeatherComposition />
    </section>

    <section>
      <h3>과제 3 · 컴포넌트 분리 (props / emits / slot)</h3>
      <WeatherParent />
    </section>
  </div>
</template>

<style scoped>
.steps-view h2 {
  font-size: 20px;
  font-weight: bold;
  margin-bottom: 6px;
}
.desc {
  font-size: 13px;
  color: #666;
  margin-bottom: 20px;
}
section {
  margin-bottom: 32px;
}
section h3 {
  font-size: 15px;
  font-weight: bold;
  padding: 8px 12px;
  margin-bottom: 12px;
  background: #f1f3f5;
  border-left: 4px solid #42b883;
  border-radius: 4px;
}
</style>
