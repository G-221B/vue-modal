import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import modal from './extends/modal.js';

Vue.config.productionTip = false;

Vue.prototype.modal = modal;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
