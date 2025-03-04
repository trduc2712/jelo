import React from "react";
import { Outlet } from "react-router-dom";
import { Layout } from "antd";
import Header from "../components/header";
import Breadcrumb from "../components/breadcrumb";
import styled from "styled-components";

const { Content } = Layout;

const StyledLayout = styled(Layout)`
  .navbar .ant-menu-submenu .ant-menu-submenu-title span a {
    color: #000 !important;
  }

  .navbar .ant-menu-submenu .ant-menu-submenu-title:hover span a {
    color: #bb4d00 !important;
  }

  html body .navbar .ant-menu-submenu .ant-menu-submenu-title:active {
    background-color: #fff !important;
  }

  .ant-menu-light.ant-menu-horizontal > .ant-menu-item::after,
  .ant-menu-light > .ant-menu.ant-menu-horizontal > .ant-menu-item::after,
  .ant-menu-light.ant-menu-horizontal > .ant-menu-submenu::after,
  .ant-menu-light > .ant-menu.ant-menu-horizontal > .ant-menu-submenu::after {
    display: none !important;
  }
`;

const MainLayout: React.FC = () => {
  return (
    <StyledLayout className="min-h-screen">
      <Header />
      <Breadcrumb className="!pl-4 !pt-4 bg-gray-200" />
      <Content className="mt-[64px] !p-4 bg-gray-200 !min-h-[calc(100vh-102px)]">
        <div className="!p-4 bg-white !min-h-full">
          <Outlet />
        </div>
      </Content>
    </StyledLayout>
  );
};

export default MainLayout;
