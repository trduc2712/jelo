import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import type { MenuProps } from 'antd';
import { Menu } from 'antd';
import '../sass/admin-nav-menu.scss';

const AdminNavMenu: React.FC = () => {
  const [selectedKey, setSelectedKey] = useState<string[]>([]);
  const location = useLocation();

  const sidebarItems: MenuProps['items'] = [
    {
      key: 'dashboard',
      label: <Link to="/admin">Dashboard</Link>,
    },
    {
      key: 'users',
      label: 'Users',
      children: [
        {
          key: 'user-list',
          label: <Link to="/admin/users">User List</Link>,
        },

        {
          key: 'create-user',
          label: <Link to="/admin/users/new">Create User</Link>,
        },
      ],
    },
    {
      key: 'orders',
      label: 'Orders',
    },
    {
      key: 'products',
      label: 'Products',
    },
    {
      key: 'categories',
      label: 'Categories',
      children: [
        {
          key: 'category-list',
          label: <Link to="/admin/categories">Category List</Link>,
        },

        {
          key: 'create-category',
          label: <Link to="/admin/categories/new">Create Category</Link>,
        },
      ],
    },
  ];

  useEffect(() => {
    const path = location.pathname;

    switch (path) {
      case '/admin':
        setSelectedKey(['dashboard']);
        break;
      case '/admin/':
        setSelectedKey(['dashboard']);
        break;
      case '/admin/users':
        setSelectedKey(['user-list']);
        break;
      case '/admin/users/new':
        setSelectedKey(['create-user']);
        break;
      case '/admin/categories':
        setSelectedKey(['category-list']);
        break;
      default:
        break;
    }
  }, [location.pathname]);

  return (
    <div className="bg-neutral-800 h-full">
      <div className="flex justify-center items-center h-[64px]">
        <h2 className="text-3xl font-bold text-[#bb4d00]">JELO</h2>
      </div>
      <Menu
        className="!bg-neutral-800 !border-r-0"
        items={sidebarItems}
        mode="inline"
        selectedKeys={selectedKey}
      />
    </div>
  );
};

export default AdminNavMenu;
