let balance=100;
// withdraw是个箭头函数 参数balance穿个匿名函数外部在传人内部，
// 匿名函数里是独立的作用域，只能有外部括号中传入数据
let withdraw = balance=>(function (copyBalance) {
  console.log(copyBalance);
  let balance = copyBalance; // This variable is private
  let doBadThings = function () {
    console.log("I will do bad things with your money");
  };
  doBadThings();
  return function a(amount) {
     if (balance >= amount) {
       balance -= amount;
       return balance;
     } else {
       return "Insufficient money";
     }
   }
  ;
})(balance);
let b = "1312";
let a=(cb)=>{
    return cb(b)
}

a((c)=>{
    console.log(c)
})