import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api/v1/auth': {
        target: 'http://localhost:5000',
        changeOrigin: true,
      },
      '/api/v1/listings': {
        target: 'http://localhost:5002',
        changeOrigin: true,
      },
      '/api/v1/explore': {
        target: 'http://localhost:5003',
        changeOrigin: true,
      },
      '/api/v1/search': {
        target: 'http://localhost:5003',
        changeOrigin: true,
      },
      '/api/v1/admin': {
        target: 'http://localhost:5004',
        changeOrigin: true,
      },
    },
  },
})
