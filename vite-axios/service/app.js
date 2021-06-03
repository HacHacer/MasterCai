const http = require("http");
const host = "localhost";
const port = "8888";
const app = require("./route"); // 引入router.js文件

const server = http.createServer(app);

app.post("/api/register", (req, res) => {
    console.log(123123)
  res.write(`<head><meta charset="utf-8"/></head>`);
  res.end("注册接口响应");
});

app.post("/api/login", (req, res) => {
  res.write(`<head><meta charset="utf-8"/></head>`);
  res.end("登录接口响应");
});

app.get("/api/list", (req, res) => {
  res.write(`<head><meta charset="utf-8"/></head>`);
  res.end("查询列表接口响应");
});

server.listen(port, host, () => {
  console.log(`Server running at http://${host}:${port}`);
});
