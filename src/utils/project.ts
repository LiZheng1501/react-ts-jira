import { useHttp } from './http';
import { useAsync } from './use-async';
import { useEffect, useCallback } from 'react';
import { cleanObject } from './index';
import { Project } from '../types/project';

export const useProject = (param?: Partial<Project>) => {
  const client = useHttp();
  const { run, ...result } = useAsync<Project[]>();
  const fetch = useCallback(
    () => client('projects', { data: cleanObject(param || {}) }),
    [client, param]
  );
  useEffect(() => {
    run(fetch(), {
      retry: fetch,
    });
  }, [fetch, param, run]);
  return result;
};

export const useEditProject = () => {
  const { run, ...asyncResult } = useAsync();
  const client = useHttp();
  const mutate = (params: Partial<Project>) =>
    run(client(`projects/${params.id}`, { data: params, method: 'PATCH' }));
  return {
    mutate,
    ...asyncResult,
  };
};
