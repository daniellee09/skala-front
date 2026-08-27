<script setup>
import { ref } from 'vue'

// 3장 - 기본 문법 / 디렉티브
import SampleOne from '@/components/practices/basic/SampleOne.vue'
import SampleTwo from '@/components/practices/basic/SampleTwo.vue'
import VueText from '@/components/practices/basic/VueText.vue'
import VueHtml from '@/components/practices/basic/VueHtml.vue'
import VueHtmlXss from '@/components/practices/basic/VueHtmlXss.vue'
import VueBind from '@/components/practices/basic/VueBind.vue'
import VueBindClass from '@/components/practices/basic/VueBindClass.vue'
import VueBindStyle from '@/components/practices/basic/VueBindStyle.vue'
import VueBindShorthand from '@/components/practices/basic/VueBindShorthand.vue'
import VueIf from '@/components/practices/basic/VueIf.vue'
import VueShow from '@/components/practices/basic/VueShow.vue'
import VueFor from '@/components/practices/basic/VueFor.vue'
import VuePre from '@/components/practices/basic/VuePre.vue'
import VueCloak from '@/components/practices/basic/VueCloak.vue'
import VueOnce from '@/components/practices/basic/VueOnce.vue'
import VueMemo from '@/components/practices/basic/VueMemo.vue'

// 3장 - 이벤트 / 폼 / 스타일
import EventBasic from '@/components/practices/basic/EventBasic.vue'
import EventObject from '@/components/practices/basic/EventObject.vue'
import EventModifier from '@/components/practices/basic/EventModifier.vue'
import ModelBasic from '@/components/practices/basic/ModelBasic.vue'
import ModelForm from '@/components/practices/basic/ModelForm.vue'
import ModelModifier from '@/components/practices/basic/ModelModifier.vue'
import StyleScoped from '@/components/practices/basic/StyleScoped.vue'

// 4장 - Composition API
import ReactiveRef from '@/components/practices/composition/ReactiveRef.vue'
import ReactiveReactive from '@/components/practices/composition/ReactiveReactive.vue'
import ComputedBasic from '@/components/practices/composition/ComputedBasic.vue'
import WatchersBasic from '@/components/practices/composition/WatchersBasic.vue'
import WatchersMulti from '@/components/practices/composition/WatchersMulti.vue'
import WatchersDeep from '@/components/practices/composition/WatchersDeep.vue'
import WatchersReactive from '@/components/practices/composition/WatchersReactive.vue'
import WatchersRefArray from '@/components/practices/composition/WatchersRefArray.vue'
import WatchersReactiveArray from '@/components/practices/composition/WatchersReactiveArray.vue'
import WatchersWatchEffect from '@/components/practices/composition/WatchersWatchEffect.vue'

// 5장 - 컴포넌트
import LifecycleParent from '@/components/practices/component/LifecycleParent.vue'
import PropsEmitsParent from '@/components/practices/component/PropsEmitsParent.vue'
import SlotDefaultParent from '@/components/practices/component/SlotDefaultParent.vue'
import SlotNamedParent from '@/components/practices/component/SlotNamedParent.vue'
import SlotScopedParent from '@/components/practices/component/SlotScopedParent.vue'

// 7·8장 - Pinia / Axios
import StoreCounter from '@/components/practices/library/StoreCounter.vue'
import AxiosWeather from '@/components/practices/library/AxiosWeather.vue'
import AxiosJson from '@/components/practices/library/AxiosJson.vue'

// 9장 - UI Library / Modern JavaScript
import ElementPlusDemo from '@/components/practices/library/ElementPlus.vue'
import EcmaScript from '@/components/practices/library/EcmaScript.vue'

const tabs = [
  { id: 'syntax', label: '3장 · Vue Syntax' },
  { id: 'event', label: '3장 · 이벤트/폼/스타일' },
  { id: 'composition', label: '4장 · Composition API' },
  { id: 'component', label: '5장 · Components' },
  { id: 'library', label: '7·8장 · Pinia/Axios' },
  { id: 'ui', label: '9장 · Element Plus/ES6+' },
]

const activeTab = ref('syntax')
</script>

<template>
  <div class="practice-view">
    <h2>🧪 Code Challenge 실습 모음</h2>

    <nav class="tab-bar">
      <button
        v-for="tab in tabs"
        :key="tab.id"
        :class="{ active: activeTab === tab.id }"
        @click="activeTab = tab.id"
      >
        {{ tab.label }}
      </button>
    </nav>

    <!-- 3장: 기본 문법 및 디렉티브 -->
    <template v-if="activeTab === 'syntax'">
      <SampleOne />
      <SampleTwo />
      <VueText />
      <VueHtml />
      <VueHtmlXss />
      <VueBind />
      <VueBindClass />
      <VueBindStyle />
      <VueBindShorthand />
      <VueIf />
      <VueShow />
      <VueFor />
      <VuePre />
      <VueCloak />
      <VueOnce />
      <VueMemo />
    </template>

    <!-- 3장: 이벤트 핸들링 / 폼 바인딩 / 스타일 -->
    <template v-else-if="activeTab === 'event'">
      <EventBasic />
      <EventObject />
      <EventModifier />
      <ModelBasic />
      <ModelForm />
      <ModelModifier />
      <StyleScoped />
    </template>

    <!-- 4장: Composition API -->
    <template v-else-if="activeTab === 'composition'">
      <ReactiveRef />
      <ReactiveReactive />
      <ComputedBasic />
      <WatchersBasic />
      <WatchersMulti />
      <WatchersDeep />
      <WatchersReactive />
      <WatchersRefArray />
      <WatchersReactiveArray />
      <WatchersWatchEffect />
    </template>

    <!-- 5장: 컴포넌트 -->
    <template v-else-if="activeTab === 'component'">
      <LifecycleParent />
      <PropsEmitsParent />
      <SlotDefaultParent />
      <SlotNamedParent />
      <SlotScopedParent />
    </template>

    <!-- 7·8장: Pinia / Axios -->
    <template v-else-if="activeTab === 'library'">
      <StoreCounter />
      <AxiosWeather />
      <AxiosJson />
    </template>

    <!-- 9장: Element Plus / Modern JavaScript -->
    <template v-else>
      <ElementPlusDemo />
      <EcmaScript />
    </template>
  </div>
</template>

<style scoped>
.practice-view h2 {
  font-size: 19px;
  font-weight: 800;
  color: var(--color-heading);
  margin-bottom: 14px;
}
.tab-bar {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  margin-bottom: 18px;
}
.tab-bar button {
  padding: 8px 14px;
  border: 1px solid var(--color-border-strong);
  border-radius: 999px;
  background: var(--color-surface);
  color: var(--color-text-soft);
  font-size: 13px;
  font-weight: 600;
  cursor: pointer;
  transition:
    background 0.15s ease,
    color 0.15s ease,
    border-color 0.15s ease;
}
.tab-bar button:hover {
  border-color: var(--color-brand);
  color: var(--color-text);
}
.tab-bar button.active {
  background: var(--color-brand);
  border-color: var(--color-brand);
  color: #fff;
}
</style>
