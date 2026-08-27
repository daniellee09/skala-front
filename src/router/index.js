import { createRouter, createWebHistory } from 'vue-router'
import WeatherHomeView from '../views/WeatherHomeView.vue'

const routes = [
  {
    // 최종 결과물: 실시간 날씨 대시보드
    path: '/',
    name: 'WeatherHome',
    component: WeatherHomeView,
  },
  {
    path: '/about',
    name: 'WeatherAbout',
    // 지연 로딩(Lazy Loading): 해당 경로 진입 시점에 다운로드
    component: () => import('../views/WeatherAboutView.vue'),
  },
  {
    // 동적 경로 매칭: /weather/seoul
    path: '/weather/:cityId',
    name: 'WeatherDetail',
    component: () => import('../views/WeatherDetailView.vue'),
  },
  {
    // 과제 1~3 단계별 스냅샷
    path: '/steps',
    name: 'Steps',
    component: () => import('../views/StepsView.vue'),
  },
  {
    // Code Challenge 실습 모음
    path: '/practice',
    name: 'Practice',
    component: () => import('../views/PracticeView.vue'),
  },
  {
    // Catch-all Route: 반드시 목록 마지막에 배치
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: () => import('../views/NotFoundView.vue'),
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
