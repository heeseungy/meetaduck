import react from '@vitejs/plugin-react-swc';
import { defineConfig } from 'vite';
import fs from 'fs';

// https://vitejs.dev/config/
export default defineConfig({
  define: {
    'global': {},
  },
  server: {
    host: '0.0.0.0',
    port: 3000,
    https: {
      key: fs.readFileSync('./j10c108.p.ssafy.io-key.pem'),
      cert: fs.readFileSync('./j10c108.p.ssafy.io.pem')
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
