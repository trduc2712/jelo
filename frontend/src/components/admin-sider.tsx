import React, { useState, useEffect } from "react";
import { useLocation, Link } from "react-router-dom";
import type { MenuProps } from "antd";
import { Layout, Menu } from "antd";
import styled from "styled-components";

const { Sider: AntSider } = Layout;

const StyledAntSider = styled(AntSider)`
  position: sticky !important;
  top: 0;
  height: 100vh;
  overflow: auto;

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
      key: "dashboard",
      label: <Link to="/admin">Dashboard</Link>,
    },
    {
      key: "users",
      label: "Users",
      children: [
        {
          key: "user-list",
          label: <Link to="/admin/users">User List</Link>,
        },
        {
          key: "create-user",
          label: <Link to="/admin/users/new">Create User</Link>,
        },
      ],
    },
    {
      key: "orders",
      label: "Orders",
      children: [
        {
          key: "order-list",
          label: <Link to="/admin">Order List</Link>,
        },
        {
          key: "create-order",
          label: <Link to="/admin">Create Order</Link>,
        },
      ],
    },
    {
      key: "products",
      label: "Products",
      children: [
        {
          key: "product-list",
          label: <Link to="/admin/products">Product List</Link>,
        },
        {
          key: "create-product",
          label: <Link to="/admin/products/new">Create Product</Link>,
        },
      ],
    },
    {
      key: "categories",
      label: "Categories",
      children: [
        {
          key: "category-list",
          label: <Link to="/admin/categories">Category List</Link>,
        },
        {
          key: "create-category",
          label: <Link to="/admin/categories/new">Create Category</Link>,
        },
      ],
    },
  ];

  useEffect(() => {
    const path = location.pathname;

    switch (path) {
      case "/admin":
        setSelectedKey(["dashboard"]);
        break;
      case "/admin/":
        setSelectedKey(["dashboard"]);
        break;
      case "/admin/users/new":
        setSelectedKey(["create-user"]);
        break;
      case "/admin/users":
        setSelectedKey(["user-list"]);
        break;
      case "/admin/products":
        setSelectedKey(["product-list"]);
        break;
      case "/admin/product/new":
        setSelectedKey(["create-product"]);
        break;
      case "/admin/categories":
        setSelectedKey(["categories"]);
        break;
    }
  }, [location.pathname]);

  return (
    <StyledAntSider className="!bg-neutral-800">
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
