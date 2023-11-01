import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  base: "/Offline-F8-K3/Day-39-JS/dist",
  plugins: [react()],
})
