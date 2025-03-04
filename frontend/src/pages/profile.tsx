import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { UserOutlined } from "@ant-design/icons";
import { Form, Input, Button, Avatar, Modal } from "antd";
import type { FormProps } from "antd";
import { user } from "../utils/mock-data";

type FieldType = {
  avatarUrl: string;
  email: string;
  name: string;
  password: string;
  phone: string;
  address: string;
};

const AccountProfile: React.FC = () => {
  const [isConfirmLogoutModalOpen, setIsConfirmLogoutModalOpen] =
    useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    document.title = "Account | JELO";
  }, []);

  const onFinish: FormProps<FieldType>["onFinish"] = (values) => {
    console.log("Success:", values);
  };

  const onFinishFailed: FormProps<FieldType>["onFinishFailed"] = (
    errorInfo
  ) => {
    console.log("Failed:", errorInfo);
  };

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

  return (
    <>
      <h2 className="font-bold text-2xl !mb-4">ACCOUNT</h2>
      <Form
        initialValues={{
          email: user.email,
          name: user.name,
          password: user.password,
          phone: user.phone,
          address: user.address,
        }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        layout="vertical"
      >
        <Form.Item<FieldType> label="Avatar" name="avatarUrl">
          <Avatar shape="square" size="large" icon={<UserOutlined />} />
        </Form.Item>

        <Form.Item<FieldType>
          label="Email"
          name="email"
          rules={[{ required: true, message: "Please input your email!" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item<FieldType>
          label="Name"
          name="name"
          rules={[{ required: true, message: "Please input your name!" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item<FieldType>
          label="Password"
          name="password"
          rules={[{ required: true, message: "Please input your password!" }]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item<FieldType>
          label="Phone"
          name="phone"
          rules={[{ required: true, message: "Please input your phone!" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item<FieldType>
          label="Address"
          name="address"
          rules={[{ required: true, message: "Please input your address!" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item label={null}>
          <Button type="primary" htmlType="submit">
            Save changes
          </Button>
        </Form.Item>

        <Form.Item label={null}>
          <Button type="primary" danger onClick={handleLogout}>
            Log out
          </Button>
        </Form.Item>
      </Form>
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

export default AccountProfile;
