import React from 'react';
import { Form, Select, Input, Card } from 'antd';
export interface User {
  id: string;
  name: string;
  email: string;
  title: string;
  organization: string;
  token: string;
}

// 表示这个组件如何使用
interface SearchPanelProps {
  users: User[];
  param: {
    name: string;
    personId: string;
  };
  setParam: (param: SearchPanelProps['param']) => void;
}

export const SearchPanel = ({ users, param, setParam }: SearchPanelProps) => {
  return (
    <Card>
      <Form>
        <Form.Item>
          <Input
            type={'text'}
            value={param.name}
            onChange={(event) =>
              setParam({
                ...param,
                name: event.target.value,
              })
            }
          />
        </Form.Item>
        <Form.Item>
          <Select
            value={param.personId}
            onChange={(value) =>
              setParam({
                ...param,
                personId: value,
              })
            }
          >
            <Select.Option value={''}>负责人</Select.Option>
            {users.map((user) => (
              <Select.Option value={user.id} key={user.id}>
                {user.name}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>
      </Form>
    </Card>
  );
};
