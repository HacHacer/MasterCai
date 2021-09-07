function toHex(num,aa=7) {
  let temp = "0123456789abcdefghijklmnopqrstuvwxyz";
  let res = "";
  while (num != 0) {
    let a = num % aa;
    res=temp[a]+res
    num = parseInt(num / aa);
  }
  return res;
}
function toHex2(num) {
  let startNum = "a".codePointAt(0);
  let str = getWordArr(22, startNum);
  let temp = "0123456789" + str;
  let res = "";
  while (num != 0) {
    res = temp[num & 31] + res;
    num >>= 5;
  }
  return res;
}
// toHex2(32);
console.log("toHex(15) :>> ",toHex(35,36));
// console.log('2**5 :>> ', 2**5-1);
function getWordArr(num, start) {
  return String.fromCharCode(...getNumArr(num, start));
}

function getNumArr(params, start = 0) {
  return Array.from(Array(params), (v, index) => index + start);
}
