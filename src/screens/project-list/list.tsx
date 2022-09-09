import React from 'react';
import { Dropdown, Menu, Table, TableProps } from 'antd';
import dayjs from 'dayjs';
import { Link } from 'react-router-dom';
// import { Pin } from 'components/pin';
import { useEditProject } from 'utils/project';
import { ButtonNoPadding } from 'components/lib';
import { Project } from '../../types/project';
import { User } from '../../types/user';
// react-router和react-router-dom的关系，类似于react和react-dom/react-native,
// react是核心库，主要处理计算的逻辑，类似于在组建中state状态，useEffect状态如何影响虚拟dom树，diff算法的运算
// 得出的结果会被react使用，因为react-dom 只能在浏览器中运行，react-native只能在ios上
// react-router主要管状态，不停的计算这棵路由树，是咋样的，然后给react-router-dom使用

// 代表了Table组件的类型
interface ListProps extends TableProps<Project> {
  users: User[];
  refresh?: () => void;
}
// 如果给这个props设置类型那么就是
// type PropsType = Omit<ListProps, 'name'>;

export const List = React.memo(({ users, refresh, ...props }: ListProps) => {
  console.log('list render');
  const { mutate } = useEditProject();
  // const pinFn = (id: string, pin: boolean) => mutate({ id, pin });
  // 可以改成函数curry
  // const pinFn = (id: string) => (pin: boolean) =>
  //   mutate({ id, pin }).then(refresh);
  return (
    <Table
      rowKey={'id'}
      pagination={false}
      columns={[
        // {
        //   title: <Pin checked={true} disabled={true} />,
        //   render(value, project) {
        //     return (
        //       <Pin
        //         checked={project.pin}
        //         onCheckedChange={(pin) => pinFn(project.id)}
        //         // onCheckedChange = {(pin) => pinFn(project.id, pin)}
        //       />
        //     );
        //     // 在这里需要给后端发一个编辑的请求
        //   },
        // },
        {
          title: '名称',
          // dataIndex: 'name',
          sorter: (a, b) => a.name.localeCompare(b.name),
          render(value, project) {
            return <Link to={String(project.id)}>{project.name}</Link>;
            // 会不会跳到 localhost:3000/5上，？不会，因为这个是在父组件的Route下包裹的
          },
        },
        {
          title: '名称',
          dataIndex: 'organization',
        },
        {
          title: '负责人',
          render(value, project) {
            return (
              <span>
                {users.find((user) => user.id === project.personId)?.name ||
                  '未知'}
              </span>
            );
          },
        },
        {
          title: '创建时间',
          render(value, project) {
            return (
              <span>
                {project.created
                  ? dayjs(project.created).format('YYYY-MM-DD')
                  : '-'}
              </span>
            );
          },
        },
        {
          render(value, project) {
            return (
              <Dropdown
                overlay={
                  <Menu>
                    <Menu.Item key={'edit'}>{}</Menu.Item>
                  </Menu>
                }
              >
                <ButtonNoPadding type={'link'}>...</ButtonNoPadding>
              </Dropdown>
            );
          },
        },
      ]}
      {...props}
    />
  );
});
