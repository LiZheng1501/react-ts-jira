import { useState } from 'react';

type State<D> = {
  error: Error | null;
  data: D | null;
  stat: 'idle' | 'loading' | 'error' | 'success'; // 对应异步的四种状态
};

const defaultInitialState: State<null> = {
  stat: 'idle',
  data: null,
  error: null,
};

const defaultConfig = {
  throwOnError: false,
};

export const useAsync = <D>(
  initialState?: State<D>,
  initialConfig?: typeof defaultConfig
) => {
  const config = { ...defaultConfig, initialConfig };
  const [state, setState] = useState<State<D>>({
    ...defaultInitialState,
    ...initialState,
  });
  // 成功时设置data
  const setData = (data: D) =>
    setState({
      data,
      stat: 'success',
      error: null,
    });
  // 失败的时候设置data
  const setError = (error: Error) => {
    setState({
      data: null,
      stat: 'error',
      error,
    });
  };
  // run-触发异步请求
  const run = (promise: Promise<D>) => {
    if (!promise || !promise.then) {
      throw new Error('请传入Promise类型数据');
    }
    setState({
      ...state,
      stat: 'loading',
    });
    return promise
      .then((data) => {
        setData(data);
        return data;
      })
      .catch((err) => {
        // catch会消化异常，如果不主动抛出，外面是接受不到异常的。
        if (config.throwOnError) {
          return Promise.reject(err);
        }
        return err;
      });
  };
  return {
    isIdle: state.stat === 'idle',
    isLoading: state.stat === 'loading',
    isError: state.stat === 'error',
    isSuccess: state.stat === 'success',
    run,
    setData,
    setError,
    ...state,
  };
};
