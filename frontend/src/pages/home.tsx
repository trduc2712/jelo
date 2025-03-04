import React from "react";
import ProductList from "../components/product-list";

const Home: React.FC = () => {
  return (
    <>
      <h2 className="font-bold text-2xl !mb-4">FEATURED PRODUCTS</h2>
      <ProductList />
    </>
  );
};

export default Home;
