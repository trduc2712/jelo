import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Form, Input, Button } from 'antd';
import type { FormProps } from 'antd';
import { useAuth } from '../../hooks';

type FieldType = {
  email: string;
  password: string;
};

const Login: React.FC = () => {
  const { login } = useAuth();

  useEffect(() => {
    document.title = 'Login | Jelo';
  }, []);

  const onFinish: FormProps<FieldType>['onFinish'] = async (values) => {
    login(values);
  };

  return (
    <div>
      <Form
        requiredMark={false}
        initialValues={{ remember: true }}
        onFinish={onFinish}
        layout="vertical"
      >
        <Form.Item<FieldType>
          label="Email"
          name="email"
          rules={[{ required: true, message: 'Please input your email!' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item<FieldType>
          label="Password"
          name="password"
          rules={[{ required: true, message: 'Please input your password!' }]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item label={null}>
          <Button type="primary" htmlType="submit" className="w-full">
            Log In
          </Button>
        </Form.Item>
      </Form>
      <div className="w-full text-center hover:underline">
        <Link to="/auth/register" className="!text-black text-sm">
          Register
        </Link>
      </div>
    </div>
  );
};

export default Login;
