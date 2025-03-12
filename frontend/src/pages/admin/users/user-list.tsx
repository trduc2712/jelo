import React from 'react';
import { User, Role, Gender, UserStatus } from '../../../interfaces/user';
import { Tag, Avatar, Badge, Typography } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import type { TableProps } from 'antd';
import { useAuth } from '../../../hooks';
import { EntityList } from '../../../components';
import { toUpperCaseFirstLetter } from '../../../utils/string';
import { formatIso8601 } from '../../../utils/date';

const { Paragraph } = Typography;

const UserList: React.FC = () => {
  const { user } = useAuth();

  const columns: TableProps<User>['columns'] = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
      width: 30,
      render: (id) => <div className="flex justify-center">{id}</div>,
      sorter: (a: User, b: User) => a.id - b.id,
    },
    {
      title: 'Avatar',
      dataIndex: 'avatarUrl',
      key: 'avatar',
      width: 30,
      render: (avatarUrl) => (
        <div className="flex justify-center">
          <div className="w-[30px] h-[30px]">
            {avatarUrl ? (
              <img
                src={avatarUrl}
                alt="User's avatar"
                className="object-cover w-full h-full rounded-full"
              />
            ) : (
              <Avatar icon={<UserOutlined />} size={30} />
            )}
          </div>
        </div>
      ),
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
      width: 200,
      render: (email: string) => (
        <Paragraph copyable>
          {user?.email === email ? `${email} (This is you)` : email}
        </Paragraph>
      ),
    },
    {
      title: 'Gender',
      dataIndex: 'gender',
      key: 'gender',
      width: 30,
      render: (gender: Gender) => (
        <span>{gender === 'MALE' ? 'Male' : 'Female'}</span>
      ),
      filters: [
        { text: 'Male', value: 'MALE' },
        { text: 'Female', value: 'FEMALE' },
      ],
      onFilter: (value: any, record: User) => record.gender === value,
      filterMultiple: false,
    },
    {
      title: 'Role',
      key: 'role',
      dataIndex: 'role',
      width: 60,
      render: (role: Role) => (
        <Tag
          color={`${role === 'ADMIN' ? 'volcano' : role === 'MODERATOR' ? 'orange' : 'green'}`}
        >
          {toUpperCaseFirstLetter(role.toLowerCase())}
        </Tag>
      ),
      filters: [
        { text: 'Admin', value: 'ADMIN' },
        { text: 'Moderator', value: 'MODERATOR' },
        { text: 'Customer', value: 'CUSTOMER' },
      ],
      onFilter: (value: any, record: User) => record.role === value,
      filterMultiple: false,
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (status: UserStatus) => (
        <Badge
          color={`${status === 'ACTIVE' ? 'green' : status === 'INACTIVE' ? 'volcano' : 'red'}`}
          text={`${status === 'ACTIVE' ? 'Active' : status === 'INACTIVE' ? 'Inactive' : 'Banned'}`}
        />
      ),
      width: 30,
      filters: [
        { text: 'Active', value: 'ACTIVE' },
        { text: 'Banned', value: 'BANNED' },
        { text: 'Inactive', value: 'INACTIVE' },
      ],
      onFilter: (value: any, record: User) => record.status === value,
      filterMultiple: false,
    },
    {
      title: 'Last Login At',
      dataIndex: 'lastLoginAt',
      key: 'last-login-at',
      width: 100,
      render: (lastLoginAt: Date) => formatIso8601(lastLoginAt),
      sorter: (a, b) =>
        new Date(a.lastLoginAt).getTime() - new Date(b.lastLoginAt).getTime(),
    },
    {
      title: 'Date Added',
      dataIndex: 'createdAt',
      key: 'date-added',
      width: 100,
      render: (createdAt: Date) => formatIso8601(createdAt),
      sorter: (a, b) =>
        new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime(),
    },
    {
      title: 'Last Updated',
      dataIndex: 'updatedAt',
      key: 'last-updated',
      width: 100,
      render: (updatedAt: Date) => formatIso8601(updatedAt),
      sorter: (a, b) =>
        new Date(a.updatedAt).getTime() - new Date(b.updatedAt).getTime(),
    },
  ];

  return <EntityList entity="user" columns={columns} />;
};

export default UserList;
