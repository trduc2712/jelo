import React, { useEffect, useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { Layout } from 'antd';
import { AdminHeader, AdminSidebar } from '../components';

const { Content } = Layout;

const AdminLayout: React.FC = () => {
  const [isSidebarHidden, setIsSidebarHidden] = useState<boolean>(false);

  const location = useLocation();

  const pathToTitle: Record<string, string> = {
    '/admin': 'Dashboard',
    '/admin/users': 'User List',
    '/admin/categories': 'Category List',
    '/admin/users/new': 'Create User',
    '/admin/categories/new': 'Create Category',
  };

  const getTitle = (pathName: string) => {
    if (
      pathName.startsWith('/admin/categories') &&
      pathName !== '/admin/categories/new' &&
      pathName !== '/admin/categories' &&
      !pathName.startsWith('/admin/categories/edit')
    ) {
      return 'Category Detail';
    }

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

    if (pathName.startsWith('/admin/categories/edit')) {
      return 'Edit Category';
    }

    return pathToTitle[pathName];
  };

  useEffect(() => {
    document.title = `${getTitle(location.pathname)} | Jelo Admin`;
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
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};

export default AdminLayout;
