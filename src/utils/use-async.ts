import { useState, useCallback, useReducer } from 'react';
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

const useSafeDispatch = <T>(dispatch: (...args: T[]) => void) => {
  const mountedRef = useMountedRef();
  return useCallback(
    (...args: T[]) => (mountedRef.current ? dispatch(...args) : void 0),
    [dispatch, mountedRef]
  );
};
// 用useReducer改造
export const useAsync = <D>(
  initialState?: State<D>,
  initialConfig?: typeof defaultConfig
) => {
  const config = { ...defaultConfig, initialConfig };
  const [state, dispatch] = useReducer(
    (state: State<D>, action: Partial<State<D>>) => ({ ...state, ...action }),
    {
      ...defaultInitialState,
      ...initialState,
    }
  );
  // const [state, setState] = useState<State<D>>({
  //   ...defaultInitialState,
  //   ...initialState,
  // });
  const safeDispatch = useSafeDispatch(dispatch);
  const [retry, setRetry] = useState(() => () => {});
  // 成功时设置data
  const setData = useCallback(
    (data: D) =>
      safeDispatch({
        data,
        stat: 'success',
        error: null,
      }),
    [safeDispatch]
  );
  // 失败的时候设置data
  const setError = useCallback(
    (error: Error) => {
      safeDispatch({
        data: null,
        stat: 'error',
        error,
      });
    },
    [safeDispatch]
  );
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
      safeDispatch({ stat: 'loading' });
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
    },
    [config.throwOnError, setData, safeDispatch]
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
