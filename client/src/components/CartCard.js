import React from "react";
import { Button, Card, Image } from "semantic-ui-react";
import { useCart } from "../context/CartProvider";

const CartCard = ({ item }) => {
  const [cart, setCart] = useCart();

  const handleDecrementQty = (productId) => {
    if (!cart) return;
    const newCart = cart.map((p) =>
      p._id === productId && p.qty > 1 ? { ...p, qty: p.qty - 1 } : p
    );
    setCart(newCart);
    localStorage.setItem("cart", JSON.stringify(newCart));
  };

  const handleIncrementQty = (productId) => {
    if (!cart) return;
    const newCart = cart.map((p) =>
      p._id === productId && p.qty < 10 ? { ...p, qty: p.qty + 1 } : p
    );
    setCart(newCart);
    localStorage.setItem("cart", JSON.stringify(newCart));
  };

  const handleRemove = (id) => {
    const data = cart.filter((item) => item._id !== id);
    setCart(data);
    localStorage.setItem("cart", JSON.stringify(data));
  };

  return (
    <Card key={item?._id}>
      <Card.Content>
        <Image
          style={{
            height: "125px",
            width: "125px",
            objectFit: "contain",
          }}
          src={item?.photo}
          alt={item?.name}
        />
        <Card.Header>{item?.name}</Card.Header>
        <Card.Description style={{ marginBottom: "10px" }}>
          {item?.description?.substring(0, 50)}...
        </Card.Description>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "5px",
            justifyContent: "flex-end",
            width: "100%",
          }}
        >
          Qty.
          <Button icon="minus" onClick={() => handleDecrementQty(item._id)} />
          <span style={{ fontSize: "18px" }}>{item?.qty}</span>
          <Button icon="plus" onClick={() => handleIncrementQty(item._id)} />
        </div>
      </Card.Content>
      <Card.Content
        extra
        style={{
          display: "flex",
          alignItems: "center",
          // justifyContent: "space-between",
        }}
      >
        <div
          style={{
            fontSize: "20px",
            fontWeight: "700",
          }}
        >
          Rs. {item?.price}
        </div>
        <Button
          color="red"
          style={{ marginLeft: "auto" }}
          onClick={() => handleRemove(item._id)}
        >
          Remove
        </Button>
      </Card.Content>
    </Card>
  );
};

export default CartCard;
