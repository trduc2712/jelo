import React from 'react';
import { User, Role, Gender, UserStatus } from '../../interfaces/user';
import { Tag, Avatar, Badge, Typography } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import type { TableProps } from 'antd';
import { useAuth } from '../../hooks';
import { EntityList } from '../../components';
import { formatIso8601 } from '../../utils/date';

const { Paragraph } = Typography;

const UserList: React.FC = () => {
  const { user } = useAuth();

  const roleColor: Record<string, string> = {
    SUPER_ADMIN: 'red',
    ADMIN: 'volcano',
    MODERATOR: 'blue',
    CUSTOMER: 'green',
  };

  const roleLabel: Record<string, string> = {
    SUPER_ADMIN: 'Super Admin',
    ADMIN: 'Admin',
    MODERATOR: 'Moderator',
    CUSTOMER: 'Customer',
  };

  const genderLabel: Record<string, string> = {
    MALE: 'Male',
    FEMALE: 'Female',
  };

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
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      width: 120,
      sorter: (a, b) => a.name.localeCompare(b.name),
      sortDirections: ['ascend', 'descend'],
    },
    {
      title: 'Gender',
      dataIndex: 'gender',
      key: 'gender',
      width: 30,
      render: (gender: Gender) => <span>{genderLabel[gender]}</span>,
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
        <Tag color={roleColor[role]}>{roleLabel[role]}</Tag>
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
      title: 'Last Active At',
      dataIndex: 'lastActiveAt',
      key: 'last-active-at',
      width: 100,
      render: (lastActiveAt: Date) =>
        lastActiveAt ? formatIso8601(lastActiveAt, true, true) : 'Never active',
      sorter: (a, b) =>
        new Date(a.lastActiveAt).getTime() - new Date(b.lastActiveAt).getTime(),
    },
  ];

  return <EntityList entity="user" columns={columns} />;
};

export default UserList;
