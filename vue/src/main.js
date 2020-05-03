import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from "./store";
import axios from 'axios';
import { library } from '@fortawesome/fontawesome-svg-core';
import {faArrowLeft, faPlus} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import vuetify from './plugins/vuetify';
export const bus = new Vue();

//Usando FONT AWESOME
library.add(faArrowLeft);
library.add(faPlus);

Vue.component('font-awesome-icon', FontAwesomeIcon);

Vue.config.productionTip = false;
Vue.prototype.$http = axios;


new Vue({
  router,
  vuetify,
  store,
  render: h => h(App)
}).$mount('#app');
