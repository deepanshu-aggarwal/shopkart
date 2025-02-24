import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

const Spinner = ({ path = "login" }) => {
  const [count, setCount] = useState(10);
  const navigate = useNavigate();
  const location = useLocation();

  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     setCount((prevCount) => prevCount - 1);
  //   }, 1000);
  //   if (count === 0) navigate(`/${path}`, { state: location.pathname }); // creating a state to refer back to it after login
  //   return () => clearInterval(interval);
  // }, [count, navigate, location, path]);

  return (
    <>
      <div
        className="d-flex flex-column justify-content-center align-items-center"
        style={{ height: "100vh" }}
      >
        {/* <div className="text-center">Redirecting to you in {count}</div> */}
        <div className="spinner-border" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    </>
  );
};

export default Spinner;
