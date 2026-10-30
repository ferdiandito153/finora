import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// Repository baru disarankan bernama "finora" (huruf kecil).
export default defineConfig({
  plugins: [react(), tailwindcss()],
  base: '/finora/',
})
