import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  base: '/lendvis/',
  plugins: [react(), tailwindcss()],
  build: {
    rollupOptions: {
      output: {
        // Библиотеки меняются реже кода — пусть кэшируются отдельно от релиза к релизу
        manualChunks(id: string) {
          if (id.includes('node_modules/framer-motion') || id.includes('node_modules/motion')) return 'motion'
          if (id.includes('node_modules/react-router')) return 'router'
          if (id.includes('node_modules/react')) return 'react'
          return undefined
        },
      },
    },
  },
})
