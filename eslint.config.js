import { defineConfig, globalIgnores } from 'eslint/config'
import globals from 'globals'
import js from '@eslint/js'
import pluginVue from 'eslint-plugin-vue'
import pluginOxlint from 'eslint-plugin-oxlint'
import skipFormatting from 'eslint-config-prettier/flat'

export default defineConfig([
  {
    name: 'app/files-to-lint',
    files: ['**/*.{vue,js,mjs,jsx}'],
  },

  globalIgnores(['**/dist/**', '**/dist-ssr/**', '**/coverage/**']),

  {
    languageOptions: {
      globals: {
        ...globals.browser,
      },
    },
  },

  js.configs.recommended,
  ...pluginVue.configs['flat/essential'],

  ...pluginOxlint.buildFromOxlintConfigFile('.oxlintrc.json'),

  // skipFormatting 이 규칙을 끄는 쪽이라 커스텀 규칙은 그 뒤에 둬야 살아남음
  skipFormatting,

  {
    name: 'app/custom-rules',
    rules: {
      // == 는 타입을 멋대로 변환해서 버그가 숨음. === 만 허용
      eqeqeq: ['error', 'always'],
      // 실습 중 값 확인용으로 console.log 를 계속 쓰므로 열어둠
      'no-console': 'off',
    },
  },
])
