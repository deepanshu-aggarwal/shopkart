import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({
    user: null,
    token: "",
  });

  // setting default header for every request
  axios.defaults.headers.common["Authorization"] = auth.token;

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("auth")) || auth;
    setAuth({ ...auth, user: data.user, token: data.token });
  }, []);

  return (
    <AuthContext.Provider value={[auth, setAuth]}>
      {children}
    </AuthContext.Provider>
  );
};

const useAuth = () => useContext(AuthContext);

export { AuthProvider, useAuth };
