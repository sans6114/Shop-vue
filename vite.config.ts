import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import VueDevTools from 'vite-plugin-vue-devtools'

import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(), VueDevTools()],
  server: {
    host: true,
    open: true
  },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  }
})
