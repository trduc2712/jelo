import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserOutlined } from "@ant-design/icons";
import { Form, Input, Button, Avatar, Modal } from "antd";
import type { FormProps } from "antd";
import { useAuth } from "../contexts/auth-context";
import { logout } from "../api/auth-api";
import { useNotification } from "../contexts/notification-context";

type FieldType = {
  avatarUrl: string;
  email: string;
  name: string;
  phone: string;
  address: string;
};

const ProfileForm: React.FC = () => {
  const [isConfirmLogoutModalOpen, setIsConfirmLogoutModalOpen] =
    useState(false);
  const navigate = useNavigate();
  const { user, setUser } = useAuth();
  const api = useNotification();

  const onFinish: FormProps<FieldType>["onFinish"] = (values) => {
    console.log("Success:", values);
  };

  const onFinishFailed: FormProps<FieldType>["onFinishFailed"] = (
    errorInfo
  ) => {
    console.log("Failed:", errorInfo);
  };

  const handleOk = async () => {
    setIsConfirmLogoutModalOpen(false);
    const data = await logout();

    if (data && !data.statusCode) {
      api.success({
        message: "Success",
        description: data.message,
      });

      setUser(null);
      navigate("/auth/login");
    } else {
      api.error({
        message: "Error",
        description: data.message,
      });
    }
  };

  const handleCancel = () => {
    setIsConfirmLogoutModalOpen(false);
  };

  const openConfirmLogoutModal = () => {
    setIsConfirmLogoutModalOpen(true);
  };

  return (
    <>
      {user ? (
        <Form
          initialValues={{
            email: user.email,
            name: user.name,
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
            <Button type="primary" danger onClick={openConfirmLogoutModal}>
              Log out
            </Button>
          </Form.Item>
        </Form>
      ) : (
        "Not logged in"
      )}
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

export default ProfileForm;
