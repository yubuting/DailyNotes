/*******************防抖函数********************/
/*
 * 防抖函数
 * 一个时间段内多次执行只取最后一次
 * 例如提交按钮： 在一个时间段内多次点击只取最后一个提交
 */

 const debounce = function(fn, timeDelay) {
  let timer = null
  return (...arg) => {
    clearTimeout(timer)
  timer = setTimeout(() => {
    // clearTimeout(timer)
    fn.apply(this, arg)
    }, timeDelay)
  }
 }