import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import AdminLog from "./pages/Admin/AdminLog";
import SellerAuth from "./pages/Seller/SellerAuth";
import UserAuth from "./pages/User/UserAuth";
import Search from "./pages/Search";
import Navbar from "./components/nav";
import ServiceDetails from "./pages/ServiceDetails";

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/admin-login" element={<AdminLog />} />
          <Route path="/seller-auth" element={<SellerAuth />} />
          <Route path="/user-auth" element={<UserAuth />} />
          <Route path="/search" element={<Search />} />
          <Route path="/service" element={<ServiceDetails />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
