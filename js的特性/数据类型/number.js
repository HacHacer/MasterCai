//IEEE-754 数字格式通过将数字舍入到最接近的可能数字来解决此问题。
//因为是二进制存储,所以表示的小数会有除不尽的情况变成无限循环小数
console.log(0.1+0.2)//0.30000000000000004
console.log(9999999999999999);//10000000000000000
//在处理小数时避免相等性检查 因为很容易出现精度损失导致不相等
//共64位存储，1位正负符号,11位小数,52位数字 所有有+0和-0两个不同的0
console.log(-0===0)//true

//使用 parseInt/parseFloat 进行“软”转换，它从字符串中读取数字，然后返回在发生 error 前可以读取到的值。
//parseInt可以获取整数
console.log(parseInt(10/50)); //0
console.log(parseFloat('1.3.4'))//1.3
console.log(parseInt('100px'))//100
//使用加号 + 或 Number() 的数字转换是严格的。如果一个值不完全是一个数字，就会失败：
console.log(typeof +'1001231') //1001231 number
console.log(+'100px')//NaN
//使用Object.is()进行===判断
console.log(Object.is(NaN,NaN))//true
console.log(Object.is(0,-0))//false
//Math.radom随机范围[0,1)
//Math.round 和 toFixed 都将数字舍入到最接近的数字：0..4 会被舍去，而 5..9 会进一位
console.log(1.35.toFixed(1))
console.log(6.350.toFixed(1))

//isFinite()可以用来判断数字
console.log(isFinite('')); //true
console.log(isFinite(null)) //true
