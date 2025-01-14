import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import AdminLog from "./pages/Admin/AdminLog";

import SellerAuth from "./pages/Seller/SellerAuth";
import UserAuth from "./pages/User/UserAuth";
import Search from "./pages/Search";
import Navbar from "./components/nav";
import ServiceDetails from "./pages/ServiceDetails";
import BookingsPage from "./pages/User/BookingPage";
import Booking from "./pages/User/Booking";
import Payment from "./pages/User/Payment";
import GigCreate from "./pages/Seller/GigCreate";

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
          <Route path="/user-booking-status" element={<BookingsPage />} />
          <Route path="/user-booking" element={<Booking />} />
          <Route path="/payment" element={<Payment />} />
          <Route path="/gigcreate" element={<GigCreate />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
