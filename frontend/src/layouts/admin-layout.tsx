import React, { useEffect, useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { Layout } from "antd";
import { AdminHeader, AdminSidebar } from "../components";

const { Content } = Layout;

const AdminLayout: React.FC = () => {
  const [title, setTitle] = useState<string>("Title");
  const [isSidebarHidden, setIsSidebarHidden] = useState<boolean>(false);

  const location = useLocation();

  const pathToTitle: Record<string, string> = {
    "/admin": "Dashboard",
    "/admin/users": "User List",
    "/admin/users/new": "Create User",
  };

  useEffect(() => {
    setTitle(pathToTitle[location.pathname]);
  }, [location.pathname]);

  const handleToggleSidebar = () => {
    setIsSidebarHidden(!isSidebarHidden);
  };

  return (
    <Layout className="min-h-screen">
      <AdminSidebar isHidden={isSidebarHidden} />
      <Layout>
        <AdminHeader onToggleSidebar={handleToggleSidebar} />
        <Content className="mt-[64px] !p-4 bg-gray-200">
          <div className="!p-4 bg-white">
            <h1 className="!mb-4 font-bold text-2xl">{title}</h1>
            <Outlet />
          </div>
        </Content>
      </Layout>
    </Layout>
  );
};

export default AdminLayout;
