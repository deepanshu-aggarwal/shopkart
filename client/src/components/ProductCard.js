import React, { useState } from "react";
import ProductDetail from "./ProductDetail";
import { useCart } from "../context/CartProvider";
import { toast } from "react-hot-toast";
import { Button, Card, Image } from "semantic-ui-react";

const ProductCard = ({ product }) => {
  const [open, setOpen] = useState(false);
  const [cart, setCart] = useCart();

  const handleCart = () => {
    if (!cart) return;
    const existingProduct = cart?.find((p) => p._id === product._id);
    const newCart = cart?.filter((p) => p._id !== product._id);
    if (!existingProduct) {
      const newProduct = {
        _id: product._id,
        name: product.name,
        description: product.description,
        price: product.price,
        qty: 1,
        photo: product.photo,
      };
      setCart([...newCart, newProduct]);
      localStorage.setItem("cart", JSON.stringify([...newCart, newProduct]));
      toast.success("Product added to cart");
    } else {
      toast.error("Product already in cart");
    }
  };

  return (
    <>
      <Card
        style={{
          width: 240,
        }}
      >
        <Card.Content>
          <Image
            alt={product?.name}
            src={product?.photo}
            style={{
              height: "250px",
              width: "200px",
              marginTop: "10px",
              objectFit: "contain",
            }}
          />
          <Card.Header>{product?.name}</Card.Header>
          {/* <Card.Description style={{ marginBottom: "10px" }}>
            description={`${product?.description?.substring(0, 100)} ...`}
          </Card.Description> */}
          <div
            style={{
              display: "flex",
              justifyContent: "flex-end",
              fontWeight: 600,
              fontSize: "16px",
            }}
          >
            Price: ₹ {product?.price}
          </div>
        </Card.Content>
        <Card.Content
          extra
          style={{
            display: "flex",
          }}
        >
          <Button
            onClick={() => {
              setOpen(true);
            }}
            primary
          >
            View
          </Button>
          <Button onClick={handleCart} secondary style={{ marginLeft: "auto" }}>
            Add to Cart
          </Button>
        </Card.Content>
      </Card>
      <ProductDetail open={open} setOpen={setOpen} product={product} />
    </>
  );
};

export default ProductCard;
