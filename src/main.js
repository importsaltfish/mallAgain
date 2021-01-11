import Vue from 'vue'
import App from './App.vue'
import router from './router/index'
import store from './store/index';

import toast from 'components/common/toast/index.js'
import lazyLoad from 'vue-lazyload'
import FastClick from 'fastclick'
Vue.config.productionTip = false

Vue.prototype.$bus = new Vue()

FastClick.attach(document.body)

Vue.use(lazyLoad)
Vue.use(toast)

new Vue({
  store,
  router,
  render: h => h(App),
}).$mount('#app')
