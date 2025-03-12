import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Form, Input, Button } from 'antd';
import type { FormProps } from 'antd';
import { login, getCurrentUser } from '../../api/auth-api';
import { useAuth, useNotification } from '../../hooks';

type FieldType = {
  email: string;
  password: string;
};

const Login: React.FC = () => {
  const notificationApi = useNotification();
  const navigate = useNavigate();
  const { setUser } = useAuth();

  useEffect(() => {
    document.title = 'Login | Jelo';
  }, []);

  const onFinish: FormProps<FieldType>['onFinish'] = async (values) => {
    const { email, password } = values;

    try {
      const dataLogin = await login({ email, password });

      if (dataLogin && !dataLogin.statusCode) {
        const dataGetCurrentUser = await getCurrentUser();
        const user = dataGetCurrentUser.user;
        setUser(user);

        if (user.status === 'BANNED') {
          return navigate('/banned');
        }

        notificationApi.success({
          message: 'Success',
          description:
            user.role === 'ADMIN'
              ? 'Welcome back, administrator!'
              : dataLogin.message,
        });
        navigate(user.role === 'ADMIN' ? '/admin' : '/');
      } else {
        notificationApi.error({
          message: 'Error',
          description: dataLogin.message,
        });
      }
    } catch (err) {
      console.log(err);
      notificationApi.error({
        message: 'Error',
        description: 'An unexpected error occurred during the login process',
      });
    }
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
