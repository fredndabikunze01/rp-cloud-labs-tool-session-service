import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

const apiPort = process.env.API_PORT || '8081';

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/health': `http://localhost:${apiPort}`,
      '/sessions': `http://localhost:${apiPort}`,
    },
  },
});
