import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { Form, Input, Button } from "antd";
import type { FormProps } from "antd";

type FieldType = {
  email: string;
  name: string;
  password: string;
};

const Register: React.FC = () => {
  useEffect(() => {
    document.title = "Register | Jelo";
  }, []);

  const onFinish: FormProps<FieldType>["onFinish"] = (values) => {
    console.log("Success:", values);
  };

  const onFinishFailed: FormProps<FieldType>["onFinishFailed"] = (
    errorInfo
  ) => {
    console.log("Failed:", errorInfo);
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

        <Form.Item label={null}>
          <Button type="primary" htmlType="submit" className="w-full">
            Register
          </Button>
        </Form.Item>
      </Form>
      <div className="w-full text-center hover:underline">
        <Link to="/auth/login" className="!text-black">
          Log in
        </Link>
      </div>
    </div>
  );
};

export default Register;
