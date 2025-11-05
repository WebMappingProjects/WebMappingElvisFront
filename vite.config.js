import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
// import { reactRouter } from "@react-router/dev/vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss(),],
  server: {
    proxy: {
      '/geoserver': {
        target: 'http://localhost:8080/geoserver',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/geoserver/, ''),
      }
    },
    allowedHosts: ['makarte.reimca-app.com']
  }
})
