//到日axios网络请求
import axios from "axios";

//导出函数
export function request(config){
  //1.创建axios对应的实例
  const instance=axios.create({
    //请求地址
    // baseURL:'http://123.207.32.32:8000',
    baseURL:'http://152.136.185.210:7878/api/m5',
    //时间
    timeout:1000
  })

  //2.axios拦截器
  //请求拦截
  instance.interceptors.request.use(config=>{
    //请求成功打印
    // console.log(config)
    //请求成功需要进行返回 不然控制台会报错
    return config
  },err=>{
    //请求失败返回
    // console.log(err)
  })
  //响应拦截
  instance.interceptors.response.use(res=>{
    //响应成功打印
    // console.log(res)
    //响应成功也需要进行返回
    return res.data
  },err=>{
    //响应失败打印
    console.log(err)
  })

  //3.发送一个真正的网络请求
  return instance(config)
}


