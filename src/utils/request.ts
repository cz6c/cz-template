import axios from "axios";
import type { AxiosRequestConfig } from "axios";
import router from "@/router/index";
import { getToken, removeToken } from "@utils/auth";

// 封装axios
const service = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
  withCredentials: true, // 设置跨域cookie上传
  timeout: 5000, // 请求超时
});

// request 拦截器 ==> 对请求参数做处理
service.interceptors.request.use(
  config => {
    // 判断为模板文件
    const isFileApi = config.params && config.params.isExportApi;
    if (isFileApi) {
      config.responseType = "blob";
    }
    // 判断如为导入接口则接口超时设置为0，即不超时
    if (config.url === "/device/assets/importExcel") {
      config.timeout = 0;
    }
    config.headers["token"] = config.headers["token"] || getToken();
    return config;
  },
  error => {
    console.log(error); // for debug
    return Promise.reject(error);
  },
);
// response 拦截器 ==> 对响应做处理
service.interceptors.response.use(
  response => {
    // 判断为模板文件
    const isFileApi = response.config.params && response.config.params.isExportApi;
    if (isFileApi) {
      return response;
    }
    const res = response.data;
    // 当请求不为200时，报错
    if (res.code !== 200) {
      if (res.code === -406 || res.code === -407) {
        removeToken();
        router.push(`/login?redirect=${(router.currentRoute as any).fullPath}`);
        return;
      }
      return Promise.reject(new Error(res.msg || "Error"));
    } else {
      return res;
    }
  },
  error => {
    console.log("err" + error); // for debug
    return Promise.reject(error);
  },
);
export default service;

// 封装 get post 方法
interface Response<T> {
  code: number; // 接口数据状态码,不是接口状态码
  msg: string; // 接口消息
  data: T;
}
export const createGet = <P extends Record<string, any>, R>(url: string) => {
  return (params?: P, config: AxiosRequestConfig = {}): Promise<Response<R>> => {
    return service.request({
      method: "get",
      url,
      params,
      ...config,
    });
  };
};
export const createPost = <P extends Record<string, any>, R>(url: string) => {
  return (data?: P, config: AxiosRequestConfig = {}): Promise<Response<R>> => {
    return service.request({
      method: "post",
      url,
      data,
      ...config,
    });
  };
};
