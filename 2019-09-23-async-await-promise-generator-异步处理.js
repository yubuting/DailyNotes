/* 1. async 声明的函数返回的本质就是个promise对象 
 * 2. async 返回一个return，会成为then方法回调
 * 3. async 函数返回一个promise对象，必须等到所有的await方法执行完后再继续下去
*/
async function myAsync () {
  return 'hello world'
}
let result = myAsync()
console.log(result) // 结果为Promise

function getNum () {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(1000)
    }, 1000)
  })
}

async function myAsync () {
  let num = await getNum()
  return num + 1000
}

myAsync().then((val) => {
  console.log(val)
})

// await
function myAwait () {
  return new Promise((resolve) => {
  resolve('hello world!')
  })
}

async function myAsync(){
  console.log('async begin')
  let wait = await myAwait()
  console.log(wait)
  console.log('async end')
  return wait
}

console.log('begin')
let result = myAsync()
console.log(result)
console.log('end')


// 四、Promise 、Generator、async 异步编程示例
// 了解了 async 和 await 后，我们一起来看一个完整的例子。
// 假如我们做完一件事，需要分三个步骤，每一个步骤都需要上一步的执行结果，我们分别看一下 Promise 、 Generator 和 async 都是怎么实现的。
/* 花费时间 */
function takeLongTime (n) {
  return new Promise(resolve => {
    setTimeout(() => resolve(n + 1000), n)
  })
}

/* 步骤一 */
function step1 (n) {
  console.log(`step1 with ${n}`)
  return takeLongTime(n)
}

/* 步骤二 */
function step2 (n) {
  console.log(`step2 with ${n}`)
  return takeLongTime(n)
}

/* 步骤三 */
function step3 (n) {
  console.log(`step3 with ${n}`)
  return takeLongTime(n)
}

// 1. Promise 的实现：
function doIt () {
  let time1 = 1000
  step1(time1)
      .then(time2 => step2(time2))
      .then(time3 => step3(time3))
      .then(result => {
        console.log(`result is ${result}`)
      })
}

doIt()
// 2. Generator 的实现：
/** 执行器
  * Generator 函数不能自动执行，我们需要借助执行器
*/
function run (generator) {
  let iterator = generator()
  let result = iterator.next()
  function step () {
    if(!result.done) {
      let promise = Promise.resolve(result.value)
      promise.then((value) => {
        result = iterator.next(value)
        step()
      }).catch((error) => {
        result = iterator.throw(error)
        step()
      })
    }
  }
  step()
}

function *doIt () {
  let time1 = 1000
  let time2 = yield step1(time1)
  let time3 = yield step2(time2)
  let result = yield step3(time3)
  console.log(`result is ${result}`)
}

run(doIt)
// 复制代码3. async 的实现：
async function doIt () {
  let time1 = 1000
  let time2 = await step1(time1)
  let time3 = await step2(time2)
  let result = await step3(time3)
  console.log(`result is ${result}`)
}

doIt()
// 复制代码三种方法执行结果都如下：

// 对比以上三种实现方式:
// 1.由于 Promise 的 then 方法返回的是一个新的 Promise，所以 Promise 可以通过链式调用实现异步编程。
// 2.async 函数和 Generator 函数就比较有意思了，async 函数就是将 Generator 函数的星号（*）替换成 async，将 yield 替换成 await，并内置执行器，仅此而已。
// 3.不难发现，async 的写法更具语义化，并且更加清晰。
// 五、使用注意事项
// 1.await 命令后面的 Promise 对象，运行结果可能是 rejected，所以最好把 await命令放在 try...catch 代码块中。
 async function myFunction() {
  try {
    await somethingThatReturnsAPromise();
  } catch (err) {
    console.log(err);
  }
}

// 另一种写法

async function myFunction() {
  await somethingThatReturnsAPromise()
  .catch(function (err) {
    console.log(err);
  });
}
// 2.多个 await 命令后面的异步操作，如果不存在继发关系，最好让它们同时触发。
function getA () {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve('A')
    }, 1000)
  })
}

function getB () {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve('B')
    }, 1000)
  })
}

async function myAsync () {
  let A = await getA();
  console.log('A: ', A)
  let B = await getB();
  console.log('B: ', B)
}

myAsync()
// 上面代码中，getA 和 getB 是两个独立的异步操作（即互不依赖），被写成继发关系。这样比较耗时，因为只有 getA 完成以后，才会执行 getB，完全可以让它们同时触发。
// 写法一
async function myAsync () {
  let [A, B] = await Promise.all([getA(), getB()])
  console.log('A: ', A)
  console.log('B: ', B)
}

myAsync()
复制代码// 写法二
async function myAsync () {
  let aPromise = getA()
  let bPromise = getB()
  let A = await aPromise
  let B = await bPromise
  console.log('A: ', A)
  console.log('B: ', B)
}

myAsync()
// 上面两种写法，getA 和 getB 都是同时触发，这样就会缩短程序的执行时间。
// 3.await 命令只能用在 async 函数之中，如果用在普通函数，就会报错。
// 六、小结
// 函数前面的关键字 async 有两个作用：
// 1.让这个函数返回一个 promise
// 2.允许在函数内部使用 await，这个 await 关键字又让 JavaScript 引擎等待直到 promise 完成，如果有错误，就会抛出异常，否则，就返回结果。
// 这两个关键字一起用就提供了一个通俗易懂的方式来控制异步编程，并且易于读写。
// 七、附加题：async、promise、setTimeout 的执行顺序
// 相信你对 Promise、Generator、async 已经有了一定的了解了，若加上 setTimeout，你对代码的执行顺序还很清晰吗？
// 我们来看一道写出执行结果的题，相信很多同学面试的时候都遇到过，是不是很懵逼！！！
async function async1() {
   console.log('async1 start')
   await async2()
   console.log('async1 end')
}

async function async2() {
   console.log('async2')
}

console.log('script start')

setTimeout(() => {
	console.log('setTimeout')
},0)

async1()

new Promise((resolve) => {
	console.log('promise1')
	resolve()
}).then(() => {
	console.log('promise2')
})

console.log('script end')
