import React, { useState } from "react";
import { Layout, Button, Tooltip, Drawer } from "antd";
import { MenuOutlined, UserOutlined } from "@ant-design/icons";
import { Breadcrumb, ProfileForm } from "./";

const { Header: AntHeader } = Layout;

const Header: React.FC = () => {
  useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const showDrawer = () => {
    setIsDrawerOpen(true);
  };

  const onClose = () => {
    setIsDrawerOpen(false);
  };

  return (
    <>
      <AntHeader className="sticky top-0 z-50 !p-4 w-full !bg-white flex items-center justify-between">
        <div className="flex items-center">
          <Button icon={<MenuOutlined />} />
          <Breadcrumb className="!ml-4" />
        </div>
        <Tooltip title="Profile">
          <Button icon={<UserOutlined />} onClick={() => showDrawer()} />
        </Tooltip>
      </AntHeader>
      <Drawer title="Profile" onClose={onClose} open={isDrawerOpen}>
        <ProfileForm />
      </Drawer>
    </>
  );
};

export default Header;
