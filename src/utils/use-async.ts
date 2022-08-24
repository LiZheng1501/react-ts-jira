import { useState, useCallback } from 'react';
import { useMountedRef } from 'utils';

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
  const mountedRef = useMountedRef();
  const [retry, setRetry] = useState(() => () => {});
  // 成功时设置data
  const setData = useCallback(
    (data: D) =>
      setState({
        data,
        stat: 'success',
        error: null,
      }),
    []
  );
  // 失败的时候设置data
  const setError = useCallback((error: Error) => {
    setState({
      data: null,
      stat: 'error',
      error,
    });
  }, []);
  // run-触发异步请求
  const run = useCallback(
    (promise: Promise<D>, retryConfig?: { retry: () => Promise<D> }) => {
      if (!promise || !promise.then) {
        throw new Error('请传入Promise类型数据');
      }
      setRetry(() => () => {
        console.log('set retry');
        retryConfig?.retry && run(retryConfig.retry(), retryConfig);
      });
      // setState({
      //   ...state,
      //   stat: 'loading',
      // });
      setState((prevState) => ({ ...prevState, stat: 'loading' }));
      return promise
        .then((data) => {
          if (mountedRef.current) {
            setData(data);
          }
          return data;
        })
        .catch((err) => {
          // catch会消化异常，如果不主动抛出，外面是接受不到异常的。
          if (config.throwOnError) {
            return Promise.reject(err);
          }
          return err;
        });
    },
    [config.throwOnError, mountedRef, setData]
  );
  return {
    isIdle: state.stat === 'idle',
    isLoading: state.stat === 'loading',
    isError: state.stat === 'error',
    isSuccess: state.stat === 'success',
    run,
    setData,
    setError,
    retry,
    ...state,
  };
};
