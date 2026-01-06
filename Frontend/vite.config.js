import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: '0.0.0.0',   // 👈 ADD THIS
    port: 5173,        // optional but recommended
    proxy: {
      '/api': {
        target: 'http://localhost:3000',
        changeOrigin: true
      },
      '/image': {
        target: 'http://localhost:3000',
        changeOrigin: true
      }
    }
  }
})
