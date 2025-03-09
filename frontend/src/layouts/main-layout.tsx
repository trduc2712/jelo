import React from 'react';
import { Outlet } from 'react-router-dom';
import { Layout } from 'antd';
import Header from '../components/header';
import Breadcrumb from '../components/breadcrumb';
import '../sass/main-layout.scss';

const { Content } = Layout;

const MainLayout: React.FC = () => {
  return (
    <Layout className="min-h-screen">
      <Header />
      <Breadcrumb className="!pl-4 !pt-4 bg-gray-200" />
      <Content className="mt-[64px] !p-4 bg-gray-200 !min-h-[calc(100vh-102px)]">
        <div className="!p-4 bg-white !min-h-full">
          <Outlet />
        </div>
      </Content>
    </Layout>
  );
};

export default MainLayout;
