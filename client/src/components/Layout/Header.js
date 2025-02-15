import React, { useEffect, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthProvider";
import { toast } from "react-hot-toast";
import "./header.css";
import useCategory from "../../hooks/useCategory";
import { useCart } from "../../context/CartProvider";
import { Badge } from "antd";
import { Dropdown } from "semantic-ui-react";

const Header = () => {
  const [auth, setAuth] = useAuth();
  const [categories, setCategories] = useState([]);
  const [cart] = useCart();
  const navigate = useNavigate();

  const GetCategory = async () => {
    const data = await useCategory();
    setCategories(data);
  };

  useEffect(() => {
    GetCategory();
  }, []);

  const handleLogout = () => {
    setAuth({ ...auth, user: null, token: "" });
    localStorage.removeItem("auth");
    navigate("/login");
    toast.success("Logout Successfully");
  };

  return (
    <nav
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        height: "70px",
        padding: "0 30px",
        position: "fixed",
        width: "100%",
        zIndex: 9,
        backgroundColor: "blue",
        opacity: 0.7,
      }}
    >
      <NavLink style={{ fontSize: "28px", fontWeight: "900" }}>
        SHOPKART
      </NavLink>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "20px",
          fontSize: "16px",
          color: "white",
        }}
      >
        <div>
          <Link to="/">Home</Link>
        </div>
        <div>
          <Dropdown text="Category">
            <Dropdown.Menu>
              {categories &&
                categories.map((category) => (
                  <Dropdown.Item key={category._id}>
                    <Link to={`/category/${category.slug}`}>
                      {category.name}
                    </Link>
                  </Dropdown.Item>
                ))}
            </Dropdown.Menu>
          </Dropdown>
        </div>
        <div>
          <Dropdown text={auth?.user ? auth.user.name : "Guest"}>
            <Dropdown.Menu>
              {!auth.user && (
                <>
                  <Dropdown.Item>
                    <Link to="/register">Register</Link>
                  </Dropdown.Item>
                  <Dropdown.Item>
                    <Link to="login">Login</Link>
                  </Dropdown.Item>
                </>
              )}
              {auth.user && (
                <>
                  <Dropdown.Item>
                    <Link
                      to={`/dashboard${
                        auth?.user?.role === 1 ? "/admin" : "/user"
                      }`}
                    >
                      Dashboard
                    </Link>
                  </Dropdown.Item>
                  <Dropdown.Item onClick={handleLogout}>Logout</Dropdown.Item>
                </>
              )}
            </Dropdown.Menu>
          </Dropdown>
        </div>
        <div>
          <NavLink to="/cart">
            Cart
            <Badge count={cart?.length} showZero />
          </NavLink>
        </div>
      </div>
    </nav>
  );
};

export default Header;
