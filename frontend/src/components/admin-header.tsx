import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Layout,
  Button,
  Dropdown,
  Avatar,
  Modal,
  Drawer,
  Form,
  Input,
} from "antd";
import type { MenuProps, FormProps } from "antd";
import { MenuOutlined, UserOutlined } from "@ant-design/icons";
import Breadcrumb from "./breadcrumb";

const { Header: AntHeader } = Layout;

type FieldType = {
  email: string;
  name: string;
  password: string;
};

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

  const onFinish: FormProps<FieldType>["onFinish"] = (values) => {
    console.log("Success:", values);
  };

  const onFinishFailed: FormProps<FieldType>["onFinishFailed"] = (
    errorInfo
  ) => {
    console.log("Failed:", errorInfo);
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
        <Form
          initialValues={{ remember: true }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          layout="vertical"
        >
          <Form.Item<FieldType>
            label="Email"
            name="email"
            rules={[{ required: true, message: "Please input your email!" }]}
            initialValue="someone@expample.com"
          >
            <Input />
          </Form.Item>

          <Form.Item<FieldType>
            label="Name"
            name="name"
            rules={[{ required: true, message: "Please input your name!" }]}
            initialValue="User"
          >
            <Input />
          </Form.Item>

          <Form.Item<FieldType>
            label="Password"
            name="password"
            rules={[{ required: true, message: "Please input your password!" }]}
            initialValue="password"
          >
            <Input.Password />
          </Form.Item>

          <Form.Item label={null}>
            <Button type="primary" htmlType="submit" className="w-full">
              Save changes
            </Button>
          </Form.Item>
        </Form>
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
