import React from 'react';
import { Button } from 'antd/lib/radio';
import { Drawer } from 'antd';

export const ProjectModal = (props: {
  projectModalOpen: boolean;
  onClose: () => void;
}) => {
  return (
    <Drawer
      visible={props.projectModalOpen}
      width={'100%'}
      onClose={props.onClose}
    >
      <h1>Project modal</h1>
      <Button onClick={props.onClose}>关闭</Button>
    </Drawer>
  );
};
