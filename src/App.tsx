import React from 'react';
import './App.css';
import { useAuth } from './context/auth-context';
import { AuthenticatedApp } from './authenticated-app';
import { UnauthenticatedApp } from './unauthenticated-app';
import { ErrorBoundary } from './components/error-boundary';
import { FullPageError } from './components/lib';

function App() {
  const { user } = useAuth();
  return (
    <div className="App">
      {/*无论是哪个组件发生渲染错误，都会以全局的方式展示页面*/}
      <ErrorBoundary fallbackRender={FullPageError}>
        {user ? <AuthenticatedApp /> : <UnauthenticatedApp />}
      </ErrorBoundary>
    </div>
  );
}

export default App;
