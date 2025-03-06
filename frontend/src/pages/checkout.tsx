import React, { useEffect } from "react";
import { Form, Input, Button, Select, Divider } from "antd";
import type { FormProps } from "antd";
import { formatCurrency } from "../utils/formatters";

type FieldType = {
  name: string;
  address: string;
  phone: string;
  paymentMethod: "cod" | "bank_transfer";
};

const Checkout: React.FC = () => {
  useEffect(() => {
    document.title = "Checkout | JELO";
  }, []);

  const onFinish: FormProps<FieldType>["onFinish"] = (values) => {
    console.log("Success:", values);
  };

  const onFinishFailed: FormProps<FieldType>["onFinishFailed"] = (
    errorInfo
  ) => {
    console.log("Failed:", errorInfo);
  };

  const handleChange = (value: string) => {
    console.log(`selected ${value}`);
  };

  return (
    <>
      <h2 className="font-bold text-2xl">CHECKOUT</h2>
      <div className="!mt-4 gap-4">
        <Form
          name="basic"
          initialValues={{ paymentMethod: "cod" }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
          layout="vertical"
        >
          <div className="flex justify-between gap-6">
            <Form.Item<FieldType>
              label="Name"
              name="name"
              className="flex-1"
              rules={[{ required: true, message: "Please input your name!" }]}
            >
              <Input />
            </Form.Item>

            <Form.Item<FieldType>
              label="Phone"
              name="phone"
              className="flex-1"
              rules={[{ required: true, message: "Please input your phone!" }]}
            >
              <Input />
            </Form.Item>
          </div>

          <Form.Item<FieldType>
            label="Address"
            name="address"
            rules={[{ required: true, message: "Please input your address!" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item<FieldType>
            label="Payment method"
            name="paymentMethod"
            rules={[
              {
                required: true,
                message: "Please choose your payment method!",
              },
            ]}
          >
            <Select
              onChange={handleChange}
              options={[
                { value: "cod", label: "COD" },
                { value: "bank_transfer", label: "Bank transfer" },
              ]}
            />
          </Form.Item>

          <div className="!mb-6">
            <p className="!mb-1">Total: {formatCurrency(400000)}</p>
            <p className="!mb-1">Shipping fee: {formatCurrency(30000)}</p>
            <p>Final total: {formatCurrency(430000)}</p>
          </div>

          <Form.Item label={null} className="!mb-0">
            <Button type="primary" htmlType="submit" className="w-full">
              Order
            </Button>
          </Form.Item>
        </Form>
      </div>
    </>
  );
};

export default Checkout;
