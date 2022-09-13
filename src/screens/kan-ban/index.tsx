import React from 'react';
import { useDocumentTitle } from 'utils';
import { useKanban } from 'utils/kanban';
import { KanbanColumn } from './kanban-column';
import styled from '@emotion/styled';

export const KanbanScreen = () => {
  useDocumentTitle('看板列表');
  const { data: kanbans } = useKanban();
  return (
    <ColumnsContainer>
      {kanbans?.map((kanban) => (
        <KanbanColumn kanban={kanban} key={kanban.id}>
          {kanban.name}
        </KanbanColumn>
      ))}
    </ColumnsContainer>
  );
};

const ColumnsContainer = styled.div`
  display: flex;
  overflow: hidden;
  margin-right: 2rem;
`;
