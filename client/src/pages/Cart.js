import React from "react";
import { useCart } from "../context/CartProvider";
import { useAuth } from "../context/AuthProvider";
import { Button, Card, Icon } from "semantic-ui-react";
import CartCard from "../components/CartCard";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";

const Cart = () => {
  const [cart] = useCart();
  const [auth] = useAuth();
  const navigate = useNavigate();

  const handleCheckout = () => {
    if (!auth.user) {
      toast.error("Login to checkout");
      return;
    } else if (!cart.length) {
      toast.error("Cart is empty");
      return;
    }
    navigate("/checkout");
  };

  const findTotal = () => {
    if (!cart) return 0;
    const total = cart?.reduce((acc, item) => {
      return acc + item.price * item.qty;
    }, 0);
    return total?.toLocaleString("en-IN", {
      style: "currency",
      currency: "INR",
    });
  };

  return (
    <div style={{ paddingLeft: "10px" }}>
      <h2>{`Hello ${auth?.user?.name || "Guest"}`}</h2>
      <h5>You have {cart?.length || 0} items in your cart</h5>
      <div style={{ display: "flex" }}>
        <div style={{ width: "70%" }}>
          {cart?.length ? (
            <>
              <h3>Items</h3>
              <Card.Group>
                {cart?.map((item) => (
                  <CartCard item={item} />
                ))}
              </Card.Group>
            </>
          ) : (
            <div
              style={{
                height: "100%",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "30px",
                color: "lightgray",
              }}
            >
              <Icon name="inbox" />
              <div>No data</div>
            </div>
          )}
        </div>
        <div>
          <h3>Cart Summary</h3>
          <h2>Total: {findTotal()}</h2>
          {auth?.user ? (
            <Button
              style={{ marginTop: "20px" }}
              color="blue"
              onClick={handleCheckout}
            >
              Checkout
              <Icon name="right arrow" />
            </Button>
          ) : (
            <Button
              onClick={() =>
                navigate("/login", {
                  state: "/cart",
                })
              }
            >
              Please login to Checkout
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Cart;
