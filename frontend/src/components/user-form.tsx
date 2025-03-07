import React, { useState, useEffect } from "react";
import { Form, Input, Select, Row, Col, Button, Upload } from "antd";
import { User } from "../interfaces/user";
import { PlusOutlined } from "@ant-design/icons";
import styled from "styled-components";

interface UserForm extends Omit<User, "avatarUrl"> {
  avatar?: File;
}

interface UserFormProps {
  onFinish: (values: User) => void;
  initialValues?: User;
}

const StyledContainer = styled.div`
  .ant-upload {
    border: none !important;
  }
`;

const UserForm: React.FC<UserFormProps> = ({ onFinish, initialValues }) => {
  const [avatarUrl, setAvatarUrl] = useState<string | undefined>(
    initialValues?.avatarUrl
  );
  const [avatar, setAvatar] = useState<File | null>(null);
  const [form] = Form.useForm();

  useEffect(() => {
    const currentFormValues = form.getFieldsValue();
    form.setFieldsValue({
      ...currentFormValues,
      avatar,
    });

    if (avatar) {
      const avatarUrl = URL.createObjectURL(avatar);
      setAvatarUrl(avatarUrl);
    }
  }, [avatar]);

  const uploadButton = (
    <button
      style={{ border: 0, background: "none" }}
      type="button"
      className="cursor-pointer"
    >
      <PlusOutlined />
      <div style={{ marginTop: 8 }}>Upload avatar</div>
    </button>
  );

  const customRequest = (info: any) => {
    setAvatar(info.file);
  };

  const handleRemoveAvatar = () => {
    setAvatar(null);
    setAvatarUrl(undefined);
  };

  return (
    <StyledContainer>
      <Form
        initialValues={initialValues}
        onFinish={onFinish}
        layout="vertical"
        form={form}
      >
        <Row gutter={16}>
          <Col span={24}>
            <Form.Item<UserForm>
              name="avatar"
              className="w-full h-full flex justify-center"
            >
              {!avatarUrl ? (
                <Upload
                  name="avatar"
                  listType="picture-card"
                  className="avatar-uploader"
                  showUploadList={false}
                  customRequest={customRequest}
                >
                  {uploadButton}
                </Upload>
              ) : (
                <>
                  <img
                    src={avatarUrl}
                    alt="avatar"
                    className="h-[102px] w-[102px] object-cover"
                  />
                  <Button onClick={handleRemoveAvatar}>Remove avatar</Button>
                </>
              )}
            </Form.Item>
          </Col>
          <Col md={12} sm={24} xs={24}>
            <Form.Item<UserForm>
              label="Email"
              name="email"
              rules={[{ required: true, message: "Please input email!" }]}
            >
              <Input />
            </Form.Item>

            <Form.Item<UserForm>
              label="Name"
              name="name"
              rules={[{ required: true, message: "Please input name!" }]}
            >
              <Input />
            </Form.Item>

            <Form.Item<UserForm>
              label="Password"
              name="password"
              rules={[{ required: true, message: "Please input password!" }]}
            >
              <Input.Password />
            </Form.Item>
          </Col>
          <Col md={12} sm={24} xs={24}>
            <Form.Item<UserForm>
              label="Role"
              name="role"
              rules={[{ required: true, message: "Please input role!" }]}
            >
              <Select
                options={[
                  { value: "ADMIN", label: "Admin" },
                  { value: "MODERATOR", label: "Moderator" },
                  { value: "CUSTOMER", label: "Customer" },
                ]}
              />
            </Form.Item>

            <Form.Item<UserForm>
              label="Address"
              name="address"
              rules={[{ required: true, message: "Please input address!" }]}
            >
              <Input />
            </Form.Item>

            <Form.Item<UserForm>
              label="Phone"
              name="phone"
              rules={[{ required: true, message: "Please input phone!" }]}
            >
              <Input />
            </Form.Item>
          </Col>
          <Col span={24}>
            <Form.Item label={null} className="!mb-0">
              <Button type="primary" htmlType="submit" className="w-full">
                Submit
              </Button>
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </StyledContainer>
  );
};

export default UserForm;
