import React, { useEffect, useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { Layout, Divider } from 'antd';
import { AdminHeader, AdminSidebar } from '../components';

const { Content } = Layout;

const AdminLayout: React.FC = () => {
  const [title, setTitle] = useState<string>('Title');
  const [isSidebarHidden, setIsSidebarHidden] = useState<boolean>(false);

  const location = useLocation();

  const pathToTitle: Record<string, string> = {
    '/admin': 'Dashboard',
    '/admin/users': 'User List',
    '/admin/categories': 'Category List',
    '/admin/users/new': 'Create User',
  };

  const getTitle = (pathName: string) => {
    if (
      pathName.startsWith('/admin/users') &&
      pathName !== '/admin/users/new' &&
      pathName !== '/admin/users' &&
      !pathName.startsWith('/admin/users/edit')
    ) {
      return 'User Detail';
    }

    if (pathName.startsWith('/admin/users/edit')) {
      return 'Edit User';
    }

    return pathToTitle[pathName];
  };

  useEffect(() => {
    document.title = `${getTitle(location.pathname)} | Jelo Admin`;
    setTitle(getTitle(location.pathname));
  }, [location.pathname]);

  const handleToggleSidebar = () => {
    setIsSidebarHidden(!isSidebarHidden);
  };

  return (
    <Layout className="min-h-screen">
      <AdminSidebar isHidden={isSidebarHidden} />
      <Layout>
        <AdminHeader onToggleSidebar={handleToggleSidebar} />
        <Content className="mt-[64px] !p-4 bg-gray-100">
          <div className="bg-white !p-4 shadow-lg rounded-lg">
            <h1 className="font-bold text-2xl">{title}</h1>
            <Divider />
            <Outlet />
          </div>
        </Content>
      </Layout>
    </Layout>
  );
};

export default AdminLayout;
