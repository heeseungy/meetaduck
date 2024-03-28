import react from '@vitejs/plugin-react-swc';
import fs from 'fs';
import { defineConfig } from 'vite';

// https://vitejs.dev/config/
export default defineConfig({
  define: {
    global: {},
  },
  server: {
    host: '0.0.0.0',
    port: 3000,
    // https: {
    //   key: fs.readFileSync('./localhost-key.pem'),
    //   cert: fs.readFileSync('./localhost.pem'),
    // },
    hmr: {
      host: 'j10c108.p.ssafy.io',
      protocol: 'wss',
      port: 3000,
    }
  },

  plugins: [react()],
  resolve: {
    alias: [
      {
        find: '@',
        replacement: '/src',
      },
    ],
  },
});
