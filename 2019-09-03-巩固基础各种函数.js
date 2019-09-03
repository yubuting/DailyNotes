/************************* 函数声明和函数表达式 ********************************/
/**
 * 巩固基础建设
 * 函数声明和函数表达式说明
 * 两者的区别主要是函数名称
 */

function func() {
  console.log('我是函数声明')
}
var func = function() {
  console.log('我是函数声明')
}

// 注意点：函数表达式没有提升，不像函数声明， 你在定义函数表达式之前不能使用函数表达式 如下：
test1()
var test1 = function() {
	alert('test1:error')
}
// error: Uncaught TypeError: ssd is not a function

test2()
function test2() {
  alert('you can use it')
}
// 不会报错，函数声明会提升，弹出 you can use it

/**************************** 对象方法、 类方法、 原型方法 *************************/

// 对象方法
function Person(name) {
  this.name = name
  this.say = function() {
    alert('say hello')
  }
}

// 类方法
Person.eat = function() {
  alert('eat foods')
}

// 原型方法
Person.prototype.singJumpRap = function() {
  alert('坤坤的 CTRL')
  alert(this.name)
}

// 测试
let test = new Person('taotao')
test.say()
Person.eat()
test.singJumpRap()

/************************ proto 和 prototype ***********************************/
// window 对象 默认就有个Object对象

var obj = {}
obj.toString()
// obj 本身是没有 tostring方法的，是因为 obj.toString === Object.prototype.toString
// obj 会沿着 __proto__ 一直往上找，直到找到为止
// Object 是所有对象的爸爸， 所有对象都可 proto 指向
// Funciton 是所有函数的爸爸， 所有函数都可以通过 proto 找到它
// 区别 prototype 是让你知道用什么属性
// proto 是让你知道都有什么属性

/************************ constructor 和 prototype ***********************************/

// 原型(prototype)是构造函数的一个属性，是一个对象。constructor 是绑在实例上面的，不是绑在原型链上面的。，constructor 则代表实例拥有的方法。可以浅显的认为 prototype 向下指， constructor 向上指， 这里的向上指代表的是往父类或者原型上面。
var obj = {}
console.log(Object.prototype.constructor === Object && obj.constructor === Object) // true
// prototype是让你知道用什么属性，Object.prototype指的是Object类原型的constructor方法

function Person(name = 'taotao') {
  this.name = name
  this.sayHello = function() {
    console.log(this.name)
  }
}

Person.prototype.eat = function() {
  console.log(this.name)
}

Person.prototype.constructor === Person

/*************************封装-继承-多态*******************/
// https://juejin.im/post/5d6e19346fb9a06afc255d8a?utm_source=gold_browser_extension 