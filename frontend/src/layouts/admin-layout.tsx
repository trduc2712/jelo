import React, { useEffect, useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { Layout } from "antd";
import AdminHeader from "../components/admin-header";
import AdminSider from "../components/admin-sider";

const { Content } = Layout;

const AdminLayout: React.FC = () => {
  const [title, setTitle] = useState<string>("Title");
  const location = useLocation();

  const pathToTitle: Record<string, string> = {
    "/admin": "Dashboard",
    "/admin/users": "User List",
    "/admin/users/new": "Create User",
  };

  useEffect(() => {
    setTitle(pathToTitle[location.pathname]);
  }, [location.pathname]);

  return (
    <Layout className="min-h-screen">
      <AdminSider />
      <Layout>
        <AdminHeader />
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
