import React from 'react';
import { useAuth } from '../context/auth-context';
import { Form, Input } from 'antd';
import { LongButton } from './index';
import { useAsync } from '../utils/use-async';
import { useDispatch } from 'react-redux';

export const LoginScreen = ({ onError }: { onError: (err: Error) => void }) => {
  const { login } = useAuth();
  const { run, isLoading } = useAsync(undefined, { throwOnError: true });
  const dispatch = useDispatch();
  // js/ts是鸭子类型：面向接口编程而不是面向对象编程
  // HtmlFormElement extends Element
  const handleSubmit = async (values: {
    username: string;
    password: string;
  }) => {
    // dispatch(loginThunk(values));
    try {
      await run(login(values));
    } catch (err) {
      onError(err as Error);
    }
  };
  return (
    <Form onFinish={handleSubmit}>
      <Form.Item
        name={'username'}
        rules={[{ required: true, message: '用户名不可为空!' }]}
      >
        <Input placeholder={'用户名'} type={'text'} id={'username'} />
      </Form.Item>
      <Form.Item
        name={'password'}
        rules={[{ required: true, message: '密码不可为空!' }]}
      >
        <Input placeholder={'密码'} type={'password'} id={'password'} />
      </Form.Item>
      <Form.Item>
        <LongButton loading={isLoading} htmlType={'submit'} type={'primary'}>
          登录
        </LongButton>
      </Form.Item>
    </Form>
  );
};
