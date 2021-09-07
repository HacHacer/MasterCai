//js中只有三种hint
//string
alert(Symbol('id'))
a[key] //作为属性键会使用string hint

//为了进行转换，JavaScript 尝试查找并调用三个对象方法：
let user = {
  name: "John",
  money: 1000,

  [Symbol.toPrimitive](hint) {
    alert(`hint: ${hint}`);
    return hint == "string" ? `{name: "${this.name}"}` : this.money;
  }
};

// 转换演示：
alert(user); // hint: string -> {name: "John"}
alert(+user); // hint: number -> 1000
alert(user + 500); // hint: default -> 1500

// alert方法默认转成string
alert([,2,3,41,2])//调用array.toString()