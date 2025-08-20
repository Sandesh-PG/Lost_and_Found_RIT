import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:5000',
        secure: false,
        changeOrigin: true,
        // --- THIS IS THE COMBINED FIX ---
        // This combination is a more robust way to handle cookies in a
        // local development environment with different ports. It tells the
        // proxy to rewrite both the cookie's domain and its path, which
        // helps ensure the browser will send it back correctly on API requests.
        cookieDomainRewrite: {
          "*": ""
        },
        cookiePathRewrite: {
          "/": "/"
        }
      },
    },
  },
})