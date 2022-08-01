import { useState, useEffect } from 'react';
// 对于一个custom hook来说，必须是它里面用到了别的hook, 如果函数也能完成，那么函数就挺好的了
// 转换成boolean
export const isFalsy = (value: unknown) => (value === 0 ? false : !value);
// let a:unknown;
// a = []
// a = undefined,
// 但是不能给unknown赋值给任何
// 在一个函数里改变传入对象本身是不好的
export const cleanObject = (object: object) => {
  const res = { ...object };
  Object.keys(res).forEach((key) => {
    // @ts-ignore
    const value = res[key];
    if (isFalsy(value)) {
      // @ts-ignore
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
  }, [value, delay]);
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
