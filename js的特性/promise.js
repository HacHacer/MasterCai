let a = new Promise((resolve, reject) => {
  setTimeout(resolve, 3000);
  // return new Promise((resolve, reject) => {
  //   resolve
  // });
});
// console.log(a.then())
// a.then(a=>{
//     console.log(a)
// },err=>{
//     console.log(err)
// }).catch(e=>{
//     console.log(e)
// }).finally(()=>{
//     // 没有参数
//     //  关闭加载动画
//     // 可以传递结果
// })
class Thenable {
  constructor(num) {
    this.num = num;
  }
  then(resolve, reject) {
    //console.log(resolve); // function() { native code }
    // 1 秒后使用 this.num*2 进行 resolve
    setTimeout(() => resolve(this.num * 2), 1000); // (**)
  }
}

// .then()里的handler返回一个promise后会传递下去
// 链上的catch可以捕获到链上的错误.then 将 result/error 传递给下一个 .then/.catch
new Promise((resolve) => resolve(1))
  .then((result) => {
    return new Thenable(result); // (*)
  })
  .then(aaa)
  .catch((err) => console.log(err)); // 1000ms 后显示 2

function aaa(params) {
 // console.log(params + "123213123");
}
