import React from 'react';
import { User } from '../../interfaces/user';
import { Tag, Avatar } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import type { TableProps } from 'antd';
import { useAuth } from '../../hooks';
import { ManagementPanel } from '../../components';

const Users: React.FC = () => {
  const { user } = useAuth();

  const columns: TableProps<User>['columns'] = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: 'Avatar',
      dataIndex: 'avatarUrl',
      key: 'avatar',
      render: avatarUrl => (
        <div className="w-[50px] h-[50px]">
          {avatarUrl ? (
            <img
              src={avatarUrl}
              alt="User's avatar"
              className="object-cover w-full h-full"
            />
          ) : (
            <Avatar icon={<UserOutlined />} shape="square" size={50} />
          )}
        </div>
      ),
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
      render: email => (
        <>
          {user?.email === email ? <span>{email} (This is you)</span> : email}
        </>
      ),
    },
    {
      title: 'Role',
      key: 'role',
      dataIndex: 'role',
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: status => (
        <Tag color={`${status === 'ACTIVE' ? 'green' : 'red'}`}>{status}</Tag>
      ),
    },
  ];

  return <ManagementPanel entity="user" columns={columns} />;
};

export default Users;
