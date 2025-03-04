import React from "react";
import { products } from "../utils/mock-data";
import ProductCard from "./product-card";

const ProductList: React.FC = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {products.map((product) => (
        <ProductCard
          key={product.id}
          name={product.name}
          slug={product.slug}
          imageUrl={product.imageUrl}
          price={product.price}
        />
      ))}
    </div>
  );
};

export default ProductList;
