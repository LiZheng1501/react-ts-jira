import React from 'react';
import styled from '@emotion/styled';
import { useProject } from 'utils/project';
import { Popover, Typography, List, Divider, Button } from 'antd';
import { ButtonNoPadding } from './lib';
import { useProjectModal } from 'utils/url';

export const ProjectPopover = () => {
  const { data: projects } = useProject();
  const pinnedProjects = projects?.filter((project) => project.pin);
  const { open } = useProjectModal();
  const content = (
    <PopContainer>
      <Typography.Text type="secondary">收藏项目</Typography.Text>
      <List>
        {pinnedProjects?.map((p) => (
          <List.Item>
            <List.Item.Meta title={p.name}></List.Item.Meta>
          </List.Item>
        ))}
      </List>
      <Divider />
      <ButtonNoPadding type="link" onClick={open}>
        创建项目
      </ButtonNoPadding>
    </PopContainer>
  );
  return (
    <Popover placement="bottom" content={content}>
      项目
    </Popover>
  );
};

const PopContainer = styled.div`
  min-width: 300px;
`;
