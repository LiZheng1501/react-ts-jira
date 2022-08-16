import React, { useEffect, useState } from 'react';
import { SearchPanel } from './search-panel';
import { List } from './list';
import { useDebounce, useMount } from '../../utils';
import { useHttp } from '../../utils/http';
import styled from '@emotion/styled';
import { Typography } from 'antd';
import { useProject } from '../../utils/project';

export const ProjectListScreen = () => {
  const [users, setUsers] = useState([]);
  const [param, setParam] = useState({
    name: '',
    personId: '',
  });
  const debouncedParam = useDebounce(param, 200);
  const client = useHttp();
  const { isLoading, error, data: list } = useProject(debouncedParam);
  // useDidMount只执行一次
  useMount(() => {
    client('users').then(setUsers);
  });

  return (
    <Container>
      <h2>项目列表</h2>
      <SearchPanel users={users} param={param} setParam={setParam} />
      {error ? (
        <Typography.Text type={'danger'}>{error.message}</Typography.Text>
      ) : null}
      <List loading={isLoading} users={users} dataSource={list || []} />
    </Container>
  );
};

const Container = styled.div`
  padding: 2rem;
`;
