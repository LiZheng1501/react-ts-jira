import React, { useEffect, useState } from 'react';
import { useMount } from 'utils';

// 定义一个纯函数，看闭包是如何工作的；
// 模拟test组件
const test = () => {
  let num: number = 0;
  const effect = () => {
    num += 1;
    const message = `现在的num值是${num}`;
    return function unmount() {
      console.log(`${message}`);
    };
  };
  return effect;
};
const add = test(); // 执行test,返回effect函数
const unmount = add(); // 执行effect函数，返回带有message的unmount函数(message1)
add(); // 再一次执行了effect函数，又一次创建了const message(message2)
add(); // 再一次执行了effect函数，又一次创建了const message(message3)
add(); // 再一次执行了effect函数，又一次创建了const message(message4)
add(); // 再一次执行了effect函数，又一次创建了const message(message5)
unmount(); // 在这里会打印什么？打印unmount, 用的是message多少呢？messge1，那么mesage1在定义的时候用的num是多少呢？是1

// React hook 与闭包的坑
export const Test = () => {
  const [num, setNum] = useState(0);
  const add = () => setNum(num + 1);

  useEffect(() => {
    return () => {
      console.log(num);
    };
  }, []);
  return (
    <div>
      <button onClick={add}>add</button>
      <p>number: {num}</p>
    </div>
  );
};
