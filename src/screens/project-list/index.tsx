import React, { useEffect, useState } from 'react';
import { SearchPanel } from './search-panel';
import { List } from './list';
import { cleanObject, useDebounce, useMount } from '../../utils';
import { useHttp } from '../../utils/http';
import styled from '@emotion/styled';
import { Typography } from 'antd';

export const ProjectListScreen = () => {
  const [users, setUsers] = useState([]);
  const [param, setParam] = useState({
    name: '',
    personId: '',
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const client = useHttp();
  /**
    上面的useState接受的参数类型就是
      interface T {
        name: string;
        personId: string;
      }
  */
  const [list, setList] = useState([]);
  const debouncedParam = useDebounce(param, 2000);
  // 当params变化要去请求接口
  useEffect(() => {
    setIsLoading(true);
    client('projects', { data: cleanObject(debouncedParam) })
      .then(setList)
      .catch((err) => {
        setError(err);
        setList([]);
      })
      .finally(() => setIsLoading(false));
  }, [debouncedParam]);

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
      <List loading={isLoading} users={users} dataSource={list} />
    </Container>
  );
};

const Container = styled.div`
  padding: 2rem;
`;
