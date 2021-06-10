//导入架包
import Vue from 'vue'
import VueRouter from "vue-router";

//创建懒加载
const Home = ()=> import('../views/home/Home')
const Category = ()=> import('../views/category/Category')
const Cart = ()=> import('../views/cart/Cart')

//安装插件
Vue.use(VueRouter)

//创建数组用于存储
const routes=[
  {
    //命名
    path:'',
    //重定向
    redirect:'/home'
  },
  {
    path: '/home',
    component:Home
  },
  {
    path: '/category',
    component:Category
  },
  {
    path: '/cart',
    component:Cart
  },
  {
    path: '/me',
    //懒加载
    component: ()=> import('../views/me/Me')
  }
]

//创建对象
const router=new VueRouter({
  //将数组存储的放入路由中
  routes,
  //设置导航栏模式 history模式 /home前面没有 /#/home | hash模式 前面有/#/home
  mode:'history'
})

//导出
export default router
