import { useState, useEffect } from 'react';
// 对于一个custom hook来说，必须是它里面用到了别的hook, 如果函数也能完成，那么函数就挺好的了
// 转换成boolean
export const isFalsy = (value) => (value === 0 ? false : !value);

// 在一个函数里改变传入对象本身是不好的
export const cleanObject = (object) => {
  const res = { ...object };
  Object.keys(res).forEach((key) => {
    const value = res[key];
    if (isFalsy(value)) delete res[key];
  });
  return res;
};

// didMount 抽出Hook
export const useMount = (callback) => {
  useEffect(() => {
    callback();
  }, []);
};

// debounce
export const useDebounce = (value, delay) => {
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
