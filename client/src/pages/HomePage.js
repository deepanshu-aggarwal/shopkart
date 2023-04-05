import React from "react";
import Layout from "../components/Layout/Layout";
import { useAuth } from "../context/AuthProvider";

const HomePage = () => {
  const [auth, setAuth] = useAuth();

  return <Layout>{JSON.stringify(auth, null, 2)}</Layout>;
};

export default HomePage;
