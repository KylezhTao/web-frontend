// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import Vuex from 'vuex'
import App from './App'
import router from './router';
import http from './request/http'

import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import store from './assets/store';

import axios from 'axios'
Vue.prototype.$axios = axios

Vue.config.productionTip = false

Vue.use(Vuex);
Vue.use(ElementUI);
/* eslint-disable no-new */
new Vue({
  el: '#app',
  //配置路由
  router,
  store,
  render:h=>h(App)
})

router.beforeEach((to, from, next) => {
  // to: Route: 即将要进入的目标 路由对象
  // from: Route: 当前导航正要离开的路由
  // next: Function: 一定要调用该方法来 resolve 这个钩子。执行效果依赖 next 方法的调用参数。
  　　let isLogin = store.state.token; // 是否登录
      console.log("token:"+to.name);
  // 未登录状态；当路由到route指定页时，跳转至login
      if(to.name=="edit"){
        if (isLogin == null){
          window.loginReset();
          console.log("调用toLogin");
  　　  }else{
          next();
        }
      }
  　　next();
})
