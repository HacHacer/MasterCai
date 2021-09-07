 //数组可以存储不同类型的值
 let arr1=[1,'2',{'a':1},true,function arrFun(params) {
     console.log('this is array function')
 }]
for (const a in arr1) {
   
        const value = arr1[a];
        console.log('value :>> ', value);
    
}

//Array对象没有实现valueof方法调用的是object的valueof
//Array对象没有Symbol.toPrimitive
//对于数组对象不要使用forin遍历
//for..in 循环适用于普通对象，并且做了对应的优化。但是不适用于数组，因此速度要慢 10-100 倍
let arr2=[1,3,5];
[1,3,4].sort((a,b)=>{
    //a-b 大于0是升序排列，小于0是降序
    console.log('a;',a)
    console.log('b :>> ', b);
})
// 请注意，sort，reverse 和 splice 方法修改的是数组本身。其他方法是返回新的数组
console.log([1,3,5].filter((value,index,array)=>{
    return value>index*3
}))
console.log(arr2.reduce((all,value,index,array)=>{
    value++
    all+=value
    return all
},0));
console.log(arr2.reverse());
console.log(arr2);//已经被翻转
console.log(arr2.find((value,index,array)=>{
    return value!=null
}));//找到符合条件的第一个值
console.log(arr2.some((value,index,array)=>{
   return index>1 
}));//返回bool值 类似||
console.log(arr2.every((value,index,array)=>{
   return index>1 
}));//返回bool值 类似&&
console.log('arr2.fill(1,0,5) :>> ', arr2.fill(1,0,5));
let arr3 = [0, 1, 2, [[[3, 4]]]];
console.log(arr3.toString());
console.log(arr3.flat(1));
console.log(arr3.flatMap((value,index,arry)=>{
    return value.toString()
}));//解开了一层数组和flat的depth为1时结果一样，回调函数内容和map一样

//三个静态方法
console.log(Array.isArray(arr3));
console.log(Array.of(7));//[7] 通过任意个参数生成一个数组
console.log(Array.from('foo'));//从一个可迭代对象变成数组
console.log(Array.from({length:10},(v,i)=>i));
let aaa=Array(100).join('0').split('').map((v,index)=>index+1)
let aaa2=Array.from(Array(100),(v,i)=>i+1)
// console.log(aaa);
// console.log(aaa2);
console.log(Array.from(new Set([1,2,3,4,4,6,5,5,6,76,'76'])))