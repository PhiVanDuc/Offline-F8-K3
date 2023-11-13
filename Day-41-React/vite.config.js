import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  base: "/Offline-F8-K3/Day-41-React/dist",
  plugins: [react()],
  // server: { port: 3000 }
})
