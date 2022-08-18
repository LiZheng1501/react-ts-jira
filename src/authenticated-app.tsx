/** 登录后的页面 */
import React from 'react';
import { ProjectListScreen } from './screens/project-list';
import { useAuth } from './context/auth-context';
import { ReactComponent as SoftwareLogo } from 'assets/software-logo.svg';
import styled from '@emotion/styled';
import { Row } from './components/lib';
import { Dropdown, Menu, Button } from 'antd';
import { Routes, Navigate, Route } from 'react-router';
import { BrowserRouter as Router } from 'react-router-dom';
import { ProjectScreen } from 'screens/project';

/**
grid和flex各自的应用场景：
1. 要考虑一维布局还是二维布局
一般来说，一维布局（只有横向，纵向）用flex
2. 布局是从内容出发，还是才能够布局出发？
从内容出发(flex)：先有一组内容（数量不固定）希望它们均匀的分布在容器中，由内容自己的大小决定占据的空间
从布局出发(grid)：先规划网格（数量固定），然后再把元素往里填充
*/

export const AuthenticatedApp = () => {
  const { logout, user } = useAuth();
  return (
    <Container>
      <Header between={true}>
        <HeaderLeft gap={true}>
          <SoftwareLogo width={'18rem'} color={'rgb(38, 132, 255)'} />
          <h3>项目</h3>
          <h3>用户</h3>
        </HeaderLeft>
        <HeaderRight>
          <Dropdown
            overlay={
              <Menu>
                <Menu.Item key={'logout'}>
                  <Button type={'link'} onClick={logout}>
                    登出
                  </Button>
                </Menu.Item>
              </Menu>
            }
          >
            <Button type={'link'} onClick={(e) => e.preventDefault()}>
              hi,{user?.name}
            </Button>
          </Dropdown>
        </HeaderRight>
      </Header>
      <Main>
        {/* router组件作用是包裹的组件间共享信息 */}
        <Router>
          <Routes>
            <Route path={'/projects'} element={<ProjectListScreen />}></Route>
            <Route
              path={'/projects/:projectId/*'}
              element={<ProjectScreen />}
            ></Route>
          </Routes>
        </Router>
      </Main>
    </Container>
  );
};

const Container = styled.div``;
const Header = styled(Row)`
  padding: 2rem;
  box-shadow: 0 0 5px 0 rgba(0, 0, 0, 0.1);
  z-index: 1;
`;
const HeaderLeft = styled(Row)``;
const HeaderRight = styled.div``;
const Main = styled.main``;
