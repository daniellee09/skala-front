import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vueDevTools(),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  // 개발 서버 설정
  server: {
    port: 3000, // 포트 3000 고정
    open: true, // npm run dev 하면 브라우저 자동 실행
  },
  // 빌드 산출물 설정
  build: {
    outDir: 'dist', // 정적 리소스가 떨어질 디렉토리
  },
})
