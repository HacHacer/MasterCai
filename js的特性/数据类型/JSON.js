let noJson={
    [Symbol('12312')]:'213123',
    a:undefined,
    c:()=>{}
}//当有这些元素是没有转换string,会被忽略
console.log('JSONS.stringfy(noJson) :>> ', JSON.stringify(noJson));