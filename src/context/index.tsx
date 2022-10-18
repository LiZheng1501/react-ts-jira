import { ReactNode } from 'react';
import { AuthProvider } from './auth-context';

// 整个项目的APP Provider
export const AppProviders = ({ children }: { children: ReactNode }) => {
  // children 就是 app 根组件
  return <AuthProvider>{children}</AuthProvider>;
};

// type Person = {
//   name: string;
//   age: number;
// };

// const liz: Partial<Person> = { name: 'liz' };
