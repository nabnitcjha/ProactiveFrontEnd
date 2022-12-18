 // vite.config.js
import { createVuePlugin } from 'vite-plugin-vue2'

export default {
  plugins: [
    createVuePlugin()
  ],
  resolve: {
    alias: {
      vue: 'vue/dist/vue.runtime.esm.js',
    },
    dedupe: ['vuetify', 'vue'],
  },
 
}