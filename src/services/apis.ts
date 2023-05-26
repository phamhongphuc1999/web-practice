/* eslint-disable @typescript-eslint/no-explicit-any */
import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';

function responseBody<T>(res: AxiosResponse<T>) {
  return res.data;
}

export function createApi(apiRoot: string, apiConfig: AxiosRequestConfig = {}) {
  function get<T = any>(url: string, config?: AxiosRequestConfig) {
    return axios.get(`${apiRoot}${url}`, { ...config, ...apiConfig }).then<T>(responseBody);
  }
  function post<B = any, T = any>(url: string, data?: B, config?: AxiosRequestConfig) {
    return axios.post(`${apiRoot}${url}`, data, { ...config, ...apiConfig }).then<T>(responseBody);
  }
  function put<B = any, T = any>(url: string, data?: B, config?: AxiosRequestConfig) {
    return axios.put(`${apiRoot}${url}`, data, { ...config, ...apiConfig }).then<T>(responseBody);
  }
  function del<T = any>(url: string, config?: AxiosRequestConfig) {
    return axios.delete(`${apiRoot}${url}`, { ...config, ...apiConfig }).then<T>(responseBody);
  }
  return { get, post, put, del };
}
