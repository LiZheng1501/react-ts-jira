import React, { ReactNode, useState } from 'react';
import { User } from '../screens/project-list/search-panel';
import * as auth from 'auth-provider';
import { useMount } from '../utils';
import { http } from '../utils/http';
import { useAsync } from '../utils/use-async';
import { FullPageError, FullPageLoading } from '../components/lib';

interface AuthForm {
  username: string;
  password: string;
}

const AuthContext = React.createContext<
  | {
      user: User | null;
      login: (form: AuthForm) => Promise<void>;
      register: (form: AuthForm) => Promise<void>;
      logout: () => Promise<void>;
    }
  | undefined
>(undefined);
AuthContext.displayName = 'AuthContext'; // 主要用在dev tool里面

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const {
    data: user,
    error,
    isLoading,
    isIdle,
    isError,
    run,
    setData: setUser,
  } = useAsync<User | null>();
  const login = (form: AuthForm) => auth.login(form).then(setUser); // user => setUser(user); 消参
  const register = (form: AuthForm) => auth.register(form).then(setUser);
  const logout = () => auth.logout().then(() => setUser(null));
  // 在整个组件加载的时候
  useMount(() => {
    run(bootstrapUser()).then(setUser);
  });
  if (isIdle || isLoading) return <FullPageLoading />;
  if (isError) return <FullPageError error={error} />;
  return (
    <AuthContext.Provider
      children={children}
      value={{ user, login, register, logout }}
    />
  );
};

// 自定义hook
export const useAuth = () => {
  const context = React.useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth必须在auth provider中使用');
  }
  return context;
};

// 初始化user
const bootstrapUser = async () => {
  let user = null;
  const token = auth.getToken();
  if (token) {
    const data = await http('me', { token: token });
    user = data.user;
  }
  return user;
};
