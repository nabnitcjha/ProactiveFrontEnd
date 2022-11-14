import Vue from "vue";
import App from "./App.vue";
import router from "./router";

import axios from "axios";

import { BootstrapVue, IconsPlugin } from "bootstrap-vue";

// Import Bootstrap and BootstrapVue CSS files (order is important)
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue/dist/bootstrap-vue.css";

import Fragment from "vue-fragment";
Vue.use(Fragment.Plugin);

// Make BootstrapVue available throughout your project
Vue.use(BootstrapVue);
// Optionally install the BootstrapVue icon components plugin
Vue.use(IconsPlugin);

import { Plugin } from "vue-fragment";
Vue.use(Plugin);

import { createPinia, PiniaVuePlugin } from "pinia";

Vue.use(PiniaVuePlugin);
const pinia = createPinia();

// Vue.config.globalProperties.apiUrl = "http://127.0.0.1:8000";

Vue.use(axios);

new Vue({
  components: { Fragment },
  router,
  pinia,
  render: (h) => h(App),
}).$mount(".page-wrapper");
