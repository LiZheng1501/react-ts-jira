import { useHttp } from './http';
import { useAsync } from './use-async';
import { useEffect } from 'react';
import { cleanObject } from './index';
import { Kanban } from 'types/kanban';

export const useKanban = (param?: Partial<Kanban>) => {
  const client = useHttp();
  const { run, ...result } = useAsync<Kanban[]>();
  const fetch = () => client('kanbans', { data: cleanObject(param || {}) });
  useEffect(() => {
    run(fetch(), {
      retry: fetch,
    });
  }, [param]);
  return result;
};
