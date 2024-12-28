import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    // Asegura que todas las rutas sean manejadas por React Router
    historyApiFallback: true,
  },
  build: {
    rollupOptions: {
      input: '/index.html',
    },
  },
})
