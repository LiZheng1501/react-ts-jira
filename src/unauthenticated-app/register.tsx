import React from 'react';
import { useAuth } from '../context/auth-context';
import { Button, Form, Input } from 'antd';
import { LongButton } from './index';

const apiUrl = process.env.REACT_APP_API_URL;

export const RegisterScreen = ({
  onError,
}: {
  onError: (error: Error) => void;
}) => {
  const { register } = useAuth();
  // js/ts是鸭子类型：面向接口编程而不是面向对象编程
  // HtmlFormElement extends Element
  const handleSubmit = async ({
    cpassword,
    ...values
  }: {
    username: string;
    password: string;
    cpassword: string;
  }) => {
    if (cpassword !== values.password) {
      onError(new Error('两次输入不相同!'));
      return;
    }
    try {
      await register(values);
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
        <Input type={'text'} id={'username'} placeholder={'请输入用户名'} />
      </Form.Item>
      <Form.Item
        name={'password'}
        rules={[{ required: true, message: '密码不可为空!' }]}
      >
        <Input type={'password'} id={'password'} placeholder={'请输入密码'} />
      </Form.Item>
      <Form.Item
        name={'cpassword'}
        rules={[{ required: true, message: '密码不可为空!' }]}
      >
        <Input type={'password'} id={'cpassword'} placeholder={'确认密码'} />
      </Form.Item>
      <Form.Item>
        <LongButton htmlType={'submit'} type={'primary'}>
          注册
        </LongButton>
      </Form.Item>
    </Form>
  );
};
