import React, { ReactNode, useCallback } from 'react';
import { User } from '../screens/project-list/search-panel';
import * as auth from 'auth-provider';
import { http } from '../utils/http';
import { useAsync } from '../utils/use-async';
import { FullPageError, FullPageLoading } from '../components/lib';
import { useSelector } from 'react-redux';
import { AppDispatch } from 'store';
import * as authStore from 'store/auth.slice';
import { useDispatch } from 'react-redux';
import { selectUser } from 'store/auth.slice';
export interface AuthForm {
  username: string;
  password: string;
}

// const AuthContext = React.createContext<
//   | {
//       user: User | null;
//       login: (form: AuthForm) => Promise<void>;
//       register: (form: AuthForm) => Promise<void>;
//       logout: () => Promise<void>;
//     }
//   | undefined
// >(undefined);
// AuthContext.displayName = 'AuthContext'; // 主要用在dev tool里面

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const { error, isLoading, isIdle, isError, run } = useAsync<User | null>();
  // const dispatch: (...args: unknown[]) => Promise<User> = useDispatch();
  // const login = (form: AuthForm) => auth.login(form).then(setUser); // user => setUser(user); 消参
  // const register = (form: AuthForm) => auth.register(form).then(setUser);
  // const logout = () => auth.logout().then(() => setUser(null));
  // 在整个组件加载的时候
  // useMount(() => {
  //   run(dispatch(bootstrap));
  // });
  if (isIdle || isLoading) return <FullPageLoading />;
  if (isError) return <FullPageError error={error} />;
  return <div>children</div>;
};

// 初始化user
export const bootstrapUser = async () => {
  let user = null;
  const token = auth.getToken();
  if (token) {
    const data = await http('me', { token: token });
    user = data.user;
  }
  return user;
};

// 自定义hook
export const useAuth = () => {
  const dispatch: AppDispatch = useDispatch();
  const user = useSelector(selectUser);
  const login = useCallback(
    (form: AuthForm) => dispatch(authStore.login(form)),
    [dispatch]
  );
  const register = useCallback(
    (form: AuthForm) => dispatch(authStore.register(form)),
    [dispatch]
  );
  const logout = useCallback(() => dispatch(authStore.logout()), [dispatch]);
  return {
    user,
    login,
    register,
    logout,
  };
};
