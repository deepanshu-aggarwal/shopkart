import React, { useState } from "react";
import { toast } from "react-hot-toast";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./auth.css";
import { Button, Form } from "semantic-ui-react";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [answer, setAnswer] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = { email, newPassword, answer };
    try {
      const res = await axios.post("/api/v1/auth/forgot-password", data);
      if (res && res.data.success) {
        toast.success(res.data.message);
        navigate("/login");
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="formContainer">
      <div className="title">Forgot Password</div>
      <Form onSubmit={handleSubmit}>
        <Form.Field>
          <label htmlFor="email">Email address</label>
          <input
            type="email"
            id="email"
            placeholder="Enter Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </Form.Field>
        <Form.Field>
          <label htmlFor="password">New Password</label>
          <input
            type="password"
            id="password"
            placeholder="Enter New Password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
          />
        </Form.Field>
        <Form.Field>
          <label htmlFor="answer">
            What is your nickname? Answer to question for password recovery.
          </label>
          <input
            id="answer"
            placeholder="Enter Answer"
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
            required
          />
        </Form.Field>
        <Button type="submit" primary>
          Submit
        </Button>
      </Form>
    </div>
  );
};

export default ForgotPassword;
