import axios, { AxiosRequestConfig } from "axios";

const myAxios = function (config: AxiosRequestConfig) {
  const service = axios.create({
    timeout: 100000,
    baseURL: "http://localhost:8888",
  });
  return service(config);
};

export default myAxios