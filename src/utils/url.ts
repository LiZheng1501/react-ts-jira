import { useSearchParams } from 'react-router-dom';
import { useMemo } from 'react';

/** 此方法返回页面url中，指定键的参数值 */
export const useUrlQueryParam = <K extends string>(keys: K[]) => {
  const [searchParams, setSearchParams] = useSearchParams();
  // 如何让它返回的值不要在每次组件渲染的时候都产生一个新的值？
  return [
    useMemo(
      () =>
        keys.reduce((acc, cur) => {
          return { ...acc, [cur]: searchParams.get(cur) || '' };
        }, {} as { [key in K]: string }),
      [searchParams, keys]
    ),
    (params: Partial<{ [key in K]: unknown }>) => {
      // iterator遍历器 凡是部署了iteratordou都可以用for...of进行遍历
      const o = { ...Object.fromEntries(searchParams), ...params }; // 读取出url信息转成对象
      return setSearchParams(o);
    },
  ] as const;
};
