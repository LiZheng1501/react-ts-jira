/* 登录后的页面 */
import React from 'react';
import { ProjectListScreen } from './screens/project-list';
import { useAuth } from './context/auth-context';
import styled from '@emotion/styled';

/*
grid和flex各自的应用场景：
1. 要考虑一维布局还是二维布局
一般来说，一维布局（只有横向，纵向）用flex
2. 布局是从内容出发，还是才能够布局出发？
从内容出发(flex)：先有一组内容（数量不固定）希望它们均匀的分布在容器中，由内容自己的大小决定占据的空间
从布局出发(grid)：先规划网格（数量固定），然后再把元素往里填充
*/

export const AuthenticatedApp = () => {
  const { user, logout } = useAuth();
  return (
    <Container>
      <Header>
        <HeaderLeft>
          <h3>logo</h3>
          <h3>项目</h3>
          <h3>用户</h3>
        </HeaderLeft>
        <HeaderRight>
          <button onClick={logout}>登出</button>
        </HeaderRight>
      </Header>
      <Main>
        <ProjectListScreen />
      </Main>
    </Container>
  );
};

const Container = styled.div`
  display: grid;
  grid-template-rows: 6rem 1fr 6rem;
  grid-template-columns: 20rem 1fr 20rem;
  grid-template-areas: 'header header header' 'nav main aside' 'footer footer footer';
  height: 100vh;
`;

const Header = styled.header`
  grid-area: header;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;
const HeaderLeft = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
const HeaderRight = styled.div``;
const Main = styled.main`
  grid-area: main;
`;
