/**
 * 理解和使用call apply bind
 * 三个方法的相似处
 * 1.都是用来this的指向问题
 * 2.第一个参数都是this指向的对象
 * 3.都可以后面带参数
 * 不同处：
 * 1.参数传递问题：call(obj, 'arg1', 'arg2') apply(obj, [arg1, arg2]) bind(obj, 'arg1', 'arg2')()
 * 2.调用问题：call和apply都是对函数的直接调用，而bind方法返回的仍然是一个函数，因此后面还需要()来进行调用才可以
 */

 // 先定义一个对象和方法

 var person = {
   name: 'taotao',
   age: 11,
   say: function() {
     console.log('myname', this.name, 'age', this.age)
   }
 }
 var xiong = {
   name: 'xiong',
   age: 27
 }

 person.say.call(xiong) // 'myname xiong age 27
 person.say.apply(xiong) // 'myname xiong age 27
 person.say.bind(xiong)() // 'myname xiong age 27
 
 /*************************参数传递区别***********************/

 var person = {
  name: 'taotao',
  age: 11,
  say: function(sex = 'man', adress = 'beijing') {
    console.log('myname', this.name, 'age', this.age, '性别', sex, '住址', adress)
  }
}
var xiong = {
  name: 'xiong',
  age: 27
}
person.say.call(xiong, 'woman', 'nanchang')
person.say.apply(xiong, ['woman', 'nanchang'])
person.say.bind(xiong, 'woman', 'nanchang')()



