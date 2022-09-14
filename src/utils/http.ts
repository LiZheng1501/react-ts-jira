import qs from 'qs';
import * as auth from 'auth-provider';
import { useAuth } from '../context/auth-context';
import { useCallback } from 'react';

const apiUrl = process.env.REACT_APP_API_URL;

interface Config extends RequestInit {
  token?: string;
  data?: object;
}

// axios的表现和fetch不一样，axios可以直接在返回状态不是200的时候返回异常报错

export const http = async (
  url: string,
  { data, token, headers, ...customConfig }: Config = {}
) => {
  const config = {
    method: 'GET',
    headers: {
      Authorization: token ? `Bearer ${token}` : '',
      'Content-Type': data ? 'application/json' : '',
    },
    ...customConfig,
  };

  if (config.method.toUpperCase() === 'GET') {
    url += `?${qs.stringify(data)}`;
  } else {
    config.body = JSON.stringify(data || {});
  }

  // axios 和 fetch 的表现不一样，axios可以直接在返回状态不为2xx的时候抛出异常
  return window.fetch(`${apiUrl}/${url}`, config).then(async (response) => {
    if (response.status === 401) {
      await auth.logout();
      window.location.reload();
      return Promise.reject({ message: '请重新登录' });
    }
    const data = await response.json();
    if (response.ok) {
      return data;
    } else {
      return Promise.reject(data);
    }
  });
};

export const useHttp = () => {
  const { user } = useAuth();
  // utility type 的用法：用泛型给它传入一个其他类型，然后utility type对这个类型进行某种操作
  return useCallback(
    (...[url, config]: Parameters<typeof http>) =>
      http(url, { ...config, token: user?.token }),
    [user?.token]
  );
};
