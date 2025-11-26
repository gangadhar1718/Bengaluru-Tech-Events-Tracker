import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/Bengaluru-Tech-Events-Tracker/',
  build: {
    outDir: '../build',
    emptyOutDir: true
  }
})
