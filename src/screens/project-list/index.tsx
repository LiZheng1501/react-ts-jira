import React, { useState, useRef } from 'react';
import { SearchPanel } from './search-panel';
import { List } from './list';
import { useDebounce, useDocumentTitle, useMount } from '../../utils';
import { useHttp } from '../../utils/http';
import styled from '@emotion/styled';
import { Typography, Button } from 'antd';
import { useProject } from '../../utils/project';
import { Test } from '../../components/test-closure';
import { useUrlQueryParam } from 'utils/url';

export const ProjectListScreen = () => {
  const [users, setUsers] = useState([]);
  const [keys] = useState<('name' | 'personId')[]>(['name', 'personId']);
  const [param, setParam] = useUrlQueryParam(keys);
  const debouncedParam = useDebounce(param, 200);
  const client = useHttp();
  const { isLoading, error, data: list, retry } = useProject(debouncedParam);
  useDocumentTitle('项目列表', false);
  // useDidMount只执行一次
  useMount(() => {
    client('users').then(setUsers);
  });
  return (
    <Container>
      <Test />
      <Button onClick={retry}>Retry</Button>
      <h2>项目列表</h2>
      <SearchPanel users={users} param={param} setParam={setParam} />
      {error ? (
        <Typography.Text type={'danger'}>{error.message}</Typography.Text>
      ) : null}
      <List
        refresh={retry}
        loading={isLoading}
        users={users}
        dataSource={list || []}
      />
    </Container>
  );
};

ProjectListScreen.whyDidYouRender = true;
// 相当于在class中
// class ProjectListScreen2 extends React.Component<any, any> {
//   static whyDidYouRender = true;
// }
const Container = styled.div`
  padding: 2rem;
`;
