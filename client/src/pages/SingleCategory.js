import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ProductCard from "../components/ProductCard";
import { Card } from "semantic-ui-react";

const SingleCategory = () => {
  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState(null);
  const { slug } = useParams();

  const fetchProductsOfCategory = async () => {
    const { data } = await axios.get(
      `/api/v1/product/category-products/${slug}`
    );
    if (data?.success) {
      setProducts(data.products);
      setCategory(data.category);
    }
  };

  useEffect(() => {
    fetchProductsOfCategory();
  }, [slug]);

  return (
    <>
      <h1>{category?.name}</h1>
      <h4>{products?.length} results found</h4>
      <Card.Group>
        {products?.map((product) => (
          <ProductCard product={product} />
        ))}
      </Card.Group>
    </>
  );
};

export default SingleCategory;
