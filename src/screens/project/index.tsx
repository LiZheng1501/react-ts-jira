import React from 'react';
import { Route, Routes } from 'react-router';
import { Link } from 'react-router-dom';
import { KanbanScreen } from 'screens/kan-ban';
import { EpicScreen } from 'screens/epic-screen';

export const ProjectScreen = () => {
  return (
    <div>
      <Link to={'kanban'}>看板</Link>
      <Link to={'epic'}>任务组</Link>
      <Routes>
        {/* react router会自动将这个挂在大路由上 */}
        {/* projects/:projectId/kanban */}
        <Route path={'/kanban'} element={<KanbanScreen />}></Route>
        {/* projects/:projectId/epic */}
        {/* 如何点击某个路由，在没有确定具体去哪的时候，就去某一个子路由？(比如说点进来默认是进入看板) */}
        {/* 可以使用navigate */}
        <Route path={'/epic'} element={<EpicScreen />}></Route>
        {/* 上面这两个匹配不到的话，就默认跳kanban */}
      </Routes>
    </div>
  );
};
