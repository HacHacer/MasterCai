/*
1.常量名一般使用全大写 
2.必须要有一个初始值
*/
const MY_FAV=7

if (MY_FAV === 7) {
    // 没问题，并且创建了一个块作用域变量 MY_FAV
    // (works equally well with let to declare a block scoped non const variable)
    let MY_FAV = 20;
  
    // MY_FAV 现在为 20
    console.log('my favorite number is ' + MY_FAV);
  
    // 这被提升到全局上下文并引发错误
    //var MY_FAV = 20;
  }
  
  // MY_FAV 依旧为7
  console.log('my favorite number is ' + MY_FAV);
  

  
  const MY_FAV2={}
  // const MY_FAV2={"a":123}
  MY_FAV2.a=123