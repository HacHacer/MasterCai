function observe(value, cb) {
  Object.keys(value).forEach((key) =>
    defineReactive(value, key, value[key], cb)
  );
}

function defineReactive(obj, key, val, cb) {
    const dep=new Dep()
  Object.defineProperty(obj, key, {
    enumerable: true,
    configurable: true,
    get: () => {
      /*....依赖收集等....*/
      
      if(Dep.target){
          dep.addSub(Dep.target)
      }
      /*Github:https://github.com/answershuto*/
      return val;
    },
    set: (newVal) => {
      val = newVal;
      cb(); /*订阅者收到消息的回调*/
    },
  });
}

class Vue {
  constructor(options) {
    this._data = options.data;
    observe(this._data, options.render);
    _proxy.call(this, options.data);
    let watcher = new Watcher(this, null, options.render);
  }

  /*代理*/
  
}
function _proxy(data) {
  const that = this;
  console.log(that);
  Object.keys(data).forEach((key) => {
    Object.defineProperty(that, key, {
      configurable: true,
      enumerable: true,
      get: function proxyGetter() {
        return that._data[key];
      },
      set: function proxySetter(val) {
        that._data[key] = val;
      },
    });
  });
}
/*构造函数中*/
class Dep {
  constructor() {
    this.subs = [];
  }
  // : Watcher
  addSub(sub) {
    this.subs.push(sub);
  }
  // : Watcher
  removeSub(sub) {
    remove(this.subs, sub);
  }
  /*Github:https://github.com/answershuto*/
  notify() {
    // stabilize the subscriber list first
    const subs = this.subs.slice();
    for (let i = 0, l = subs.length; i < l; i++) {
      subs[i].update();
    }
  }
}
Dep.target = null;
function remove(arr, item) {
  if (arr.length) {
    const index = arr.indexOf(item);
    if (index > -1) {
      return arr.splice(index, 1);
    }
  }
}
class Watcher {
  constructor(vm, expOrFn, cb, options) {
    this.cb = cb;
    this.vm = vm; //将vue对象给wathcer的vm属性

    /*在这里将观察者本身赋值给全局的target，只有被target标记过的才会进行依赖收集*/
    Dep.target = this;
    /*Github:https://github.com/answershuto*/
    /*触发渲染操作进行依赖收集*/
    this.cb.call(this.vm);//其实是vue对象放入cb中
  }

  update() {
    this.cb.call(this.vm);
  }
}

let app = new Vue({
  el: "#app",
  data: {
    text: "text",
    text2: "text2",
  },
  render() {
    console.log("rendertext");
  },
});

