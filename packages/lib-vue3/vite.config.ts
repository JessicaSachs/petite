import { defineConfig } from 'vite'
import VueMacros from 'unplugin-vue-macros/vite'
import Vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import { vueBridge } from '@vue-bridge/vite-plugin'

import { buildConfig, pluginsConfig, sharedConfig } from '../../vite.config.shared'

// This is the name of the global you library is accessible in the iife build (for CDN use)
// (window.Petite)
const libraryGlobalName = 'Petite'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: pluginsConfig([
    // @ts-expect-error Vue Macros doesn't have a name value.
    VueMacros({
      plugins: {
        vue: Vue(),
        vueJsx: vueJsx(),
      },
    }),
    // @ts-expect-error Vue Bridge doesn't have a name value.
    vueBridge({
      vueVersion: '3',
      localizeDeps: true,
      useSwc: true,
      swcOptions: {
        env: {
          mode: 'usage',
        },
        jsc: {
          parser: {
            syntax: 'typescript',
            tsx: false,
          },
          loose: true,
        },
      },
    }),
  ]),
  resolve: {
    alias: {
      '@vue-bridge/runtime': '@vue-bridge/runtime/vue3',
    },
  },
  build: buildConfig({
    name: libraryGlobalName,
  }),
  ...sharedConfig(),
})
