import React from "react";
import { NavLink } from "react-router-dom";
import { useAuth } from "../../context/AuthProvider";
import { toast } from "react-hot-toast";

const Header = () => {
  const [auth, setAuth] = useAuth();

  const handleLogout = () => {
    setAuth({ ...auth, user: null, token: "" });
    localStorage.removeItem("auth");
    toast.success("Logout Successfully");
  };

  return (
    <div>
      <nav className="navbar navbar-expand-lg bg-body-tertiary">
        <div className="container-fluid">
          <NavLink className="navbar-brand">SHOPKART</NavLink>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon" />
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <NavLink to="/" className="nav-link">
                  Home
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink to="/category" className="nav-link">
                  Category
                </NavLink>
              </li>
              <li className="nav-item dropdown">
                <NavLink
                  className="nav-link dropdown-toggle"
                  href="#"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  {auth?.user ? auth.user.name : "Guest"}
                </NavLink>
                <ul className="dropdown-menu">
                  {!auth.user && (
                    <li>
                      <NavLink to="/register" className="nav-link">
                        Register
                      </NavLink>
                    </li>
                  )}
                  {!auth.user && (
                    <li>
                      <NavLink to="/login" className="nav-link">
                        Login
                      </NavLink>
                    </li>
                  )}
                  {auth.user && (
                    <li>
                      <NavLink to="/dashboard" className="nav-link">
                        Dashboard
                      </NavLink>
                    </li>
                  )}
                  {auth.user && (
                    <li>
                      <NavLink
                        to="/login"
                        className="nav-link"
                        onClick={handleLogout}
                      >
                        Logout
                      </NavLink>
                    </li>
                  )}
                </ul>
              </li>
              <li className="nav-item">
                <NavLink to="/cart" className="nav-link">
                  Cart {0}
                </NavLink>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Header;
