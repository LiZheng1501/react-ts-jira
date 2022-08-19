import { useSearchParams } from 'react-router-dom';

/** 此方法返回页面url中，指定键的参数值 */
export const useUrlQueryParam = <K extends string>(keys: K[]) => {
  const [searchParams, setSearchParams] = useSearchParams();
  return [
    keys.reduce((acc, cur) => {
      return { ...acc, [cur]: searchParams.get(cur) || '' };
    }, {} as { [key in K]: string }),
    setSearchParams,
  ] as const;
};

const a = ['12'] as const;

console.log(a);
