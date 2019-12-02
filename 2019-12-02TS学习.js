布尔值： let isDone: boolean = false;

数字：let decLiteral: number = 6;

字符串：let name: string = "bob";

数组: 
第一种：
let list: number[] = [1, 2, 3];
第二种：是使用数组泛型，Array<元素类型>

let list: Array<number> = [1, 2, 3];


元祖Tuple： 
// Declare a tuple type
let x: [string, number];
// Initialize it
x = ['hello', 10]; // OK
// Initialize it incorrectly
x = [10, 'hello']; // Error



枚举：
enum Color {Red, Green, Blue}
let c: Color = Color.Green;

Any：不确定时使用
let notSure: any = 4;
notSure = "maybe a string instead";
notSure = false; // okay, definitely a boolean

