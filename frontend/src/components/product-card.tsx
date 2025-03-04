import React from "react";
import { useNavigate } from "react-router-dom";
import { formatCurrency } from "../utils/formatters";

type ProductCardProps = {
  slug: string;
  name: string;
  imageUrl: string;
  price: number;
};

const ProductCard: React.FC<ProductCardProps> = ({
  name,
  slug,
  imageUrl,
  price,
}) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/products/${slug}`);
  };
  return (
    <div className="text-center cursor-pointer" onClick={handleClick}>
      <img src={imageUrl} alt="Product's image" />
      <p className="!mt-2 text-base">{name}</p>
      <p className="text-base">{formatCurrency(price)}</p>
    </div>
  );
};

export default ProductCard;
