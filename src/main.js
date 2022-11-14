import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import axios from "axios";
import connectAPI from './connectAPI'
import { BootstrapVue, IconsPlugin } from "bootstrap-vue";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue/dist/bootstrap-vue.css";
import Fragment from "vue-fragment";
import { Plugin } from "vue-fragment";
import { createPinia, PiniaVuePlugin } from "pinia";


Vue.use(PiniaVuePlugin);
const pinia = createPinia();

Vue.use(BootstrapVue);
Vue.use(IconsPlugin);
Vue.use(Fragment.Plugin);
Vue.use(Plugin);
Vue.use(axios);
Vue.mixin(connectAPI);


new Vue({
  components: { Fragment },
  router,
  pinia,
  render: (h) => h(App),
}).$mount(".page-wrapper");
