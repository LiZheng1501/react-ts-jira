import { Project } from '../screens/project-list/list';
import { useHttp } from './http';
import { useAsync } from './use-async';
import { useCallback, useEffect } from 'react';
import { cleanObject } from './index';
import { useMutation, useQueryClient } from 'react-query';
import { useProjectsSearchParams } from './url';

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
  }, [param, fetch, run]);
  return result;
};

// export const useEditProject = () => {
//   const { run, ...asyncResult } = useAsync();
//   const client = useHttp();
//   const mutate = (params: Partial<Project>) =>
//     run(client(`projects/${params.id}`, { data: params, method: 'PATCH' }));
//   return {
//     mutate,
//     ...asyncResult,
//   };
// };

export const useEditProject = () => {
  const client = useHttp();
  const queryClient = useQueryClient();
  const [searchParams] = useProjectsSearchParams();
  const queryKey = ['projects', searchParams];
  // 在收到更新之前，就对本地的数据进行更新
  return useMutation(
    (params: Partial<Project>) =>
      client(`projects/${params.id}`, {
        method: 'PATCH',
        data: params,
      }),
    {
      onSuccess: () => queryClient.invalidateQueries('projects'),
      async onMutate(target) {
        const previousItems = queryClient.getQueryData(queryKey);
        queryClient.setQueryData(queryKey, (old?: Project[]) => {
          return (
            old?.map((project) =>
              project?.id === target.id ? { ...project, ...target } : project
            ) || []
          );
        });
        return { previousItems };
      },
      onError(error: Error, newItem: Partial<Project>, context) {
        // 回滚机制
        queryClient.setQueryData(queryKey, context?.previousItems);
      },
    }
  );
};
