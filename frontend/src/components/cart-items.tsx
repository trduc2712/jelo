import React from "react";
import { Button, InputNumber } from "antd";
import type { InputNumberProps } from "antd";
import { DeleteOutlined } from "@ant-design/icons";
import { formatCurrency } from "../utils/formatters";
import { products } from "../utils/mock-data";

const CartItems: React.FC = () => {
  const onChange: InputNumberProps["onChange"] = (value) => {
    console.log("changed", value);
  };

  return (
    <div className="flex flex-col gap-4">
      {products.map((product) => (
        <div key={product.id}>
          <img src={product.imageUrl} alt="Product's image" />
          <p>{product.name}</p>
          <p>
            Size <span className="uppercase">{product.size}</span>
          </p>
          <p>{formatCurrency(product.price)}</p>
          <InputNumber min={1} max={10} defaultValue={1} onChange={onChange} />
          <Button danger type="primary" icon={<DeleteOutlined />} />
        </div>
      ))}
    </div>
  );
};

export default CartItems;
