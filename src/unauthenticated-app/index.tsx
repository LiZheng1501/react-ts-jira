import React, { useState } from 'react';
import { RegisterScreen } from './register';
import { LoginScreen } from './login';

export const UnauthenticatedApp = () => {
  // 创建一个状态，需要在register和非register间切换
  const [isRegister, setIsRegister] = useState<boolean>(false);
  return (
    <div>
      {isRegister ? <RegisterScreen /> : <LoginScreen />}{' '}
      <button onClick={() => setIsRegister(!isRegister)}>
        切换到{isRegister ? '登录' : '注册'}
      </button>
    </div>
  );
};
