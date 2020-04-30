import Vue from 'vue'
import App from './App.vue'
import router from './router'
import axios from 'axios';
import KeenUI from "keen-ui";
import { library } from '@fortawesome/fontawesome-svg-core';
import {faArrowLeft, faArrowRight, faPlus} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

//Usando FONT AWESOME
library.add(faArrowRight);
library.add(faArrowLeft);
library.add(faPlus);

Vue.component('font-awesome-icon', FontAwesomeIcon);

Vue.config.productionTip = false;
Vue.prototype.$http = axios;
Vue.use(KeenUI);

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
