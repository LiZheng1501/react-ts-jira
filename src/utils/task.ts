import { useHttp } from './http';
import { useAsync } from './use-async';
import { useEffect } from 'react';
import { cleanObject } from './index';
import { Task } from 'types/task';

export const useTask = (param?: Partial<Task>) => {
  const client = useHttp();
  const { run, ...result } = useAsync<Task[]>();
  const fetch = () => client('tasks', { data: cleanObject(param || {}) });
  useEffect(() => {
    run(fetch(), {
      retry: fetch,
    });
  }, [param]);
  return result;
};
