import { defineConfig } from 'vite'
import VueMacros from 'unplugin-vue-macros/vite'
import Vue from '@vitejs/plugin-vue2'
import vueJsx from '@vitejs/plugin-vue2-jsx'
import { vueBridge } from '@vue-bridge/vite-plugin'
import { buildConfig, pluginsConfig, sharedConfig } from '../../vite.config.shared'

// This is the name of the global you library is accessible in the iife build (for CDN use)
// (window.PetiteLegacy)
const libraryGlobalName = 'PetiteLegacy'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: pluginsConfig([
    // @ts-expect-error Vue Macros doesn't have a name value.
    VueMacros({
      plugins: {
        // reactivity transform isn't an option in Vue 2
        vue: Vue(),
        vueJsx: vueJsx(),
      },
    }),
    // @ts-expect-error Vue Bridge doesn't have a name value.
    vueBridge({
      vueVersion: '2',
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
      '@vue-bridge/runtime': '@vue-bridge/runtime/vue2',
    },
  },
  build: buildConfig({
    name: libraryGlobalName,
  }),
  ...sharedConfig(),
})

