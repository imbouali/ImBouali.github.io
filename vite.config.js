import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { fileURLToPath, URL } from 'url'

// https://vite.dev/config/
export default defineConfig({
  // Assurez-vous que c'est bien '/' ou le nom de votre dépôt entre slashs
  base: '/', 
  plugins: [react()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  // On garde ça pour nettoyer votre terminal comme vous le souhaitiez
  logLevel: 'error', 
})