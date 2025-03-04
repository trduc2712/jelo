import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { Layout, Menu, Tooltip } from "antd";
import type { MenuProps } from "antd";
import {
  SearchOutlined,
  ShoppingOutlined,
  UserOutlined,
} from "@ant-design/icons";

const { Header: AntHeader } = Layout;

type MenuItem = Required<MenuProps>["items"][number];

const Header: React.FC = () => {
  const navigate = useNavigate();

  const navbarItems: MenuItem[] = [
    {
      key: "tops",
      label: <Link to="/categories/tops">Tops</Link>,
      onClick: () => {
        navigate("/tops");
      },
      children: [],
    },
    {
      key: "bottoms",
      label: <Link to="/categories/bottoms">Bottoms</Link>,
      onClick: () => {
        navigate("/bottoms");
      },
      children: [],
    },
    {
      key: "sweaters",
      label: <Link to="/categories/sweaters">Sweaters</Link>,
      onClick: () => {
        navigate("/sweaters");
      },
      children: [],
    },
    {
      key: "hoodies",
      label: <Link to="/categories/hoodies">Hoodies</Link>,
      onClick: () => {
        navigate("/hoodies");
      },
      children: [],
    },
    {
      key: "outerwear",
      label: <Link to="/categories/outerwear">Outerwear</Link>,
      onClick: () => {
        navigate("/outerwear");
      },
      children: [],
    },
    {
      key: "accessories",
      label: <Link to="/categories/accessories">Accessories</Link>,
      onClick: () => {
        navigate("/accessories");
      },
      children: [],
    },
  ];

  return (
    <AntHeader className="sticky top-0 z-50 !p-4 w-full !bg-white flex items-center justify-between">
      <div className="flex items-center">
        <Link to="/">
          <h1 className="text-3xl font-bold text-[#bb4d00] !mr-4">JELO</h1>
        </Link>
        <Menu
          items={navbarItems}
          mode="horizontal"
          className="navbar uppercase !border-b-0"
        />
      </div>
      <div className="flex items-center text-2xl gap-4">
        <Tooltip title="Search">
          <Link to="/search" className="!text-black">
            <SearchOutlined className="cursor-pointer" />
          </Link>
        </Tooltip>
        <Tooltip title="Cart">
          <Link to="/cart" className="!text-black">
            <ShoppingOutlined className="cursor-pointer" />
          </Link>
        </Tooltip>
        <Tooltip title="Profile">
          <Link to="/profile" className="!text-black">
            <UserOutlined />
          </Link>
        </Tooltip>
      </div>
    </AntHeader>
  );
};

export default Header;
