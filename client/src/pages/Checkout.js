import React, { useEffect, useState } from "react";
import { Button } from "semantic-ui-react";
import { useCart } from "../context/CartProvider";
import { useAuth } from "../context/AuthProvider";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-hot-toast";
import DropIn from "braintree-web-drop-in-react";

const Checkout = () => {
  const [cart, setCart] = useCart();
  const [auth] = useAuth();
  const navigate = useNavigate();
  const [clientToken, setClientToken] = useState("");
  const [instance, setInstance] = useState("");
  const [loading, setLoading] = useState(false);

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

  const handlePayment = async () => {
    if (!auth) return;
    setLoading(true);
    try {
      const { nonce } = await instance.requestPaymentMethod();
      const { data } = await axios.post("/api/v1/product/braintree/payment", {
        nonce,
        cart,
      });
      if (data?.success) {
        localStorage.removeItem("cart");
        setCart([]);
        navigate("/dashboard/user");
        toast.success("Payment Done Successfully");
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const getToken = async () => {
    try {
      const { data } = await axios.get("/api/v1/product/braintree/token");
      if (data?.success) {
        setClientToken(data.token.clientToken);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getToken();
    if (!auth.token && !cart.length) navigate("/cart");
  }, [auth?.token]);

  return (
    <div style={{}}>
      <h3>Checkout</h3>
      <h2>Total: {findTotal()}</h2>
      {auth?.token ? (
        <>
          <div>
            Current Address:{" "}
            <span style={{ fontWeight: 700 }}>{auth?.user?.address}</span>
          </div>
          {/* <Button>Change Address</Button> */}
        </>
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
      <div className="mt-2 mb-5">
        {!clientToken || !cart?.length ? (
          ""
        ) : (
          <>
            <DropIn
              options={{
                authorization: clientToken,
                paypal: { flow: "vault" },
              }}
              onInstance={(instance) => setInstance(instance)}
            />
            <Button color="blue" onClick={handlePayment} disabled={loading}>
              {loading ? "Processing..." : "Make Payment"}
            </Button>
          </>
        )}
      </div>
    </div>
  );
};

export default Checkout;
