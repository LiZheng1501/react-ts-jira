import React, { useEffect, useState } from 'react';
import { SearchPanel } from './search-panel';
import { List } from './list';
import * as qs from 'qs';
import { cleanObject, useDebounce, useMount } from '../../utils';
import { useHttp } from '../../utils/http';

const apiUrl = process.env.REACT_APP_API_URL;

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
    <div>
      <SearchPanel users={users} param={param} setParam={setParam} />
      <List users={users} list={list} />
    </div>
  );
};
