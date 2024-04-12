import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { defineConfig as defineVitestConfig } from 'vitest/config';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  test: {
    // Cấu hình cho Vitest ở đây
    globals: true,
    environment: 'jsdom',
  },
});

// Nếu bạn cần cấu hình đặc biệt cho Vitest, có thể tách riêng và export cấu hình Vitest
export const vitestConfig = defineVitestConfig({
  // Cấu hình Vitest tùy chỉnh
});
