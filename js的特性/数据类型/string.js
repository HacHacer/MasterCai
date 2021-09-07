let str = "Hello";
str.test = 5;
console.log(str.test);
//原始类型不是对象不能储存额外的数据,
//创建原始类型时js引擎会自动创建一个对象包装器然后消失，使用方法时也是这样调用的

console.log(','===',')
console.log(str[1],str[200])//现代方法获取字符
// console.log(str.charCodeAt(1))
console.log(str.charAt(1),str.charAt(200))//空字符串    

//*******字符串不可以被更改********** 所有字符串的方法都是返回新的字符串

console.log(str.slice(-4,-1)); //只用这个就行了 负数等于长度+这个值
console.log('00',str.slice(4,9));//后面的值必须小于前面的值
console.log('00',str.slice(1)); //默认到最后
console.log(str.slice(-1));//转成正数后到最后
//不常用的方法
console.log(str.repeat(2))//HelloHello

function ucFirst(str){
    return str.charAt(0).toUpperCase()+str.slice(1)
}
