import url from 'node:url'
import path from 'node:path'
import { defineConfig } from 'cypress'

const __dirname = url.fileURLToPath(new URL('.', import.meta.url))

export default defineConfig({
  component: {
    indexHtmlFile: path.resolve(__dirname, '../../cypress/support/component-index.html'),
    supportFile: path.resolve(__dirname, './cypress/support/component.ts'),
    devServer: {
      bundler: 'vite',
      framework: 'vue',
    },
  },
})
