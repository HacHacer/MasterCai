// const Core = require("@alicloud/pop-core");

// var client = new Core({
//   accessKeyId: "LTAIWLaTypxA0XXo",
//   accessKeySecret: "XxBvsJ7LDb22K8vTunv4MhdmqPKDDw",
//   endpoint: "https://dysmsapi.aliyuncs.com",
//   apiVersion: "2017-05-25",
// });

// var params = {
//   PhoneNumbers: "15797734356",
//   SignName: "易购",
//   TemplateCode: "SMS_169114643",
// };

// var requestOption = {
//   method: "POST",
// };

// client.request("SendSms", params, requestOption).then(
//   (result) => {
//     console.log(JSON.stringify(result));
//   },
//   (ex) => {
//     console.log(ex);
//   }
// );
const smsCode = {
  jdex: "123213",
  "hotcoin-global": "2131231",
};

let a=new Set(Array.from([
  { name: 123, value: 321 },
  { name: 123, value: 321 },
]))
let c=Array.of(1,3,24)
console.log('c :>> ', c);
console.log(Object.keys(a));
// console.log("process.cwd() :>> ", process.cwd());