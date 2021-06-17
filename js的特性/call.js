Function.prototype.myCall=function (context,...args) {
    let self=this;
    context=context===undefined?globalThis:context;
    context.__proto__.fn=self;
    context.fn(...args);
}


function test(params) {
    console.log(this);
}

test.myCall({name:'lfl'});