import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';

const client = axios.create({
  baseURL: 'http://localhost:3000',
});

export const postRequest = async <RequestParams, ReturnType>(
  path: string,
  params?: RequestParams,
  config?: AxiosRequestConfig<RequestParams>,
): Promise<AxiosResponse<ReturnType>> =>
  await client.post(path, params, config);
