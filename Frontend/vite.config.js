import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

const dockerFrontendProxy = 'http://localhost:3000'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api/v1/auth': {
        target: dockerFrontendProxy,
        changeOrigin: true,
      },
      '/api/v1/listings': {
        target: dockerFrontendProxy,
        changeOrigin: true,
      },
      '/api/v1/explore': {
        target: dockerFrontendProxy,
        changeOrigin: true,
      },
      '/api/v1/search': {
        target: dockerFrontendProxy,
        changeOrigin: true,
      },
      '/api/v1/admin': {
        target: dockerFrontendProxy,
        changeOrigin: true,
      },
    },
  },
})
