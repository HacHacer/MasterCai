
const SMSClient = require('@alicloud/sms-sdk')

// ACCESS_KEY_ID/ACCESS_KEY_SECRET 根据实际申请的账号信息进行替换
const accessKeyId = "LTAI5tPNQZSN75r332D8FvpL";
// const secretAccessKey = 'XxBvsJ7LDb22K8vTunv4MhdmqPKDDw'
const secretAccessKey = "7UsuyCXUubVTlNdvnso4nNfhOLC0Yl";

//在云通信页面开通相应业务消息后，就能在页面上获得对应的queueName,不用填最后面一段
const queueName = 'Alicom-Queue-1092397003988387-'

// vpc需要配置,华东1示例：请查看 https://help.aliyun.com/document_detail/68360.html
const smsApiEndpoint = 'http://dysmsapi-vpc.cn-hangzhou.aliyuncs.com'
const baseApiEndpoint = 'http://dybaseapi-vpc.cn-hangzhou.aliyuncs.com'
const regionId = 'cn-hangzhou' 
const mnsVpc = {
    secure: false, // use https or http
    internal: true, // use internal endpoint
    vpc: true,
}



//初始化sms_client, 后面4个参数vpc需要配置
let smsClient = new SMSClient({accessKeyId, secretAccessKey})
let options={method:'POST'}
console.log(smsClient);
smsClient.sendSMS({
    PhoneNumbers: '15797734356',
    SignName: '易购',
    TemplateCode: 'SMS_169114643',
    TemplateParam: `{"codd":"usbusb"}`
}).then(function (res) {
    let {Code}=res
    if (Code === 'OK') {
        //处理返回参数
        console.log(res)
    }
}, function (err) {
    console.log(err)
})