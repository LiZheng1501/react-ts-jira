/* 登录后的页面 */
import React from 'react';
import { ProjectListScreen } from './screens/project-list';
import { useAuth } from './context/auth-context';

export const AuthenticatedApp = () => {
  const { user, logout } = useAuth();
  return (
    <div>
      <button onClick={logout}>登出</button>
      <div>{`token: ${user?.token}`}</div>
      <ProjectListScreen />
    </div>
  );
};
