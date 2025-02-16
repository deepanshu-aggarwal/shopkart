import React from "react";
import { Menu } from "semantic-ui-react";
import { AdminDashboardTabs } from "../../utils/dashboard.config";

const AdminMenu = ({ activeTab, setActiveTab, setActiveElement }) => {
  const handleTabChange = (tab) => {
    setActiveTab(tab.key);
    setActiveElement(tab.element);
  };

  return (
    <div>
      <h4>Admin Panel</h4>
      <Menu pointing vertical>
        {AdminDashboardTabs.map((tab) => (
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

export default AdminMenu;
