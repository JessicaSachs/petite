import { defineConfig } from 'vite'
import { isVue2 } from 'vue-demi'
import Vue2JSX from '@vitejs/plugin-vue2-jsx'
import Vue3JSX from '@vitejs/plugin-vue-jsx'
import Vue2 from '@vitejs/plugin-vue2'
import Vue3 from '@vitejs/plugin-vue'

console.log('isVue2', isVue2)
export default defineConfig({
  resolve: {
    alias: {
      vue: isVue2 ? 'vue2' : 'vue',
    },
  },
  plugins: [
    isVue2 ? Vue2() : Vue3(),
    isVue2 ? Vue2JSX() : Vue3JSX(),
  ],
  optimizeDeps: {
    exclude: ['@cypress/vue', '@cypress/vue2'],
  },
})
