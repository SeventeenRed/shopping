//防止页面抖动
export function debounce(func,delay){
  let timer= null
  //    ...多个参数
  return function(...args){
    //判断是否有传入值
    if (timer) clearTimeout(timer)
    timer = setTimeout(()=>{
      func.apply(this,args)
    },delay)
  }
}
