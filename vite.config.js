import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  base: '/take-samardeep-jasnoor-movie-app/',
  build: {
    outDir: 'take-samardeep-jasnoor-movie-app'
  },
  plugins: [react()],
})
