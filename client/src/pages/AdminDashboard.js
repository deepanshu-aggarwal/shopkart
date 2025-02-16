import React, { useState } from "react";
import CreateCategory from "../components/admin/CreateCategory";
import AdminMenu from "../components/admin/AdminMenu";

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState("create_category");
  const [activeElement, setActiveElement] = useState(<CreateCategory />);

  return (
    <div style={{ display: "flex", gap: "50px", padding: "10px 50px" }}>
      <AdminMenu
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        setActiveElement={setActiveElement}
      />
      <div style={{ width: "100%" }}>{activeElement}</div>
    </div>
  );
};

export default AdminDashboard;
