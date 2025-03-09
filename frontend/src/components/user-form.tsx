import React, { useState, useEffect } from 'react';
import { Form, Input, Select, Row, Col, Button, Upload } from 'antd';
import { User } from '../interfaces/user';
import { PlusOutlined, DeleteOutlined } from '@ant-design/icons';
import { UserForm as IUserForm } from '../interfaces/user';

interface UserFormProps {
  onFinish: (values: User) => void;
  initialValues?: User;
}

const UserForm: React.FC<UserFormProps> = ({ onFinish, initialValues }) => {
  const [avatarUrl, setAvatarUrl] = useState<string | undefined>(undefined);
  const [avatar, setAvatar] = useState<File | null>(null);
  const [form] = Form.useForm();

  const roles = [
    { value: 'ADMIN', label: 'Admin' },
    { value: 'MODERATOR', label: 'Moderator' },
    { value: 'CUSTOMER', label: 'Customer' },
  ];

  useEffect(() => {
    if (initialValues) {
      setAvatarUrl(initialValues.avatarUrl);
    }
  }, [initialValues]);

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
      style={{ border: 0, background: 'none' }}
      type="button"
      className="cursor-pointer">
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
    <Form
      initialValues={initialValues}
      onFinish={onFinish}
      layout="vertical"
      form={form}>
      <Row gutter={16}>
        <Col span={24}>
          <Form.Item<IUserForm>
            name="avatar"
            className="w-full h-full flex justify-center">
            {!avatarUrl ? (
              <Upload
                name="avatar"
                listType="picture-card"
                className="avatar-uploader"
                showUploadList={false}
                customRequest={customRequest}>
                {uploadButton}
              </Upload>
            ) : (
              <div className="avatar-wrapper cursor-pointer text-white relative">
                <img
                  src={avatarUrl}
                  alt="avatar"
                  className="h-[102px] w-[102px] object-cover"
                />
                <div
                  className="bg-gray-100 absolute top-0 left-0 w-[102px] h-[102px] flex justify-center items-center opacity-0 transition-opacity duration-300 hover:opacity-80 cursor-pointer"
                  onClick={handleRemoveAvatar}>
                  <DeleteOutlined className="text-[24px] !text-[#bb4d00]" />
                </div>
              </div>
            )}
          </Form.Item>
        </Col>
        <Col md={12} sm={24} xs={24}>
          <Form.Item<IUserForm>
            label="Email"
            name="email"
            rules={[{ required: true, message: 'Please input email!' }]}>
            <Input />
          </Form.Item>

          <Form.Item<IUserForm>
            label="Name"
            name="name"
            rules={[{ required: true, message: 'Please input name!' }]}>
            <Input />
          </Form.Item>

          <Form.Item<IUserForm>
            label="Password"
            name="password"
            rules={[{ required: true, message: 'Please input password!' }]}>
            <Input.Password />
          </Form.Item>
        </Col>
        <Col md={12} sm={24} xs={24}>
          <Form.Item<IUserForm>
            label="Role"
            name="role"
            rules={[{ required: true, message: 'Please input role!' }]}>
            <Select options={roles} />
          </Form.Item>

          <Form.Item<IUserForm>
            label="Address"
            name="address"
            rules={[{ required: true, message: 'Please input address!' }]}>
            <Input />
          </Form.Item>

          <Form.Item<IUserForm>
            label="Phone"
            name="phone"
            rules={[{ required: true, message: 'Please input phone!' }]}>
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
  );
};

export default UserForm;
