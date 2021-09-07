//this 的值是在代码运行时计算出来的，它取决于代码上下文。

// 在没有对象调用的情况下，严格模式下的 this 值为 undefined。如果我们尝试访问 this.name，将会报错。
'use strict'//不加这个会打印出global或window
function  cc(params) {
    console.log(this)
}
console.log(this) //{}
cc() //undefined
// 在非严格模式的情况下，this 将会是 全局对象（浏览器中的 window）。这是一个历史行为，"use strict" 已经将其修复了。

// 通常这种调用是程序出错了。如果在一个函数内部有 this，那么通常意味着它是在对象上下文环境中被调用的。
let a={
    name:'12312',
    say(){
        console.log('this: ',this.name)
        console.log("this: ", this);
    }

}

//new 操作符对this的使用
let user=new User('lilili')
user.say()
function User(name) {
  // this = {};（隐式创建）

  // 添加属性到 this
  this.name = name;
  this.isAdmin = false;

  this.say=function name(params) {
      console.log('this log',this)
            console.log("this log", this.name);

  }
  // return this;（隐式返回）
}

//箭头函数的this指向函数所在的所用域: 注意理解作用域,只有函数的{}构成作用域,对象的{}以及 if(){}都不构成作用域;
//一般的作用域为全局作用域所以this为全局的this(看环境)
let obj={}
function A() { return obj;}
function B() { this.a=1}

let a1 = new A;
let b1 = new B;
console.log(a1)
console.log(b1)
console.log( a1 == b1 ); // true