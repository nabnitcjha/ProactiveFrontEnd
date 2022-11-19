import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import axios from "axios";
import connectAPI from './connectAPI'
import Multiselect from 'vue-multiselect'
import { BootstrapVue, IconsPlugin } from "bootstrap-vue";
import {
  ValidationObserver,
  ValidationProvider,
  extend,
  localize
} from "vee-validate";
import en from "vee-validate/dist/locale/en.json";
import * as rules from "vee-validate/dist/rules";
import DatePicker from 'vue2-datepicker';
import 'vue2-datepicker/index.css';

// Install VeeValidate rules and localization
Object.keys(rules).forEach(rule => {
  extend(rule, rules[rule]);
});

localize("en", en);

// Install VeeValidate components globally
Vue.component("ValidationObserver", ValidationObserver);
Vue.component("ValidationProvider", ValidationProvider);
Vue.component('multiselect', Multiselect)
Vue.component('date-picker', DatePicker)

import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue/dist/bootstrap-vue.css";
import Fragment from "vue-fragment";
import { Plugin } from "vue-fragment";
import { createPinia, PiniaVuePlugin } from "pinia";
import piniaPersist from 'pinia-plugin-persist'


Vue.use(PiniaVuePlugin);
const pinia = createPinia();
pinia.use(piniaPersist)

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
