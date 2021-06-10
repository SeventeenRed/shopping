import Vue from 'vue'
import App from './App.vue'
//导入router路由
import router from "@/router";

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  //挂载router
  router,
}).$mount('#app')
