import React, { useEffect, useState } from 'react';
import { SearchPanel } from './search-panel';
import { List } from './list';

const apiUrl = process.env.REACT_APP_API_URL;

export const ProjectListScreen = () => {
  const [param, setParam] = useState({
    name: '',
    personId: '',
  });
  const [list, setList] = useState([]);
  const [users, setUsers] = useState([]);
  // 当params变化要去请求接口
  useEffect(() => {
    fetch(`${apiUrl}/projects`).then(async (response) => {
      if (response.ok) {
        setList(await response.json());
      }
    });
  }, [param]);
  useEffect(() => {
    fetch(`${apiUrl}/users`).then(async (response) => {
      if (response.ok) {
        setUsers(await response.json());
      }
    });
  }, []);
  return (
    <div>
      <SearchPanel users={users} param={param} setParam={setParam} />
      <List users={users} list={list} />
    </div>
  );
};
