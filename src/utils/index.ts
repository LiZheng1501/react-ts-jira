import React, { useState, useEffect, useRef, useCallback, Ref } from 'react';
// 对于一个custom hook来说，必须是它里面用到了别的hook, 如果函数也能完成，那么函数就挺好的了
// 转换成boolean
export const isFalsy = (value: unknown) => (value === 0 ? false : !value);
export const isVoid = (value: unknown) =>
  value === undefined || value === '' || value === null;
// let a:unknown;
// a = []
// a = undefined,
// 但是不能给unknown赋值给任何
// 在一个函数里改变传入对象本身是不好的
export const cleanObject = (object: { [key: string]: unknown }) => {
  const res = { ...object };
  Object.keys(res).forEach((key) => {
    const value = res[key];
    if (isVoid(value)) {
      delete res[key];
    }
  });
  return res;
};

// didMount 抽出Hook
export const useMount = (callback: () => void) => {
  useEffect(() => {
    callback();
  }, []);
};

// debounce 需要用范型来规范类型
export const useDebounce = <V>(value: V, delay?: number) => {
  const [debouncedValue, setDebouncedValue] = useState(value);
  useEffect(() => {
    // 每次在value变化之后，设置一个定时器
    const timeout = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);
    // 每次在上一次useEffect运行结束之后运行return函数（和debounce一样，第二次处理第一次的useEffect, 第三次处理第二次的, 直到最后一次）
    return () => clearTimeout(timeout);
  }, [value, delay]); // 每当依赖变化，useEffect执行一次
  return debouncedValue;
};

export const useArray = <T>(initialValue: T[]) => {
  const [value, setValue] = useState(initialValue);
  return {
    value,
    setValue,
    clear: () => setValue([]),
    add: (item: T) => setValue([...value, item]),
    removeIndex: (index: number) => {
      const copy = [...value];
      copy.slice(index, 1);
      setValue(copy);
    },
  };
};

//  document title
export const useDocumentTitle = (
  title: string,
  keepOnUnmount: boolean = true
) => {
  const oldTitle = useRef(document.title).current;
  useEffect(() => {
    document.title = title;
  }, [title]);
  useEffect(() => {
    return () => {
      // return 一个回调函数，在卸载的时候会调用
      if (!keepOnUnmount) {
        document.title = oldTitle;
      }
    };
  }, [keepOnUnmount, oldTitle]);
  // 这样保证了title是最新值，但是没法保存默认title了；如何解决，使用useRef; 返回的值在整个生命周期不变
};

// 重置路由+刷新
export const resetRoute = () => (window.location.href = window.location.origin);

// 返回组件的挂载状态。只在已经挂载的时候返回true
export const useMountedRef = () => {
  const mountedRef = useRef(false);
  // 在页面被加载完之后被调用
  useEffect(() => {
    mountedRef.current = true;
    return () => {
      mountedRef.current = false;
    };
  });
  return mountedRef;
};
