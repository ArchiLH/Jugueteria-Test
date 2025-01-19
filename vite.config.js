import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173, // Cambia este número al puerto que desees, como 3000, 8000, etc.
  },
  resolve: {
    alias: {
      '@stripe/react-stripe-js': require.resolve('@stripe/react-stripe-js'),
    },
  },
});
