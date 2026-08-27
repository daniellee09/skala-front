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
  font-size: 19px;
  font-weight: 800;
  color: var(--color-heading);
  margin-bottom: 6px;
}
.desc {
  font-size: 13px;
  color: var(--color-text-soft);
  margin-bottom: 24px;
}
section {
  margin-bottom: 36px;
}
section h3 {
  font-size: 14px;
  font-weight: 700;
  color: var(--color-heading);
  padding: 9px 14px;
  margin-bottom: 14px;
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  border-left: 4px solid var(--color-brand);
  border-radius: var(--radius-sm);
}
</style>
