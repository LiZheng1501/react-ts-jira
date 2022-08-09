import React from 'react';
import { useAuth } from '../context/auth-context';
import { Button, Form, Input } from 'antd';
import { LongButton } from './index';

export const LoginScreen = () => {
  const { login } = useAuth();
  // js/ts是鸭子类型：面向接口编程而不是面向对象编程
  // HtmlFormElement extends Element
  const handleSubmit = (values: { username: string; password: string }) => {
    login(values);
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
        <LongButton htmlType={'submit'} type={'primary'}>
          登录
        </LongButton>
      </Form.Item>
    </Form>
  );
};
