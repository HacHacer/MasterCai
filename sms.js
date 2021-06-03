const Core = require("@alicloud/pop-core");

var client = new Core({
  accessKeyId: "LTAIWLaTypxA0XXo",
  accessKeySecret: "XxBvsJ7LDb22K8vTunv4MhdmqPKDDw",
  endpoint: "https://dysmsapi.aliyuncs.com",
  apiVersion: "2017-05-25",
});

var params = {
  PhoneNumbers: "15797734356",
  SignName: "易购",
  TemplateCode: "SMS_169114643",
    TemplateParam: '{"code":"000000"}',
};

var requestOption = {
  method: "POST",
};

client.request("SendSms", params, requestOption).then(
  (result) => {
    console.log(JSON.stringify(result));
  },
  (ex) => {
    console.log(ex);
  }
);
