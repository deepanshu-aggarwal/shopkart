import React from "react";
import { useAuth } from "../../context/AuthProvider";
import { Form } from "semantic-ui-react";

const Profile = () => {
  const [auth] = useAuth();
  const user = auth?.user;

  return (
    <div style={{ width: "50%" }}>
      <div className="title">Profile</div>
      <Form>
        <Form.Field>
          <label htmlFor="name">Name</label>
          <input id="name" value={user.name} disabled />
        </Form.Field>
        <Form.Field>
          <label htmlFor="email">Email address</label>
          <input type="email" id="email" value={user.email} disabled />
        </Form.Field>
        <Form.Field>
          <label htmlFor="phone">Phone</label>
          <input
            id="phone"
            placeholder="Enter Phone Number"
            value={user.phone}
            disabled
          />
        </Form.Field>
        <Form.Field>
          <label htmlFor="address">Address</label>
          <input
            id="address"
            placeholder="Enter Address"
            value={user.address}
            disabled
          />
        </Form.Field>
      </Form>
    </div>
  );
};

export default Profile;
