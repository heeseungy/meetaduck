import react from '@vitejs/plugin-react-swc';
import { defineConfig } from 'vite';
import fs from 'fs';

const KEY_PATH = process.env.VITE_KEY_PATH || './localhost-key.pem'
const CERT_PATH = process.env.VITE_CERT_PATH || './localhost.pem'


// https://vitejs.dev/config/
export default defineConfig({
  define: {
    'global': {},
  },
  server: {
    https: {
      key: fs.readFileSync(KEY_PATH),
      cert: fs.readFileSync(CERT_PATH),  
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
