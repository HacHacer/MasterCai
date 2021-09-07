 let n=+1//一元运算符 会使用number的hint进行暗转
 let a=-1

 let d={'a':1,b(){}} //可选链
 let b=d?.a
 d.b?.()
 delete a?.c
d?.['a']

a**b //幂值运算符 a的b次方

//空值合并运算符？？
//当值为null或undefined时进入操作符后面
// ||运算符只判断是否为真进入操作符后面
//优先级小于+ - * /要用()包着