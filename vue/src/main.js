import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from "./store";
import axios from 'axios';
import { library } from '@fortawesome/fontawesome-svg-core';
import {faArrowLeft, faPlus, faSearch} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import vuetify from './plugins/vuetify';


//Usando FONT AWESOME
library.add(faArrowLeft);
library.add(faPlus);
library.add(faSearch)

Vue.component('font-awesome-icon', FontAwesomeIcon);

Vue.config.productionTip = false;
Vue.prototype.$http = axios;


new Vue({
  router,
  vuetify,
  store,
  render: h => h(App)
}).$mount('#app');
