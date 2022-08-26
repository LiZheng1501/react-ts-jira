import React from 'react';
import { Button } from 'antd/lib/radio';
import { Drawer } from 'antd';
import { ButtonNoPadding } from 'components/lib';

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
      <ButtonNoPadding onClick={props.onClose}>关闭</ButtonNoPadding>
    </Drawer>
  );
};
