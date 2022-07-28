export const isFalsy = (value) => (value === 0 ? false : !value); // 转换成boolean

// 在一个函数里改变传入对象本身是不好的
export const cleanObject = (object) => {
  const res = { ...object };
  Object.keys(res).forEach((key) => {
    const value = res[key];
    if (isFalsy(value)) delete res[key];
  });
  return res;
};
