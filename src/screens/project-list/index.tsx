import React, { useEffect, useState } from 'react';
import { SearchPanel } from './search-panel';
import { List } from './list';
import { cleanObject, useDebounce, useMount } from '../../utils';
import { useHttp } from '../../utils/http';
import styled from '@emotion/styled';
// const apiUrl = process.env.REACT_APP_API_URL;

export const ProjectListScreen = () => {
  const [users, setUsers] = useState([]);
  const [param, setParam] = useState({
    name: '',
    personId: '',
  });
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
    client('projects', { data: cleanObject(debouncedParam) }).then(setList);
  }, [debouncedParam]);

  // useDidMount只执行一次
  useMount(() => {
    client('users').then(setUsers);
  });

  return (
    <Container>
      <h2>项目列表</h2>
      <SearchPanel users={users} param={param} setParam={setParam} />
      <List users={users} list={list} />
    </Container>
  );
};

const Container = styled.div`
  padding: 2rem;
`;
