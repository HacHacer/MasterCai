let a = 1;

setTimeout(() => {
  console.log(3);
}, 0); //加入宏任务
//已经在宏任务中即代码块，事件循环先执行这个宏任务(代码块)
console.log(1);
// let b = new Promise((res, rej) => {
//     console.log(5)
//     res(2)
// });
queueMicrotask(() => {
  console.log(4);
});
// b.then(res=>{
//     console.log(res)
// })
let bbb=(cb)=>{
    cb()
}
let dowork = () => {
  let result = 1;
  queueMicrotask(() => {
    console.log(5);
  });
  for (let i = 2; i <= 10; i++) {
    result *= i;
  }
  return result;
};
console.log(dowork());
bbb(()=>{
    console.log(111111)
})
console.log(2); //顶层脚本先于所有创建的task和microtask执行完

//顶层代码是指一个处理柱程序的任务

///事件循环检查完宏任务后跑完所有微任务，微任务按顺序执行，在执行宏任务
///所有事件处理函数timeout和intervals以及其他回调函数都是宏任务
