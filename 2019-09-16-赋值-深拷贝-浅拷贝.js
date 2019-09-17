/**
 * 浅拷贝：拷贝基本类型，直接赋值；拷贝引用类型，拷贝的是地址，共享内存；
 * 深拷贝：开辟新的内存空间，和原值没有关系
 */

// 深拷贝手动实现
// JSON序列化-简单实现深拷贝，但有局限性
 JSON.parse(JSON.stringify(obj))
// 无法识别特殊数据
//  例如 undefined 、 NaN 、 Infinity 等
// 特殊对象如时间对象、正则表达式、函数、Set、Map等
// 对于循环引用（例如环）等无法处理，会直接报错
const obj = {
  a: 1,
  b: undefined,
  c: NaN,
  d: null,
  e: true,
  f: 'string',
  g: Infinity // 无穷值
}
// 值类型拷贝
const newobj1 = JSON.parse(JSON.stringify(obj))
// 结果 其中underfined的值都拷贝不进去
newobj1 = {
  a: 1,
  c: null,
  d: null,
  e: true,
  f: "string",
  g: null
}

const data = {
  a: [1, 2, 3],
  b: {foo: 'obj'},  
	c: new Date('2019-08-28'),
  d: /^abc$/g,
  e: function() {},
  f: new Set([1, 2, 3]),
  g: new Map([['foo', 'map']]),
}

const dataCopy = JSON.parse(JSON.stringify(data))

// 结果
// 对于引用类型数据，在序列化与反序列化过程中，只有数组和对象被正常拷贝，其中时间对象被转化为了字符串，函数会丢失，其他的都被转化为了空对象

dataCopy = {
  a: [1, 2, 3],
  b: {foo: "obj"},
  c: "2019-08-28T00:00:00.000Z",
  d: {},
  f: {},
  g: {}
}

/********手动实现简单的浅拷贝***********/
// 递归实现
function deepCloneFn(obj) {
  if (typeof obj !== 'object') return obj
  const newObj = Array.isArray(data) ? [] : {}
  for(let item in obj) {
    newObj[item] = deepCloneFn(obj[item])
  }
  return newObj
}

const aa = {
  aa: '1',
  bb: {
    bb: 'bb',
    cc: {
      dd: 'dd'
    }
  }
}