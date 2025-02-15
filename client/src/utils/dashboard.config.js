import AdminOrders from "../components/admin/AdminOrders";
import CreateCategory from "../components/admin/CreateCategory";
import CreateProduct from "../components/admin/CreateProduct";
import Products from "../components/admin/Products";
import Users from "../components/admin/Users";
import Orders from "../components/user/Orders";
import Profile from "../components/user/Profile";

export const DashboardTabs = [
  { key: "profile", name: "Profile", element: <Profile /> },
  { key: "orders", name: "Orders", element: <Orders /> },
];

export const AdminDashboardTabs = [
  {
    key: "create_category",
    name: "Create Category",
    element: <CreateCategory />,
  },
  { key: "create_product", name: "Create Product", element: <CreateProduct /> },
  { key: "products", name: "All Products", element: <Products /> },
  { key: "orders", name: "All Orders", element: <AdminOrders /> },

  // { key: "users", name: "Users", element: <Users /> },
];
