import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Form, Input, Button, Checkbox } from "antd";
import type { FormProps } from "antd";
import { login } from "../../api/auth-api";
import { useNotification } from "../../contexts/notification-context";
import { getCurrentUser } from "../../api/auth-api";
import { useAuth } from "../../contexts/auth-context";

type FieldType = {
  email: string;
  password: string;
  remember: string;
};

const Login: React.FC = () => {
  const api = useNotification();
  const navigate = useNavigate();
  const { setUser } = useAuth();

  useEffect(() => {
    document.title = "Login | JELO";
  }, []);

  const onFinish: FormProps<FieldType>["onFinish"] = async (values) => {
    const { email, password } = values;

    try {
      const data: any = await login({ email, password });

      if (data && !data.statusCode) {
        api.success({
          message: "Login successfully",
          description: data.message,
        });

        const user = await getCurrentUser();
        setUser(user);

        navigate("/");
      } else {
        api.error({
          message: "Error",
          description: data.message,
        });
      }
    } catch (err) {
      console.log(err);
      api.error({
        message: "Error",
        description: "An unexpected error occurred during the login process",
      });
    }
  };

  const onFinishFailed: FormProps<FieldType>["onFinishFailed"] = (
    errorInfo
  ) => {
    console.log("Login failed:", errorInfo);
  };

  return (
    <div>
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

        {/* <div className="flex items-center justify-between !mb-6 hover:underline">
          <Form.Item<FieldType>
            className="!mb-0"
            name="remember"
            valuePropName="checked"
            label={null}
          >
            <Checkbox>Remember me</Checkbox>
          </Form.Item>
          <Link to="forgot-password" className="!text-black">
            Forgot password
          </Link>
        </div> */}

        <Form.Item label={null}>
          <Button type="primary" htmlType="submit" className="w-full">
            Log in
          </Button>
        </Form.Item>
      </Form>
      <div className="w-full text-center hover:underline">
        <Link to="/auth/register" className="!text-black">
          Register
        </Link>
      </div>
    </div>
  );
};

export default Login;
