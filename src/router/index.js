import { createRouter, createWebHistory } from 'vue-router'
import WeatherHomeView from '../views/WeatherHomeView.vue'

const routes = [
  {
    // 메인 - 실시간 날씨 대시보드
    path: '/',
    name: 'WeatherHome',
    component: WeatherHomeView,
  },
  {
    path: '/about',
    name: 'WeatherAbout',
    // 지연 로딩 - 이 페이지 들어갈 때 받아옴
    component: () => import('../views/WeatherAboutView.vue'),
  },
  {
    // 동적 경로 - /weather/seoul 형태
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
    // 나머지 전부 404. 반드시 맨 아래 있어야 함
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
