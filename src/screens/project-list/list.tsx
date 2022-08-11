import React from 'react';
import { User } from './search-panel';
import { Table, TableProps } from 'antd';
import dayjs from 'dayjs';

interface Project {
  id: string;
  name: string;
  personId: string;
  pin: boolean;
  organization: string;
  created: number;
}
// 代表了Table组件的类型
interface ListProps extends TableProps<Project> {
  users: User[];
}
// 如果给这个props设置类型那么就是
// type PropsType = Omit<ListProps, 'name'>;

export const List = ({ users, ...props }: ListProps) => {
  return (
    <Table
      pagination={false}
      columns={[
        {
          title: '名称',
          dataIndex: 'name',
          sorter: (a, b) => a.name.localeCompare(b.name),
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
      ]}
      {...props}
    />
  );
};
