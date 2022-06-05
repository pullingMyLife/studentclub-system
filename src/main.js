import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import element from './components/elementUI';
element(Vue);


import md5 from 'js-md5';
Vue.prototype.$md5 = md5;

import './permission';

import animated from 'animate.css' // npm install animate.css --save安装，在引入
Vue.use(animated)


Vue.config.productionTip = process.env.NODE_ENV === 'production';




new Vue({
  render: h => h(App),
  router,
  store //注册
}).$mount('#app')
