import { useHttp } from './http';
import { useAsync } from './use-async';
import { useEffect } from 'react';
import { cleanObject } from './index';
import { TaskType } from 'types/task-type';

export const useTaskType = (param?: Partial<TaskType>) => {
  const client = useHttp();
  const { run, ...result } = useAsync<TaskType[]>();
  const fetch = () => client('tasktypes', { data: cleanObject(param || {}) });
  useEffect(() => {
    run(fetch(), {
      retry: fetch,
    });
  }, [param]);
  return result;
};
