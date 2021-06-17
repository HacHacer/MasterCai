class Promise1 {
  constructor(executor) {
    try {
      this.executor = executor;
      this.status = "pendding";
      this.executor(this.resolve, this.reject);
    } catch (error) {
      this.reject(error);
    }
  }
  value;
  reason;
  onFulfilledCb = [];
  onRejectedCb = []; //为了能够等待executor完成后再then

  resolve = (value) => {
    if (this.status === "pendding") {
      this.status = "fullfilled";
      this.value = value;
      while (this.onFulfilledCb.length) {
        this.onFulfilledCb.shift()(value); //解决异步then执行不了的问题,因为resolve放在异步方法里执行时先执行then在执行resolve状态还没发生改变
      }
      //   this.onFulfilledCb&&this.onFulfilledCb(value)
    }
  };
  reject = (reason) => {
    if (this.status === "pendding") {
      this.status = "rejected";
      this.reason = reason;
      while (this.onRejectedCb.length) {
        this.onRejectedCb.shift()(reason);
      }
      //   this.onRejectedCb&&this.onRejectedCb(reason)
    }
  };
  then(onFulfilled, onRejected) {
    const promise2 = new Promise1((resolve, reject) => {
      // 判断状态
      if (this.status === "fullfilled") {
        // 调用成功回调，并且把值返回
        queueMicrotask(() => {
          try {
            const x = onFulfilled(this.value);
            resolvePromise(promise2, x, resolve, reject);
          } catch (error) {
            reject(error);
          }
        });
      } else if (this.status === "rejected") {
        // 调用失败回调，并且把原因返回
        onRejected(this.reason);
      } else if (this.status === "pendding") {
        this.onFulfilledCb.push(onFulfilled);
        this.onRejectedCb.push(onRejected); //为了promise能够同时调用then
      }
    });
    return promise2;
  }
}

function resolvePromise(promise2, x, resovle, reject) {
  if (promise2 === x) {
    return x.reject(new TypeError("错误里"));
  }
  if (x instanceof Promise1) {
    x.then(resovle, reject);
  }
  resovle(x);
}

module.exports = Promise1;
//nodejs模块处理