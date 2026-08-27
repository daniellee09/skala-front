import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'

// GitHub Pages 는 https://<계정>.github.io/<저장소>/ 로 서비스돼서
// 빌드할 때만 저장소 이름을 base 로 깔아야 자산 경로가 맞는다.
// 로컬 dev 는 루트로 띄우려고 command 로 갈라둠
const REPO_BASE = '/skala-front/'

// https://vite.dev/config/
export default defineConfig(({ command }) => ({
  base: command === 'build' ? REPO_BASE : '/',
  plugins: [vue(), vueDevTools()],
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
}))
