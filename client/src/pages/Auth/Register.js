import React, { useEffect, useState } from "react";
import "./auth.css";
import { toast } from "react-hot-toast";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Button, Form } from "semantic-ui-react";
import { useAuth } from "../../context/AuthProvider";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [answer, setAnswer] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post("/api/v1/auth/register", {
        name,
        email,
        password,
        phone,
        address,
        answer,
      });
      if (data.success) {
        toast.success(data.message);
        navigate("/login");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="formContainer">
      <div className="title">Register</div>
      <Form onSubmit={handleSubmit}>
        <Form.Field>
          <label htmlFor="name">Name</label>
          <input
            id="name"
            placeholder="Enter Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </Form.Field>
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
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            placeholder="Enter Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </Form.Field>
        <Form.Field>
          <label htmlFor="phone">Phone</label>
          <input
            id="phone"
            placeholder="Enter Phone Number"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            required
          />
        </Form.Field>
        <Form.Field>
          <label htmlFor="address">Address</label>
          <input
            id="address"
            placeholder="Enter Address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
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
        <Button type="submit">Register</Button>
      </Form>
    </div>
  );
};

export default Register;
