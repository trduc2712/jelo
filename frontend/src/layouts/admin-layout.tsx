import React from "react";
import { Outlet } from "react-router-dom";
import { Layout } from "antd";
import AdminHeader from "../components/admin-header";
import AdminSider from "../components/admin-sider";

const { Content } = Layout;

const AdminLayout: React.FC = () => {
  return (
    <Layout className="min-h-screen">
      <AdminSider />
      <Layout>
        <AdminHeader />
        <Content className="mt-[64px] !p-4 bg-gray-200">
          <div className="!p-4 bg-white">
            <Outlet />
          </div>
        </Content>
      </Layout>
    </Layout>
  );
};

export default AdminLayout;
