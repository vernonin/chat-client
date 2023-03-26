import { defineConfig } from 'vite'
// import { resolve } from 'path'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/chat': {
        target: 'http://47.243.54.53:18001',
      }
    }
  }
})
