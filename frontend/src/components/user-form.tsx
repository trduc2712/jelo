import React, { useState, useEffect } from 'react';
import {
  Form,
  Input,
  Select,
  Button,
  Upload,
  DatePicker,
  FormInstance,
} from 'antd';
import { User } from '../interfaces/user';
import type { DatePickerProps } from 'antd';
import { PlusOutlined, DeleteOutlined } from '@ant-design/icons';
import { UserForm as IUserForm } from '../interfaces/user';
import dayjs from 'dayjs';
import { formatIso8601 } from '../utils/date';

const { TextArea } = Input;

interface UserFormProps {
  form: FormInstance;
  onFinish?: (values: User) => void;
  initialValues?: User;
  isEdit?: boolean;
  isView?: boolean;
}

const UserForm: React.FC<UserFormProps> = ({
  form,
  onFinish,
  initialValues,
  isEdit = false,
  isView = false,
}) => {
  const [avatarUrl, setAvatarUrl] = useState<string | undefined>(undefined);
  const [avatar, setAvatar] = useState<File | null>(null);

  const roles = [
    { value: 'SUPER_ADMIN', label: 'Super admin' },
    { value: 'ADMIN', label: 'Admin' },
    { value: 'MODERATOR', label: 'Moderator' },
    { value: 'CUSTOMER', label: 'Customer' },
  ];

  const userStatuses = [
    { value: 'ACTIVE', label: 'Active' },
    { value: 'INACTIVE', label: 'Inactive' },
    { value: 'BANNED', label: 'Banned' },
  ];

  const genders = [
    { value: 'MALE', label: 'Male' },
    { value: 'FEMALE', label: 'Female' },
  ];

  const createImageFromUrl = async (url: string) => {
    const response = await fetch(url);
    const blob = await response.blob();
    const file = new File([blob], 'avatar.jpg', { type: blob.type });
    setAvatar(file);
    setAvatarUrl(URL.createObjectURL(file));
  };

  useEffect(() => {
    if (initialValues && initialValues.avatarUrl) {
      createImageFromUrl(initialValues.avatarUrl);
    } else {
      setAvatarUrl('');
    }
    const formattedDate = initialValues?.dateOfBirth
      ? formatIso8601(initialValues.dateOfBirth)
      : undefined;
    form.setFieldsValue({
      ...initialValues,
      dateOfBirth: dayjs(formattedDate),
    });
  }, [initialValues, form]);

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

  const customRequest = (info: any) => {
    setAvatar(info.file);
  };

  const handleRemoveAvatar = () => {
    setAvatar(null);
    setAvatarUrl(undefined);
  };

  const handleDateOfBirthChange: DatePickerProps['onChange'] = (
    date,
    dateString
  ) => {
    console.log(date, dateString);
  };

  const disabledFutureDate = (current: dayjs.Dayjs) => {
    return current && current > dayjs().endOf('day');
  };

  return (
    <Form
      requiredMark={false}
      onFinish={onFinish}
      layout="vertical"
      form={form}
      disabled={isView}
    >
      <Form.Item<IUserForm>
        name="avatar"
        className="w-full h-full flex justify-center"
      >
        {!avatarUrl ? (
          <Upload
            name="avatar"
            listType="picture-circle"
            showUploadList={false}
            fileList={
              avatar
                ? [
                    {
                      uid: '1',
                      name: 'avatar.jpg',
                      status: 'done',
                      url: avatarUrl,
                    },
                  ]
                : []
            }
            customRequest={customRequest}
            className="shadow-2xl"
          >
            <button
              style={{ border: 0, background: 'none' }}
              type="button"
              className="cursor-pointer"
            >
              <PlusOutlined />
            </button>
          </Upload>
        ) : (
          <div
            className={`avatar-wrapper cursor-pointer text-white relative ${isView ? 'pointer-events-none opacity-50' : ''}`}
          >
            <img
              src={avatarUrl}
              alt="avatar"
              className="h-[100px] w-[100px] object-cover rounded-full"
            />
            <div
              className="rounded-full absolute top-0 left-0 w-[100px] h-[100px] flex justify-center items-center opacity-0 transition-opacity duration-300 hover:opacity-80 cursor-pointer"
              onClick={handleRemoveAvatar}
            >
              <DeleteOutlined className="text-[20px]" />
            </div>
          </div>
        )}
      </Form.Item>

      <Form.Item<IUserForm>
        label="Email"
        name="email"
        rules={[{ required: true, message: 'Please input email!' }]}
      >
        <Input disabled={isEdit || isView} />
      </Form.Item>

      <Form.Item<IUserForm>
        label="Name"
        name="name"
        rules={[{ required: true, message: 'Please input name!' }]}
      >
        <Input />
      </Form.Item>

      <Form.Item<IUserForm> label="Password" name="password">
        <Input.Password />
      </Form.Item>

      <Form.Item<IUserForm> label="Role" name="role">
        <Select options={roles} />
      </Form.Item>

      <Form.Item<IUserForm>
        label="Gender"
        name="gender"
        rules={[{ required: true, message: 'Please input gender!' }]}
      >
        <Select options={genders} />
      </Form.Item>

      <Form.Item<IUserForm> label="Address" name="address">
        <TextArea />
      </Form.Item>

      <Form.Item<IUserForm> label="Date of Birth" name="dateOfBirth">
        <DatePicker
          className="!w-full"
          onChange={handleDateOfBirthChange}
          disabledDate={disabledFutureDate}
        />
      </Form.Item>

      <Form.Item<IUserForm> label="Phone" name="phone">
        <Input />
      </Form.Item>

      <Form.Item<IUserForm>
        label="Status"
        name="status"
        className={`${isView ? '!mb-0' : ''}`}
      >
        <Select options={userStatuses} />
      </Form.Item>

      {isView ? (
        ''
      ) : (
        <Form.Item label={null} className="!mb-0">
          <Button type="primary" htmlType="submit" className="w-full">
            {isEdit ? 'Save changes' : 'Create'}
          </Button>
        </Form.Item>
      )}
    </Form>
  );
};

export default UserForm;
