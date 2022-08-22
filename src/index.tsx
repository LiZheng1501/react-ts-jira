import './wdyr';
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { loadDevTools } from 'jira-dev-tool';
// 务必在jira-dev-tool后面引入
import 'antd/dist/antd.less'; // 使用craco来覆盖antd的默认的配置：比如说Primary的颜色
import { AppProviders } from './context';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

loadDevTools(() =>
  root.render(
    <AppProviders>
      <App />
    </AppProviders>
  )
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
