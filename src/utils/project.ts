import { Project } from '../screens/project-list/list';
import { useHttp } from './http';
import { useAsync } from './use-async';
import { useEffect } from 'react';
import { cleanObject } from './index';

export const useProject = (param?: Partial<Project>) => {
  const client = useHttp();
  const { run, ...result } = useAsync<Project[]>();
  useEffect(() => {
    run(client('project', { data: cleanObject(param || {}) }));
  }, [param]);
  return result;
};
