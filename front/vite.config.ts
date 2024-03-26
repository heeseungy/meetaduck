import react from '@vitejs/plugin-react-swc';
import { defineConfig } from 'vite';
import fs from 'fs';

// https://vitejs.dev/config/
export default defineConfig({
  define: {
    'global': {},
  },
  server: {
    //
    https: {
      key: fs.readFileSync('./localhost-key.pem'),
      cert: fs.readFileSync('./localhost.pem'),  
    },
    host: '0.0.0.0',
    port: 3000,
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
