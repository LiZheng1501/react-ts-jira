import React from 'react';
import { Card } from 'antd';
import { Kanban } from 'types/kanban';
import { useTask } from 'utils/task';
import styled from '@emotion/styled';
// import { useTaskType } from 'utils/task-type';

export const KanbanColumn = ({
  kanban,
}: {
  kanban: Kanban;
  children: string;
}) => {
  const { data: allTasks } = useTask();
  const tasks = allTasks?.filter((task) => task.kanbanId === kanban.id);
  return (
    <Container>
      {tasks?.map((task) => (
        <TaskContainer key={task.id}>
          <Card>{task.name}</Card>
        </TaskContainer>
      ))}
    </Container>
  );
};

const Container = styled.div`
  min-width: 27rem;
  border-radius: 6px;
  background-color: rgb(244, 245, 247);
  flex-direction: column;
  pading: 0.7rem 0.7rem 1rem;
  margin-right: 1.5rem;
`;

const TaskContainer = styled.div`
  overflow: scroll;
  flex: 1;
  ::-webkit-scrollbar {
    display: none;
  }
`;
