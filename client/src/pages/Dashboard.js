import React, { useState } from "react";
import UserMenu from "../components/user/UserMenu";
import Profile from "../components/user/Profile";

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState("profile");
  const [activeElement, setActiveElement] = useState(<Profile />);

  return (
    <div style={{ display: "flex", gap: "30px" }}>
      <UserMenu
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        setActiveElement={setActiveElement}
      />
      <div style={{ width: "70%" }}>{activeElement}</div>
    </div>
  );
};

export default Dashboard;
