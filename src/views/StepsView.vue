<script setup>
import WeatherMockup from '@/components/exercise/WeatherMockup.vue'
import WeatherComposition from '@/components/exercise/WeatherComposition.vue'
import WeatherParent from '@/components/exercise/WeatherParent.vue'
</script>

<template>
  <div class="steps-view">
    <h2>과제 진행 단계별 스냅샷</h2>
    <p class="desc">
      같은 날씨 대시보드를 단계별로 발전시킨 기록입니다. 최종 결과물은
      <strong>날씨 대시보드</strong> 메뉴에 있습니다.
    </p>

    <section>
      <h3>
        <span class="step-no">과제 1</span>
        날씨 목업
        <span class="step-tags">v-for · v-if · 이벤트 수식어</span>
      </h3>
      <WeatherMockup />
    </section>

    <section>
      <h3>
        <span class="step-no">과제 2</span>
        Composition API 적용
        <span class="step-tags">computed 검색 · watch 감시</span>
      </h3>
      <WeatherComposition />
    </section>

    <section>
      <h3>
        <span class="step-no">과제 3</span>
        컴포넌트 분리
        <span class="step-tags">props · emits · slot</span>
      </h3>
      <WeatherParent />
    </section>
  </div>
</template>

<style scoped>
.steps-view h2 {
  font-size: 20px;
  font-weight: 700;
  letter-spacing: -0.02em;
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
/* 초록 세로줄 + 회색 박스로 감싸던 걸 걷어내고, 밑줄 한 줄로만 구분 */
section h3 {
  display: flex;
  align-items: baseline;
  flex-wrap: wrap;
  gap: 8px;
  font-size: 15px;
  font-weight: 700;
  letter-spacing: -0.01em;
  color: var(--color-heading);
  padding-bottom: 9px;
  margin-bottom: 14px;
  border-bottom: 1px solid var(--color-border);
}

/* 과제 번호 — 제목 앞에 붙는 작은 표식 */
.step-no {
  padding: 2px 8px;
  font-size: 11.5px;
  font-weight: 600;
  letter-spacing: 0.04em;
  color: var(--color-text-soft);
  background: var(--color-surface-mute);
  border-radius: 999px;
}

/* 괄호로 나열하던 문법 목록 */
.step-tags {
  margin-left: auto;
  font-size: 12px;
  font-weight: 500;
  color: var(--color-text-soft);
}
</style>
