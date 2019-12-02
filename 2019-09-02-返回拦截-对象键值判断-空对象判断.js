
/**
 * 判断一个对象是不是空
 * @param {*} obj 
 */
export const isEmptyObj = (obj) => {
  for (let i in obj) {
    return false
  }
  return true
}

/**
 * @param {*} obj 输入对象
 * @param {*} pathString 判定是否有对应的值
 * example: getObjInvalue(a: {b: 1}, a.b) 得到的是1 ，否则得到false
 */
export const getObjInValue = (obj, pathString) => {

  if (Object.hasOwnProperty.call(obj, pathString.toString())) {
    return obj[path.toString()]
  }

  let pathArr = Array.isArray(path) ? path : path.split('.')
  let index = 0
  const len = pathArr.length

  while (obj && index < len) {
    obj = obj[pathArr[index++]]
  }

  let returnPath = (index && index === len) ? obj : undefined
  return returnPath === undefined ? false : returnPath
}

/**
 * 监听返回事件，一般用来监听用户返回操作时的返回拦截，进行进一步的处理
 * @param {*} callback callback函数
 * @param {*} param1 
 * 带有callback方法的使用操作
 * 使用方法
 */
export default function (callback = function() {}, { prevent = false, replace = false } = {}) {
  const title = '你所需要的title'
  let state = {}
  window.history[replace ? 'replaceState' : 'pushState'](state, title, '#')
  if (!prevent) {
    setTimeout(() => {
      window.history[replace ? 'replaceState' : 'pushState'](state, title, '#')
    }, 0)
  }

  window.addEventListener('popstate', function listenPopstate () {
    callback()
    window.removeEventListener('popstate', listenPopstate)
  })
}