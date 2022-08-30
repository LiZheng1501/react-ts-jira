import React from 'react';
import { Button } from 'antd/lib/radio';
import { Drawer } from 'antd';
import { ButtonNoPadding } from 'components/lib';
import { useDispatch, useSelector } from 'react-redux';
import {
  projectListActions,
  selectProjectModalOpen,
} from './project-list.slice';

export const ProjectModal = () => {
  const dispatch = useDispatch();
  const projectModalOpen = useSelector(selectProjectModalOpen);
  return (
    <Drawer
      visible={projectModalOpen}
      width={'100%'}
      onClose={() => dispatch(projectListActions.closeProjectModal())}
    >
      <h1>Project modal</h1>
      <ButtonNoPadding
        onClick={() => dispatch(projectListActions.closeProjectModal())}
      >
        关闭
      </ButtonNoPadding>
    </Drawer>
  );
};
