import React from 'react';
import { Layout } from 'antd';
import '../sass/admin-sidebar.scss';
import { AdminNavMenu } from './';

const { Sider: AntSider } = Layout;

interface AdminSidebarProps {
  isHidden: boolean;
}

const AdminSidebar: React.FC<AdminSidebarProps> = ({ isHidden }) => {
  return (
    <AntSider
      className={`admin-sidebar ${isHidden ? 'hidden' : ''} !bg-neutral-800`}
    >
      <AdminNavMenu />{' '}
    </AntSider>
  );
};

export default AdminSidebar;
