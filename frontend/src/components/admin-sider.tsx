import React, { useState, useEffect } from "react";
import { useLocation, Link } from "react-router-dom";
import type { MenuProps } from "antd";
import { Layout, Menu } from "antd";
import styled from "styled-components";

const { Sider: AntSider } = Layout;

const StyledAntSider = styled(AntSider)`
  .ant-menu .ant-menu-item {
    margin: 0;
    width: 100%;
    background-color: oklch(0.269 0 0);
    color: #fff;
    border-right: none !important;
  }

  .ant-menu .ant-menu-item:active {
    background-color: oklch(0.269 0 0) !important;
  }

  .ant-menu .ant-menu-item-active {
    color: #fff !important;
  }

  .ant-menu .ant-menu-item-selected {
    color: #fff;
    background-color: #bb4d00;
  }

  .ant-menu .ant-menu-submenu .ant-menu-submenu-title {
    margin: 0;
    color: #fff;
    width: 100%;
  }

  .ant-menu .ant-menu-submenu .ant-menu-submenu-title:active {
    background-color: oklch(0.269 0 0) !important;
  }

  .ant-menu .ant-menu-submenu .ant-menu-item {
    padding-left: 24px !important;
    background-color: oklch(0.216 0.006 56.043);
  }

  .ant-menu .ant-menu-submenu .ant-menu-item-selected {
    background-color: #bb4d00;
  }

  .ant-menu .ant-menu-submenu .ant-menu-item-selected:active {
    background-color: #f36704 !important;
  }
`;

const Sider: React.FC = () => {
  const [selectedKey, setSelectedKey] = useState<string[]>([]);
  const location = useLocation();

  const sidebarItems: MenuProps["items"] = [
    {
      key: "overview",
      label: <Link to="/admin">Overview</Link>,
    },
    {
      key: "users",
      label: "Users",
      children: [
        {
          key: "user-list",
          label: <Link to="/admin/user-list">User list</Link>,
        },
        {
          key: "create-user",
          label: <Link to="/admin/create-user">Create user</Link>,
        },
      ],
    },
    {
      key: "products",
      label: "Products",
      children: [
        {
          key: "product-list",
          label: <Link to="/admin/product-list">Product list</Link>,
        },
        {
          key: "create-product",
          label: <Link to="/admin/create-product">Create product</Link>,
        },
      ],
    },
    {
      key: "categories",
      label: "Categories",
      children: [
        {
          key: "category-list",
          label: <Link to="/admin/category-list">Category list</Link>,
        },
        {
          key: "create-category",
          label: <Link to="/admin/create-category">Create category</Link>,
        },
      ],
    },
  ];

  useEffect(() => {
    const path = location.pathname;

    switch (path) {
      case "/admin":
        setSelectedKey(["overview"]);
        break;
      case "/admin/":
        setSelectedKey(["overview"]);
        break;
      case "/admin/create-user":
        setSelectedKey(["create-user"]);
        break;
      case "/admin/user-list":
        setSelectedKey(["user-list"]);
        break;
      case "/admin/product-list":
        setSelectedKey(["product-list"]);
        break;
      case "/admin/create-product":
        setSelectedKey(["create-product"]);
        break;
      case "/admin/categories":
        setSelectedKey(["categories"]);
        break;
    }
  }, [location.pathname]);

  return (
    <StyledAntSider className="sticky h-screen top-0 left-0 !bg-neutral-800">
      <div className="flex justify-center items-center h-[64px]">
        <h2 className="text-3xl font-bold text-[#bb4d00]">JELO</h2>
      </div>
      <Menu
        className="!bg-neutral-800 !border-r-0"
        items={sidebarItems}
        mode="inline"
        selectedKeys={selectedKey}
      />
    </StyledAntSider>
  );
};

export default Sider;
