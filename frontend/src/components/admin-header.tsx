import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Layout, Button, Dropdown, Avatar, Modal, Drawer } from "antd";
import type { MenuProps } from "antd";
import { MenuOutlined, UserOutlined } from "@ant-design/icons";
import ProfileForm from "./profile-form";
import Breadcrumb from "./breadcrumb";

const { Header: AntHeader } = Layout;

const Header: React.FC = () => {
  const [isConfirmLogoutModalOpen, setIsConfirmLogoutModalOpen] =
    useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const navigate = useNavigate();

  const handleOk = () => {
    setIsConfirmLogoutModalOpen(false);
    navigate("/auth/login");
  };

  const handleCancel = () => {
    setIsConfirmLogoutModalOpen(false);
  };

  const handleLogout = () => {
    setIsConfirmLogoutModalOpen(true);
  };

  const showDrawer = () => {
    setIsDrawerOpen(true);
  };

  const onClose = () => {
    setIsDrawerOpen(false);
  };

  const dropdownItems: MenuProps["items"] = [
    { key: "profile", label: "Profile", onClick: () => showDrawer() },
    {
      key: "logout",
      label: "Log out",
      onClick: () => handleLogout(),
    },
  ];

  return (
    <>
      <AntHeader className="sticky top-0 z-50 !p-4 w-full !bg-white flex items-center justify-between">
        <div className="flex items-center">
          <Button icon={<MenuOutlined />} />
          <Breadcrumb className="!ml-4" />
        </div>
        <Dropdown menu={{ items: dropdownItems }}>
          <Avatar
            icon={<UserOutlined />}
            shape="square"
            className="cursor-pointer"
          />
        </Dropdown>
      </AntHeader>
      <Drawer title="Profile" onClose={onClose} open={isDrawerOpen}>
        <ProfileForm />
      </Drawer>
      <Modal
        title="Confirm logout"
        open={isConfirmLogoutModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        okText="Log out"
        cancelText="No"
      >
        Are you sure you want to log out?
      </Modal>
    </>
  );
};

export default Header;
