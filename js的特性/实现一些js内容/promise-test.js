const Promise1=require('./promise')
// function other() {
//   return new Promise1((resolve, reject) => {
//     resolve("other");
//   });
// }
const promise = new Promise1((resolve, reject) => {
  resolve("success");
});

// promise.then((value) => {
//   console.log(1);
//   console.log("resolve", value);
// });

const p1 = promise.then((value) => {
  console.log(1);
  console.log("resolve", value);
  return p1;
});
// promise.then((value) => {
//   console.log(2);
//   console.log("resolve", value);
// });
// p1.then(value => {
//   console.log(2)
//   console.log('resolve', value)
// }, reason => {
//   console.log(3)
//   console.log(reason.message)
// })

// promise
//   .then((value) => {
//     console.log(3);
//     console.log("resolve", value);
//     return other();
//   })
//   .then((value) => {
//     console.log(4);
//     console.log("resolve", value);
//   });

// 第一个then方法中的错误要在第二个then方法中捕获到
promise.then(value => {
  console.log(1)
  console.log('resolve', value)
  throw new Error('then error')
}, reason => {
  console.log(2)
  console.log(reason.message)
}).then(value => {
  console.log(3)
  console.log(value);
}, reason => {
  console.log(4)
  console.log(reason.message)//执行错误处理
})
