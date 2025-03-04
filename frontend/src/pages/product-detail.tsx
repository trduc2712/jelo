import React, { useEffect } from "react";
import { Carousel, Radio, Button, message } from "antd";
import { product } from "../utils/mock-data";
import { formatCurrency } from "../utils/formatters";

const ProductDetail: React.FC = () => {
  const [messageApi, contextHolder] = message.useMessage();

  useEffect(() => {
    document.title = "Product | JELO";
  }, []);

  const handleAddToCart = () => {
    messageApi.open({
      type: "success",
      content: "Added to cart successfully",
    });
  };

  return (
    <>
      <div className="grid lg:grid-cols-2 sm:grid-cols-1 gap-6">
        <Carousel arrows>
          {product.imageUrls.map((imageUrl) => (
            <div key={imageUrl}>
              <img src={imageUrl} alt="Product's image" />
            </div>
          ))}
        </Carousel>
        <div className="flex flex-col gap-6">
          <h2 className="font-bold text-2xl">{product.name}</h2>
          <Radio.Group>
            {product.sizes.map((size) => (
              <Radio.Button value={size} key={size}>
                {size.charAt(0).toUpperCase() + size.slice(1)}
              </Radio.Button>
            ))}
          </Radio.Group>
          <h2 className="text-xl font-semibold">
            {formatCurrency(product.price)}
          </h2>
          <Button type="primary" onClick={handleAddToCart}>
            Add to cart
          </Button>
        </div>
      </div>
      {contextHolder}
    </>
  );
};

export default ProductDetail;
