'use strict'

let a=Symbol.for('id')//全局注册的方法
let aa={
    [a]:'213123',
    [Symbol.for('aaa')](){
        console.log(this)
    }
}
console.log(Symbol.keyFor(a))//从全局注册的symbol中读取key值
console.log(a)
console.log(a.description);
console.log(aa[Symbol.for("aaa")].bind(1));
aa[Symbol.for("aaa")]()

