import React from 'react';
import { Drawer, Form, Input, Select, Button } from 'antd';
import { ButtonNoPadding } from 'components/lib';
import { useProjectModal } from 'utils/url';

export const ProjectModal = () => {
  const { projectModalOpen, open, close } = useProjectModal();
  // 提交
  const onFinish = () => {};

  return (
    <Drawer visible={projectModalOpen} width={'100%'} onClose={close}>
      <Form layout="vertical" style={{ width: '40rem' }} onFinish={onFinish}>
        <Form.Item label="名称" name="name" rules={[{ required: true }]}>
          <Input placeholder="请输入项目名称" />
        </Form.Item>
        <Form.Item
          label="部门"
          name="organization"
          rules={[{ required: true }]}
        >
          <Input placeholder="请输入部门名称" />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            提交
          </Button>
        </Form.Item>
      </Form>
    </Drawer>
  );
};
