import React from 'react';
import { Drawer } from 'antd';
import { ButtonNoPadding } from 'components/lib';
import { useProjectModal } from 'utils/url';

export const ProjectModal = () => {
  const { projectModalOpen, open, close } = useProjectModal();
  return (
    <Drawer visible={projectModalOpen} width={'100%'} onClose={close}>
      <h1>Project modal</h1>
      <ButtonNoPadding onClick={close}>关闭</ButtonNoPadding>
    </Drawer>
  );
};
