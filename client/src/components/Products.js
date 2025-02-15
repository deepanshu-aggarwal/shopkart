import React from "react";
import ProductCard from "./ProductCard";
import { Card } from "semantic-ui-react";
import { CONSTANTS } from "../utils/constants";

const Products = (props) => {
  const { products, page } = props;

  return (
    <Card.Group>
      {products
        ?.slice(
          (page - 1) * CONSTANTS.NUM_OF_PRODUCTS,
          page * CONSTANTS.NUM_OF_PRODUCTS
        )
        ?.map((product) => (
          <ProductCard key={product._id} product={product} />
        ))}
    </Card.Group>
  );
};

export default Products;
