import React, { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../context/AuthProvider";
import Spinner from "../components/Spinner";

const AdminRoute = () => {
  const [ok, setOk] = useState(false);
  const [auth] = useAuth();

  useEffect(() => {
    const authCheck = async () => {
      const res = await axios.get("/api/v1/auth/admin-auth");
      if (res?.data?.ok) {
        setOk(true);
      } else {
        setOk(false);
      }
    };
    auth?.token && authCheck();
  }, [auth?.token]);

  return ok ? <Outlet /> : <Spinner path="" />;
};

export default AdminRoute;
