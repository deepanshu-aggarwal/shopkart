import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({
    user: null,
    token: "",
  });
  const pathname = window.location.pathname;
  const navigate = useNavigate();

  // setting default header for every request
  axios.defaults.headers.common["Authorization"] = auth.token;

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("auth")) || auth;
    setAuth({ ...auth, user: data.user, token: data.token });

    if (!data && pathname !== "/login" && pathname !== "/register") {
      navigate("/login");
    } else if (data && (pathname === "/login" || pathname === "/register")) {
      navigate("/");
    }
  }, []);

  return (
    <AuthContext.Provider value={[auth, setAuth]}>
      {children}
    </AuthContext.Provider>
  );
};

const useAuth = () => useContext(AuthContext);

export { AuthProvider, useAuth };
