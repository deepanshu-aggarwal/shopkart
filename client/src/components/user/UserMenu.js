import React from "react";
import { Menu } from "semantic-ui-react";
import { DashboardTabs } from "../../utils/dashboard.config";

const UserMenu = ({ activeTab, setActiveTab, setActiveElement }) => {
  const handleTabChange = (tab) => {
    setActiveTab(tab.key);
    setActiveElement(tab.element);
  };

  return (
    <div style={{ width: "15%" }}>
      <h4>Dashboard</h4>
      <Menu pointing vertical style={{ width: "100%" }}>
        {DashboardTabs.map((tab) => (
          <Menu.Item
            name={tab.name}
            active={activeTab === tab.key}
            onClick={() => handleTabChange(tab)}
          />
        ))}
      </Menu>
    </div>
  );
};

export default UserMenu;
