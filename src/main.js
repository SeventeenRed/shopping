import Vue from 'vue'
import App from './App.vue'
//导入router路由
import router from "@/router";

Vue.config.productionTip = false

//创建一个bus事件
Vue.prototype.$bus =new Vue()

new Vue({
  render: h => h(App),
  //挂载router
  router,
}).$mount('#app')
