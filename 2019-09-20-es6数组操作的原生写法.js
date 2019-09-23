// new：将构造函数实例化，将参数创建为对象以及赋值原型方法
function createNew(Ctur, ...args) {
  const obj = {};
  obj.__proto__ = Ctur.prototype;
  const ret = Ctur.apply(obj, args);
  return ret instanceof Object ? ret : obj;
}

// 1. 创建一个空对象。
// 2. 将构造函数的原型继承给这个空对象的隐式原型。
// 3. 在obj下执行构造函数，并传入参数，
//    这个时候构造函数内的this就是obj。
// 4. 如果这个'构造函数'没有return对象格式的结果，
//    返回新创建的obj。

function Person(name, age) {
  this.name = name;
  this.age = age;
}
Person.prototype.getName = function() {
  console.log(this.name);
}

const xm = createNew(Person, 'xiaoming', 22);

// 复制代码instanceof: 判断一个变量是否是某个类型
function myInstanceOf(left, right) {
  while(1) {
    if(left.__proto__ === null) {
      return false;
    }
    if(left.__proto__ === right.prototype) {
      return true;
    }
    left = left.__proto__;
  }
}

// instanceof的原理就是通过原型链查找，
// 所以一直向上查找左侧的隐式原型__ptoto__是否等于右侧显式原型，
// 原型链的尽头是null，没找到就返回false。

myInstanceOf([1,2], Array);  // true

// 复制代码forEach: 遍历数组，这个大家经常用，想必不说都懂
Array.prototype.myForEach = function(fn) {
  const arr = this;
  for(let i = 0; i < arr.length; i++) {
    fn(arr[i], i, arr);
  }
}

// 接受一个fn回调函数，传递给回调函数三个参数：
// 每项的值，下标，自身。第二个参数有人用么？

const arr = ['a','b','c'];
arr.myForEach(item => {
  console.log(item);  // a   b   c
})

// 复制代码map: 返回经过处理的数组
Array.prototype.myMap = function(fn) {
  const arr = this;
  const ret = [];
  for(let i = 0; i < arr.length; i++) {
    ret.push(fn(arr[i], i, arr));
  }
  return ret;
}

// 和forEach类似也是接受一个fn回调，
// 不过会将回调处理的结果放入一个新的数组，
// 所以map回调内的每一项需要return,
// 因为要组成新的数组结果。

const arr = ['a', 'b', 'c'];
const newArr = arr.myMap(item => {  // a1   b1   c1
  return item + 1; // 要return结果
})

// 复制代码filter:  返回回调处理结果为true的新数组
Array.prototype.myFilter = function(fn) {
  const arr = this;
  const ret = [];
  for(let i = 0; i < arr.length; i++) {
    if(fn(arr[i], i, arr)) {
      ret.push(arr[i]);
    }
  }
  return ret;
}

// 大同小异，过滤出处理条件为true的值。

// 返回数组中不重复的值：
function repeat(arr) {
  return arr.myFilter((v, i, a) => {
	return a.indexOf(v) === a.lastIndexOf(v);
  })
}

const arr = [1,2,3,4,1,2,3,5,6,8,3];
repeat(arr); // [4,5,6,8]

// 复制代码find:返回处理条件第一个为true的数组项
Array.prototype.myFind = function(fn) {
  const arr =this;
  for(let i = 0; i < arr.length; i++) {
    if(fn(arr[i], i, arr)) {
      return arr[i];
    }
  }
}

否则返回undefined

// 复制代码findIndex: 返回处理条件第一个为true的数组下标
// 大家自己写下咯~

// 复制代码every：如果数组每一项都符合处理条件。返回true，否则返回false
Array.prototype.myEvery = function(fn) {
  const arr = this;
  for(let i = 0; i < arr.length; i++) {
    if(!fn(arr[i], i, arr)) {
      return false;
    }
  }
  return true;
}

// 复制代码some：只要数组有一项符合处理条件。返回true，都不满足返回false。
// 这个相信大家都知道怎么写了~

// 复制代码reduce: 一般为数组做累计结果使用。
Array.prototype.myReduce = function(fn, accumulator) {
  const arr = this;
  let index = 0;
  if(typeof accumulator === undefined) { // 没传第二个参数
    index = 1;
    accumulator = arr[0];
  }
  for(let i = index; i < arr.length; i++) {
    let invokedReturn = fn(accumulator, arr[i], i, arr);
    accumulator = invokedReturn;
  }
  return accumulator;
}

// 一般会传入第二个参数作为初始值，如果没有传入，
// 初始值就是数组的第一项，将处理的结果进行累计，
// 最后返回累计的结果。

// 返回数组中指定参数重复的次数：
function count(arr, value) {
  return arr.myReduce((f, s) => {
    return Object.is(s, value) ? f + 1 : f + 0;
  }, 0)
}

const arr = [1,2,3,4,1,2,3,2,1];
count(arr, 2); // 3

// 复制代码JSON.stringify: 将对象转为json字符串
function jsonStringify(obj) {
  const type = typeof obj;
  if (type !== 'object') {
    if (type === 'string') {
      obj = '"' + obj + '"';
    }
    return String(obj);
  } else {
    const json = [];
    const arr = Array.isArray(obj);
    for (const k in obj) {
      let v = obj[k];
      const type = typeof v;
      if (type === 'string') {
        v = '"' + v + '"';
      } else if (v === null) { // 处理null情况
        v = null
      } else if (/function|undefined/.test(type)) { 
        // 原生方法会移除function和undefined，其实我们可以不移除
        delete obj[k];
      } else {
        v = jsonStringify(v); // 递归
      }
      json.push((arr ? "" : '"' + k + '":') + String(v));
    }
    return (arr ? "[" : "{") + String(json) + (arr ? "]" : "}")
  }
}

const obj = {
  a: 'a1',
  b: [1, 2, 3],
  c: 22,
  d: function () {},
  e: Date.now(),
  f: null,
  g: /str/ig,
  h: undefined
}

const str = jsonStringify(obj); 
// {"a":"a1","b":[1,2,3],"c":22,"e":1562815128952,"f":null,"g":{}}

// 复制代码JSON.parse: 将字符串格式的对象转为对象。
function jsonParse(str) {
  return new Function('return ' + str)(); // return后有一个空格
}

// 很神奇有木有，直接在字符串前面加上'return '关键字就可以转为对象。
// 在组件精讲小册里有一个实例，在线vue单文件编辑器。
// 原理就是将编辑器内的vue单文件字符串使用正则分割，
// js部分将‘export default’替换为'return '。
// 通过new Function转为js对象使用。

const sum = new Function('a','b','return a + b');
sum(1, 2); // 3

const str = '{"a":"a1","b":[1,2,3],"c":22,"e":1562815128952,"f":null,"g":{}}';
// jsonParse(str); //
// a: "a1",
// b: [1, 2, 3],
// c: 22,
// e: 1562815128952,
// f: null,
// g: {}

// 复制代码setInterval: 大家懂的
function mySetInterval(fn, interval) {
  const now = Date.now;
  let startTime = now();
  const loop = () => {
    const timer = requestAnimationFrame(loop);
    if (now() - startTime >= interval) {
      startTime = now();
      fn(timer);
    }
  }
  loop();
}

// 一般来说是不建议使用setInterval的，
// 如内部函数复杂就不能保证一定在规定时间内自动执行。
// 一般是通过setTimeout模仿setInterval。
// 那为什么要实现setInterval？
// 因为它内部的实现是使用requestAnimationFrame实现的，
// 该方法自带函数节流。
// 如有持续的动画需要执行，
// 基本会保证在16.6毫秒内执行一次，
// 提高动画性能并延时也是精确的。

mySetInterval(timer => {
  console.log('a');
  // cancelAnimationFram(timer) 可以取消当前定时器
})
