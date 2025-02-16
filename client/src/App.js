import { Route, Routes } from "react-router-dom";
import "./App.css";
import HomePage from "./pages/HomePage";
import Contact from "./pages/Contact";
import About from "./pages/About";
import Policy from "./pages/Policy";
import PageNotFound from "./pages/PageNotFound";
import Register from "./pages/Auth/Register";
import Login from "./pages/Auth/Login";
import Dashboard from "./pages/Dashboard";
import PrivateRoute from "./Route/Private";
import ForgotPassword from "./pages/Auth/ForgotPassword";
import AdminRoute from "./Route/AdminRoute";
import AdminDashboard from "./pages/AdminDashboard";
import Header from "./components/Layout/Header";
import { Toaster } from "react-hot-toast";
import SingleCategory from "./pages/SingleCategory";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";

function App() {
  return (
    <>
      <Header />
      <Toaster />
      <div className="App">
        <Routes>
          <Route exact path="/" element={<HomePage />} />
          <Route path="/category/:slug" element={<SingleCategory />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/dashboard" element={<PrivateRoute />}>
            <Route path="user" element={<Dashboard />} />
          </Route>
          <Route path="/dashboard" element={<AdminRoute />}>
            <Route path="admin" element={<AdminDashboard />} />
          </Route>
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/policy" element={<Policy />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/*" element={<PageNotFound />} />
        </Routes>
      </div>
      {/* <Footer /> */}
    </>
  );
}

export default App;
