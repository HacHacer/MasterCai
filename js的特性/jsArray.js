let a=[1,3,24,[2,3],[3,32,[3,3]]]
let b=a.toString()
console.log('b',b)
console.log("split：", b.split(","));

console.log("join: ",a.join(','))
console.log("Array.from:",Array.from(a.join(",")));